import React, { FC, useEffect, useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import CalendarDayInfo from "@/src/entities/calendar/ui/CalendarDayInfo";
import {
  INCOME_DATA,
  EXPENSE_DATA,
} from "@/src/entities/calendar/model/CalendarModel";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface CalendarUiProps {
  setSelectDay: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CalendarUi: FC<CalendarUiProps> = ({ setSelectDay }) => {
  const today = new Date();
  const [calendarValue, setCalendarValue] = useState<Value>(today);

  const totalData = [...EXPENSE_DATA, ...INCOME_DATA];

  useEffect(() => {
    setSelectDay(String(calendarValue));
  }, [calendarValue]);

  const formatDay = (_locale?: string, date?: Date) => dayjs(date).format("D");

  const formatMonthYear = (_locale?: string, date?: Date) =>
    dayjs(date).format("YYYY.MM");

  const renderTileContent = ({ date }: { date: Date }) => {
    const data = totalData.filter(
      (entry) => entry.day === dayjs(date).format("YYYY-MM-DD"),
    );

    return (
      <div className="flex flex-col items-center justify-center h-full">
        {data.length > 0 && <CalendarDayInfo data={data} />}
      </div>
    );
  };

  return (
    <div className={"w-full px-5 max-w-5xl mx-auto box-border gap-24 flex"}>
      <Calendar
        value={calendarValue}
        onChange={setCalendarValue}
        formatDay={formatDay}
        calendarType="gregory"
        locale={"ko"}
        prev2Label={null}
        next2Label={null}
        formatMonthYear={formatMonthYear}
        tileContent={renderTileContent}
      />
    </div>
  );
};

export default CalendarUi;
