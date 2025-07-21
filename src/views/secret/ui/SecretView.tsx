"use client";

import React, { useState, useEffect } from "react";
import { SecretItem } from "@/src/views/secret/model/SecretModel";
import {
  SecretBreadcrumb,
  SecretEditor,
  SecretHeader,
  SecretList,
} from "@/src/features/secret";
import FloatingActionButton from "@/src/shared/ui/FloatingActionButton";
import SecretCreateModal from "@/src/features/secret/ui/SecretCreateModal";
import { useSecret } from "@/hooks/useSecret";

const SecretView = () => {
  const { items, addItem, updateItem, deleteItem } = useSecret();

  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<SecretItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"folder" | "memo">("memo");
  const [editorContent, setEditorContent] = useState("");
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (selectedItem?.type === "memo") {
      setEditorContent(selectedItem.content || "");
      setEditorKey((k) => k + 1);
    }
  }, [selectedItem]);

  const getCurrentFolderId = () =>
    currentPath.length ? currentPath[currentPath.length - 1] : null;
  const getCurrentItems = () => {
    const folderId = getCurrentFolderId();
    return items.filter((item) => item.parentId === folderId);
  };

  const handleCreateItem = () => {
    const name = newItemName.trim();
    if (!name) {
      alert("항목 이름을 입력해주세요.");
      return;
    }
    if (
      getCurrentItems().some(
        (it) => it.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert("같은 이름의 항목이 이미 존재합니다.");
      return;
    }
    const newItem: SecretItem = {
      id: Date.now().toString(),
      name,
      type: newItemType,
      content: newItemType === "memo" ? "" : undefined,
      parentId: getCurrentFolderId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addItem(newItem);
    setNewItemName("");
    setNewItemType("memo");
    setIsCreateModalOpen(false);

    if (newItem.type === "memo") {
      setSelectedItem(newItem);
      setEditorContent("");
      setIsEditing(true);
      setEditorKey((k) => k + 1);
    }
  };

  const handleUpdateItem = (it: SecretItem) => {
    updateItem(it);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("정말로 이 항목을 삭제하시겠습니까?")) {
      deleteItem(id);
      if (selectedItem?.id === id) setSelectedItem(null);
    }
  };

  const navigateToFolder = (fid: string) => {
    setCurrentPath((p) => [...p, fid]);
    setSelectedItem(null);
  };

  const selectMemo = (it: SecretItem) => {
    setSelectedItem(it);
    setIsEditing(false);
    setEditorKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-8">
      <div className="max-w-7xl mx-auto">
        <SecretHeader />

        {!isCreateModalOpen && (
          <>
            <SecretBreadcrumb
              items={items}
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
              setSelectedItem={setSelectedItem}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <SecretList
                items={getCurrentItems()}
                selectedItem={selectedItem}
                deleteItem={handleDeleteItem}
                navigateToFolder={navigateToFolder}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectMemo={selectMemo}
              />

              <SecretEditor
                selectedItem={selectedItem}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editorContent={editorContent}
                updateItem={handleUpdateItem}
                editorKey={editorKey}
                setEditorContent={setEditorContent}
                setSelectedItem={setSelectedItem}
              />
            </div>
          </>
        )}

        <FloatingActionButton onClick={() => setIsCreateModalOpen(true)} />

        <SecretCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          newItemName={newItemName}
          setNewItemName={setNewItemName}
          newItemType={newItemType}
          setNewItemType={setNewItemType}
          handleCreateItem={handleCreateItem}
        />
      </div>
    </div>
  );
};

export default SecretView;
