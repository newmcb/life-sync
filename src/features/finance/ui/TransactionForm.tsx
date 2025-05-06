"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    amount: number;
    category: string;
    date: string;
    description: string;
  }) => void;
}

export default function TransactionForm({
  onAddTransaction,
}: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // 수입 및 지출 카테고리 정의
  const incomeCategories = ["월급", "부수입", "투자수익", "기타"];
  const expenseCategories = [
    "식비",
    "교통비",
    "주거비",
    "통신비",
    "의료비",
    "교육비",
    "여가비",
    "기타",
  ];

  // 거래 유형이 변경될 때 카테고리 초기화
  useEffect(() => {
    setCategory("");
    setShowCustomCategory(false);
  }, [type]);

  // 카테고리 변경 시 '기타' 선택 여부 확인
  useEffect(() => {
    if (category === "기타") {
      setShowCustomCategory(true);
    } else {
      setShowCustomCategory(false);
      setCustomCategory("");
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    // '기타' 카테고리 선택 시 사용자 정의 카테고리 사용
    const finalCategory = category === "기타" ? customCategory : category;
    if (category === "기타" && !customCategory) return;

    onAddTransaction({
      amount: type === "income" ? numericAmount : -numericAmount,
      category: finalCategory,
      date,
      description,
    });

    // 폼 초기화
    setAmount("");
    setCategory("");
    setDate(dayjs().format("YYYY-MM-DD"));
    setDescription("");
    setType("expense");
    setCustomCategory("");
    setShowCustomCategory(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          거래 유형
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value as "expense")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">지출</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value as "income")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">수입</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          금액
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액을 입력하세요"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          카테고리
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
          required
        >
          <option value="">카테고리 선택</option>
          {type === "income"
            ? incomeCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))
            : expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
        </select>
      </div>

      {showCustomCategory && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            사용자 정의 카테고리
          </label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="카테고리를 입력하세요"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          날짜
        </label>
        <input
          type="date"
          max={"9999-12-31"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          설명
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        추가
      </button>
    </form>
  );
}
