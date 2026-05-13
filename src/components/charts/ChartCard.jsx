import { memo } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

function ChartCard({ title, children, height = 260 }) {
  const { tokens } = useTheme();
  return (
    <GlassCard>
      <div
        style={{
          fontSize: 11,
          color: tokens.text.tertiary,
          textTransform: "uppercase",
          fontWeight: 700,
          letterSpacing: "0.06em",
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ width: "100%", height }}>{children}</div>
    </GlassCard>
  );
}

export default memo(ChartCard);
