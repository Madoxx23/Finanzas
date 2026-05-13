import { motion } from "framer-motion";
import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

function PrimaryButton({ children, onClick, style = {}, ariaLabel, type = "button" }) {
  const { tokens } = useTheme();
  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 10,
        background: `linear-gradient(135deg, ${tokens.accent.indigo}, ${tokens.accent.purple})`,
        border: "none",
        color: tokens.text.onAccent,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: tokens.shadow.fab,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export default memo(PrimaryButton);
