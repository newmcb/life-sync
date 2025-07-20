"use client";

import { useState } from "react";
import BaseInput from "@/src/shared/ui/Input";
import { Transaction } from "@/src/views/finance/model/FinanceModel";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditForm(transaction);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = (transaction: Transaction) => {
    onDeleteTransaction(transaction.id);
    setEditingId(null);
    setEditForm(null);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">거래 내역</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            거래 내역이 없습니다.
          </p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              {editingId === transaction.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editForm) {
                      handleSave(editForm);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        금액
                      </label>
                      <BaseInput
                        type="number"
                        value={Math.abs(editForm?.amount || 0)}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev!,
                            amount:
                              (prev?.amount || 0) > 0
                                ? Math.abs(Number(e.target.value))
                                : -Math.abs(Number(e.target.value)),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        카테고리
                      </label>
                      <BaseInput
                        type="text"
                        value={editForm?.category || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev!,
                            category: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        날짜
                      </label>
                      <BaseInput
                        type="date"
                        max={"9999-12-31"}
                        value={editForm?.date || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev!,
                            date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                      </label>
                      <BaseInput
                        type="text"
                        value={editForm?.description || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev!,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={`text-lg font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatAmount(transaction.amount)}
                    </p>
                    <p className="text-gray-600 font-medium">
                      {transaction.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                    {transaction.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {transaction.description}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
