// src/hooks/useSecret.ts
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { SecretItem } from "@/src/views/secret/model/SecretModel";

export function useSecret() {
  // 여기서 한 번만 로컬스토리지 읽고, setItems 시마다 곧바로 저장됩니다
  const [items, setItems] = useLocalStorage<SecretItem[]>("secretItems", []);

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
