"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TransactionForm } from "@/src/features/finance";

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: {
    amount: number;
    category: string;
    date: string;
    description: string;
  }) => void;
}

export default function TransactionFormModal({
  isOpen,
  onClose,
  onAddTransaction,
}: TransactionFormModalProps) {
  if (!isOpen) return null;

  const handleAddTransaction = (transaction: {
    amount: number;
    category: string;
    date: string;
    description: string;
  }) => {
    onAddTransaction(transaction);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">새 거래 추가</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="닫기"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
