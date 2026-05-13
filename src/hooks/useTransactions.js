import { useEffect, useMemo, useState } from "react";
import { storage } from "@/utils/storage";

const KEY = "mf_transactions";

export function useTransactions(seed = []) {
  const [transactions, setTransactions] = useState(() => storage.get(KEY, seed));
  const [isLoading, setIsLoading] = useState(true);
  const [activeMonth, setActiveMonth] = useState("all");

  useEffect(() => {
    storage.set(KEY, transactions);
  }, [transactions]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const actions = useMemo(
    () => ({
      deleteTransaction(id) {
        setTransactions((prev) => {
          const next = prev.filter((t) => t.id !== id);
          storage.set(KEY, next);
          return next;
        });
      },
      updateTransaction(id, patch) {
        setTransactions((prev) => {
          const next = prev.map((t) => (t.id === id ? { ...t, ...patch } : t));
          storage.set(KEY, next);
          return next;
        });
      },
    }),
    []
  );

  const filteredTransactions =
    activeMonth === "all"
      ? transactions
      : transactions.filter((tx) => (tx.date || "").startsWith(activeMonth));

  return {
    transactions,
    setTransactions,
    filteredTransactions,
    isLoading,
    activeMonth,
    setActiveMonth,
    ...actions,
  };
}
