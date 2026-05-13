import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import { tokens } from "@/styles/tokens";

export default function Modal({ open, onClose, children, maxWidth = 520, title = "Dialog" }) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
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
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: tokens.z.modal,
            padding: "0 12px",
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            style={{
              width: "100%",
              maxWidth,
              marginBottom: 0,
              borderRadius: "22px 22px 0 0",
              border: "1px solid rgba(255,255,255,0.08)",
              background: tokens.gradient.modal,
              boxShadow: tokens.shadow.modal,
              padding: 18,
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
