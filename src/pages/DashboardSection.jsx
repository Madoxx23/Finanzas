import { memo, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/finance/StatCard";
import TxItem from "@/components/finance/TxItem";
import { MONTHLY_DATA, fmtShort } from "@/data/financeData";
import ChartCard from "@/components/charts/ChartCard";

function DashboardSection({ transactions, categories }) {
  const { income, expenses, savings, recentTx } = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    return {
      income,
      expenses,
      savings: income - expenses,
      recentTx: transactions.slice(0, 5),
    };
  }, [transactions]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        <StatCard label="Balance Total" value={fmtShort(savings + 8500000)} />
        <StatCard label="Ingresos" value={fmtShort(income)} color="#10b981" />
        <StatCard label="Gastos" value={fmtShort(expenses)} color="#f43f5e" />
        <StatCard label="Ahorro" value={fmtShort(savings)} color="#6366f1" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(260px,360px)", gap: 12 }}>
        <ChartCard title="Flujo de Caja · 6 meses" height={220}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmtShort(v)} />
              <Tooltip contentStyle={{ background: "rgba(15,15,25,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
              <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fill="rgba(16,185,129,0.1)" />
              <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="rgba(244,63,94,0.09)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <GlassCard>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 10 }}>Recientes</div>
          {recentTx.map((tx) => <TxItem key={tx.id} tx={tx} categories={categories} />)}
        </GlassCard>
      </div>
    </div>
  );
}

export default memo(DashboardSection);
