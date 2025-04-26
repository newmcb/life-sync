// 일정 타입
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
  color: string;
}

// 색상 옵션
export const colorOptions = [
  { name: "파란색", value: "bg-blue-500" },
  { name: "빨간색", value: "bg-red-500" },
  { name: "초록색", value: "bg-green-500" },
  { name: "노란색", value: "bg-yellow-500" },
  { name: "보라색", value: "bg-purple-500" },
  { name: "분홍색", value: "bg-pink-500" },
];
