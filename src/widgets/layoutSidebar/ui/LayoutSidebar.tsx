import React, { FC, useEffect, useState } from "react";
import {
  SIDEBAR_MENU,
  SidebarMenuKeys,
} from "@/src/widgets/layoutSidebar/model/sidebar";

interface LayoutSidebarProps {
  selectHeader?: SidebarMenuKeys;
}

const LayoutSidebar: FC<LayoutSidebarProps> = ({ selectHeader }) => {
  const [sidebarMenu, setSidebarMenu] = useState<string[]>([]);

  useEffect(() => {
    if (selectHeader) {
      setSidebarMenu(SIDEBAR_MENU[selectHeader] || []);
    }
  }, [selectHeader]);

  return (
    <aside className="w-60 bg-gray-100 border-r border-gray-300 p-4">
      <nav>
        <ul>
          {sidebarMenu.map((menu) => {
            return <li className="mb-2">{menu}</li>;
          })}
          <li className="mb-2">메뉴 1</li>
          <li className="mb-2">메뉴 2</li>
          <li className="mb-2">메뉴 3</li>
        </ul>
      </nav>
    </aside>
  );
};

export default LayoutSidebar;
