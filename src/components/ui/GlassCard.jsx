import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

function GlassCard({ children, style = {}, as = "div" }) {
  const { tokens } = useTheme();
  const Component = as;
  return (
    <Component
      style={{
        background: tokens.bg.surface,
        border: `1px solid ${tokens.border.default}`,
        borderRadius: 16,
        padding: 20,
        boxShadow: tokens.shadow.card,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

export default memo(GlassCard);
