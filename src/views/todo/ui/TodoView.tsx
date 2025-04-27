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
  Todo,
  TodoType,
} from "@/src/features/todo/model/TodoType";

// dayjs 한국어 로케일 설정
dayjs.locale("ko");

const DEFAULT_FORM = {
  title: "",
  dueDate: "",
  priority: "medium",
  category: "",
};

const TodoView = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<TodoType>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // 인증 확인

  // 할일 추가/수정 폼 열기
  const openTodoForm = (todo?: Todo) => {
    if (todo) {
      setSelectedTodo(todo);
      setFormData({
        title: todo.title,
        dueDate: todo.dueDate ? dayjs(todo.dueDate).format("YYYY-MM-DD") : "",
        priority: todo.priority,
        category: todo.category || "",
      });
    } else {
      setSelectedTodo(null);
      setFormData({
        title: "",
        dueDate: "",
        priority: "medium",
        category: "",
      });
    }
    setShowTodoForm(true);
  };

  // 할일 저장
  const handleSave = (todo: Todo) => {
    if (todo.id) {
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
    } else {
      const newTodo: Todo = {
        ...todo,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setTodos((prev) => [...prev, newTodo]);
    }
    setShowTodoForm(false);
  };

  // 할일 삭제
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 할일 완료 상태 토글
  const toggleTodoComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // 필터링된 할일 목록 가져오기
  const filteredTodos = todos.filter((todo) => {
    // 완료 상태 필터링
    if (filterType === "active" && todo.completed) return false;
    if (filterType === "completed" && !todo.completed) return false;

    // 우선순위 필터링
    if (priorityFilter !== "all" && todo.priority !== priorityFilter)
      return false;

    // 카테고리 필터링
    if (categoryFilter !== "all" && todo.category !== categoryFilter)
      return false;

    return true;
  });

  // 필터 메뉴 토글 핸들러
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  // 현재 필터 상태에 따른 제목 가져오기
  const getFilterTitle = () => {
    let title = "";

    if (filterType === "all") title = "전체 할일";
    else if (filterType === "active") title = "진행 중인 할일";
    else if (filterType === "completed") title = "완료된 할일";

    if (priorityFilter !== "all") {
      const priority = PRIORITY_OPTIONS.find((p) => p.value === priorityFilter);
      title += ` (${priority?.name || ""} 우선순위)`;
    }

    if (categoryFilter !== "all") {
      title += ` (${categoryFilter} 카테고리)`;
    }

    return title;
  };

  if (status === "loading") {
    return <PageLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TodoHeader
        onAdd={() => {
          openTodoForm();
        }}
      />

      {/* 필터 표시 (모바일/데스크톱 공통) */}
      <div className="mb-4 p-2 bg-indigo-50 rounded-md">
        <div className="flex items-center justify-between">
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
      </div>

      {/* 필터 메뉴 드롭다운 */}
      <FilterMenu
        visible={showFilterMenu}
        filterType={filterType}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        onFilterChange={{ setFilterType, setPriorityFilter, setCategoryFilter }}
        onClose={() => {
          setShowFilterMenu(false);
        }}
      />

      {/* 할일 목록 */}
      <TodoList
        filteredTodos={filteredTodos}
        onToggle={(id) => {
          toggleTodoComplete(id);
        }}
        onEdit={(todo) => {
          openTodoForm(todo);
        }}
        onDelete={(todoId) => {
          deleteTodo(todoId);
        }}
      />

      <TodoForm
        visible={showTodoForm}
        todo={selectedTodo!}
        onSave={handleSave}
        onClose={() => {
          setShowTodoForm(false);
        }}
      />
    </div>
  );
};

export default TodoView;
