import React, { useCallback } from "react";
import { TEST_DATA } from "@/src/entities/calendar/model/CalendarModel";
import {
  CATEGORY_SAVING,
  CATEGORY_SPEND,
} from "@/src/features/calendar/model/CalendarModel";

const CalendarList: React.FC = () => {
  const getAmountColor = useCallback((section1: string) => {
    if (CATEGORY_SPEND[section1]) return "text-blue-500";
    if (CATEGORY_SAVING[section1]) return "text-red-500";
    return "text-gray-700";
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        사용 내역 리스트
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-blue-100">
            <tr className="text-left text-gray-600 font-medium">
              <th className="px-4 py-2 border-b">날짜</th>
              <th className="px-4 py-2 border-b">대분류</th>
              <th className="px-4 py-2 border-b">중분류</th>
              <th className="px-4 py-2 border-b">소분류</th>
              <th className="px-4 py-2 border-b">금액</th>
              <th className="px-4 py-2 border-b">메모</th>
            </tr>
          </thead>
          <tbody>
            {TEST_DATA.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-2 border-b text-gray-700">{item.day}</td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {item.section1}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {item.section2}
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {item.section3}
                </td>
                <td
                  className={`px-4 py-2 border-b font-semibold ${getAmountColor(item.section1)}`}
                >
                  {item.amount.toLocaleString()}원
                </td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {item.memo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarList;
