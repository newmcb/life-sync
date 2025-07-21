import { useEffect, useState, useCallback } from "react";
import { Todo } from "@/src/features/todo/model/TodoType";

const STORAGE_KEY = "userTodos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 1) 초기 로드: 로컬스토리지 → 없으면 샘플(API) → 로컬스토리지 저장
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTodos(JSON.parse(stored));
      return;
    }
    fetch("/api/guest")
      .then((res) => res.json())
      .then(({ todos: sample }) => {
        setTodos(sample);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
      })
      .catch(() => {
        // 실패해도 빈 배열
        setTodos([]);
      });
  }, []);

  // 2) 새 할 일 추가
  const addTodo = useCallback((todo: Todo) => {
    setTodos((prev) => {
      const next = [...prev, todo];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // 3) 할 일 업데이트
  const updateTodo = useCallback((updated: Todo) => {
    setTodos((prev) => {
      const next = prev.map((t) => (t.id === updated.id ? updated : t));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // 4) 할 일 삭제
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const next = prev.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { todos, addTodo, updateTodo, deleteTodo };
}
