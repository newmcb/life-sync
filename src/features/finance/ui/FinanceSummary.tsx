"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import { Transaction } from "@/src/views/finance/model/FinanceModel";

interface FinanceSummaryProps {
  transactions: Transaction[];
}

export default function FinanceSummary({ transactions }: FinanceSummaryProps) {
  const summary = useMemo(() => {
    const now = dayjs();

    // 이번 달 거래만 필터링
    const monthlyTransactions = transactions.filter((t) =>
      dayjs(t.date).isSame(now, "month"),
    );

    // 총 수입
    const totalIncome = monthlyTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    // 총 지출
    const totalExpenses = monthlyTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // 순이익
    const netIncome = totalIncome - totalExpenses;

    // 카테고리별 지출 집계
    const categoryExpenses = monthlyTransactions
      .filter((t) => t.amount < 0)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + Math.abs(t.amount);
        return acc;
      }, {});

    // 가장 지출이 많은 카테고리
    const [topCategory, topAmount] =
      Object.entries(categoryExpenses).sort(([, a], [, b]) => b - a)[0] ?? [];

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      topExpenseCategory: topCategory
        ? { category: topCategory, amount: topAmount }
        : null,
    };
  }, [transactions]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">이번 달 재무 현황</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">총 수입</p>
          <p className="text-2xl font-bold text-green-600 overflow-hidden">
            {formatAmount(summary.totalIncome)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">총 지출</p>
          <p className="text-2xl font-bold text-red-600 overflow-hidden">
            {formatAmount(summary.totalExpenses)}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">순수입</p>
          <p
            className={`text-2xl font-bold ${
              summary.netIncome >= 0 ? "text-blue-600" : "text-red-600"
            } overflow-hidden`}
          >
            {formatAmount(summary.netIncome)}
          </p>
        </div>
      </div>
      {summary.topExpenseCategory && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">가장 큰 지출 카테고리</p>
          <p className="text-lg font-semibold">
            {summary.topExpenseCategory.category} (
            {formatAmount(summary.topExpenseCategory.amount)})
          </p>
        </div>
      )}
    </div>
  );
}
