"use client";

import React, { useState } from "react";

import { Filters, Transaction } from "@/src/views/finance/model/FinanceModel";
import {
  ExpenseChart,
  FinanceSummary,
  FloatingActionButton,
  TransactionFilters,
  TransactionFormModal,
  TransactionList,
} from "@/src/features/finance";

const FinanceView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFilterChange = (newFilters: Filters) => {
    console.log(">>> newFilters", newFilters);
    setFilters(newFilters);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      filters.type === "all" ||
      (filters.type === "income" && transaction.amount > 0) ||
      (filters.type === "expense" && transaction.amount < 0);

    const matchesCategory =
      !filters.category || transaction.category === filters.category;

    const transactionDate = new Date(transaction.date);
    const matchesDateRange =
      (!filters.startDate || transactionDate >= new Date(filters.startDate)) &&
      (!filters.endDate || transactionDate <= new Date(filters.endDate));

    return matchesType && matchesCategory && matchesDateRange;
  });

  const categories = Array.from(
    new Set(transactions.map((t) => t.category)),
  ).sort();

  console.log(">>>> view transactions", transactions);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">재무 관리</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <FinanceSummary transactions={transactions} />
        <ExpenseChart transactions={transactions} />
      </div>

      <hr className="border-t border-gray-300 my-4" />

      <div className="mb-8">
        <TransactionFilters
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="mb-8">
        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default FinanceView;
