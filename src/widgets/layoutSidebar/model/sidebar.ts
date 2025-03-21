export interface SidebarItem {
  name: string;
  code: string;
  ko: string;
  route: string;
}

interface SidebarType {
  [key: string]: SidebarItem[];
}

export const SIDEBAR_MENU: SidebarType = {
  calendar: [
    {
      name: "calendar",
      code: "c1",
      ko: "월별 사용 내역",
      route: "/calendar",
    },
    {
      name: "yearEndClosing",
      code: "c2",
      ko: "연말결산",
      route: "/calendar/summary",
    },
    {
      name: "householdAssets",
      code: "c3",
      ko: "자산현황",
      route: "/calendar/assets",
    },
    {
      name: "setting",
      code: "c4",
      ko: "항목 관리",
      route: "/calendar",
    },
  ],
  promise: [
    {
      name: "promise",
      code: "p1",
      ko: "약속1",
      route: "/promise",
    },
    {
      name: "promise",
      code: "p1",
      ko: "약속2",
      route: "/promise",
    },
  ],
  memo: [
    {
      name: "memo",
      code: "m1",
      ko: "메모1",
      route: "/memo",
    },
    {
      name: "memo",
      code: "m2",
      ko: "메모2",
      route: "/memo",
    },
  ],
};
