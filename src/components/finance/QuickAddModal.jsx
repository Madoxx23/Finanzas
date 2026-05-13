import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Modal from "@/components/ui/Modal";

export default function QuickAddModal({ onClose, onSave, categories }) {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: categories[0]?.name ?? "",
    method: "Debito",
    date: new Date().toISOString().slice(0, 10),
    note: "",
    name: "",
  });

  const handleSave = () => {
    if (!form.amount || !form.name || !form.category) return;
    onSave({
      id: `t_${Date.now()}`,
      ...form,
      amount: parseFloat(form.amount.replace(/[^\d]/g, "")),
    });
    onClose();
  };

  return (
    <Modal open onClose={onClose} maxWidth={480} title="Registrar movimiento">
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Registrar movimiento</div>
        <div style={{ display: "grid", gap: 10 }}>
          <input aria-label="Descripcion de movimiento" placeholder="Descripcion" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={inputStyle} />
          <input aria-label="Valor del movimiento" placeholder="Valor" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} style={inputStyle} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <select aria-label="Tipo de movimiento" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} style={inputStyle}>
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
              <option value="savings">Ahorro</option>
            </select>
            <select aria-label="Categoria de movimiento" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} style={inputStyle}>
              {categories.map((c) => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
            </select>
          </div>
          <input aria-label="Fecha del movimiento" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} style={inputStyle} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button aria-label="Cancelar registro" onClick={onClose} style={{ ...inputStyle, width: 96, cursor: "pointer" }}>Cancelar</button>
          <PrimaryButton ariaLabel="Guardar movimiento" onClick={handleSave}>Guardar</PrimaryButton>
        </div>
    </Modal>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: 14,
  outline: "none",
};
