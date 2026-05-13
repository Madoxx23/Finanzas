import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Modal from "@/components/ui/Modal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import EmptyState from "@/components/ui/EmptyState";
import { fmtShort } from "@/data/financeData";
import { useIsMobile } from "@/hooks/useIsMobile";

const EMOJI_OPTS = ["🎯","🛡️","🏍️","🏠","✈️","💻","📱","🎓","💍","🚗","🏦","💰","🌴","💎","🎮","🌍"];
const COLOR_OPTS = ["#6366f1","#f59e0b","#10b981","#f43f5e","#3b82f6","#8b5cf6","#ec4899","#06b6d4","#84cc16","#14b8a6"];

function GoalsSection({ goals, addGoal, updateGoal, deleteGoal, tokens }) {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null);

  const openNew  = () => { setEditing(null); setShowModal(true); };
  const openEdit = (g) => { setEditing(g);  setShowModal(true); };

  const handleSave = (data) => {
    editing ? updateGoal(editing.id, data) : addGoal(data);
    setShowModal(false);
  };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <PrimaryButton onClick={openNew} ariaLabel="Nueva meta">
          + Nueva Meta
        </PrimaryButton>
      </div>

      {goals.length === 0 ? (
        <EmptyState text="No hay metas. ¡Agrega tu primera meta financiera!" />
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))",
          gap: 12,
        }}>
          <AnimatePresence>
            {goals.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GoalCard
                  goal={g}
                  tokens={tokens}
                  onEdit={() => openEdit(g)}
                  onDelete={() => deleteGoal(g.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showModal && (
        <GoalModal
          initial={editing}
          tokens={tokens}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// ── Goal card ──────────────────────────────────────────────────────────────────

function GoalCard({ goal, tokens, onEdit, onDelete }) {
  const pct       = Math.min((goal.current / goal.target) * 100, 100);
  const remaining = Math.max(goal.target - goal.current, 0);

  return (
    <GlassCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ minWidth: 0, flex: 1, marginRight: 8 }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>{goal.emoji}</div>
          <div style={{
            fontSize: 15, fontWeight: 600, color: tokens.text.primary,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {goal.name}
          </div>
          <div style={{ fontSize: 12, color: tokens.text.tertiary, marginTop: 2 }}>
            Hasta {goal.deadline}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button
            onClick={onEdit}
            style={{
              background: tokens.bg.subtle,
              border: `1px solid ${tokens.border.default}`,
              borderRadius: 8, padding: "6px 8px", cursor: "pointer", fontSize: 14,
            }}
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            style={{
              background: tokens.accent.redDim, border: "none",
              borderRadius: 8, padding: "6px 8px", cursor: "pointer", fontSize: 14,
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: tokens.bg.muted, borderRadius: 99, height: 8, marginBottom: 10, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: "100%", borderRadius: 99, background: goal.color }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: tokens.text.secondary }}>
        <span>{fmtShort(goal.current)} / {fmtShort(goal.target)}</span>
        <span style={{ fontWeight: 700, color: goal.color }}>{pct.toFixed(0)}%</span>
      </div>

      {pct < 100 && (
        <div style={{ marginTop: 8, fontSize: 12, color: tokens.text.tertiary }}>
          Faltan {fmtShort(remaining)}
          {goal.monthly > 0 && ` · Aporte mensual: ${fmtShort(goal.monthly)}`}
        </div>
      )}
      {pct >= 100 && (
        <div style={{ marginTop: 8, fontSize: 12, color: tokens.accent.green, fontWeight: 600 }}>
          ✓ Meta alcanzada 🎉
        </div>
      )}
    </GlassCard>
  );
}

// ── Goal form modal ─────────────────────────────────────────────────────────────

function GoalModal({ initial, tokens, onSave, onClose }) {
  const [form, setForm] = useState({
    name:     initial?.name     ?? "",
    target:   initial?.target   ?? "",
    current:  initial?.current  ?? "0",
    monthly:  initial?.monthly  ?? "0",
    emoji:    initial?.emoji    ?? "🎯",
    color:    initial?.color    ?? "#6366f1",
    deadline: initial?.deadline ?? new Date().toISOString().slice(0, 7),
  });

  const inp = {
    width: "100%",
    padding: "11px 13px",
    borderRadius: 10,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 15,
    outline: "none",
    colorScheme: tokens.input.colorScheme,
    minWidth: 0,
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.target) return;
    onSave({
      ...form,
      target:  parseNum(form.target),
      current: parseNum(form.current),
      monthly: parseNum(form.monthly),
    });
  };

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <Modal open onClose={onClose} title={initial ? "Editar Meta" : "Nueva Meta"} maxWidth={480}>
      <div style={{ fontSize: 17, fontWeight: 700, color: tokens.text.primary, marginBottom: 16 }}>
        {initial ? "Editar Meta" : "Nueva Meta"}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 8 }}>
          <select value={form.emoji} onChange={set("emoji")} style={{ ...inp, fontSize: 20, textAlign: "center", padding: "8px 4px" }}>
            {EMOJI_OPTS.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          <input placeholder="Nombre de la meta *" value={form.name} onChange={set("name")} style={inp} autoFocus />
        </div>
        <input placeholder="Monto objetivo *"  value={form.target}   onChange={set("target")}  inputMode="decimal" style={inp} />
        <input placeholder="Monto actual"       value={form.current}  onChange={set("current")} inputMode="decimal" style={inp} />
        <input placeholder="Aporte mensual"     value={form.monthly}  onChange={set("monthly")} inputMode="decimal" style={inp} />

        {/* Deadline */}
        <input type="month" value={form.deadline} onChange={set("deadline")} style={inp} />

        {/* Color swatches */}
        <div>
          <div style={{ fontSize: 11, color: tokens.text.tertiary, marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>
            Color
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {COLOR_OPTS.map((c) => (
              <button
                key={c}
                onClick={() => setForm((p) => ({ ...p, color: c }))}
                style={{
                  width: 28, height: 28, borderRadius: 7, background: c,
                  border: form.color === c ? `2px solid ${tokens.text.primary}` : "2px solid transparent",
                  cursor: "pointer", flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button
          onClick={onClose}
          style={{ ...inp, width: "auto", padding: "10px 18px", cursor: "pointer", fontSize: 14 }}
        >
          Cancelar
        </button>
        <PrimaryButton onClick={handleSave} ariaLabel="Guardar meta">Guardar</PrimaryButton>
      </div>
    </Modal>
  );
}

const parseNum = (v) => parseFloat(String(v).replace(/[^\d.]/g, "")) || 0;

export default memo(GoalsSection);
