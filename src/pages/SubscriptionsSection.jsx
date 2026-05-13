import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import { fmtShort } from "@/data/financeData";

export default function SubscriptionsSection({ subscriptions }) {
  if (!subscriptions.length) return <EmptyState text="No hay suscripciones activas." />;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {subscriptions.map((s) => (
        <GlassCard key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 24 }}>{s.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{s.category} · {s.billing} · {s.next}</div>
          </div>
          <div style={{ fontWeight: 700 }}>{fmtShort(s.amount)}/mes</div>
        </GlassCard>
      ))}
    </div>
  );
}
