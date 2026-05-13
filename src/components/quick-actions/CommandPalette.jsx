import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";

export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(0);
  }, [activeIndex, filtered.length]);

  const runAction = (action) => {
    action.run();
    onClose();
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      runAction(filtered[activeIndex]);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth={640} title="Quick actions command palette">
      <div style={{ marginBottom: 10, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
        Quick actions (Ctrl/Cmd + K)
      </div>
      <input
        autoFocus
        aria-label="Search quick actions"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search commands..."
        style={inputStyle}
      />
      <div role="listbox" aria-label="Command results" style={{ marginTop: 10, maxHeight: 280, overflowY: "auto", display: "grid", gap: 6 }}>
        {filtered.map((action, index) => (
          <button
            key={action.id}
            role="option"
            aria-selected={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => runAction(action)}
            style={{
              ...itemStyle,
              background: index === activeIndex ? "rgba(99,102,241,0.28)" : itemStyle.background,
            }}
          >
            {action.label}
          </button>
        ))}
        {filtered.length === 0 && <div style={{ color: "rgba(255,255,255,0.45)", padding: "8px 6px" }}>No actions found.</div>}
      </div>
    </Modal>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: 14,
  outline: "none",
};

const itemStyle = {
  border: "none",
  textAlign: "left",
  padding: "10px 12px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  cursor: "pointer",
};
