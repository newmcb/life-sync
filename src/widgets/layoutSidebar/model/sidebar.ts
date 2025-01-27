export const SIDEBAR_MENU = {
  calendar: ["월별", "연도별", "c3", "c4"],
  promise: ["p1", "p2", "p3", "p4"],
  memo: ["m1", "m2", "m3", "m4"],
};

export type SidebarMenuKeys = keyof typeof SIDEBAR_MENU; // "calendar" | "promise" | "memo"
