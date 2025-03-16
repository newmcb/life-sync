export const TEST_DATA = [
  {
    day: "2025-01-20",
    section1: "식비",
    section2: "식자재",
    section3: "이마트",
    amount: 30000,
    memo: "과일, 채소",
  },
  {
    day: "2025-01-24",
    section1: "식비",
    section2: "식자재",
    section3: "이마트",
    amount: 30000,
    memo: "음료",
  },
];

export const INCOME_DATA: DataItem[] = [
  {
    day: "2025-01-24",
    section1: "수입",
    section2: "월급",
    section3: "남편월급",
    amount: 1000000,
    memo: "",
  },
  {
    day: "2025-01-24",
    section1: "수입",
    section2: "월급",
    section3: "아내월급",
    amount: 10000000,
    memo: "",
  },
  {
    day: "2025-01-26",
    section1: "수입",
    section2: "부수입",
    section3: "부수입",
    amount: 10000,
    memo: "",
  },
];

export const EXPENSE_DATA: DataItem[] = [
  {
    day: "2025-01-20",
    section1: "식비",
    section2: "식자재",
    section3: "이마트",
    amount: 30000,
    memo: "과일, 채소",
  },
  {
    day: "2025-01-20",
    section1: "생활용품",
    section2: "생활소모품",
    section3: "기타",
    amount: 10000,
    memo: "",
  },
  {
    day: "2025-01-21",
    section1: "건강",
    section2: "병원/약국",
    section3: "약국",
    amount: 20000,
    memo: "감기약",
  },
  {
    day: "2025-01-24",
    section1: "식비",
    section2: "식자재",
    section3: "이마트",
    amount: 30000,
    memo: "음료",
  },
];

export type DataItem = {
  day: string;
  section1: string;
  section2: string;
  section3: string;
  amount: number;
  memo: string;
};
