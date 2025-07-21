"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { CalendarEvent } from "@/src/views/calendar/model/CalendarViewModel";
import { FaEllipsisH } from "react-icons/fa";
import { PageLoading } from "@/src/widgets/common";
import CalendarHeader from "@/src/views/calendar/ui/CalendarHeader";
import {
  CalendarGrid,
  CalendarNav,
  EventFormModal,
  EventList,
  FilterMenu,
} from "@/src/features/calendar";
import { CalendarFilterType } from "@/src/features/calendar/model/CalendarModel";
import { useCalendar } from "@/hooks/useCalendar";

const CalendarView = () => {
  const { status } = useSession();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, addEvent, updateEvent, deleteEvent } = useCalendar();
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<CalendarFilterType>("all");
  const [showPastEvents, setShowPastEvents] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: "",
    description: "",
    color: "bg-blue-500",
  });

  // 필터링 & 정렬
  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    if (!showPastEvents) {
      filtered = filtered.filter(
        (e) => !dayjs(e.date).isBefore(dayjs(), "day"),
      );
    }
    if (filterType === "day" && selectedDate) {
      filtered = filtered.filter((e) =>
        dayjs(e.date).isSame(selectedDate, "day"),
      );
    } else if (filterType === "month") {
      filtered = filtered.filter((e) =>
        dayjs(e.date).isSame(currentDate, "month"),
      );
    }
    // Date 객체 보장 → getTime 안전
    return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, filterType, selectedDate, currentDate, showPastEvents]);

  if (status === "loading") return <PageLoading />;
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  // 네비게이션 핸들러
  const prevMonth = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, "month").toDate());
    setFilterType("month");
    setSelectedDate(null);
  };
  const nextMonth = () => {
    setCurrentDate(dayjs(currentDate).add(1, "month").toDate());
    setFilterType("month");
    setSelectedDate(null);
  };
  const goToToday = () => {
    setCurrentDate(new Date());
    setFilterType("month");
    setSelectedDate(null);
  };

  const openEventForm = (event?: CalendarEvent) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        date: dayjs(event.date).format("YYYY-MM-DD"),
        time: dayjs(event.date).format("HH:mm"),
        description: event.description || "",
        color: event.color,
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        title: "",
        date: selectedDate
          ? dayjs(selectedDate).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        time: dayjs().format("HH:mm"),
        description: "",
        color: "bg-blue-500",
      });
    }
    setShowEventForm(true);
  };

  const saveEvent = () => {
    if (!formData.title) return;
    const newEvent: CalendarEvent = {
      id: selectedEvent?.id || Date.now().toString(),
      title: formData.title,
      date: new Date(`${formData.date}T${formData.time}`),
      description: formData.description,
      color: formData.color,
    };
    selectedEvent ? updateEvent(newEvent) : addEvent(newEvent);
    setShowEventForm(false);
  };

  const handleDelete = (id: string) => deleteEvent(id);

  const getFilterTitle = () => {
    if (filterType === "all") return "전체 일정";
    if (filterType === "month")
      return `${dayjs(currentDate).format("YYYY년 M월")} 일정`;
    if (filterType === "day" && selectedDate)
      return `${dayjs(selectedDate).format("YYYY년 M월 D일")} 일정`;
    return "일정 목록";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CalendarHeader onAdd={() => openEventForm()} />

      <div className="mb-4 p-2 bg-indigo-50 rounded-md flex items-center justify-between">
        <span className="text-sm font-medium text-indigo-700">
          {getFilterTitle()}
        </span>
        <button
          onClick={() => setShowFilterMenu((v) => !v)}
          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-md"
        >
          <FaEllipsisH />
        </button>
      </div>

      <FilterMenu
        visible={showFilterMenu}
        filterType={filterType}
        showPastEvents={showPastEvents}
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectAll={() => {
          setFilterType("all");
          setSelectedDate(null);
        }}
        onSelectMonth={() => {
          setFilterType("month");
          setSelectedDate(null);
        }}
        onSelectDay={() => setFilterType("day")}
        onTogglePast={() => setShowPastEvents((p) => !p)}
        onClose={() => setShowFilterMenu(false)}
      />

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <CalendarNav
          currentDate={currentDate}
          onPrev={prevMonth}
          onNext={nextMonth}
          onToday={goToToday}
        />
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d} className="text-center font-medium text-gray-600 py-2">
              {d}
            </div>
          ))}
        </div>
        <CalendarGrid
          monthDates={Array.from(
            {
              length:
                dayjs(currentDate)
                  .endOf("month")
                  .diff(dayjs(currentDate).startOf("month"), "day") + 1,
            },
            (_, i) =>
              dayjs(currentDate).startOf("month").add(i, "day").toDate(),
          )}
          events={events}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateClick={(d) => {
            setSelectedDate(d);
            setFilterType("day");
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            등록된 일정이 없습니다.
          </p>
        ) : (
          <EventList
            events={filteredEvents}
            openEventForm={openEventForm}
            deleteEvent={handleDelete}
          />
        )}
      </div>

      <EventFormModal
        visible={showEventForm}
        selectedEvent={selectedEvent!}
        formData={formData}
        setFormData={setFormData}
        onSave={saveEvent}
        onCancel={() => setShowEventForm(false)}
      />
    </div>
  );
};

export default CalendarView;
