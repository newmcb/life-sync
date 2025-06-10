"use client";

import React, { FC, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import MemoList from "@/src/features/memo/ui/MemoList";
import MemoWrite from "@/src/features/memo/ui/MemoWrite";

export interface Post {
  id: number;
  name: string;
  type: string;
  accessLevel: string;
  date: string;
}

export const initialPosts: Post[] = [
  {
    id: 1,
    name: "study",
    type: "folder",
    accessLevel: "public",
    date: "2023-05-01",
  },
  {
    id: 2,
    name: "Tips for Using This Board",
    type: "text",
    accessLevel: "public",
    date: "2023-05-02",
  },
  {
    id: 3,
    name: "Stay Connected",
    type: "text",
    accessLevel: "public",
    date: "2023-05-03",
  },
  {
    id: 4,
    name: "Feature Requests",
    type: "text",
    accessLevel: "private",
    date: "2023-05-04",
  },
  {
    id: 5,
    name: "Bug Reports",
    type: "text",
    accessLevel: "public",
    date: "2023-05-05",
  },
];

interface MemoProps {
  mode: "view" | "write";
}

const Memo: FC<MemoProps> = ({ mode }) => {
  const router = useRouter();

  const [posts] = useState<Post[]>(initialPosts);
  // const [name, setName] = useState<string>('');
  //  const [accessLevel, setAccessLevel] = useState<string>('');

  const [directory] = useState<string[]>(["study"]);

  const handleWriteMemo = () => {
    router.push("memo/write");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className={"flex w-full justify-between"}>
          <div className={"text-xs text-gray-700 h-8 p-2"}>
            <span>home</span>
            {directory.map((dir, index) => (
              <span key={index}>
                <FaAngleRight className="inline mx-1 text-black" />
                {dir}
              </span>
            ))}
          </div>
          {mode === "view" && (
            <div className={"flex gap-2"}>
              <button>삭제</button>
              <button>수정</button>
              <button
                onClick={() => {
                  handleWriteMemo();
                }}
              >
                등록
              </button>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          {mode === "write" ? "신규 메모 등록" : "나만의 메모장"}
        </h1>

        {mode === "view" && <MemoList posts={posts} />}
        {mode === "write" && <MemoWrite />}
      </div>
    </div>
  );
};

export default Memo;
