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
    date: "",
    category: "월급",
    amount: 5000000,
  },
  {
    id: "2",
    date: "",
    category: "상여금",
    amount: 2000000,
  },
  {
    id: "3",
    date: "",
    category: "식비",
    amount: -500000,
  },
  {
    id: "4",
    date: "",
    category: "교통",
    amount: -150000,
  },
  {
    id: "5",
    date: "",
    category: "대출",
    amount: -2000000,
  },
];

export const guestSecret = [
  {
    id: "1755231598871",
    name: "개인",
    type: "folder",
    parentId: null,
    createdAt: "2025-08-15T04:19:58.871Z",
    updatedAt: "2025-08-15T04:19:58.871Z",
  },
  {
    id: "1755231606770",
    name: "업무",
    type: "folder",
    parentId: null,
    createdAt: "2025-08-15T04:20:06.770Z",
    updatedAt: "2025-08-15T04:20:06.771Z",
  },
  {
    id: "1755231965827",
    name: "읽어볼거리",
    type: "memo",
    content:
      "<p>React.memo</p>\n<p>https://imnotadevleoper.tistory.com/368</p>",
    parentId: "1755231598871",
    createdAt: "2025-08-15T04:26:05.827Z",
    updatedAt: "2025-08-15T04:26:54.360Z",
  },
  {
    id: "1755232133513",
    name: "언급된 목록",
    type: "memo",
    content:
      "<ol>\n<li>백엔드 언어변경 (node -&gt; java)</li>\n<li>마이크로 프론트엔드</li>\n</ol>",
    parentId: "1755231606770",
    createdAt: "2025-08-15T04:28:53.513Z",
    updatedAt: "2025-08-15T04:40:20.648Z",
  },
];
