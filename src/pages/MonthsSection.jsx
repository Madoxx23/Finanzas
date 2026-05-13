import GlassCard from "@/components/ui/GlassCard";
import Dropdown from "@/components/ui/Dropdown";

export default function MonthsSection({ activeMonth, setActiveMonth, monthOptions }) {
  return (
    <GlassCard>
      <div style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
        Gestion de meses
      </div>
      <Dropdown
        value={activeMonth}
        onChange={setActiveMonth}
        options={monthOptions.map((m) => ({ value: m, label: m === "all" ? "Todos los meses" : m }))}
      />
      <div style={{ marginTop: 10, color: "rgba(255,255,255,0.6)" }}>
        Mes seleccionado: <strong>{activeMonth === "all" ? "Todos" : activeMonth}</strong>
      </div>
    </GlassCard>
  );
}
