import { FC } from "react";
import dayjs from "dayjs";
import { CalendarFilterType } from "@/src/features/calendar/model/CalendarModel";

interface FilterMenuProps {
  visible: boolean;
  filterType: CalendarFilterType;
  showPastEvents: boolean;
  currentDate: Date;
  selectedDate: Date | null;
  onSelectAll: () => void;
  onSelectMonth: () => void;
  onSelectDay: () => void;
  onTogglePast: () => void;
  onClose: () => void;
}

const FilterMenu: FC<FilterMenuProps> = ({
  visible,
  filterType,
  showPastEvents,
  currentDate,
  selectedDate,
  onSelectAll,
  onSelectMonth,
  onSelectDay,
  onTogglePast,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
      <div className="py-1">
        <button
          onClick={() => {
            onSelectAll();
            onClose();
          }}
          className={`block w-full text-left px-4 py-2 text-sm ${filterType === "all" ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          전체보기
        </button>
        <button
          onClick={() => {
            onSelectMonth();
            onClose();
          }}
          className={`block w-full text-left px-4 py-2 text-sm ${filterType === "month" ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          {dayjs(currentDate).format("YYYY년 M월")} 일정
        </button>
        {selectedDate && (
          <button
            onClick={() => {
              onSelectDay();
              onClose();
            }}
            className={`block w-full text-left px-4 py-2 text-sm ${filterType === "day" ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {dayjs(selectedDate).format("YYYY년 M월 D일")} 일정
          </button>
        )}
        <button
          onClick={() => {
            onTogglePast();
            onClose();
          }}
          className={`block w-full text-left px-4 py-2 text-sm ${showPastEvents ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          지난 일정 {showPastEvents ? "숨기기" : "보기"}
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
