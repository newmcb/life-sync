import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";

interface TodoHeaderProps {
  onAdd: () => void;
}

const TodoHeader: FC<TodoHeaderProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
        할일 관리
      </h1>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" />새 할일 추가
        </button>
      </div>
    </div>
  );
};

export default TodoHeader;
