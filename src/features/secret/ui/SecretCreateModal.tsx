import React, { FC } from "react";
import {
  DocumentIcon,
  FolderIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SecretCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  newItemName: string;
  setNewItemName: (v: string) => void;
  newItemType: "folder" | "memo";
  setNewItemType: (v: "folder" | "memo") => void;
  handleCreateItem: () => void;
}

const SecretCreateModal: FC<SecretCreateModalProps> = ({
  isOpen,
  onClose,
  newItemName,
  setNewItemName,
  newItemType,
  setNewItemType,
  handleCreateItem,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">새 항목 만들기</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              항목 유형
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setNewItemType("folder")}
                className={`flex-1 py-2 px-4 rounded-md border ${newItemType === "folder" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <FolderIcon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">폴더</span>
              </button>
              <button
                onClick={() => setNewItemType("memo")}
                className={`flex-1 py-2 px-4 rounded-md border ${newItemType === "memo" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <DocumentIcon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">메모</span>
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이름
            </label>
            <input
              type="text"
              id="itemName"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateItem()}
              placeholder="항목 이름을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              취소
            </button>
            <button
              onClick={handleCreateItem}
              disabled={!newItemName.trim()}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${newItemName.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"}`}
            >
              만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SecretCreateModal;
