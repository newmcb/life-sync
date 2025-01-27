import { SidebarMenuKeys } from "@/src/widgets/layoutSidebar/model/sidebar";

export const headerData: {
  key: SidebarMenuKeys;
  to: string;
  ko: string;
}[] = [
  {
    key: "calendar",
    to: "/calendar",
    ko: "가계부",
  },
  {
    key: "promise",
    to: "/promise",
    ko: "약속",
  },
  {
    key: "memo",
    to: "/memo",
    ko: "메모장",
  },
];
