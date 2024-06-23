'use client'

import React, {FC} from 'react';
import {CookiesProvider} from "react-cookie";
import ReactQueryProvider from "./ReactQueryProvider";
import {LayoutHeader} from "@/src/widgets/layoutHeader";
import LayoutContents from "@/src/widgets/layoutContents/ui/LayoutContents";

interface AppIndexProps{
  children: React.ReactNode;
}

const AppIndex:FC<AppIndexProps> = ({children}) => {
  return (
    <CookiesProvider>
      <ReactQueryProvider>
        <LayoutHeader/>
        <LayoutContents>{children}</LayoutContents>
      </ReactQueryProvider>
    </CookiesProvider>
  );
};

export default AppIndex;
