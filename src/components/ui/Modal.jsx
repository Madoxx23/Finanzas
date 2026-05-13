import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Modal({ open, onClose, children, maxWidth = 520, title = "Dialog" }) {
  const { tokens } = useTheme();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: tokens.bg.overlay,
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 1300,
            padding: "0 0",
          }}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            style={{
              width: "100%",
              maxWidth,
              borderRadius: "24px 24px 0 0",
              border: `1px solid ${tokens.glass.border}`,
              borderBottom: "none",
              background: tokens.glass.bg,
              backdropFilter: tokens.glass.backdropFilter,
              boxShadow: tokens.shadow.modal,
              padding: "22px 20px 32px",
            }}
          >
            <h2 id={titleId} style={{ fontSize: 1, margin: 0, padding: 0, height: 0, overflow: "hidden" }}>
              {title}
            </h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
