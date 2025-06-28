import React, { FC, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { SecretItem } from "@/src/views/secret/model/SecretModel";

interface SecretEditorProps {
  selectedItem: SecretItem | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editorContent: string;
  // handleEditorChange: (content: string) => void;
  updateItem: (item: SecretItem) => void;
  editorKey: number;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<SecretItem | null>>;
}

const SecretEditor: FC<SecretEditorProps> = ({
  selectedItem,
  isEditing,
  setIsEditing,
  editorContent,
  // handleEditorChange,
  updateItem,
  editorKey,
  setEditorContent,
  setSelectedItem,
}) => {
  const [draftContent, setDraftContent] = useState<string>("");

  useEffect(() => {
    setDraftContent(editorContent);
  }, [editorKey, editorContent]);

  if (!selectedItem || selectedItem.type !== "memo") {
    return (
      <div className="md:col-span-3 bg-white rounded-lg shadow p-4 md:p-6 order-1 md:order-2 flex flex-col items-center justify-center h-[50vh] md:h-[calc(100vh-300px)] text-gray-500">
        <p className="text-lg">메모를 선택하거나 새로 만들어보세요</p>
      </div>
    );
  }

  const handleSave = () => {
    const updatedItem = { ...selectedItem, content: draftContent };
    updateItem(updatedItem);
    setEditorContent(draftContent);
    setSelectedItem(updatedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftContent(editorContent);
    setIsEditing(false);
  };

  return (
    <div className="md:col-span-3 bg-white rounded-lg shadow p-4 md:p-6 order-1 md:order-2 space-y-4">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={selectedItem.name}
            onChange={(e) => {
              const updatedItem = { ...selectedItem, name: e.target.value };
              updateItem(updatedItem);
            }}
            className="text-xl md:text-2xl font-bold w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <h2 className="text-xl md:text-2xl font-bold">{selectedItem.name}</h2>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-gray-400 hover:text-indigo-500"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="text-xs md:text-sm text-gray-500">
        마지막 수정: {new Date(selectedItem.updatedAt).toLocaleString()}
      </div>
      {isEditing ? (
        <>
          <div className="h-[50vh] md:h-[calc(100vh-400px)]">
            <Editor
              key={editorKey}
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={draftContent}
              onEditorChange={(content) => setDraftContent(content)}
              init={{
                height: "100%",
                menubar: false,
                plugins: ["advlist", "lists", "table", "wordcount"],
                toolbar:
                  "blocks | bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                statusbar: false,
                min_height: 300,
                max_height: 500,
                toolbar_mode: "wrap",
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md bg-gray-200 text-sm hover:bg-gray-300"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              저장
            </button>
          </div>
        </>
      ) : (
        <div
          className="prose max-w-none h-[50vh] md:h-[calc(100vh-400px)] overflow-y-auto p-4 border border-gray-300 rounded-md"
          dangerouslySetInnerHTML={{ __html: selectedItem.content || "" }}
        />
      )}
    </div>
  );
};

export default SecretEditor;
