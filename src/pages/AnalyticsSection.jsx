import { memo, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "@/components/charts/ChartCard";

function AnalyticsSection({ transactions, categories }) {
  const catData = useMemo(
    () =>
      categories
        .map((c) => ({
          name: c.name,
          total: transactions.filter((t) => t.category === c.name && t.type === "expense").reduce((a, t) => a + t.amount, 0),
          fill: c.color,
        }))
        .filter((c) => c.total > 0),
    [categories, transactions]
  );

  return (
    <ChartCard title="Gasto por categoria" height={300}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={catData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} width={95} />
          <Tooltip contentStyle={{ background: "rgba(15,15,25,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
          <Bar dataKey="total" radius={[0, 6, 6, 0]}>
            {catData.map((c) => <Cell key={c.name} fill={c.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default memo(AnalyticsSection);
