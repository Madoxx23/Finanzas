import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

const PRIMARY_IDS = ["dashboard", "transactions", "analytics", "goals", "settings"];

function MobileBottomNav({ navItems, activeSection, onSelect }) {
  const { tokens } = useTheme();
  const primary = navItems.filter((n) => PRIMARY_IDS.includes(n.id));

  return (
    <nav
      aria-label="Navegacion movil"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: tokens.glass.bg,
        borderTop: `1px solid ${tokens.glass.border}`,
        backdropFilter: tokens.glass.backdropFilter,
        display: "grid",
        gridTemplateColumns: `repeat(${primary.length}, 1fr)`,
        paddingTop: 6,
        paddingBottom: "calc(6px + env(safe-area-inset-bottom))",
        zIndex: 1200,
        boxShadow: `0 -4px 20px rgba(0,0,0,0.08)`,
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
              background: "transparent",
              padding: "4px 2px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "all .15s ease",
            }}
          >
            {/* Active indicator dot */}
            <div
              style={{
                width: 32,
                height: 28,
                borderRadius: 10,
                background: isActive ? tokens.sidebar.activeBg : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                lineHeight: 1,
                transition: "all .15s ease",
              }}
            >
              {n.icon}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? tokens.sidebar.activeText : tokens.sidebar.inactiveText,
                maxWidth: 56,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                transition: "color .15s ease",
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
