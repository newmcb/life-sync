import React, { FC, useEffect, useState } from "react";
import {
  SIDEBAR_MENU,
  SidebarMenuKeys,
} from "@/src/widgets/layoutSidebar/model/sidebar";
import { usePathname, useRouter } from "next/navigation";

interface LayoutSidebarProps {
  selectHeader?: SidebarMenuKeys;
}

const LayoutSidebar: FC<LayoutSidebarProps> = ({ selectHeader }) => {
  const [sidebarMenu, setSidebarMenu] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const routeSegment = pathSegments[1] as SidebarMenuKeys;

    const header = selectHeader || routeSegment;

    if (header) {
      setSidebarMenu(SIDEBAR_MENU[header] || []);
    }
  }, [selectHeader]);

  return (
    <aside className="w-60 bg-gray-100 border-r border-gray-300 p-4">
      <nav>
        <ul>
          {sidebarMenu.map((menu, index) => {
            return (
              <li className="mb-2" key={`${menu}_${index}`}>
                {menu}
              </li>
            );
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
