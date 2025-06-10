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

const CalenderView = () => {
  const { status } = useSession();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
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
    description: "",
    color: "bg-blue-500",
  });

  // 필터링된 일정 목록 가져오기
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // 지난 일정 필터링
    if (!showPastEvents) {
      filtered = filtered.filter(
        (event) => !dayjs(event.date).isBefore(dayjs(), "day"),
      );
    }

    // 필터 타입에 따른 필터링
    if (filterType === "day" && selectedDate) {
      filtered = filtered.filter((event) =>
        dayjs(event.date).isSame(selectedDate, "day"),
      );
    } else if (filterType === "month") {
      filtered = filtered.filter((event) =>
        dayjs(event.date).isSame(currentDate, "month"),
      );
    }

    // 날짜순 정렬
    return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, filterType, selectedDate, currentDate, showPastEvents]);

  // 인증 확인
  if (status === "loading") {
    return <PageLoading />;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  // 현재 월의 날짜 계산
  const monthStart = dayjs(currentDate).startOf("month");
  const monthEnd = dayjs(currentDate).endOf("month");
  const monthDates = Array.from(
    { length: monthEnd.diff(monthStart, "day") + 1 },
    (_, i) => monthStart.add(i, "day").toDate(),
  );

  // 이전/다음 월로 이동
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

  // 오늘로 이동
  const goToToday = () => {
    setCurrentDate(new Date());
    setFilterType("month");
    setSelectedDate(null);
  };

  // 일정 추가/수정 폼 열기
  const openEventForm = (event?: CalendarEvent) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        date: dayjs(event.date).format("YYYY-MM-DD"),
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
        description: "",
        color: "bg-blue-500",
      });
    }
    setShowEventForm(true);
  };

  // 일정 저장
  const saveEvent = () => {
    if (!formData.title) return;

    const newEvent: CalendarEvent = {
      id: selectedEvent?.id || Date.now().toString(),
      title: formData.title,
      date: new Date(formData.date),
      description: formData.description,
      color: formData.color,
    };

    if (selectedEvent) {
      // 기존 일정 수정
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? newEvent : event,
        ),
      );
    } else {
      // 새 일정 추가
      setEvents([...events, newEvent]);
    }

    setShowEventForm(false);
  };

  // 일정 삭제
  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // 현재 필터 상태에 따른 제목 가져오기
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
      <CalendarHeader
        onAdd={() => {
          openEventForm();
        }}
      />

      {/* 필터 표시 (모바일/데스크톱 공통) */}
      <div className="mb-4 p-2 bg-indigo-50 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-700">
            {getFilterTitle()}
          </span>
          <button
            onClick={() => {
              setShowFilterMenu(!showFilterMenu);
            }}
            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-md"
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>

      {/* 필터 메뉴 드롭다운 */}
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

      {/* 캘린더 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <CalendarNav
          currentDate={currentDate}
          onPrev={prevMonth}
          onNext={nextMonth}
          onToday={goToToday}
        />

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className="text-center font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 캘린더 그리드 */}
        <CalendarGrid
          monthDates={monthDates}
          events={events}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateClick={(d) => {
            setSelectedDate(d);
            setFilterType("day");
          }}
        />
      </div>

      {/* 일정 목록 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {getFilterTitle()}
        </h2>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            등록된 일정이 없습니다.
          </p>
        ) : (
          <EventList
            events={filteredEvents}
            openEventForm={openEventForm}
            deleteEvent={deleteEvent}
          />
        )}
      </div>

      {/* 일정 추가/수정 모달 */}
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

export default CalenderView;
