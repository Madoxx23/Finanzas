import { memo } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

function ChartCard({ title, children, height = 240 }) {
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
      {/* overflow:hidden is critical — prevents Recharts from overflowing on mobile */}
      <div style={{ width: "100%", height, overflow: "hidden" }}>
        {children}
      </div>
    </GlassCard>
  );
}

export default memo(ChartCard);
