import { memo } from "react";
import GlassCard from "@/components/ui/GlassCard";

function ChartCard({ title, children, height = 260 }) {
  return (
    <GlassCard>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ width: "100%", height }}>{children}</div>
    </GlassCard>
  );
}

export default memo(ChartCard);
