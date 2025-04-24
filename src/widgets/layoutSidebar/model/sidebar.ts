import {
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  HomeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

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
  finance: [
    {
      name: "finance",
      code: "f1",
      ko: "재무 대시보드",
      route: "/finance",
    },
    {
      name: "finance",
      code: "f2",
      ko: "수입/지출 관리",
      route: "/finance",
    },
    {
      name: "finance",
      code: "f3",
      ko: "예산 설정",
      route: "/finance",
    },
    {
      name: "finance",
      code: "f4",
      ko: "재무 보고서",
      route: "/finance",
    },
  ],
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

export const MENU_ITEM = [
  { href: "/dashboard", label: "대시보드", icon: HomeIcon },
  { href: "/calendar", label: "일정관리", icon: CalendarIcon },
  { href: "/todo", label: "할일관리", icon: CheckCircleIcon },
  { href: "/finance", label: "재무관리", icon: CurrencyDollarIcon },
  { href: "/secret", label: "비밀공간", icon: LockClosedIcon },
];
