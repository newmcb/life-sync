import React from "react";
import { SecretItem } from "@/src/views/secret/model/SecretModel";
import {
  FolderIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface SecretListProps {
  items: SecretItem[];
  selectedItem: SecretItem | null;
  deleteItem: (id: string) => void;
  navigateToFolder: (id: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSelectMemo: (item: SecretItem) => void;
}

const SecretList: React.FC<SecretListProps> = ({
  items,
  selectedItem,
  deleteItem,
  navigateToFolder,
  searchQuery,
  setSearchQuery,
  onSelectMemo,
}) => {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="md:col-span-1 bg-white rounded-lg shadow p-4 order-2 md:order-1">
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="space-y-2 max-h-[300px] md:max-h-none overflow-y-auto">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              item.type === "folder"
                ? navigateToFolder(item.id)
                : onSelectMemo(item);
            }}
            className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
              selectedItem?.id === item.id
                ? "bg-indigo-50 text-indigo-700"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              {item.type === "folder" ? (
                <FolderIcon className="h-5 w-5 mr-2" />
              ) : (
                <DocumentIcon className="h-5 w-5 mr-2" />
              )}
              <span className="truncate">{item.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretList;
