import React, { FC } from "react";
import dayjs from "dayjs";
import { CalendarEvent } from "@/src/views/calendar/model/CalendarViewModel";
import { FaEdit, FaTrash } from "react-icons/fa";

interface EventListProps {
  events: CalendarEvent[];
  openEventForm: (event?: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
}

const EventList: FC<EventListProps> = ({
  events,
  openEventForm,
  deleteEvent,
}) => {
  return (
    <div className="space-y-3">
      {events.map((event) => {
        const isPast = dayjs(event.date).isBefore(dayjs(), "day");
        return (
          <div
            key={event.id}
            className={`flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 ${isPast ? "opacity-70" : ""}`}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${event.color} mr-3`} />
              <div>
                <h3
                  className={`font-medium text-gray-800 ${isPast ? "line-through text-gray-500" : ""}`}
                >
                  {event.title}
                </h3>
                <p
                  className={`text-sm ${isPast ? "text-gray-400 line-through" : "text-gray-500"}`}
                >
                  {dayjs(event.date).format("YYYY년 M월 D일")}
                </p>
                {event.description && (
                  <p
                    className={`text-sm mt-1 ${isPast ? "text-gray-400 line-through" : "text-gray-600"}`}
                  >
                    {event.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => openEventForm(event)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
