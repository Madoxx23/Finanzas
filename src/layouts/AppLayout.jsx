import { memo, useEffect, useState } from "react";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { tokens } from "@/styles/tokens";

function AppLayout({
  title,
  balanceLabel,
  navItems,
  activeSection,
  onSelectSection,
  onQuickAdd,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 960);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: tokens.color.bg, color: tokens.color.text, overflow: "hidden" }}>
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
        <header role="banner"
          style={{
            height: 62,
            borderBottom: `1px solid ${tokens.color.panelBorder}`,
            display: "flex",
            alignItems: "center",
            gap: tokens.spacing.md,
            padding: `0 ${tokens.spacing.lg}px`,
            background: "rgba(10,10,15,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1 style={{ flex: 1, fontWeight: 600, margin: 0, fontSize: 16 }}>{title}</h1>
          <GlassCard style={{ padding: "6px 12px", borderRadius: 12 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>BALANCE</span>
            <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 8 }}>{balanceLabel}</span>
          </GlassCard>
          <PrimaryButton ariaLabel="Registrar transaccion" onClick={onQuickAdd}>Registrar</PrimaryButton>
        </header>
        <main id="app-main-content" role="main" style={{ flex: 1, overflowY: "auto", padding: isMobile ? "14px 14px 84px" : 16 }}>
          {children}
        </main>
      </div>
      {isMobile && (
        <MobileBottomNav navItems={navItems} activeSection={activeSection} onSelect={onSelectSection} />
      )}
    </div>
  );
}

export default memo(AppLayout);
