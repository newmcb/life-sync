type CategoryType = {
  [key: string]: string[];
};

export const CATEGORY_INCOME: CategoryType = {
  수입: ["월급", "상여", "부수입", "투자"],
  저축: ["예적금", "주식", "청약"],
};

export const CATEGORY_EXPENSE: CategoryType = {
  식비: ["식자재", "카페", "배달", "외식"],
  생활용품: ["생활소모품"],
  건강: ["병원/약국", "건강보조", "예방/검진"],
};

export const PAYMENT_METHODS = ["현금", "카드", "계좌 이체", "기타"];

export type CalendarFilterType = "all" | "day" | "month" | "past";
