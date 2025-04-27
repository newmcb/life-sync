import React, { FC, useState } from "react";
import {
  PRIORITY_OPTIONS,
  PriorityFilter,
  Todo,
} from "@/src/features/todo/model/TodoType";
import dayjs from "dayjs";

interface TodoFormProps {
  visible: boolean;
  todo: Todo;
  onSave: (todo: Todo) => void;
  onClose: () => void;
}

const categoryOptions = [
  "업무",
  "개인",
  "가족",
  "쇼핑",
  "건강",
  "학습",
  "기타",
];

const TodoForm: FC<TodoFormProps> = ({ visible, todo, onSave, onClose }) => {
  if (!visible) return null;

  const [formData, setFormData] = useState({
    title: todo?.title || "",
    dueDate: todo?.dueDate ? dayjs(todo.dueDate).format("YYYY-MM-DD") : "",
    priority: todo?.priority || "medium",
    category: todo?.category || "",
  });

  const handleSubmit = () => {
    onSave({
      id: todo?.id || "",
      title: formData.title,
      completed: todo?.completed || false,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      priority: formData.priority as "low" | "medium" | "high",
      category: formData.category || undefined,
      createdAt: todo?.createdAt || new Date(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {todo ? "할일 수정" : "새 할일 추가"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="할일 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                마감일
              </label>
              <input
                type="date"
                max={"9999-12-31"}
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                우선순위
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRIORITY_OPTIONS.map((priority) => (
                  <button
                    key={priority.value}
                    onClick={() =>
                      setFormData({ ...formData, priority: priority.value })
                    }
                    className={`p-2 rounded-md ${
                      formData.priority === priority.value
                        ? `${priority.color} text-white`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {priority.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">카테고리 없음</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
