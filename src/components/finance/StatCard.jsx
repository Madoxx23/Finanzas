import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

function StatCard({ label, value, sub, color }) {
  const { tokens } = useTheme();
  const accent = color || tokens.accent.indigo;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: tokens.shadow.cardHover }}
      style={{
        background: tokens.bg.surface,
        border: `1px solid ${tokens.border.default}`,
        borderRadius: 16,
        padding: "20px 22px",
        boxShadow: tokens.shadow.card,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: tokens.text.tertiary,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: tokens.text.primary,
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: accent, marginTop: 6 }}>{sub}</div>
      )}
    </motion.div>
  );
}

export default memo(StatCard);
