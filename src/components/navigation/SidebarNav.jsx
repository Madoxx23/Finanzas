import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

function SidebarNav({ sidebarOpen, setSidebarOpen, navItems, activeSection, onSelect }) {
  const { tokens } = useTheme();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 220 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        flexShrink: 0,
        background: tokens.sidebar.bg,
        borderRight: `1px solid ${tokens.sidebar.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Logo / toggle */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="Toggle sidebar"
        style={{
          border: "none",
          background: "transparent",
          color: tokens.text.primary,
          padding: "18px 16px",
          cursor: "pointer",
          fontWeight: 700,
          textAlign: "left",
          whiteSpace: "nowrap",
          fontSize: 14,
          borderBottom: `1px solid ${tokens.sidebar.border}`,
          flexShrink: 0,
        }}
      >
        {sidebarOpen ? "💰 Mind Finance" : "💰"}
      </button>

      {/* Nav items */}
      <nav
        style={{
          padding: "10px 8px",
          display: "grid",
          gap: 3,
          flex: 1,
          overflowY: "auto",
        }}
      >
        {navItems.map((n) => {
          const isActive = activeSection === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onSelect(n.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Ir a ${n.label}`}
              style={{
                border: "none",
                borderRadius: 10,
                textAlign: "left",
                cursor: "pointer",
                padding: "9px 12px",
                background: isActive ? tokens.sidebar.activeBg : "transparent",
                color: isActive ? tokens.sidebar.activeText : tokens.sidebar.inactiveText,
                transition: "all .15s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                gap: 9,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
              {sidebarOpen && <span>{n.label}</span>}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}

export default memo(SidebarNav);
