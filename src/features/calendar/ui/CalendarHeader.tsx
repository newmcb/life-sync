import React, { FC } from "react";
import dayjs from "dayjs";
import Button from "@/src/shared/ui/Button";

interface CalendarProps {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  day?: string;
}

const CalendarHeader: FC<CalendarProps> = ({ type, setType, day }) => {
  const handleAdd = () => {
    setType(type === "add" ? "list" : "add");
  };

  const handleChart = () => {
    setType(type === "chart" ? "list" : "chart");
  };

  return (
    <div className="relative flex items-center justify-between h-12 px-4 bg-white border-b border-gray-200 shadow-sm">
      {/* 날짜 */}
      <h4 className="font-semibold text-lg text-gray-800">
        {day ? dayjs(day).format("YYYY년 MM월 DD일") : "날짜를 선택하세요"}
      </h4>

      <div className={"flex gap-4"}>
        <Button
          color={"green"}
          onClick={handleChart}
          text={type === "chart" ? "리스트 보기" : "그래프 보기"}
        />
        <Button
          color={type === "add" ? "red" : "blue"}
          onClick={handleAdd}
          text={type === "add" ? "리스트보기" : "등록"}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
