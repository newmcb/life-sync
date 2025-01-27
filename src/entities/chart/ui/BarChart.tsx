import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {CATEGORY_SAVING} from "@/src/features/calendar/model/CalendarModel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart: React.FC = () => {

  const category = CATEGORY_SAVING['수입'];


  const data = {
    labels: category,
    datasets: [
      {
        label: 'Dataset 1',
        data: [30000, 10000, 0, 0], // 금액 데이터
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 100% 기준 값을 설정
  const maxValue = 500000; // 수동으로 100% 기준 값 설정

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y', // 가로형 막대 그래프
    layout:{
      padding:{
        top:20,
        bottom: 20,
        left: 20,
        right: 100,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // 범례 위치
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart with Fixed Labels',
      },
      datalabels: {
        align: 'end', // 데이터 라벨을 그래프의 끝에 정렬
        anchor: 'end', // 항상 우측 끝에 고정
        formatter: (value: number) => {
          const percentage = ((value / maxValue) * 100).toFixed(1); // 100% 기준 값 기반 퍼센트 계산
          return `${value.toLocaleString()} (${percentage}%)`; // 금액과 퍼센트 표시
        },
        clip: false, // 라벨이 그래프 영역 밖으로 넘어갈 수 있도록 허용
        color: '#000', // 라벨 색상
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
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
