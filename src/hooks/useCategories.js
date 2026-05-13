import { useMemo, useState } from "react";
import { DEFAULT_CATEGORIES } from "@/data/financeData";
import { storage } from "@/utils/storage";

const KEY = "mf_categories";

export function useCategories() {
  const [categories, setCategories] = useState(() => storage.get(KEY, DEFAULT_CATEGORIES));

  const actions = useMemo(
    () => ({
      addCategory(payload) {
        setCategories((prev) => {
          const next = [{ id: `c_${Date.now()}`, ...payload }, ...prev];
          storage.set(KEY, next);
          return next;
        });
      },
      updateCategory(id, patch) {
        setCategories((prev) => {
          const next = prev.map((c) => (c.id === id ? { ...c, ...patch } : c));
          storage.set(KEY, next);
          return next;
        });
      },
      deleteCategory(id) {
        setCategories((prev) => {
          const next = prev.filter((c) => c.id !== id);
          storage.set(KEY, next);
          return next;
        });
      },
    }),
    []
  );

  return { categories, ...actions };
}
