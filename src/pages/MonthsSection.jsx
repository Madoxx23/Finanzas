import { memo } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Dropdown from "@/components/ui/Dropdown";

function MonthsSection({ activeMonth, setActiveMonth, monthOptions, tokens }) {
  return (
    <div style={{ maxWidth: 480 }}>
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
          Filtrar por mes
        </div>

        <Dropdown
          value={activeMonth}
          onChange={setActiveMonth}
          ariaLabel="Seleccionar mes"
          options={monthOptions.map((m) => ({
            value: m,
            label: m === "all" ? "Todos los meses" : m,
          }))}
          style={{ width: "100%" }}
        />

        <div style={{ marginTop: 14, fontSize: 14, color: tokens.text.secondary }}>
          Mostrando:{" "}
          <strong style={{ color: tokens.text.primary }}>
            {activeMonth === "all" ? "Todos los meses" : activeMonth}
          </strong>
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: tokens.text.tertiary,
            lineHeight: 1.6,
            borderTop: `1px solid ${tokens.border.subtle}`,
            paddingTop: 10,
          }}
        >
          El filtro aplica a Transacciones, Dashboard e Insights.
        </div>
      </GlassCard>
    </div>
  );
}

export default memo(MonthsSection);
