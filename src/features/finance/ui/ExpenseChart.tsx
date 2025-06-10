"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface ExpenseChartProps {
  transactions: Transaction[];
}

export default function ExpenseChart({ transactions }: ExpenseChartProps) {
  console.log(">>>>> transactions", transactions);

  const chartData = useMemo(() => {
    const now = dayjs();

    // 이번 달 거래만 필터링
    const monthlyTransactions = transactions.filter((t) =>
      dayjs(t.date).isSame(now, "month"),
    );

    // 카테고리별 수입 집계
    const incomeByCategory = monthlyTransactions
      .filter((t) => t.amount > 0)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + t.amount;
        return acc;
      }, {});

    // 카테고리별 지출 집계
    const expenseByCategory = monthlyTransactions
      .filter((t) => t.amount < 0)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const incomeCategories = Object.keys(incomeByCategory);
    const expenseCategories = Object.keys(expenseByCategory);

    const incomeData = incomeCategories.map((cat) => incomeByCategory[cat]);
    const expenseData = expenseCategories.map((cat) => expenseByCategory[cat]);

    const totalIncome = incomeData.reduce((sum, v) => sum + v, 0);
    const totalExpense = expenseData.reduce((sum, v) => sum + v, 0);

    const incomePercentages = incomeData.map((amt) =>
      totalIncome > 0 ? Math.round((amt / totalIncome) * 100) : 0,
    );
    const expensePercentages = expenseData.map((amt) =>
      totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0,
    );

    return {
      income: {
        labels: incomeCategories,
        datasets: [
          {
            label: "수입",
            data: incomeData,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      expense: {
        labels: expenseCategories,
        datasets: [
          {
            label: "지출",
            data: expenseData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 205, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(201, 203, 207, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(201, 203, 207, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      incomePercentages,
      expensePercentages,
    };
  }, [transactions]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const label = context.dataset.label || "";
            const value = context.raw as number;
            const percentage =
              context.dataset.label === "수입"
                ? chartData.incomePercentages[context.dataIndex]
                : chartData.expensePercentages[context.dataIndex];
            return `${label}: ${formatAmount(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">카테고리별 수입/지출</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
          데이터가 없습니다.
        </p>
      ) : (
        <div className="space-y-8">
          {chartData.income.labels.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">수입</h3>
              <div className="h-64">
                <Pie data={chartData.income} options={options} />
              </div>
            </div>
          )}

          {chartData.expense.labels.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">지출</h3>
              <div className="h-64">
                <Pie data={chartData.expense} options={options} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
