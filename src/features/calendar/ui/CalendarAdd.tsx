import React, { useState } from "react";
import { CATEGORY_SPEND } from "@/src/features/calendar/model/CalendarModel";
import Button from "@/src/shared/ui/Button";

const CalendarAdd = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [memo, setMemo] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleSubmit = () => {
    console.log({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      amount,
      paymentMethod,
      memo,
    });
    alert("등록되었습니다!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">장부 추가</h2>

      <form className="space-y-4">
        {/* 대분류 */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            대분류
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="" disabled>
              대분류를 선택하세요
            </option>
            {Object.keys(CATEGORY_SPEND).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 중분류 */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            중분류
          </label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            disabled={!selectedCategory}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="" disabled>
              중분류를 선택하세요
            </option>
            {selectedCategory &&
              CATEGORY_SPEND[selectedCategory].map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
          </select>
        </div>

        {/* 금액 */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            금액
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            placeholder="금액을 입력하세요"
          />
        </div>

        {/* 결제수단 */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            결제수단
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="" disabled>
              결제수단을 선택하세요
            </option>
            <option value="카드">카드</option>
            <option value="현금">현금</option>
            <option value="이체">이체</option>
          </select>
        </div>

        {/* 메모 */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            메모
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            placeholder="메모를 입력하세요"
          ></textarea>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end space-x-3">
          <Button
            text={"취소"}
            color={"gray"}
            onClick={() => {
              console.log("취소");
            }}
          />
          <Button text={"등록"} color={"blue"} onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default CalendarAdd;
