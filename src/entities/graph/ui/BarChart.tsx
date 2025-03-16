"use client";

import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

// 차트 데이터 타입 정의
interface ChartData {
  month: string;
  saving: number; // 첫 번째 바 차트 값
  spending: number; // 두 번째 바 차트 값
  lineValue: number; // 꺾은선 그래프 값
}

// 컴포넌트 Props 타입 정의
interface AnimatedGroupedBarLineChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
}

const AnimatedGroupedBarLineChart: FC<AnimatedGroupedBarLineChartProps> = ({
  data,
  width = 700,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 40, right: 40, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 기존 SVG 초기화 (재렌더링 방지)
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // X축 (월 단위)
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.2);

    // 하위 X축 (막대 그래프 2개 배치를 위한 서브 스케일)
    const subXScale = d3
      .scaleBand()
      .domain(["saving", "spending"]) // 2개의 막대
      .range([0, xScale.bandwidth()])
      .padding(0.1);

    // Y축 (금액 단위)
    const maxYValue =
      d3.max(data, (d) => Math.max(d.saving, d.spending, d.lineValue)) ?? 0;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxYValue])
      .range([innerHeight, 0]);

    // 차트 그룹 생성
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X축 추가
    chartGroup
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "12px");

    // Y축 추가
    chartGroup
      .append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll("text")
      .style("font-size", "12px");

    // ** 두 개의 막대 그래프 추가 (애니메이션 적용)**
    const barGroups = chartGroup
      .selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${xScale(d.month)}, 0)`);

    barGroups
      .selectAll("rect")
      .data((d) => [
        { key: "saving", value: d.saving, color: "#9333EA" },
        { key: "spending", value: d.spending, color: "#4F46E5" },
      ])
      .enter()
      .append("rect")
      .attr("x", (d) => subXScale(d.key)!)
      .attr("y", innerHeight) // 처음에는 아래에서 시작
      .attr("width", subXScale.bandwidth())
      .attr("height", 0) // 처음에는 높이 0
      .attr("fill", (d) => d.color)
      .transition()
      .duration(1000) // 애니메이션 지속 시간 (1초)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => innerHeight - yScale(d.value));

    // ** 꺾은선 그래프 추가 (막대 그래프 위로 배치)**
    const line = d3
      .line<ChartData>()
      .x((d) => xScale(d.month)! + xScale.bandwidth() / 2)
      .y((d) => yScale(d.lineValue))
      .curve(d3.curveMonotoneX); // 부드러운 곡선

    const path = chartGroup
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);

    // 애니메이션 효과: 선이 그려지는 효과
    const totalLength = (path.node() as SVGPathElement).getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // ** 꺾은선 그래프 포인트 추가 (막대 그래프 위에 배치)**
    chartGroup
      .selectAll(".line-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "line-point")
      .attr("cx", (d) => xScale(d.month)! + xScale.bandwidth() / 2)
      .attr("cy", innerHeight) // 처음에는 아래에서 시작
      .attr("r", 0) // 처음에는 반지름 0
      .attr("fill", "red")
      .transition()
      .delay((_, i) => i * 100) // 각 점마다 순차적으로 애니메이션 실행
      .duration(800)
      .attr("cy", (d) => yScale(d.lineValue))
      .attr("r", 4);

    // ✅ **범례(Legend) 추가**
    // const legendGroup = svg
    //   .append("g")
    //   .attr("transform", `translate(${width - 160}, 20)`); // 우측 상단 배치

    const legendData = [
      { label: "수입", color: "#9333EA" },
      { label: "지출", color: "#4F46E5" },
      { label: "저축률", color: "red" },
    ];

    const legendWidth = legendData.length * 100; // 각 항목 100px 간격
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(${(width - legendWidth) / 2}, 10)`); // ✅ 중앙 정렬

    legendGroup
      .selectAll(".legend")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (_, i) => `translate(${i * 100}, 0)`) // ✅ 가로 정렬
      .each(function (d) {
        const g = d3.select(this);
        g.append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", d.color);
        g.append("text")
          .attr("x", 18)
          .attr("y", 10)
          .attr("font-size", "12px")
          .text(d.label);
      });
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default AnimatedGroupedBarLineChart;
