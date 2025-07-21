"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import {
  FilterMenu,
  TodoForm,
  TodoHeader,
  TodoList,
} from "@/src/features/todo";
import { PageLoading } from "@/src/widgets/common";
import {
  PRIORITY_OPTIONS,
  PriorityFilter,
  TodoType,
  Todo,
} from "@/src/features/todo/model/TodoType";
import { useTodos } from "@/hooks/useTodos";

// dayjs 한국어 로케일 설정
dayjs.locale("ko");

const TodoView = () => {
  const { status } = useSession();
  const router = useRouter();
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<TodoType>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // 인증 확인
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // 폼 열기
  const openTodoForm = (todo?: Todo) => {
    setSelectedTodo(todo ?? null);
    setShowTodoForm(true);
  };

  // 저장
  const handleSave = (todo: Todo) => {
    if (todo.id) {
      updateTodo(todo);
    } else {
      addTodo({
        ...todo,
        id: Date.now().toString(),
        createdAt: new Date(),
      });
    }
    setShowTodoForm(false);
  };

  // 필터링
  const filteredTodos = todos.filter((todo) => {
    if (filterType === "active" && todo.completed) return false;
    if (filterType === "completed" && !todo.completed) return false;
    if (priorityFilter !== "all" && todo.priority !== priorityFilter)
      return false;
    if (categoryFilter !== "all" && todo.category !== categoryFilter)
      return false;
    return true;
  });

  const toggleFilterMenu = () => setShowFilterMenu((prev) => !prev);

  const getFilterTitle = () => {
    let title =
      filterType === "all"
        ? "전체 할일"
        : filterType === "active"
          ? "진행 중인 할일"
          : "완료된 할일";
    if (priorityFilter !== "all") {
      const p = PRIORITY_OPTIONS.find((p) => p.value === priorityFilter);
      title += ` (${p?.name} 우선순위)`;
    }
    if (categoryFilter !== "all") {
      title += ` (${categoryFilter} 카테고리)`;
    }
    return title;
  };

  const handleToggle = (id: string) => {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    updateTodo({ ...t, completed: !t.completed });
  };

  if (status === "loading") {
    return <PageLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TodoHeader onAdd={() => openTodoForm()} />

      <div className="mb-4 p-2 bg-indigo-50 rounded-md flex items-center justify-between">
        <span className="text-sm font-medium text-indigo-700">
          {getFilterTitle()}
        </span>
        <button
          onClick={toggleFilterMenu}
          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-md"
        >
          <FaEllipsisH />
        </button>
      </div>

      <FilterMenu
        visible={showFilterMenu}
        filterType={filterType}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        onFilterChange={{ setFilterType, setPriorityFilter, setCategoryFilter }}
        onClose={() => setShowFilterMenu(false)}
      />

      <TodoList
        filteredTodos={filteredTodos}
        onToggle={handleToggle}
        onEdit={openTodoForm}
        onDelete={(id) => deleteTodo(id)}
      />

      {showTodoForm && (
        <TodoForm
          todo={selectedTodo!}
          onSave={handleSave}
          onClose={() => setShowTodoForm(false)}
        />
      )}
    </div>
  );
};

export default TodoView;
