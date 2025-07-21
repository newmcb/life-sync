import React, { FC } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { Todo } from "@/src/features/todo/model/TodoType";

interface TodoListProps {
  filteredTodos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityOptions = [
  { name: "낮음", value: "low", color: "bg-green-500" },
  { name: "중간", value: "medium", color: "bg-yellow-500" },
  { name: "높음", value: "high", color: "bg-red-500" },
];

const TodoList: FC<TodoListProps> = ({
  filteredTodos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          등록된 할일이 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo) => {
            const priority = priorityOptions.find(
              (p) => p.value === todo.priority,
            );
            return (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 ${
                  todo.completed ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center flex-1">
                  <div
                    onClick={() => onToggle(todo.id)}
                    className={`mr-3 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                      todo.completed
                        ? "bg-indigo-600"
                        : "bg-white border-2 border-gray-400"
                    }`}
                    role="button"
                    aria-label={todo.completed ? "완료 취소" : "완료 표시"}
                  >
                    {todo.completed && (
                      <FaCheck className="text-white text-xs" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium text-gray-800 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="flex items-center space-x-1 text-xs">
                        <span
                          className={`px-2 py-1 rounded-full ${priority?.color} bg-opacity-20 ${priority?.color.replace("bg-", "text-")}`}
                        >
                          {priority?.name}
                        </span>
                      </span>
                      {todo.category && (
                        <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                          {todo.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => onEdit(todo)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoList;
