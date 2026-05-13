import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

// Show the 5 most-used sections in the bottom bar
const PRIMARY_IDS = ["dashboard", "transactions", "analytics", "goals", "settings"];

function MobileBottomNav({ navItems, activeSection, onSelect }) {
  const { tokens } = useTheme();

  const primary = navItems.filter((n) => PRIMARY_IDS.includes(n.id));

  return (
    <nav
      aria-label="Navegacion movil"
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
        right: 10,
        borderRadius: 18,
        background: tokens.glass.bg,
        border: `1px solid ${tokens.glass.border}`,
        backdropFilter: tokens.glass.backdropFilter,
        display: "grid",
        gridTemplateColumns: `repeat(${primary.length}, 1fr)`,
        padding: "6px 4px",
        zIndex: 1200,
        boxShadow: tokens.shadow.modal,
      }}
    >
      {primary.map((n) => {
        const isActive = activeSection === n.id;
        return (
          <button
            key={n.id}
            aria-label={`Ir a ${n.label}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSelect(n.id)}
            style={{
              border: "none",
              borderRadius: 12,
              background: isActive ? tokens.sidebar.activeBg : "transparent",
              color: isActive ? tokens.sidebar.activeText : tokens.sidebar.inactiveText,
              padding: "8px 4px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              transition: "all .15s ease",
            }}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{n.icon}</span>
            <span
              style={{
                maxWidth: 58,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default memo(MobileBottomNav);
