import { memo } from "react";
import { tokens } from "@/styles/tokens";

function GlassCard({ children, style = {}, as = "div" }) {
  const Component = as;
  return (
    <Component
      style={{
        background: tokens.color.panel,
        border: `1px solid ${tokens.color.panelBorder}`,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.xl,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

export default memo(GlassCard);
