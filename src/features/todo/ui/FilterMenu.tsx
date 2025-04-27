import React, { FC } from "react";
import { TodoType, PriorityFilter } from "@/src/features/todo/model/TodoType";

interface FilterMenuProps {
  visible: boolean;
  filterType: TodoType;
  priorityFilter: PriorityFilter;
  categoryFilter: string;
  onFilterChange: {
    setFilterType: React.Dispatch<React.SetStateAction<TodoType>>;
    setPriorityFilter: React.Dispatch<React.SetStateAction<PriorityFilter>>;
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  };
  onClose: () => void;
}

const PRIORITY_LABELS: Record<PriorityFilter, string> = {
  all: "모든 우선순위",
  low: "낮음 우선순위",
  medium: "중간 우선순위",
  high: "높음 우선순위",
};

const PRIORITY_COLORS: Record<PriorityFilter, string> = {
  all: "bg-gray-300",
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const FilterMenu: FC<FilterMenuProps> = ({
  visible,
  filterType,
  priorityFilter,
  categoryFilter,
  onFilterChange,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
      <div className="py-1">
        {/* 상태 필터 */}
        <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
          상태 필터
        </div>
        {(["all", "active", "completed"] as TodoType[]).map((ft) => (
          <button
            key={ft}
            onClick={() => {
              onFilterChange.setFilterType(ft);
              onClose();
            }}
            className={`block w-full text-left px-4 py-2 text-sm ${
              filterType === ft
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {ft === "all"
              ? "전체 할일"
              : ft === "active"
                ? "진행 중인 할일"
                : "완료된 할일"}
          </button>
        ))}

        {/* 우선순위 필터 */}
        <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200 mt-2">
          우선순위 필터
        </div>
        {(["all", "low", "medium", "high"] as PriorityFilter[]).map((pf) => (
          <button
            key={pf}
            onClick={() => {
              onFilterChange.setPriorityFilter(pf);
              onClose();
            }}
            className={`block w-full text-left px-4 py-2 text-sm ${
              priorityFilter === pf
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${PRIORITY_COLORS[pf]}`}
            />
            {PRIORITY_LABELS[pf]}
          </button>
        ))}

        {/* 카테고리 필터 */}
        <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200 mt-2">
          카테고리 필터
        </div>
        {[
          "all",
          ...["업무", "개인", "가족", "쇼핑", "건강", "학습", "기타"],
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              onFilterChange.setCategoryFilter(cat);
              onClose();
            }}
            className={`block w-full text-left px-4 py-2 text-sm ${
              categoryFilter === cat
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat === "all" ? "모든 카테고리" : cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterMenu;
