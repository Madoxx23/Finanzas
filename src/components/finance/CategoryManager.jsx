import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const iconPresets = ["🍔", "🚕", "💼", "🏥", "📚", "💳", "🛍️", "✨"];
const colorPresets = ["#f97316", "#3b82f6", "#6366f1", "#10b981", "#ec4899", "#06b6d4", "#84cc16", "#94a3b8"];

export default function CategoryManager({ categories, addCategory, updateCategory, deleteCategory }) {
  const [draft, setDraft] = useState({ name: "", emoji: "✨", color: "#94a3b8" });

  const submit = () => {
    if (!draft.name.trim()) return;
    addCategory(draft);
    setDraft({ name: "", emoji: "✨", color: "#94a3b8" });
  };

  return (
    <GlassCard>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: 12 }}>Categorias</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 8, marginBottom: 10 }}>
        <input value={draft.name} onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))} placeholder="Nueva categoria" style={inputStyle} />
        <select value={draft.emoji} onChange={(e) => setDraft((p) => ({ ...p, emoji: e.target.value }))} style={inputStyle}>
          {iconPresets.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={draft.color} onChange={(e) => setDraft((p) => ({ ...p, color: e.target.value }))} style={inputStyle}>
          {colorPresets.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={submit} style={buttonStyle}>Agregar</button>
      </div>

      <div style={{ maxHeight: 190, overflowY: "auto" }}>
        {categories.map((c) => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "32px 1fr 80px auto", gap: 8, alignItems: "center", padding: "8px 0" }}>
            <span style={{ fontSize: 18 }}>{c.emoji}</span>
            <input value={c.name} onChange={(e) => updateCategory(c.id, { name: e.target.value })} style={inputStyle} />
            <input type="color" value={c.color} onChange={(e) => updateCategory(c.id, { color: e.target.value })} style={{ ...inputStyle, padding: 4 }} />
            <button onClick={() => deleteCategory(c.id)} style={dangerStyle}>Eliminar</button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: 13,
  outline: "none",
};
const buttonStyle = { ...inputStyle, cursor: "pointer", background: "rgba(99,102,241,0.2)" };
const dangerStyle = { ...inputStyle, cursor: "pointer", background: "rgba(244,63,94,0.18)" };
