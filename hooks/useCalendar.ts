import { useEffect, useState, useCallback } from "react";
import type { CalendarEvent } from "@/src/views/calendar/model/CalendarViewModel";
import dayjs from "dayjs";

const STORAGE_KEY = "userCalendarEvents";

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 초기 로드: 로컬스토리지 → Date 변환 → state 설정
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as (CalendarEvent & {
          date: string | null;
        })[];
        const restored = parsed.map((e) => ({
          ...e,
          // null이나 문자열 모두 Date 객체로 변환
          date: e.date ? new Date(e.date) : new Date(),
        }));
        setEvents(restored);
      } catch {
        setEvents([]);
      }
      return;
    }

    // 샘플 API 로드 (최초 한 번만)
    fetch("/api/guest")
      .then((res) => res.json())
      .then((data) => {
        const today = dayjs().format("YYYY-MM-DD");
        const initial = (data.schedule as any[]).map((item) => ({
          id: item.id,
          title: item.title,
          // 샘플엔 date가 없으니 today + 샘플 time 을 합침
          date: new Date(`${today}T${item.time}`),
          description: item.description || "",
          color: item.color || "bg-blue-500",
        })) as CalendarEvent[];
        setEvents(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      })
      .catch(() => {
        setEvents([]);
      });
  }, []);

  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents((prev) => {
      const next = [...prev, event];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateEvent = useCallback((event: CalendarEvent) => {
    setEvents((prev) => {
      const next = prev.map((e) => (e.id === event.id ? event : e));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };
}
