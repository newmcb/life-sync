import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { SecretItem } from "@/src/views/secret/model/SecretModel";

const STORAGE_KEY = "userSecret";

export function useSecret() {
  // 여기서 한 번만 로컬스토리지 읽고, setItems 시마다 곧바로 저장됩니다
  const [items, setItems] = useLocalStorage<SecretItem[]>("secretItems", []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
      return;
    }

    fetch("/api/guest")
      .then((res) => res.json())
      .then(({ secret: sample }) => {
        setItems(sample);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
      })
      .catch(() => {
        // 실패해도 빈 배열
        setItems([]);
      });
  }, []);

  const addItem = useCallback(
    (item: SecretItem) => {
      setItems((prev) => [...prev, item]);
    },
    [setItems],
  );

  const updateItem = useCallback(
    (item: SecretItem) => {
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id
            ? { ...item, updatedAt: new Date().toISOString() }
            : it,
        ),
      );
    },
    [setItems],
  );

  const deleteItem = useCallback(
    (id: string) => {
      // 하위 폴더까지 재귀 삭제
      const deepDelete = (list: SecretItem[]): SecretItem[] => {
        return list
          .filter((it) => it.id !== id)
          .flatMap(
            (it) => (it.parentId === id ? [] : it), // 자식도 제거
          );
      };
      setItems((prev) => deepDelete(prev));
    },
    [setItems],
  );

  return { items, addItem, updateItem, deleteItem };
}
