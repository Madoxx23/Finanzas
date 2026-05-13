import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Modal({ open, onClose, children, maxWidth = 520, title = "Dialog" }) {
  const { tokens } = useTheme();
  const titleId = useId();

  // Lock background scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

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
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 1300,
          }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            style={{
              width: "100%",
              maxWidth,
              /* Cap height so content stays within viewport even with keyboard open */
              maxHeight: "92dvh",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "24px 24px 0 0",
              border: `1px solid ${tokens.glass.border}`,
              borderBottom: "none",
              background: tokens.glass.bg,
              backdropFilter: tokens.glass.backdropFilter,
              boxShadow: tokens.shadow.modal,
              padding: "22px 20px",
              paddingBottom: "calc(28px + env(safe-area-inset-bottom))",
            }}
          >
            {/* Drag handle visual hint */}
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 99,
                background: tokens.border.default,
                margin: "0 auto 18px",
              }}
            />
            <h2 id={titleId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              {title}
            </h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
