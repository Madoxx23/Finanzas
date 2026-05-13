import { memo } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { fmtShort } from "@/data/financeData";

function GoalsSection({ goals }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
      {goals.map((g) => {
        const pct = Math.min((g.current / g.target) * 100, 100);
        return (
          <motion.div key={g.id} whileHover={{ y: -3 }}>
            <GlassCard>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{g.emoji} {g.name}</div>
                <div style={{ color: "rgba(255,255,255,0.5)" }}>{g.deadline}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 8, marginBottom: 10 }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: g.color }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                <span>{fmtShort(g.current)} / {fmtShort(g.target)}</span>
                <span>{pct.toFixed(0)}%</span>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}

export default memo(GoalsSection);
