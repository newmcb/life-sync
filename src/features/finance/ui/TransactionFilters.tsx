"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import BaseInput from "@/src/shared/ui/Input";

interface Filters {
  type: "all" | "income" | "expense";
  category: string;
  startDate: string;
  endDate: string;
}

interface TransactionFiltersProps {
  categories: string[];
  onFilterChange: (filters: Filters) => void;
}

export default function TransactionFilters({
  categories,
  onFilterChange,
}: TransactionFiltersProps) {
  const getCurrentMonthDates = () => {
    const now = dayjs();
    return {
      startDate: now.startOf("month").format("YYYY-MM-DD"),
      endDate: now.endOf("month").format("YYYY-MM-DD"),
    };
  };

  const { startDate: defaultStartDate, endDate: defaultEndDate } =
    getCurrentMonthDates();

  const [type, setType] = useState<"all" | "income" | "expense">("all");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleFilterChange = () => {
    onFilterChange({
      type,
      category,
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    handleFilterChange();
  }, [type, category, startDate, endDate]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">거래 필터</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            거래 유형
          </label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as "all" | "income" | "expense");
            }}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
          >
            <option value="all">전체</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            카테고리
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
          >
            <option value="">전체</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            시작일
          </label>
          <BaseInput
            type="date"
            max={"9999-12-31"}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            종료일
          </label>
          <BaseInput
            type="date"
            max={"9999-12-31"}
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
