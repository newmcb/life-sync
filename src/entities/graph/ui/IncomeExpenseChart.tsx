"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface IncomeExpenseChartProps {
  income: number;
  expense: number;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({
  income,
  expense,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // 기존 요소 삭제 후 다시 그리기

    const width = 320; // SVG 너비
    // const height = 100; // SVG 높이
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const maxValue = Math.max(income, expense);

    const xScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, width - margin.left - margin.right]);

    const defs = svg.append("defs");

    // 수입과 지출 바 너비 설정
    const incomeWidth = xScale(income);
    const expenseWidth = xScale(expense);

    // 수입 바의 그라디언트
    const incomeGradient = defs
      .append("linearGradient")
      .attr("id", "incomeGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    incomeGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#4F46E5"); // Indigo
    incomeGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#9333EA"); // Purple

    // 지출 바의 그라디언트 (회색 → 빨강)
    const expenseGradient = defs
      .append("linearGradient")
      .attr("id", "expenseGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    expenseGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#9333EA");
    expenseGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#bdb4fe");

    // 수입 바
    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", 30)
      .attr("width", 0) // 애니메이션 시작 시 0에서 시작
      .attr("height", 10)
      .attr("fill", "url(#incomeGradient)")
      .transition()
      .duration(1000)
      .attr("width", incomeWidth);

    // 지출 바
    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", 75)
      .attr("width", 0) // 애니메이션 시작 시 0에서 시작
      .attr("height", 10)
      .attr("fill", "url(#expenseGradient)")
      .transition()
      .duration(1000)
      .attr("width", expenseWidth);

    // 수입 텍스트
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", 25)
      .attr("font-size", "14px")
      .attr("fill", "#4F46E5")
      .attr("font-weight", "bold")
      .text(`수입: ${income.toLocaleString()}`);

    // 지출 텍스트
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", 70)
      .attr("font-size", "14px")
      .attr("fill", "#9333EA")
      .attr("font-weight", "bold")
      .text(`지출: ${expense.toLocaleString()}`);
  }, [income, expense]);

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-md">
      <svg ref={chartRef} width="100%" height="100"></svg>
    </div>
  );
};

export default IncomeExpenseChart;
