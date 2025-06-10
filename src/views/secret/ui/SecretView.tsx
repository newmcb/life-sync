"use client";

import { useState, useEffect } from "react";

import { SecretItem } from "@/src/views/secret/model/SecretModel";
import {
  SecretBreadcrumb,
  SecretEditor,
  SecretHeader,
  SecretList,
} from "@/src/features/secret";
import FloatingActionButton from "@/src/shared/ui/FloatingActionButton";
import SecretCreateModal from "../../../features/secret/ui/SecretCreateModal";

const SecretView = () => {
  // const { data: session } = useSession();
  const [items, setItems] = useState<SecretItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<SecretItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"folder" | "memo">("memo");
  const [editorContent, setEditorContent] = useState("");
  const [editorKey, setEditorKey] = useState(0);

  // 로컬 스토리지에서 아이템 불러오기
  useEffect(() => {
    const savedItems = localStorage.getItem("secretItems");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error("Failed to parse items:", error);
      }
    }
  }, []);

  // 아이템 저장하기
  useEffect(() => {
    localStorage.setItem("secretItems", JSON.stringify(items));
  }, [items]);

  // 선택된 아이템이 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (selectedItem?.type === "memo") {
      setEditorContent(selectedItem.content || "");
      setEditorKey((prevKey) => prevKey + 1);
    }
  }, [selectedItem]);

  const getCurrentFolderId = () => {
    return currentPath.length === 0
      ? null
      : currentPath[currentPath.length - 1];
  };

  const getCurrentItems = () => {
    const currentFolderId = getCurrentFolderId();
    return items.filter((item) => item.parentId === currentFolderId);
  };

  const handleCreateItem = () => {
    if (!newItemName.trim()) {
      alert("항목 이름을 입력해주세요.");
      return;
    }

    // 현재 폴더에 같은 이름의 항목이 있는지 확인
    const currentItems = getCurrentItems();
    const isDuplicate = currentItems.some(
      (item) => item.name.toLowerCase() === newItemName.trim().toLowerCase(),
    );

    if (isDuplicate) {
      alert("같은 이름의 항목이 이미 존재합니다.");
      return;
    }

    const newItem: SecretItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      type: newItemType,
      content: newItemType === "memo" ? "" : undefined,
      parentId: getCurrentFolderId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName("");
    setNewItemType("memo");
    setIsCreateModalOpen(false);

    if (newItemType === "memo") {
      setSelectedItem(newItem);
      setEditorContent("");
      setIsEditing(true);
      setEditorKey((prevKey) => prevKey + 1);
    }
  };

  const updateItem = (updatedItem: SecretItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id
          ? { ...updatedItem, updatedAt: new Date().toISOString() }
          : item,
      ),
    );
  };

  const deleteItem = (itemId: string) => {
    if (confirm("정말로 이 항목을 삭제하시겠습니까?")) {
      // 폴더인 경우 하위 항목도 모두 삭제
      const deleteItems = (id: string) => {
        const children = items.filter((item) => item.parentId === id);
        children.forEach((child) => deleteItems(child.id));
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      };
      deleteItems(itemId);
      if (selectedItem?.id === itemId) {
        setSelectedItem(null);
      }
    }
  };

  const navigateToFolder = (folderId: string) => {
    console.log(">>> navigateToFolder");
    setCurrentPath([...currentPath, folderId]);
    setSelectedItem(null);
  };

  // const navigateUp = () => {
  //   setCurrentPath(currentPath.slice(0, -1));
  //   setSelectedItem(null);
  // };

  // const filteredItems = getCurrentItems().filter((item) =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  // );
  //
  // // 에디터 내용 변경 시 아이템 업데이트
  // const handleEditorChange = (content: string) => {
  //   setEditorContent(content);
  //   if (selectedItem) {
  //     const updatedItem = { ...selectedItem, content };
  //     updateItem(updatedItem);
  //   }
  // };

  // 메모 선택 시 호출되는 함수
  const selectMemo = (item: SecretItem) => {
    setSelectedItem(item);
    setIsEditing(false);
    setEditorKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-8">
      <div className="max-w-7xl mx-auto">
        <SecretHeader />

        {/* 메인 컨텐츠 영역 */}
        <div style={{ display: isCreateModalOpen ? "none" : "block" }}>
          <SecretBreadcrumb
            items={items}
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
            setSelectedItem={setSelectedItem}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {/* 항목 목록 */}
            <SecretList
              items={getCurrentItems()}
              selectedItem={selectedItem}
              deleteItem={deleteItem}
              navigateToFolder={navigateToFolder}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectMemo={(item) => {
                selectMemo(item);
              }}
            />

            <SecretEditor
              selectedItem={selectedItem}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editorContent={editorContent}
              // handleEditorChange={handleEditorChange}
              updateItem={updateItem}
              editorKey={editorKey}
              setEditorContent={setEditorContent}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>

        <FloatingActionButton
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
        />

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
