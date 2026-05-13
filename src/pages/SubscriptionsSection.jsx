import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Modal from "@/components/ui/Modal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import EmptyState from "@/components/ui/EmptyState";
import { fmtShort } from "@/data/financeData";

const EMOJI_OPTS   = ["📺","🎵","🎮","📰","☁️","🏋️","📚","🎬","🛡️","💻","🎯","🔄","📦","🎨","🧘"];
const BILLING_OPTS = ["Mensual","Anual","Trimestral","Semanal"];

function SubscriptionsSection({
  subscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  tokens,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null);

  const openNew  = () => { setEditing(null); setShowModal(true); };
  const openEdit = (s) => { setEditing(s);  setShowModal(true); };
  const handleSave = (data) => {
    editing ? updateSubscription(editing.id, data) : addSubscription(data);
    setShowModal(false);
  };

  const monthlyTotal = useMemo(() =>
    subscriptions.reduce((acc, s) => {
      if (s.billing === "Anual")       return acc + s.amount / 12;
      if (s.billing === "Trimestral")  return acc + s.amount / 3;
      if (s.billing === "Semanal")     return acc + s.amount * 4.33;
      return acc + s.amount;
    }, 0),
  [subscriptions]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        {subscriptions.length > 0 && (
          <div>
            <span style={{ fontSize: 12, color: tokens.text.tertiary, textTransform: "uppercase" }}>
              Total mensual:{" "}
            </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: tokens.accent.red }}>
              {fmtShort(monthlyTotal)}
            </span>
          </div>
        )}
        <PrimaryButton onClick={openNew} ariaLabel="Nueva suscripcion">
          + Nueva Suscripción
        </PrimaryButton>
      </div>

      {subscriptions.length === 0 ? (
        <EmptyState text="Sin suscripciones. ¡Registra tus servicios recurrentes!" />
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          <AnimatePresence>
            {subscriptions.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
              >
                <SubCard
                  sub={s}
                  tokens={tokens}
                  onEdit={() => openEdit(s)}
                  onDelete={() => deleteSubscription(s.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showModal && (
        <SubModal
          initial={editing}
          tokens={tokens}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// ── Sub card ─────────────────────────────────────────────────────────────────

function SubCard({ sub, tokens, onEdit, onDelete }) {
  const periodLabel = sub.billing === "Mensual" ? "mes"
    : sub.billing === "Anual" ? "año"
    : sub.billing === "Semanal" ? "sem."
    : "trim.";

  return (
    <GlassCard style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 26, flexShrink: 0 }}>{sub.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: tokens.text.primary }}>{sub.name}</div>
        <div style={{ fontSize: 12, color: tokens.text.tertiary, marginTop: 2 }}>
          {sub.category} · {sub.billing} · próximo: {sub.next}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: tokens.text.primary }}>
          {fmtShort(sub.amount)}
        </div>
        <div style={{ fontSize: 11, color: tokens.text.tertiary }}>/{periodLabel}</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <button
          onClick={onEdit}
          style={{
            background: tokens.bg.subtle,
            border: `1px solid ${tokens.border.default}`,
            borderRadius: 8, padding: "6px 8px", cursor: "pointer", fontSize: 13,
          }}
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          style={{
            background: tokens.accent.redDim,
            border: "none",
            borderRadius: 8, padding: "6px 8px", cursor: "pointer", fontSize: 13,
          }}
        >
          🗑️
        </button>
      </div>
    </GlassCard>
  );
}

// ── Sub modal ─────────────────────────────────────────────────────────────────

function SubModal({ initial, tokens, onSave, onClose }) {
  const [form, setForm] = useState({
    name:     initial?.name     ?? "",
    amount:   initial?.amount   ?? "",
    category: initial?.category ?? "Entretenimiento",
    emoji:    initial?.emoji    ?? "🔄",
    billing:  initial?.billing  ?? "Mensual",
    next:     initial?.next     ?? new Date().toISOString().slice(0, 10),
  });

  const inp = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 10,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 14,
    outline: "none",
    colorScheme: tokens.input.colorScheme,
  };

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.amount) return;
    onSave({ ...form, amount: parseFloat(String(form.amount).replace(/[^\d.]/g, "")) });
  };

  return (
    <Modal open onClose={onClose} title={initial ? "Editar Suscripción" : "Nueva Suscripción"} maxWidth={440}>
      <div style={{ fontSize: 17, fontWeight: 700, color: tokens.text.primary, marginBottom: 16 }}>
        {initial ? "Editar Suscripción" : "Nueva Suscripción"}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 8 }}>
          <select value={form.emoji} onChange={set("emoji")} style={{ ...inp, fontSize: 18, textAlign: "center" }}>
            {EMOJI_OPTS.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          <input placeholder="Nombre del servicio *" value={form.name} onChange={set("name")} style={inp} />
        </div>
        <input placeholder="Monto *" value={form.amount} onChange={set("amount")} style={inp} />
        <input placeholder="Categoría (ej: Entretenimiento)" value={form.category} onChange={set("category")} style={inp} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <select value={form.billing} onChange={set("billing")} style={inp}>
            {BILLING_OPTS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <input type="date" value={form.next} onChange={set("next")} style={inp} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button onClick={onClose} style={{ ...inp, width: "auto", padding: "8px 16px", cursor: "pointer" }}>
          Cancelar
        </button>
        <PrimaryButton onClick={handleSave} ariaLabel="Guardar suscripcion">Guardar</PrimaryButton>
      </div>
    </Modal>
  );
}

export default memo(SubscriptionsSection);
