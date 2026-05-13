import { memo } from "react";
import { motion } from "framer-motion";

function StatCard({ label, value, sub, color = "#6366f1" }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px" }}
    >
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: color, marginTop: 6 }}>{sub}</div>}
    </motion.div>
  );
}

export default memo(StatCard);
