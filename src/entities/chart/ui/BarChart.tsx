import React, { FC, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  DataItem,
  INCOME_DATA,
  SPEND_DATA,
} from "@/src/entities/calendar/model/CalendarModel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

interface BarChartProps {
  detailType?: "s" | "i"; //spending, income
}

const BarChart: FC<BarChartProps> = ({ detailType }) => {
  const [chartData, setChartData] = useState<DataItem[]>(SPEND_DATA);

  useEffect(() => {
    if (detailType) {
      detailType === "i" ? setChartData(INCOME_DATA) : setChartData(SPEND_DATA);
    }
  }, [detailType]);

  const groupedData = chartData.reduce(
    (acc, item) => {
      if (!acc[item.section1]) {
        acc[item.section1] = 0;
      }
      acc[item.section1] += item.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const labels = Object.keys(groupedData);
  const amounts = Object.values(groupedData);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "금액",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 100% 기준 값을 설정
  const totalAmount = amounts.reduce((sum, value) => sum + value, 0);

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // 가로형 막대 그래프
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 100,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top", // 범례 위치
      },
      title: {
        display: false,
        text: "",
      },
      datalabels: {
        align: "end", // 데이터 라벨을 그래프의 끝에 정렬
        anchor: "end", // 항상 우측 끝에 고정
        formatter: (value: number) => {
          const percentage = ((value / totalAmount) * 100).toFixed(1);
          return `${value.toLocaleString()} (${percentage}%)`;
        },
        clip: false, // 라벨이 그래프 영역 밖으로 넘어갈 수 있도록 허용
        color: "#000", // 라벨 색상
        font: {
          size: 12, // 폰트 크기
        },
      },
    },
    scales: {
      x: {
        display: false, // X축 숨기기
      },
      y: {
        ticks: {
          font: {
            size: 12, // Y축 라벨 폰트 크기
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
