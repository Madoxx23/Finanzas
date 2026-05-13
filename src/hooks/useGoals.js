import { useMemo, useState } from "react";
import { SEED_GOALS } from "@/data/financeData";
import { storage } from "@/utils/storage";

const KEY = "mf_goals";

export function useGoals() {
  const [goals, setGoals] = useState(() => storage.get(KEY, SEED_GOALS));

  const actions = useMemo(
    () => ({
      addGoal(payload) {
        setGoals((prev) => {
          const next = [{ id: `g_${Date.now()}`, ...payload }, ...prev];
          storage.set(KEY, next);
          return next;
        });
      },
      updateGoal(id, patch) {
        setGoals((prev) => {
          const next = prev.map((g) => (g.id === id ? { ...g, ...patch } : g));
          storage.set(KEY, next);
          return next;
        });
      },
      deleteGoal(id) {
        setGoals((prev) => {
          const next = prev.filter((g) => g.id !== id);
          storage.set(KEY, next);
          return next;
        });
      },
    }),
    []
  );

  return { goals, ...actions };
}
