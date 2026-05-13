import { memo, useMemo } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import ChartCard from "@/components/charts/ChartCard";
import EmptyState from "@/components/ui/EmptyState";
import { fmtShort } from "@/data/financeData";
import { useIsMobile } from "@/hooks/useIsMobile";

function AnalyticsSection({ transactions, categories, tokens }) {
  const isMobile = useIsMobile();

  const catData = useMemo(
    () =>
      categories
        .map((c) => ({
          name:  c.name,
          total: transactions
            .filter((t) => t.category === c.name && t.type === "expense")
            .reduce((a, t) => a + t.amount, 0),
          fill: c.color,
        }))
        .filter((c) => c.total > 0)
        .sort((a, b) => b.total - a.total),
    [categories, transactions],
  );

  if (catData.length === 0) {
    return (
      <ChartCard title="Gasto por categoría" height={200}>
        <EmptyState text="Sin gastos registrados. ¡Agrega transacciones!" />
      </ChartCard>
    );
  }

  const chartHeight = Math.max(isMobile ? 200 : 260, catData.length * (isMobile ? 38 : 44));
  const yAxisWidth  = isMobile ? 80 : 100;

  return (
    <ChartCard title="Gasto por categoría" height={chartHeight}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={catData}
          layout="vertical"
          margin={{ top: 4, right: isMobile ? 16 : 32, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={tokens.chart.grid} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: tokens.chart.tick, fontSize: isMobile ? 10 : 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => fmtShort(v)}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: tokens.chart.tick, fontSize: isMobile ? 11 : 12 }}
            axisLine={false}
            tickLine={false}
            width={yAxisWidth}
          />
          <Tooltip
            contentStyle={{
              background:   tokens.chart.tooltip.bg,
              border:       `1px solid ${tokens.chart.tooltip.border}`,
              borderRadius: 12,
              color:        tokens.text.primary,
              fontSize:     13,
            }}
            formatter={(v) => [`$${v.toLocaleString()}`, "Total"]}
          />
          <Bar dataKey="total" radius={[0, 6, 6, 0]}>
            {catData.map((c) => <Cell key={c.name} fill={c.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default memo(AnalyticsSection);
