import { motion } from "framer-motion";
import { memo } from "react";
import { tokens } from "@/styles/tokens";

function PrimaryButton({ children, onClick, style = {}, ariaLabel, type = "button" }) {
  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: tokens.radius.sm,
        background: tokens.gradient.primary,
        border: "none",
        color: tokens.color.text,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: tokens.shadow.float,
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export default memo(PrimaryButton);
