import React, { FC, useEffect } from "react";
import {
  CATEGORY_INCOME,
  CATEGORY_EXPENSE,
} from "@/src/features/calendar/model/CalendarModel";

interface CalendarDayInfoProps {
  data: {
    section1: string;
    amount: number;
  }[];
}

const CalendarDayInfo: FC<CalendarDayInfoProps> = ({ data }) => {
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  const calculateTotals = () => {
    const spendTotal = data
      .filter((item) => CATEGORY_EXPENSE[item.section1])
      .reduce((sum, item) => sum + item.amount, 0);

    const savingTotal = data
      .filter((item) => CATEGORY_INCOME[item.section1])
      .reduce((sum, item) => sum + item.amount, 0);

    return { spendTotal, savingTotal };
  };

  const { spendTotal, savingTotal } = calculateTotals();

  return (
    <div className="flex flex-col items-center">
      {savingTotal > 0 && (
        <div className="text-red-500">+{savingTotal.toLocaleString()}</div>
      )}
      {spendTotal > 0 && (
        <div className="text-blue-500">-{spendTotal.toLocaleString()}</div>
      )}
    </div>
  );
};

export default CalendarDayInfo;
