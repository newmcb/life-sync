import React, {FC, useEffect, useState} from 'react';
import Calendar from "react-calendar";
import dayjs from "dayjs";
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface CalendarUiProps {
  setSelectDay: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CalendarUi:FC<CalendarUiProps> = ({setSelectDay}) => {
  const today = new Date();
  const [calendarValue, setCalendarValue] = useState<Value>(today);

  useEffect(() => {
    console.log('calendarValue', calendarValue);
    setSelectDay(String(calendarValue));
  }, [calendarValue]);

  return (
    <div className={'w-full px-5 max-w-5xl mx-auto box-border gap-24 flex'}>
      <Calendar
        value={calendarValue}
        onChange={setCalendarValue}
        formatDay={(_locale, date) => dayjs(date).format('D')}
        calendarType="gregory"
        locale={'ko'}
        prev2Label={null}
        next2Label={null}
        formatMonthYear={(_locale, date) => dayjs(date).format('YYYY.MM')}
        // tileContent={({ date }) => {
        //   if (
        //     testList.find((v) => v.day === dayjs(date).format('YYYY-MM-DD'))
        //   ) {
        //     return <CalendarDayInfo date={date} />;
        //   }
        // }}
      />
    </div>
  );
};

export default CalendarUi;
