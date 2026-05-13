import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Modal from "@/components/ui/Modal";
import { useTheme } from "@/context/ThemeContext";

const METHODS = ["Debito", "Credito", "Transferencia", "Efectivo", "App"];

function defaultDate(activeMonth) {
  if (!activeMonth || activeMonth === "all") return new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 7);
  return activeMonth === today ? new Date().toISOString().slice(0, 10) : `${activeMonth}-01`;
}

export default function QuickAddModal({ onClose, onSave, categories, activeMonth }) {
  const { tokens } = useTheme();
  const [form, setForm] = useState({
    name:     "",
    amount:   "",
    type:     "expense",
    category: categories[0]?.name ?? "",
    method:   "Debito",
    date:     defaultDate(activeMonth),
    note:     "",
  });

  const inp = {
    width: "100%",
    padding: "11px 13px",
    borderRadius: 12,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 15,
    outline: "none",
    colorScheme: tokens.input.colorScheme,
    minWidth: 0,
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.amount || !form.category) return;
    onSave({
      id:     `t_${Date.now()}`,
      ...form,
      amount: parseFloat(String(form.amount).replace(/[^\d.]/g, "")),
    });
    onClose();
  };

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <Modal open onClose={onClose} maxWidth={480} title="Registrar movimiento">
      <div style={{ fontSize: 17, fontWeight: 700, color: tokens.text.primary, marginBottom: 16 }}>
        Registrar movimiento
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {/* Type selector — tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 6,
            background: tokens.bg.muted,
            borderRadius: 12,
            padding: 4,
          }}
        >
          {[
            { val: "expense", label: "Gasto",   color: tokens.accent.red    },
            { val: "income",  label: "Ingreso",  color: tokens.accent.green  },
            { val: "savings", label: "Ahorro",   color: tokens.accent.indigo },
          ].map(({ val, label, color }) => (
            <button
              key={val}
              onClick={() => setForm((p) => ({ ...p, type: val }))}
              style={{
                padding: "9px 4px",
                borderRadius: 9,
                border: "none",
                background: form.type === val ? tokens.bg.surface : "transparent",
                color: form.type === val ? color : tokens.text.tertiary,
                fontWeight: form.type === val ? 700 : 400,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: form.type === val ? tokens.shadow.card : "none",
                transition: "all .15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <input
          aria-label="Descripcion"
          placeholder="Descripción *"
          value={form.name}
          onChange={set("name")}
          style={inp}
          autoFocus
        />
        <input
          aria-label="Valor"
          placeholder="Valor * (ej: 150000)"
          value={form.amount}
          onChange={set("amount")}
          inputMode="decimal"
          style={inp}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <select aria-label="Categoria" value={form.category} onChange={set("category")} style={inp}>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>
            ))}
          </select>
          <select aria-label="Metodo de pago" value={form.method} onChange={set("method")} style={inp}>
            {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <input
          aria-label="Fecha"
          type="date"
          value={form.date}
          onChange={set("date")}
          style={inp}
        />

        <input
          aria-label="Nota"
          placeholder="Nota (opcional)"
          value={form.note}
          onChange={set("note")}
          style={inp}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button
          aria-label="Cancelar"
          onClick={onClose}
          style={{
            ...inp,
            width: "auto",
            padding: "10px 18px",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Cancelar
        </button>
        <PrimaryButton ariaLabel="Guardar movimiento" onClick={handleSave}>
          Guardar
        </PrimaryButton>
      </div>
    </Modal>
  );
}
