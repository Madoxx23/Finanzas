import { memo } from "react";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile(768);

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        overflow: "hidden",
        background: tokens.bg.base,
        color: tokens.text.primary,
      }}
    >
      {/* Desktop sidebar */}
      {!isMobile && (
        <SidebarNav
          navItems={navItems}
          activeSection={activeSection}
          onSelect={onSelectSection}
        />
      )}

      {/* Main column — must have minWidth:0 and minHeight:0 for flex children to scroll */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {/* Header */}
        <header
          style={{
            height: 54,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            borderBottom: `1px solid ${tokens.header.border}`,
            background: tokens.header.bg,
            backdropFilter: tokens.header.backdropFilter,
          }}
        >
          <h1
            style={{
              flex: 1,
              margin: 0,
              fontWeight: 700,
              fontSize: 15,
              color: tokens.text.primary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {isMobile ? "💰 Mind Finance" : title}
          </h1>

          {/* Balance chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 10,
              border: `1px solid ${tokens.border.default}`,
              background: tokens.bg.muted,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {!isMobile && (
              <span
                style={{
                  fontSize: 9,
                  color: tokens.text.tertiary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Balance
              </span>
            )}
            <span
              style={{
                fontSize: isMobile ? 13 : 14,
                fontWeight: 700,
                color: tokens.text.primary,
              }}
            >
              {balanceLabel}
            </span>
          </div>

          {!isMobile && themeToggle}

          <PrimaryButton
            onClick={onQuickAdd}
            ariaLabel="Registrar transaccion"
            style={isMobile ? { padding: "6px 14px", fontSize: 22, lineHeight: 1, fontWeight: 300 } : {}}
          >
            {isMobile ? "+" : "Registrar"}
          </PrimaryButton>
        </header>

        {/* Scrollable main content — minHeight:0 is critical for flex scroll */}
        <main
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            paddingTop: 12,
            paddingLeft: isMobile ? 12 : 16,
            paddingRight: isMobile ? 12 : 16,
            paddingBottom: "var(--main-pb)",
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
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
