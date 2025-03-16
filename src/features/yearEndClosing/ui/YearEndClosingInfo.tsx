"use client";

import React, { useCallback, useState } from "react";
import DonutChart from "@/src/entities/graph/ui/DonutChart";
import IncomeExpenseChart from "@/src/entities/graph/ui/IncomeExpenseChart";
import IncomeExpenseListChart from "@/src/entities/graph/ui/IncomeExpenseListChart";
import {
  EXPENSE_DATA_LIST,
  INCOME_DATA_LIST,
} from "@/src/features/yearEndClosing/model/YearEndClosingInfoModel";

const YearEndClosingInfo = () => {
  const [incomeData, setIncomeData] = useState(INCOME_DATA_LIST);

  const [selected, setSelected] = useState("income"); // 기본 선택값: "income"

  const handleIncomeExpenseToggle = useCallback(
    (value: "income" | "expense") => {
      setSelected(value);
      setIncomeData(value === "income" ? INCOME_DATA_LIST : EXPENSE_DATA_LIST);
    },
    [],
  );

  return (
    <React.Fragment>
      <div className="w-2/5 flex flex-col items-center h-full">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4 overflow-hidden">
          2025년 연간결산
        </h1>

        {/*TODO progress값 */}
        <div className={"items-center justify-center"}>
          <DonutChart progress={76} />
        </div>

        {/* 수입 vs 지출 버튼 */}
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-l-lg ${
              selected === "income" ? "opacity-100" : "opacity-40"
            }`}
            onClick={() => handleIncomeExpenseToggle("income")}
          >
            수입
          </button>
          <button
            className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-r-lg ${
              selected === "expense" ? "opacity-100" : "opacity-40"
            }`}
            onClick={() => handleIncomeExpenseToggle("expense")}
          >
            지출
          </button>
        </div>

        {/* 수입 및 지출 데이터 */}
        {/*TODO 전체 수입, 지출 값 db연결*/}
        <div className="p-4">
          <IncomeExpenseChart income={11355360} expense={7910100} />
        </div>
      </div>

      {/* 오른쪽 - 가로 막대 그래프 */}
      {/*TODO DATA DB 연결*/}
      <div className="w-3/5 flex flex-col justify-center pl-6">
        <IncomeExpenseListChart data={incomeData} />
      </div>
    </React.Fragment>
  );
};

export default YearEndClosingInfo;
