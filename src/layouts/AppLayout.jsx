import { memo } from "react";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";

const SIDEBAR_BREAKPOINT = 960;

function AppLayout({
  title,
  balanceLabel,
  navItems,
  activeSection,
  onSelectSection,
  onQuickAdd,
  children,
  themeToggle,
}) {
  const { tokens } = useTheme();
  const isMobile = useIsMobile(SIDEBAR_BREAKPOINT);

  return (
    <div
      style={{
        display: "flex",
        height: "100dvh",
        /* fallback for browsers that don't support dvh */
        ...(CSS.supports("height", "100dvh") ? {} : { height: "100vh" }),
        background: tokens.bg.base,
        color: tokens.text.primary,
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <SidebarNav
          navItems={navItems}
          activeSection={activeSection}
          onSelect={onSelectSection}
        />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* ── Header ── */}
        <header
          role="banner"
          style={{
            height: isMobile ? 54 : 62,
            borderBottom: `1px solid ${tokens.header.border}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: isMobile ? "0 12px" : "0 16px",
            background: tokens.header.bg,
            backdropFilter: tokens.header.backdropFilter,
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              flex: 1,
              fontWeight: 700,
              margin: 0,
              fontSize: isMobile ? 14 : 16,
              color: tokens.text.primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isMobile ? "💰 Mind Finance" : title}
          </h1>

          {/* Balance chip — always visible */}
          <div
            style={{
              padding: isMobile ? "4px 8px" : "5px 10px",
              borderRadius: 10,
              border: `1px solid ${tokens.border.default}`,
              background: tokens.bg.muted,
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {!isMobile && (
              <span style={{ fontSize: 10, color: tokens.text.tertiary, textTransform: "uppercase" }}>
                Balance
              </span>
            )}
            <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: tokens.text.primary }}>
              {balanceLabel}
            </span>
          </div>

          {/* Theme toggle — desktop only */}
          {!isMobile && themeToggle}

          {/* Quick-add */}
          <PrimaryButton
            ariaLabel="Registrar transaccion"
            onClick={onQuickAdd}
            style={isMobile ? { padding: "7px 14px", fontSize: 20, lineHeight: 1, minWidth: 0 } : {}}
          >
            {isMobile ? "+" : "Registrar"}
          </PrimaryButton>
        </header>

        {/* ── Main content ── */}
        <main
          id="app-main-content"
          role="main"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: isMobile
              ? "12px 12px calc(80px + env(safe-area-inset-bottom))"
              : "16px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </main>
      </div>

      {isMobile && (
        <MobileBottomNav
          navItems={navItems}
          activeSection={activeSection}
          onSelect={onSelectSection}
        />
      )}
    </div>
  );
}

export default memo(AppLayout);
