import { Todo } from "@/src/features/todo/model/TodoType";
import { Transaction } from "@/src/views/finance/model/FinanceModel";

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
}

export const guestSchedule: ScheduleItem[] = [
  { id: "1", title: "환영 인사 미팅", time: "09:00" },
  { id: "2", title: "프로젝트 투어", time: "11:00" },
];

export const guestTodos: Todo[] = [
  {
    id: "1",
    title: "첫 할 일 만들어보기",
    completed: false,
    priority: "medium",
    category: "",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "샘플 데이터 확인하기",
    completed: true,
    priority: "medium",
    category: "",
    createdAt: new Date(),
  },
];

export const guestFinanceSummary: Transaction[] = [
  {
    id: "1",
    date: "2025-07-01",
    category: "월급",
    amount: 5000000,
  },
  {
    id: "2",
    date: "2025-07-05",
    category: "식비",
    amount: -450000,
  },
  {
    id: "3",
    date: "2025-07-10",
    category: "교통",
    amount: -150000,
  },
];
