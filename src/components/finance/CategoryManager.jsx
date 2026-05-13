import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";

const ICON_PRESETS  = ["🍔","🚕","💼","🏥","📚","💳","🛍️","✨","🎮","🏠","✈️","🎓","💰","🎵","🎉"];
const COLOR_PRESETS = ["#f97316","#3b82f6","#6366f1","#10b981","#ec4899","#06b6d4","#84cc16","#94a3b8","#f59e0b","#ef4444"];

export default function CategoryManager({ categories, addCategory, updateCategory, deleteCategory }) {
  const { tokens } = useTheme();
  const isMobile = useIsMobile();
  const [draft, setDraft] = useState({ name: "", emoji: "✨", color: "#94a3b8" });
  const [expanded, setExpanded] = useState(false);

  const inp = {
    padding: "9px 11px",
    borderRadius: 10,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 14,
    outline: "none",
    width: "100%",
    colorScheme: tokens.input.colorScheme,
    minWidth: 0,
  };

  const submit = () => {
    if (!draft.name.trim()) return;
    addCategory(draft);
    setDraft({ name: "", emoji: "✨", color: "#94a3b8" });
  };

  return (
    <GlassCard>
      {/* Section header with collapse toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: expanded ? 14 : 0,
        }}
      >
        <div style={{ fontSize: 11, color: tokens.text.tertiary, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
          Categorías ({categories.length})
        </div>
        <span style={{ fontSize: 16, color: tokens.text.tertiary, lineHeight: 1 }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {expanded && (
        <>
          {/* Add new category */}
          <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8 }}>
              <select
                value={draft.emoji}
                onChange={(e) => setDraft((p) => ({ ...p, emoji: e.target.value }))}
                style={{ ...inp, width: 56, fontSize: 18, textAlign: "center", padding: "8px 4px" }}
              >
                {ICON_PRESETS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <input
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Nombre de categoría"
                style={inp}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
              {/* Color swatches */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setDraft((p) => ({ ...p, color: c }))}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: c,
                      border: draft.color === c ? `2px solid ${tokens.text.primary}` : "2px solid transparent",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={submit}
                style={{
                  ...inp,
                  width: "auto",
                  cursor: "pointer",
                  background: tokens.accent.indigoDim,
                  color: tokens.accent.indigoText,
                  border: `1px solid ${tokens.accent.indigoBorder}`,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  padding: "9px 14px",
                }}
              >
                + Agregar
              </button>
            </div>
          </div>

          {/* Category list */}
          <div style={{ display: "grid", gap: 6, maxHeight: 240, overflowY: "auto" }}>
            {categories.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 0",
                  borderBottom: `1px solid ${tokens.border.subtle}`,
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{c.emoji}</span>
                <input
                  value={c.name}
                  onChange={(e) => updateCategory(c.id, { name: e.target.value })}
                  style={{ ...inp, flex: 1 }}
                />
                <input
                  type="color"
                  value={c.color}
                  onChange={(e) => updateCategory(c.id, { color: e.target.value })}
                  style={{ width: 36, height: 36, padding: 2, borderRadius: 8, border: `1px solid ${tokens.border.default}`, cursor: "pointer", flexShrink: 0 }}
                />
                <button
                  onClick={() => deleteCategory(c.id)}
                  style={{
                    background: tokens.accent.redDim,
                    color: tokens.accent.red,
                    border: "none",
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontSize: 16,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </GlassCard>
  );
}
