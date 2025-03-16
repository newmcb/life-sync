"use client";

import React, { FC, ReactNode, useState } from "react";
import { CookiesProvider } from "react-cookie";
import ReactQueryProvider from "./ReactQueryProvider";
import { LayoutHeader } from "@/src/widgets/layoutHeader";
import { LayoutContents } from "@/src/widgets/layoutContents";
import { LayoutSidebar } from "@/src/widgets/layoutSidebar";

interface AppIndexProps {
  children: ReactNode;
}

const AppIndex: FC<AppIndexProps> = ({ children }) => {
  const [selectHeader, setSelectHeader] = useState<string>();

  const handleHeaderSelection = (header: string) => {
    setSelectHeader(header);
  };

  return (
    <CookiesProvider>
      <ReactQueryProvider>
        <LayoutHeader onSelectionChange={handleHeaderSelection} />
        <div className="flex h-screen pt-16">
          <LayoutSidebar selectHeader={selectHeader} />
          <LayoutContents>{children}</LayoutContents>
        </div>
      </ReactQueryProvider>
    </CookiesProvider>
  );
};

export default AppIndex;
