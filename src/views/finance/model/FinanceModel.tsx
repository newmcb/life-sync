export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface Filters {
  type: "all" | "income" | "expense";
  category: string;
  startDate: string;
  endDate: string;
}
