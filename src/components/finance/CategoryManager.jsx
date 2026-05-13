import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useTheme } from "@/context/ThemeContext";

const ICON_PRESETS  = ["🍔","🚕","💼","🏥","📚","💳","🛍️","✨","🎮","🏠","✈️","🎓"];
const COLOR_PRESETS = ["#f97316","#3b82f6","#6366f1","#10b981","#ec4899","#06b6d4","#84cc16","#94a3b8"];

export default function CategoryManager({
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
}) {
  const { tokens } = useTheme();
  const [draft, setDraft] = useState({ name: "", emoji: "✨", color: "#94a3b8" });

  const inp = {
    padding: "8px 10px",
    borderRadius: 10,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 13,
    outline: "none",
    width: "100%",
    colorScheme: tokens.input.colorScheme,
  };

  const submit = () => {
    if (!draft.name.trim()) return;
    addCategory(draft);
    setDraft({ name: "", emoji: "✨", color: "#94a3b8" });
  };

  return (
    <GlassCard>
      <div
        style={{
          fontSize: 11,
          color: tokens.text.tertiary,
          textTransform: "uppercase",
          fontWeight: 700,
          letterSpacing: "0.05em",
          marginBottom: 12,
        }}
      >
        Categorias
      </div>

      {/* Add row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 8, marginBottom: 10 }}>
        <input
          value={draft.name}
          onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Nueva categoria"
          style={inp}
        />
        <select
          value={draft.emoji}
          onChange={(e) => setDraft((p) => ({ ...p, emoji: e.target.value }))}
          style={{ ...inp, width: "auto" }}
        >
          {ICON_PRESETS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select
          value={draft.color}
          onChange={(e) => setDraft((p) => ({ ...p, color: e.target.value }))}
          style={{ ...inp, width: "auto" }}
        >
          {COLOR_PRESETS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
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
          }}
        >
          Agregar
        </button>
      </div>

      {/* Existing categories */}
      <div style={{ maxHeight: 200, overflowY: "auto", display: "grid", gap: 4 }}>
        {categories.map((c) => (
          <div
            key={c.id}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr 48px auto",
              gap: 8,
              alignItems: "center",
              padding: "6px 0",
              borderBottom: `1px solid ${tokens.border.subtle}`,
            }}
          >
            <span style={{ fontSize: 16, textAlign: "center" }}>{c.emoji}</span>
            <input
              value={c.name}
              onChange={(e) => updateCategory(c.id, { name: e.target.value })}
              style={inp}
            />
            <input
              type="color"
              value={c.color}
              onChange={(e) => updateCategory(c.id, { color: e.target.value })}
              style={{ ...inp, padding: 3, cursor: "pointer" }}
            />
            <button
              onClick={() => deleteCategory(c.id)}
              style={{
                ...inp,
                width: "auto",
                cursor: "pointer",
                background: tokens.accent.redDim,
                color: tokens.accent.red,
                border: "none",
                fontWeight: 700,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
