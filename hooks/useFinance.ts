import { useEffect, useState, useCallback } from "react";
import type { Transaction } from "@/src/views/finance/model/FinanceModel";
import dayjs from "dayjs";

const STORAGE_KEY = "userTransactions";

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored) as Transaction[]);
      return;
    }
    fetch("/api/guest")
      .then((res) => res.json())
      .then(({ finance: sample }) => {
        const newData = sample.map(
          (data: { id: string; date: string; amount: number }) => {
            return {
              ...data,
              date: dayjs().startOf("month").format("YYYY-MM-DD"),
            };
          },
        );

        setTransactions(newData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      })
      .catch(() => {
        // 실패해도 빈 배열
        setTransactions([]);
      });
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    const newT: Transaction = {
      ...t,
      id: Date.now().toString(),
    };
    setTransactions((prev) => {
      const next = [...prev, newT];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => {
      const next = prev.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { transactions, addTransaction, deleteTransaction };
}
