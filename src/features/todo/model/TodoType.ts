export type TodoType = "all" | "active" | "completed";
export type PriorityFilter = "all" | "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  category?: string;
  createdAt: Date;
}

export const PRIORITY_OPTIONS: {
  name: string;
  value: Exclude<PriorityFilter, "all">;
  color: string;
}[] = [
  { name: "낮음", value: "low", color: "bg-green-500" },
  { name: "중간", value: "medium", color: "bg-yellow-500" },
  { name: "높음", value: "high", color: "bg-red-500" },
];
