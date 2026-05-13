import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Modal from "@/components/ui/Modal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import EmptyState from "@/components/ui/EmptyState";
import { fmtShort } from "@/data/financeData";
import { useTheme } from "@/context/ThemeContext";

const MONTH_NAMES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

function formatMonthLabel(ym) {
  const [y, m] = ym.split("-");
  return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
}

function MonthsSection({ activeMonth, setActiveMonth, transactions, onNavigate, tokens }) {
  const { tokens: ctxTokens } = useTheme();
  const tk = tokens ?? ctxTokens;

  const [showPicker, setShowPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState(() => new Date().toISOString().slice(0, 7));

  // Build summary per month from transactions
  const monthSummaries = useMemo(() => {
    const map = {};
    transactions.forEach((tx) => {
      const m = (tx.date || "").slice(0, 7);
      if (!m) return;
      if (!map[m]) map[m] = { income: 0, expenses: 0, count: 0 };
      if (tx.type === "income")  map[m].income   += tx.amount;
      if (tx.type === "expense") map[m].expenses += tx.amount;
      map[m].count++;
    });
    return Object.entries(map)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([month, d]) => ({ month, ...d, balance: d.income - d.expenses }));
  }, [transactions]);

  const handleGoToMonth = (month) => {
    setActiveMonth(month);
    onNavigate("transactions");
  };

  const handleCreateMonth = () => {
    setActiveMonth(pickerValue);
    setShowPicker(false);
    onNavigate("transactions");
  };

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 640 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, color: tk.text.secondary, lineHeight: 1.5 }}>
            Seleccioná un mes para ver o cargar tus finanzas.
          </div>
        </div>
        <PrimaryButton onClick={() => setShowPicker(true)} ariaLabel="Registrar nuevo mes">
          + Registrar mes
        </PrimaryButton>
      </div>

      {/* Active month indicator */}
      {activeMonth !== "all" && (
        <GlassCard style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: tk.text.tertiary, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 2 }}>
                Mes activo
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: tk.accent.indigo }}>
                {formatMonthLabel(activeMonth)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => handleGoToMonth(activeMonth)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 10,
                  border: `1px solid ${tk.accent.indigoBorder}`,
                  background: tk.accent.indigoDim,
                  color: tk.accent.indigoText,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Ver transacciones
              </button>
              <button
                onClick={() => setActiveMonth("all")}
                style={{
                  padding: "7px 12px",
                  borderRadius: 10,
                  border: `1px solid ${tk.border.default}`,
                  background: "transparent",
                  color: tk.text.secondary,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Quitar filtro
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Month cards */}
      {monthSummaries.length === 0 ? (
        <EmptyState text="Sin meses registrados aún. Agrega transacciones o registra un mes." />
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 11, color: tk.text.tertiary, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Historial — {monthSummaries.length} mes{monthSummaries.length !== 1 ? "es" : ""}
          </div>
          <AnimatePresence>
            {monthSummaries.map(({ month, income, expenses, balance, count }) => (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <MonthCard
                  month={month}
                  income={income}
                  expenses={expenses}
                  balance={balance}
                  count={count}
                  isActive={activeMonth === month}
                  onGoTo={() => handleGoToMonth(month)}
                  tokens={tk}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Month picker modal */}
      {showPicker && (
        <Modal open onClose={() => setShowPicker(false)} title="Registrar mes" maxWidth={400}>
          <div style={{ fontSize: 17, fontWeight: 700, color: tk.text.primary, marginBottom: 16 }}>
            Ir a un mes
          </div>
          <div style={{ fontSize: 13, color: tk.text.secondary, marginBottom: 14, lineHeight: 1.6 }}>
            Seleccioná el mes que querés registrar. Se activará como mes activo y te llevará a Transacciones.
          </div>
          <input
            type="month"
            value={pickerValue}
            onChange={(e) => setPickerValue(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 12,
              border: `1px solid ${tk.border.default}`,
              background: tk.input.bg,
              color: tk.input.color,
              fontSize: 15,
              outline: "none",
              colorScheme: tk.input.colorScheme,
              marginBottom: 18,
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              onClick={() => setShowPicker(false)}
              style={{
                padding: "9px 16px",
                borderRadius: 12,
                border: `1px solid ${tk.border.default}`,
                background: "transparent",
                color: tk.text.secondary,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <PrimaryButton onClick={handleCreateMonth} ariaLabel="Ir al mes">
              Ir al mes →
            </PrimaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Month card ───────────────────────────────────────────────────────────────

function MonthCard({ month, income, expenses, balance, count, isActive, onGoTo, tokens }) {
  const positive = balance >= 0;

  return (
    <GlassCard
      style={{
        padding: "14px 16px",
        border: isActive
          ? `1px solid ${tokens.accent.indigoBorder}`
          : `1px solid ${tokens.border.default}`,
        background: isActive ? tokens.accent.indigoDim : tokens.bg.surface,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        {/* Month + count */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: tokens.text.primary }}>
              {formatMonthLabel(month)}
            </div>
            {isActive && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: tokens.accent.indigoText,
                  background: tokens.accent.indigoDim,
                  border: `1px solid ${tokens.accent.indigoBorder}`,
                  borderRadius: 6,
                  padding: "1px 6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Activo
              </span>
            )}
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <Stat label="Ingresos"  value={fmtShort(income)}   color={tokens.accent.green}  tokens={tokens} />
            <Stat label="Gastos"    value={fmtShort(expenses)} color={tokens.accent.red}    tokens={tokens} />
            <Stat
              label="Balance"
              value={fmtShort(Math.abs(balance))}
              color={positive ? tokens.accent.green : tokens.accent.red}
              prefix={positive ? "+" : "-"}
              tokens={tokens}
            />
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: tokens.text.tertiary }}>
            {count} transacción{count !== 1 ? "es" : ""}
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onGoTo}
          aria-label={`Ir al mes ${formatMonthLabel(month)}`}
          style={{
            flexShrink: 0,
            padding: "8px 14px",
            borderRadius: 10,
            border: `1px solid ${tokens.border.default}`,
            background: tokens.bg.muted,
            color: tokens.text.secondary,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Ver →
        </button>
      </div>
    </GlassCard>
  );
}

function Stat({ label, value, color, prefix = "", tokens }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: tokens.text.tertiary, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color }}>
        {prefix}{value}
      </div>
    </div>
  );
}

export default memo(MonthsSection);
