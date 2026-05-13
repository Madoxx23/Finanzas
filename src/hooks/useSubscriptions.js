import { useMemo, useState } from "react";
import { SEED_SUBS } from "@/data/financeData";
import { storage } from "@/utils/storage";

const KEY = "mf_subscriptions";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(() => storage.get(KEY, SEED_SUBS));

  const actions = useMemo(
    () => ({
      addSubscription(payload) {
        setSubscriptions((prev) => {
          const next = [{ id: `s_${Date.now()}`, ...payload }, ...prev];
          storage.set(KEY, next);
          return next;
        });
      },
      updateSubscription(id, patch) {
        setSubscriptions((prev) => {
          const next = prev.map((s) => (s.id === id ? { ...s, ...patch } : s));
          storage.set(KEY, next);
          return next;
        });
      },
      deleteSubscription(id) {
        setSubscriptions((prev) => {
          const next = prev.filter((s) => s.id !== id);
          storage.set(KEY, next);
          return next;
        });
      },
    }),
    []
  );

  return { subscriptions, ...actions };
}
