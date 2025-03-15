import React, { FC, useEffect, useState } from "react";
import {
  SIDEBAR_MENU,
  SidebarItem,
} from "@/src/widgets/layoutSidebar/model/sidebar";
import { usePathname, useRouter } from "next/navigation";

interface LayoutSidebarProps {
  selectHeader?: string;
}

const LayoutSidebar: FC<LayoutSidebarProps> = ({ selectHeader }) => {
  const [sidebarMenu, setSidebarMenu] = useState<SidebarItem[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const pathSegments = pathname.split("/");

    const routeSegment = pathSegments[1] as string;

    const header = selectHeader || routeSegment;

    if (header) {
      setSidebarMenu(SIDEBAR_MENU[header].map((menu) => menu) || []);
    }
  }, [selectHeader]);

  const handleMenu = (item: SidebarItem) => {
    router.push(item.route);
  };

  return (
    <aside className="w-60 bg-gray-100 border-r border-gray-300 hover:cursor-pointer">
      <nav>
        <ul className={"pt-4"}>
          {sidebarMenu.map((menu, index) => {
            return (
              <li
                className="p-2 hover:bg-gray-500 hover:text-yellow-50"
                key={`${menu}_${index}`}
                onClick={() => {
                  handleMenu(menu);
                }}
              >
                {menu.ko}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default LayoutSidebar;
