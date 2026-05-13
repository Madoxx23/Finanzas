import { memo } from "react";
import { motion } from "framer-motion";
import { tokens } from "@/styles/tokens";

function SidebarNav({
  sidebarOpen,
  setSidebarOpen,
  navItems,
  activeSection,
  onSelect,
}) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 220 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        flexShrink: 0,
        background: "rgba(255,255,255,0.02)",
        borderRight: `1px solid ${tokens.color.panelBorder}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="Toggle sidebar"
        style={{
          border: "none",
          background: "transparent",
          color: "#fff",
          padding: "20px 16px",
          cursor: "pointer",
          fontWeight: 700,
          textAlign: "left",
          whiteSpace: "nowrap",
        }}
      >
        {sidebarOpen ? "Mind Finance" : "M"}
      </button>

      <nav style={{ padding: "8px 10px", display: "grid", gap: 6 }}>
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            style={{
              border: "none",
              borderRadius: 10,
              textAlign: "left",
              cursor: "pointer",
              padding: "10px 12px",
              background: activeSection === n.id ? "rgba(99,102,241,0.15)" : "transparent",
              color: activeSection === n.id ? "#a5b4fc" : "rgba(255,255,255,0.45)",
              transition: "all .18s ease",
            }}
            aria-current={activeSection === n.id ? "page" : undefined}
            aria-label={`Go to ${n.label}`}
          >
            {sidebarOpen ? n.label : n.label[0]}
          </button>
        ))}
      </nav>
    </motion.aside>
  );
}

export default memo(SidebarNav);
