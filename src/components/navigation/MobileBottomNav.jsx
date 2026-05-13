import { memo } from "react";
import { tokens } from "@/styles/tokens";

function MobileBottomNav({ navItems, activeSection, onSelect }) {
  return (
    <nav
      aria-label="Mobile navigation"
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
        right: 10,
        borderRadius: 14,
        background: "rgba(12,12,18,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(navItems.length, 5)},1fr)`,
        gap: 4,
        padding: 6,
        zIndex: tokens.z.navMobile,
      }}
    >
      {navItems.slice(0, 5).map((n) => (
        <button
          key={n.id}
          aria-label={`Go to ${n.label}`}
          onClick={() => onSelect(n.id)}
          style={{
            border: "none",
            borderRadius: 10,
            background: activeSection === n.id ? "rgba(99,102,241,0.2)" : "transparent",
            color: activeSection === n.id ? "#a5b4fc" : "rgba(255,255,255,0.5)",
            padding: "8px 6px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {n.label}
        </button>
      ))}
    </nav>
  );
}

export default memo(MobileBottomNav);
