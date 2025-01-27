import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { headerData } from "@/src/widgets/layoutHeader/model/header";
import { SidebarMenuKeys } from "@/src/widgets/layoutSidebar/model/sidebar";

interface LayoutHeaderProps {
  onSelectionChange: (header: SidebarMenuKeys) => void; // 콜백 프로퍼티 추가
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
                  className="text-gray-700 hover:text-black hover:font-bold cursor-pointer"
                >
                  {v.ko}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-black hover:font-bold">
            Search
          </button>
          <button className="text-gray-700 hover:text-black hover:font-bold">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
