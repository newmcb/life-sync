"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DonutChart = ({ progress = 30 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 100;
    const height = 100;
    const radius = 40;
    const strokeWidth = 10;

    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference * (1 - progress / 100);

    // SVG 선택
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 SVG 내용 제거

    // 배경 원형
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", radius)
      .attr("fill", "transparent")
      .attr("stroke", "#E5E7EB") // text-gray-300
      .attr("stroke-width", strokeWidth);

    // 진행 원형 (애니메이션 추가)
    const progressCircle = svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", radius)
      .attr("fill", "transparent")
      .attr("stroke", "#6366F1") // text-indigo-500
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", circumference)
      .attr("stroke-dashoffset", circumference) // 시작 값 (100% 안 채워진 상태)
      .attr("transform", `rotate(-90 ${width / 2} ${height / 2})`);

    // 애니메이션 적용 (stroke-dashoffset 변경)
    progressCircle
      .transition()
      .duration(1000) // 1초 동안 애니메이션
      .ease(d3.easeCubicOut) // 부드러운 효과
      .attr("stroke-dashoffset", progressOffset);

    // 텍스트 (퍼센트 표시)
    const text = svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#4F46E5") // text-indigo-600
      .text("0%"); // 초기값

    // 텍스트 애니메이션 (숫자가 증가하도록)
    text
      .transition()
      .duration(1000)
      .tween("text", function () {
        const interpolate = d3.interpolateNumber(0, progress);
        return function (t) {
          d3.select(this).text(`${Math.round(interpolate(t))}%`);
        };
      });
  }, [progress]); // progress 값이 변경될 때마다 실행

  return (
    <div className="relative mt-6 mb-8">
      <svg ref={svgRef} width={100} height={100}></svg>
    </div>
  );
};

export default DonutChart;
