import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

function StatCard({ label, value, sub, color }) {
  const { tokens } = useTheme();
  const accent = color || tokens.accent.indigo;

  return (
    <div
      style={{
        background: tokens.bg.surface,
        border: `1px solid ${tokens.border.default}`,
        borderRadius: 16,
        padding: "16px 18px",
        boxShadow: tokens.shadow.card,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: tokens.text.tertiary,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: tokens.text.primary,
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: accent, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

export default memo(StatCard);
