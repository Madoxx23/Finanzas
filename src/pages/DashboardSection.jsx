import { memo, useMemo } from "react";
import {
  Area, AreaChart, CartesianGrid,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/finance/StatCard";
import TxItem from "@/components/finance/TxItem";
import { MONTHLY_DATA, fmtShort } from "@/data/financeData";
import ChartCard from "@/components/charts/ChartCard";

function DashboardSection({ transactions, categories, tokens }) {
  const { income, expenses, savings, recentTx } = useMemo(() => {
    const income   = transactions.filter((t) => t.type === "income" ).reduce((a, t) => a + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    return {
      income,
      expenses,
      savings:  income - expenses,
      recentTx: [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    };
  }, [transactions]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12 }}>
        <StatCard label="Balance"    value={fmtShort(savings)} />
        <StatCard label="Ingresos"   value={fmtShort(income)}   color={tokens.accent.green} />
        <StatCard label="Gastos"     value={fmtShort(expenses)} color={tokens.accent.red}   />
        <StatCard label="Ahorro neto" value={fmtShort(Math.max(savings, 0))} color={tokens.accent.indigo} />
      </div>

      {/* Chart + recent transactions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(220px,320px)",
          gap: 12,
        }}
      >
        <ChartCard title="Flujo de Caja · 6 meses" height={220}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gIncome"  x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={tokens.chart.income}  stopOpacity={tokens.chart.areaOpacityHigh} />
                  <stop offset="95%" stopColor={tokens.chart.income}  stopOpacity={tokens.chart.areaOpacityLow}  />
                </linearGradient>
                <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={tokens.chart.expense} stopOpacity={tokens.chart.areaOpacityHigh} />
                  <stop offset="95%" stopColor={tokens.chart.expense} stopOpacity={tokens.chart.areaOpacityLow}  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={tokens.chart.grid} />
              <XAxis dataKey="month" tick={{ fill: tokens.chart.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: tokens.chart.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmtShort(v)} />
              <Tooltip
                contentStyle={{
                  background:   tokens.chart.tooltip.bg,
                  border:       `1px solid ${tokens.chart.tooltip.border}`,
                  borderRadius: 12,
                  color:        tokens.text.primary,
                  fontSize:     13,
                }}
                formatter={(v) => [`$${v.toLocaleString()}`, undefined]}
              />
              <Area type="monotone" dataKey="income"   stroke={tokens.chart.income}  strokeWidth={2} fill="url(#gIncome)"  />
              <Area type="monotone" dataKey="expenses" stroke={tokens.chart.expense} strokeWidth={2} fill="url(#gExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <GlassCard>
          <div
            style={{
              fontSize: 11,
              color: tokens.text.tertiary,
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.05em",
              marginBottom: 10,
            }}
          >
            Recientes
          </div>
          {recentTx.length === 0 ? (
            <div style={{ color: tokens.text.tertiary, fontSize: 13, textAlign: "center", padding: "20px 0" }}>
              Sin transacciones
            </div>
          ) : (
            recentTx.map((tx) => (
              <TxItem key={tx.id} tx={tx} categories={categories} />
            ))
          )}
        </GlassCard>
      </div>
    </div>
  );
}

export default memo(DashboardSection);
