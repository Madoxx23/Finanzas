import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { fmtShort } from "@/data/financeData";

function TxItem({ tx, categories }) {
  const cat = useMemo(
    () => categories.find((c) => c.name === tx.category) || { emoji: "✨", color: "#94a3b8" },
    [categories, tx.category]
  );
  const sign = tx.type === "income" ? "+" : tx.type === "savings" ? "•" : "-";
  const amountColor = tx.type === "income" ? "#10b981" : tx.type === "savings" ? "#6366f1" : "#fff";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ background: "rgba(255,255,255,0.04)" }}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, cursor: "pointer" }}
    >
      <div style={{ width: 38, height: 38, borderRadius: 12, background: `${cat.color}18`, border: `1px solid ${cat.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
        {cat.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.name}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{tx.date} · {tx.method}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: amountColor }}>{sign}{fmtShort(tx.amount)}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{tx.category}</div>
      </div>
    </motion.div>
  );
}

export default memo(TxItem);
