import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Modal from "@/components/ui/Modal";
import { useTheme } from "@/context/ThemeContext";

const METHODS = ["Debito", "Credito", "Transferencia", "Efectivo", "App"];

function defaultDate(activeMonth) {
  if (!activeMonth || activeMonth === "all") return new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 7);
  // If active month is current month → use today; otherwise → first day of that month
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
    padding: "10px 12px",
    borderRadius: 12,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 14,
    outline: "none",
    colorScheme: tokens.input.colorScheme,
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
        <input
          aria-label="Descripcion"
          placeholder="Descripcion *"
          value={form.name}
          onChange={set("name")}
          style={inp}
        />
        <input
          aria-label="Valor"
          placeholder="Valor * (ej: 150000)"
          value={form.amount}
          onChange={set("amount")}
          style={inp}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <select aria-label="Tipo" value={form.type} onChange={set("type")} style={inp}>
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
            <option value="savings">Ahorro</option>
          </select>
          <select aria-label="Categoria" value={form.category} onChange={set("category")} style={inp}>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <select aria-label="Metodo" value={form.method} onChange={set("method")} style={inp}>
            {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <input
            aria-label="Fecha"
            type="date"
            value={form.date}
            onChange={set("date")}
            style={inp}
          />
        </div>

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
            padding: "8px 16px",
            cursor: "pointer",
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
