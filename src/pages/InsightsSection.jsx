import { memo, useMemo } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { fmtShort } from "@/data/financeData";

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function InsightsSection({ transactions, subscriptions = [], tokens }) {
  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income   = transactions.filter((t) => t.type === "income");

    const totalIncome   = income.reduce((a, t) => a + t.amount, 0);
    const totalExpenses = expenses.reduce((a, t) => a + t.amount, 0);
    const savingsRate   = totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome) * 100
      : null;

    // Top spending category
    const catTotals = {};
    expenses.forEach((t) => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });
    const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];

    // Biggest single expense
    const biggest = [...expenses].sort((a, b) => b.amount - a.amount)[0];

    // Monthly subscriptions cost
    const subMonthly = subscriptions.reduce((acc, s) => {
      if (s.billing === "Anual")      return acc + s.amount / 12;
      if (s.billing === "Trimestral") return acc + s.amount / 3;
      if (s.billing === "Semanal")    return acc + s.amount * 4.33;
      return acc + s.amount;
    }, 0);

    // Day-of-week with most spending
    const dayTotals = Array(7).fill(0);
    expenses.forEach((t) => {
      if (t.date) {
        const d = new Date(t.date + "T12:00:00").getDay();
        dayTotals[d] += t.amount;
      }
    });
    const topDayIdx = dayTotals.indexOf(Math.max(...dayTotals));

    return { totalIncome, totalExpenses, savingsRate, topCat, biggest, subMonthly, topDay: DAY_NAMES[topDayIdx] };
  }, [transactions, subscriptions]);

  const cards = [
    {
      icon:  "💰",
      title: "Tasa de Ahorro",
      body:  insights.savingsRate === null
        ? "Sin ingresos registrados en este período."
        : `Ahorrás el ${insights.savingsRate.toFixed(1)}% de tus ingresos. ${
            insights.savingsRate >= 20 ? "¡Excelente hábito financiero!" :
            insights.savingsRate >= 10 ? "Buen progreso, podés mejorar." :
            "Intentá reducir gastos para mejorar tu ahorro."
          }`,
      color: insights.savingsRate === null ? tokens.text.tertiary :
             insights.savingsRate >= 20    ? tokens.accent.green  :
             insights.savingsRate >= 10    ? tokens.accent.amber  :
             tokens.accent.red,
    },
    {
      icon:  "📊",
      title: "Mayor Categoría de Gasto",
      body:  insights.topCat
        ? `Tu categoría con más gastos es "${insights.topCat[0]}" con ${fmtShort(insights.topCat[1])} en el período seleccionado.`
        : "No hay gastos registrados en este período.",
      color: tokens.accent.indigo,
    },
    {
      icon:  "🧾",
      title: "Gasto Mayor",
      body:  insights.biggest
        ? `Tu gasto más grande fue "${insights.biggest.name}" por ${fmtShort(insights.biggest.amount)} (${insights.biggest.category}) el ${insights.biggest.date}.`
        : "Sin gastos registrados.",
      color: tokens.accent.amber,
    },
    {
      icon:  "🔄",
      title: "Costo de Suscripciones",
      body:  insights.subMonthly > 0
        ? `Tus suscripciones te cuestan aprox. ${fmtShort(insights.subMonthly)}/mes. Revisalas periódicamente.`
        : "No tenés suscripciones activas.",
      color: tokens.accent.cyan,
    },
    {
      icon:  "📅",
      title: "Día de Mayor Consumo",
      body:  insights.totalExpenses > 0
        ? `El día con mayor gasto acumulado es el ${insights.topDay}. ¿Podés planificar mejor ese día?`
        : "Sin suficientes datos para analizar.",
      color: tokens.accent.purple,
    },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {cards.map((c, i) => (
        <GlassCard key={i}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontSize: 26, flexShrink: 0, marginTop: 1 }}>{c.icon}</div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: c.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 5,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: 14, color: tokens.text.secondary, lineHeight: 1.6 }}>
                {c.body}
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export default memo(InsightsSection);
