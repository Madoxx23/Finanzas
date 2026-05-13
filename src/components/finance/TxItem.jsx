import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fmtShort } from "@/data/financeData";
import { useTheme } from "@/context/ThemeContext";

function TxItem({ tx, categories, onDelete }) {
  const { tokens } = useTheme();
  const [hovered, setHovered] = useState(false);

  const cat = useMemo(
    () => categories.find((c) => c.name === tx.category) || { emoji: "✨", color: "#94a3b8" },
    [categories, tx.category]
  );

  const sign = tx.type === "income" ? "+" : tx.type === "savings" ? "•" : "-";
  const amountColor =
    tx.type === "income"
      ? tokens.accent.green
      : tx.type === "savings"
      ? tokens.accent.indigo
      : tokens.text.primary;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 16px",
        borderRadius: 12,
        background: hovered ? tokens.bg.subtle : "transparent",
        transition: "background 0.15s",
      }}
    >
      {/* Category icon */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: `${cat.color}18`,
          border: `1px solid ${cat.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {cat.emoji}
      </div>

      {/* Name + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: tokens.text.primary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tx.name}
        </div>
        <div style={{ fontSize: 11, color: tokens.text.tertiary, marginTop: 2 }}>
          {tx.date} · {tx.method || "—"}
        </div>
      </div>

      {/* Amount */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: amountColor }}>
          {sign}{fmtShort(tx.amount)}
        </div>
        <div style={{ fontSize: 11, color: tokens.text.tertiary, marginTop: 1 }}>
          {tx.category}
        </div>
      </div>

      {/* Delete button — visible on hover */}
      {onDelete && hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(tx.id); }}
          aria-label={`Eliminar ${tx.name}`}
          style={{
            border: "none",
            background: tokens.accent.redDim,
            color: tokens.accent.red,
            width: 28,
            height: 28,
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </motion.div>
  );
}

export default memo(TxItem);
