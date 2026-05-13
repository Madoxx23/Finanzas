import GlassCard from "@/components/ui/GlassCard";

export default function SettingsSection() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
      <GlassCard>
        <div style={title}>Perfil</div>
        <Row label="Nombre" value="Usuario Mind Finance" />
        <Row label="Moneda" value="COP - Peso Colombiano" />
        <Row label="Zona horaria" value="America/Bogota" />
      </GlassCard>

      <GlassCard>
        <div style={title}>Datos</div>
        <Row label="Sincronizacion Supabase" value="Configurada por entorno" />
        <Row label="Backups" value="Activos" />
        <Row label="Exportaciones" value="CSV / JSON" />
      </GlassCard>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", color: "rgba(255,255,255,0.7)" }}>
      <span>{label}</span>
      <span style={{ color: "rgba(255,255,255,0.45)" }}>{value}</span>
    </div>
  );
}

const title = {
  fontSize: 13,
  color: "rgba(255,255,255,0.45)",
  marginBottom: 10,
  textTransform: "uppercase",
};
