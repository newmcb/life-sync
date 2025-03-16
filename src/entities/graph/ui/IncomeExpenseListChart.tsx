"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface IncomeItem {
  name: string;
  amount: number;
}

interface IncomeListChartProps {
  data: IncomeItem[];
}

const IncomeExpenseListChart: React.FC<IncomeListChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(300);

  useEffect(() => {
    if (!containerRef.current) return;

    // 부모 요소 크기에 맞춰 width 조정
    const updateWidth = () => {
      setChartWidth(containerRef.current?.clientWidth || 300);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // 기존 요소 삭제 후 다시 그리기

    const padding = 20;
    const height = data.length * 40 + padding * 2; // 데이터 개수에 따라 동적 높이 설정
    const maxAmount = d3.max(data, (d) => d.amount) || 1;

    const adjustedWidth = chartWidth - 140; // 차트 너비 조정

    svg.attr("width", chartWidth).attr("height", height);

    const xScale = d3
      .scaleLinear()
      .domain([0, maxAmount])
      .range([0, adjustedWidth * 0.8]);

    // 그룹 추가
    const group = svg
      .selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (_, i) => `translate(10, ${i * 40 + padding})`);

    // 텍스트 (수입명)
    group
      .append("text")
      .attr("x", 0)
      .attr("y", 15)
      .attr("fill", "#4B5563")
      .attr("font-size", "14px")
      .text((d) => d.name);

    // 배경 바
    group
      .append("rect")
      .attr("x", 90)
      .attr("y", 5)
      .attr("width", adjustedWidth)
      .attr("height", 12)
      .attr("fill", "#E5E7EB")
      .attr("rx", 5);

    // 수입 바 (실제 값)
    group
      .append("rect")
      .attr("x", 90)
      .attr("y", 5)
      .attr("width", 0)
      .attr("height", 12)
      .attr("fill", "url(#incomeGradient)")
      .attr("rx", 5)
      .transition()
      .duration(1000)
      .attr("width", (d) => xScale(d.amount));

    // 💡 숫자를 항상 차트의 가장 오른쪽 끝에 배치
    group
      .append("text")
      .attr("x", chartWidth - 40) // 항상 오른쪽 끝에 위치
      .attr("y", 15)
      .attr("fill", "#4B5563") // 가독성을 위한 색상
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("text-anchor", "end") // 오른쪽 정렬
      .text((d) => (d.amount > 0 ? d.amount.toLocaleString() : "-"));

    // 그라디언트 추가 (인디고 → 퍼플)
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "incomeGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#4F46E5");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#9333EA");
  }, [data, chartWidth]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default IncomeExpenseListChart;
