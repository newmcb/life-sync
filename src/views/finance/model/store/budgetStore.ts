import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Budget {
  category: string;
  amount: number;
  spent: number;
}

interface BudgetStore {
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'spent'>) => void;
  updateBudget: (index: number, amount: number) => void;
  deleteBudget: (index: number) => void;
  updateSpent: (category: string, amount: number) => void;
  resetMonthlyBudgets: () => void;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      budgets: [],
      addBudget: (budget) =>
        set((state) => ({
          budgets: [...state.budgets, { ...budget, spent: 0 }],
        })),
      updateBudget: (index, amount) =>
        set((state) => {
          const newBudgets = [...state.budgets];
          newBudgets[index] = { ...newBudgets[index], amount };
          return { budgets: newBudgets };
        }),
      deleteBudget: (index) =>
        set((state) => ({
          budgets: state.budgets.filter((_, i) => i !== index),
        })),
      updateSpent: (category, amount) =>
        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.category === category
              ? { ...budget, spent: budget.spent + Math.abs(amount) }
              : budget
          ),
        })),
      resetMonthlyBudgets: () =>
        set((state) => ({
          budgets: state.budgets.map((budget) => ({ ...budget, spent: 0 })),
        })),
    }),
    {
      name: 'budget-storage',
    }
  )
); 