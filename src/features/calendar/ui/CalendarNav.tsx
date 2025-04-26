import React, { FC } from "react";
import { FaCalendarDay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";

interface CalendarNavProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarNav: FC<CalendarNavProps> = ({
  currentDate,
  onPrev,
  onNext,
  onToday,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrev}
        className="p-2 rounded-md hover:bg-gray-100 focus:ring-indigo-500"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {dayjs(currentDate).format("YYYY년 M월")}
        </h2>
        <button
          onClick={onToday}
          className="ml-3 p-2 rounded-md hover:bg-gray-100 focus:ring-indigo-500"
          title="오늘로 이동"
        >
          <FaCalendarDay className="text-indigo-600" />
        </button>
      </div>
      <button
        onClick={onNext}
        className="p-2 rounded-md hover:bg-gray-100 focus:ring-indigo-500"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default CalendarNav;
