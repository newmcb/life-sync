import React, { FC } from "react";
import dayjs from "dayjs";
import { CalendarEvent } from "@/src/views/calendar/model/CalendarViewModel";

interface CalendarGridProps {
  monthDates: Date[];
  events: CalendarEvent[];
  currentDate: Date;
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
}
const CalendarGrid: FC<CalendarGridProps> = ({
  monthDates,
  events,
  currentDate,
  selectedDate,
  onDateClick,
}) => {
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => dayjs(event.date).isSame(date, "day"));
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {monthDates.map((date) => {
        const dayEvents = getEventsForDate(date);
        const isSelected =
          selectedDate && dayjs(date).isSame(selectedDate, "day");
        const isToday = dayjs(date).isSame(dayjs(), "day");
        const isPast = dayjs(date).isBefore(dayjs(), "day");

        return (
          <div
            key={date.toISOString()}
            onClick={() => onDateClick(date)}
            className={`min-h-[100px] p-2 border rounded-md cursor-pointer ${
              isSelected
                ? "bg-indigo-50 border-indigo-300"
                : dayjs(date).isSame(currentDate, "month")
                  ? "bg-white"
                  : "bg-gray-50"
            } ${isToday ? "border-indigo-500" : ""} ${isPast ? "opacity-70" : ""}`}
          >
            <div
              className={`font-medium mb-1 ${isToday ? "text-indigo-600 font-bold" : "text-gray-800"}`}
            >
              {dayjs(date).format("D")}
            </div>
            <div className="space-y-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`${event.color} text-white text-xs p-1 rounded truncate cursor-pointer`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
