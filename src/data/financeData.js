export const SEED_TRANSACTIONS = [
  { id: "t1", name: "Salario", amount: 4500000, type: "income", category: "Trabajo", method: "Transferencia", date: "2025-05-05", note: "Salario mensual" },
  { id: "t2", name: "Mercado", amount: 180000, type: "expense", category: "Comida", method: "Debito", date: "2025-05-07", note: "" },
  { id: "t3", name: "Netflix", amount: 45000, type: "expense", category: "Suscripciones", method: "Credito", date: "2025-05-08", note: "" },
  { id: "t4", name: "Rappi", amount: 62000, type: "expense", category: "Comida", method: "App", date: "2025-05-10", note: "Pedido a domicilio" },
  { id: "t5", name: "Gym", amount: 90000, type: "expense", category: "Salud", method: "Debito", date: "2025-05-12", note: "" },
];

export const SEED_GOALS = [
  { id: "g1", name: "Fondo de Emergencia", target: 6000000, current: 1800000, monthly: 500000, emoji: "🛡️", color: "#6366f1", deadline: "2025-12" },
  { id: "g2", name: "Moto Honda CB300", target: 12000000, current: 3500000, monthly: 800000, emoji: "🏍️", color: "#f59e0b", deadline: "2026-06" },
];

export const SEED_SUBS = [
  { id: "s1", name: "Netflix", amount: 45000, category: "Entretenimiento", emoji: "📺", billing: "Mensual", next: "2025-06-08" },
  { id: "s2", name: "Spotify", amount: 20000, category: "Musica", emoji: "🎵", billing: "Mensual", next: "2025-06-15" },
];

export const DEFAULT_CATEGORIES = [
  { id: "c1", name: "Comida",        emoji: "🍔", color: "#f97316" },
  { id: "c2", name: "Transporte",    emoji: "🚕", color: "#3b82f6" },
  { id: "c3", name: "Trabajo",       emoji: "💼", color: "#6366f1" },
  { id: "c4", name: "Salud",         emoji: "🏥", color: "#10b981" },
  { id: "c5", name: "Suscripciones", emoji: "💳", color: "#06b6d4" },
  { id: "c6", name: "Compras",       emoji: "🛍️", color: "#ec4899" },
  { id: "c7", name: "Ahorro",        emoji: "💰", color: "#eab308" },
  { id: "c8", name: "Otros",         emoji: "✨", color: "#94a3b8" },
];

export const MONTHLY_DATA = [
  { month: "Dic", income: 6200000, expenses: 4100000 },
  { month: "Ene", income: 5300000, expenses: 2955000 },
  { month: "Feb", income: 4800000, expenses: 2700000 },
  { month: "Mar", income: 5100000, expenses: 3100000 },
  { month: "Abr", income: 4900000, expenses: 2800000 },
  { month: "May", income: 4500000, expenses: 2345000 },
];

export const NAV = [
  { id: "dashboard",     label: "Dashboard",      icon: "📊" },
  { id: "transactions",  label: "Transacciones",  icon: "💸" },
  { id: "analytics",     label: "Analiticas",     icon: "📈" },
  { id: "goals",         label: "Metas",          icon: "🎯" },
  { id: "subscriptions", label: "Suscripciones",  icon: "🔄" },
  { id: "insights",      label: "Insights",       icon: "💡" },
  { id: "months",        label: "Meses",          icon: "📅" },
  { id: "settings",      label: "Configuracion",  icon: "⚙️" },
];

export const TITLES = {
  dashboard:     "Dashboard",
  transactions:  "Transacciones",
  analytics:     "Analiticas",
  goals:         "Metas Financieras",
  subscriptions: "Suscripciones",
  insights:      "Insights",
  months:        "Gestion de Meses",
  settings:      "Configuracion",
};

export const fmtShort = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(0)}K`
    : `$${n}`;
