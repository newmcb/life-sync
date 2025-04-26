"use client";

import React from "react";
import { motion } from "framer-motion";

const DashboardView = () => {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">대시보드</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 오늘의 일정 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">오늘의 일정</h2>
            <p className="text-gray-500">오늘 예정된 일정이 없습니다.</p>
          </div>

          {/* 할 일 목록 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">할 일 목록</h2>
            <p className="text-gray-500">진행 중인 할 일이 없습니다.</p>
          </div>

          {/* 재무 요약 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">재무 요약</h2>
            <p className="text-gray-500">이번 달 수입: ₩0</p>
            <p className="text-gray-500">이번 달 지출: ₩0</p>
            <p className="text-gray-500">순수입: ₩0</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardView;
