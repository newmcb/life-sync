import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { headerData } from "@/src/widgets/layoutHeader/model/header";

interface LayoutHeaderProps {
  onSelectionChange: (header: string) => void; // 콜백 프로퍼티 추가
}

const LayoutHeader: FC<LayoutHeaderProps> = ({ onSelectionChange }) => {
  const router = useRouter();

  const handleRoute = (value: string) => {
    router.push(value);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 flex items-center background-blur shadow bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 max-w-4xl">
        <div className="flex items-center">
          <div className="text-gray-500 text-xl font-bold">
            Life Sync
            <p className={"text-xs"}>packing good life</p>
          </div>
          <nav className="ml-10 flex space-x-6">
            {headerData.map((v) => {
              return (
                <div
                  key={v.key}
                  onClick={() => {
                    onSelectionChange(v.key);
                    handleRoute(v.to);
                  }}
                  className="text-gray-700 hover:text-black hover:font-bold cursor-pointer transition-all duration-200"
                >
                  {v.ko}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-black hover:font-bold transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="text-gray-700 hover:text-black hover:font-bold transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
