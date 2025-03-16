import React from "react";
import BarChart from "@/src/entities/graph/ui/BarChart";

const GraphFeature = () => {
  const chartData = [
    { month: "1월", saving: 500, spending: 600, lineValue: 400 },
    { month: "2월", saving: 700, spending: 500, lineValue: 450 },
    { month: "3월", saving: 800, spending: 650, lineValue: 500 },
    { month: "4월", saving: 600, spending: 700, lineValue: 550 },
    { month: "5월", saving: 900, spending: 800, lineValue: 650 },
    { month: "6월", saving: 1100, spending: 1000, lineValue: 800 },
    { month: "7월", saving: 500, spending: 600, lineValue: 400 },
    { month: "8월", saving: 700, spending: 500, lineValue: 450 },
    { month: "9월", saving: 800, spending: 650, lineValue: 500 },
    { month: "10월", saving: 600, spending: 700, lineValue: 550 },
    { month: "11월", saving: 900, spending: 800, lineValue: 650 },
    { month: "12월", saving: 1100, spending: 1000, lineValue: 800 },
  ];

  return <BarChart data={chartData} width={700} height={400} />;
};

export default GraphFeature;
