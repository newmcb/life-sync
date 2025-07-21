"use client";

import React, { useState } from "react";
import type {
  Transaction,
  Filters,
} from "@/src/views/finance/model/FinanceModel";
import { useFinance } from "@/hooks/useFinance";
import {
  ExpenseChart,
  FinanceSummary,
  TransactionFilters,
  TransactionFormModal,
  TransactionList,
} from "@/src/features/finance";
import FloatingActionButton from "@/src/shared/ui/FloatingActionButton";

const FinanceView = () => {
  const { transactions, addTransaction, deleteTransaction } = useFinance();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    category: "",
    startDate: "",
    endDate: "",
  });

  // 새 거래 추가 핸들러
  const handleAddTransaction = (t: Omit<Transaction, "id">) => {
    addTransaction(t);
    setIsModalOpen(false);
  };

  // 거래 삭제 핸들러
  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // 필터 적용된 거래 목록 계산
  const filteredTransactions = transactions.filter((tx) => {
    const matchesType =
      filters.type === "all" ||
      (filters.type === "income" && tx.amount > 0) ||
      (filters.type === "expense" && tx.amount < 0);

    const matchesCategory =
      !filters.category || tx.category === filters.category;

    const txDate = new Date(tx.date);
    const matchesDateRange =
      (!filters.startDate || txDate >= new Date(filters.startDate)) &&
      (!filters.endDate || txDate <= new Date(filters.endDate));

    return matchesType && matchesCategory && matchesDateRange;
  });

  // 필터용 카테고리 목록
  const categories = Array.from(
    new Set(transactions.map((t) => t.category)),
  ).sort();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">재무 관리</h1>

      {/* 요약과 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <FinanceSummary transactions={transactions} />
        <ExpenseChart transactions={transactions} />
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* 필터 */}
      <div className="mb-8">
        <TransactionFilters
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* 거래 목록 */}
      <div className="mb-8">
        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>

      {/* 새 거래 추가 버튼 */}
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      {/* 거래 입력 모달 */}
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default FinanceView;
