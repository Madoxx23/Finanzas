import GlassCard from "@/components/ui/GlassCard";

const INSIGHTS = [
  "Tu gasto en comida subio 12% frente al mes anterior.",
  "El ahorro promedio semanal se mantiene estable.",
  "Los sabados concentran la mayor parte de tus consumos.",
  "Puedes recortar suscripciones para liberar flujo de caja.",
];

export default function InsightsSection() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {INSIGHTS.map((insight, idx) => (
        <GlassCard key={idx}>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{insight}</div>
        </GlassCard>
      ))}
    </div>
  );
}
