import { useEffect, useState } from "react";
import { storage } from "@/utils/storage";

const STORAGE_KEY = "mf_transactions";

export function useTransactions(seed = []) {
  const [transactions, setTransactions] = useState(() => storage.get(STORAGE_KEY, seed));
  const [isLoading, setIsLoading] = useState(true);
  const [activeMonth, setActiveMonth] = useState("all");

  useEffect(() => {
    storage.set(STORAGE_KEY, transactions);
  }, [transactions]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = activeMonth === "all"
    ? transactions
    : transactions.filter((tx) => (tx.date || "").startsWith(activeMonth));

  return { transactions, setTransactions, filteredTransactions, isLoading, activeMonth, setActiveMonth };
}
