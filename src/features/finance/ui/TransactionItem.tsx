"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (id: string, updatedTransaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  const handleSave = () => {
    onEdit(transaction.id, editedTransaction);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTransaction(transaction);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("이 거래를 삭제하시겠습니까?")) {
      onDelete(transaction.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              금액
            </label>
            <input
              type="number"
              value={Math.abs(editedTransaction.amount)}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  amount:
                    editedTransaction.amount < 0
                      ? -Math.abs(Number(e.target.value))
                      : Math.abs(Number(e.target.value)),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <input
              type="text"
              value={editedTransaction.category}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  category: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <input
              type="text"
              value={editedTransaction.description}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-lg font-semibold ${
                  transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount >= 0 ? "+" : ""}
                {transaction.amount.toLocaleString()}원
              </span>
              <span className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{transaction.category}</span>
              <span className="text-gray-500 text-sm">
                {transaction.description}
              </span>
            </div>
          </div>
          <div className="flex justify-end mt-4 sm:mt-0 sm:ml-4 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
