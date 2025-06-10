"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useBudgetStore } from "@/src/views/finance/model/store/budgetStore";

export default function BudgetPage() {
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgetStore();
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: 0,
  });

  // 매월 1일에 예산 초기화
  useEffect(() => {
    const now = new Date();
    if (now.getDate() === 1) {
      useBudgetStore.getState().resetMonthlyBudgets();
    }
  }, []);

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount > 0) {
      addBudget(newBudget);
      setNewBudget({ category: "", amount: 0 });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">예산 설정</h1>

        {/* 새 예산 추가 폼 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">새 예산 추가</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="카테고리"
              value={newBudget.category}
              onChange={(e) =>
                setNewBudget({ ...newBudget, category: e.target.value })
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="금액"
              value={newBudget.amount || ""}
              onChange={(e) =>
                setNewBudget({ ...newBudget, amount: Number(e.target.value) })
              }
              className="w-32 p-2 border rounded"
            />
            <button
              onClick={handleAddBudget}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              추가
            </button>
          </div>
        </div>

        {/* 예산 목록 */}
        <div className="space-y-4">
          {budgets.map((budget, index) => (
            <motion.div
              key={budget.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{budget.category}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteBudget(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">예산</span>
                    <input
                      type="number"
                      value={budget.amount}
                      onChange={(e) =>
                        updateBudget(index, Number(e.target.value))
                      }
                      className="w-32 p-1 border rounded text-right"
                    />
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">지출</span>
                    <span>₩{budget.spent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {Math.round((budget.spent / budget.amount) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                      }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        budget.spent > budget.amount
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
