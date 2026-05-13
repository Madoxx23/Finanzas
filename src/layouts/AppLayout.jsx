import { memo, useEffect, useState } from "react";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 960);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: tokens.bg.base,
        color: tokens.text.primary,
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
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
            height: 62,
            borderBottom: `1px solid ${tokens.header.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 16px",
            background: tokens.header.bg,
            backdropFilter: tokens.header.backdropFilter,
            flexShrink: 0,
          }}
        >
          {/* Mobile hamburger placeholder – MobileBottomNav handles nav */}
          <h1
            style={{
              flex: 1,
              fontWeight: 700,
              margin: 0,
              fontSize: isMobile ? 15 : 16,
              color: tokens.text.primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isMobile ? "💰 Mind Finance" : title}
          </h1>

          {/* Balance chip */}
          <div
            style={{
              padding: "5px 10px",
              borderRadius: 10,
              border: `1px solid ${tokens.border.default}`,
              background: tokens.bg.muted,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 10, color: tokens.text.tertiary, textTransform: "uppercase" }}>
              Balance
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 6, color: tokens.text.primary }}>
              {balanceLabel}
            </span>
          </div>

          {/* Theme toggle — desktop only */}
          {!isMobile && themeToggle}

          {/* Quick-add button */}
          <PrimaryButton ariaLabel="Registrar transaccion" onClick={onQuickAdd}>
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
            padding: isMobile ? "14px 12px 104px" : "16px",
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
