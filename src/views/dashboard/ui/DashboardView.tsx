"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTodos } from "@/hooks/useTodos";
import Link from "next/link";
import { useCalendar } from "@/hooks/useCalendar";
import dayjs from "dayjs";
import { useFinance } from "@/hooks/useFinance";
const MotionLink = motion(Link);

const DashboardView = () => {
  const { todos } = useTodos();
  const { events } = useCalendar();
  const { transactions } = useFinance();

  const todayEvents = events
    .filter((e) => dayjs(e.date).isSame(dayjs(), "day"))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  const thisMonthTxs = transactions.filter((t) =>
    dayjs(t.date).isSame(dayjs(), "month"),
  );

  const income = thisMonthTxs
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = thisMonthTxs
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

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
          <MotionLink
            href={"/calendar"}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">오늘의 일정</h2>
            {todayEvents.length ? (
              <ul>
                {todayEvents.map((e) => (
                  <li key={e.id} className="mb-2">
                    <span className="font-medium">
                      {dayjs(e.date).format("HH:mm")}
                    </span>{" "}
                    – {e.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">오늘 예정된 일정이 없습니다.</p>
            )}
          </MotionLink>

          {/* 할 일 목록 */}
          <MotionLink
            href={"/todo"}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">할 일 목록</h2>
            {todos.length ? (
              <ul>
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center mb-3 space-x-3"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="flex-shrink-0"
                    />
                    <span
                      className={
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }
                    >
                      {todo.title}
                    </span>
                    {/* 우선순위 배지 (한국어) */}
                    <span
                      className={`ml-auto inline-block px-2 py-0.5 text-xs  rounded-full ${
                        todo.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : todo.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {todo.priority === "high"
                        ? "높음"
                        : todo.priority === "medium"
                          ? "중간"
                          : "낮음"}
                    </span>
                    {/* 카테고리 배지 */}
                    {todo.category && (
                      <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium text-gray-700 bg-indigo-100 rounded-full">
                        {todo.category}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">진행 중인 할 일이 없습니다.</p>
            )}
          </MotionLink>

          {/* 재무 요약 */}
          <MotionLink
            href={"/finance"}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">재무 요약</h2>
            <div className="space-y-2">
              <p className="text-gray-500 flex justify-between">
                <span>이번 달 수입:</span>
                <span className="font-medium text-gray-900">
                  ₩{income.toLocaleString("ko-KR")}
                </span>
              </p>
              <p className="text-gray-500 flex justify-between">
                <span>이번 달 지출:</span>
                <span className="font-medium text-gray-900">
                  ₩{expense.toLocaleString("ko-KR")}
                </span>
              </p>
              <p className="text-gray-500 flex justify-between">
                <span>순수입:</span>
                <span className="font-medium text-gray-900">
                  ₩{(income - expense).toLocaleString("ko-KR")}
                </span>
              </p>
            </div>
          </MotionLink>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardView;
