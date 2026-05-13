import { memo, useMemo, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import LoadingState from "@/components/ui/LoadingState";
import TxItem from "@/components/finance/TxItem";
import CategoryManager from "@/components/finance/CategoryManager";
import Dropdown from "@/components/ui/Dropdown";

function TransactionsSection({
  transactions,
  allTransactions = transactions,
  categories,
  onAdd,
  activeMonth,
  setActiveMonth,
  isLoading,
  addCategory,
  updateCategory,
  deleteCategory,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const monthOptions = useMemo(() => {
    const set = new Set(allTransactions.map((t) => (t.date || "").slice(0, 7)));
    return ["all", ...Array.from(set).filter(Boolean)];
  }, [allTransactions]);

  const filtered = useMemo(
    () =>
      transactions.filter((tx) => {
        if (filter !== "all" && tx.type !== filter) return false;
        if (search && !`${tx.name} ${tx.category}`.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [transactions, filter, search]
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 10 }}>
        <input aria-label="Buscar transacciones" placeholder="Buscar transacciones..." value={search} onChange={(e) => setSearch(e.target.value)} style={inputStyle} />
        <Dropdown
          value={activeMonth}
          onChange={setActiveMonth}
          ariaLabel="Filtrar por mes"
          options={monthOptions.map((m) => ({ value: m, label: m === "all" ? "Todos los meses" : m }))}
        />
        <Dropdown
          value={filter}
          onChange={setFilter}
          ariaLabel="Filtrar por tipo"
          options={[
            { value: "all", label: "Todos" },
            { value: "income", label: "Ingresos" },
            { value: "expense", label: "Gastos" },
            { value: "savings", label: "Ahorros" },
          ]}
        />
        <button aria-label="Agregar transaccion" onClick={onAdd} style={buttonStyle}>+ Agregar</button>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
        {isLoading ? <LoadingState /> : filtered.length === 0 ? <EmptyState /> : filtered.map((tx) => <TxItem key={tx.id} tx={tx} categories={categories} />)}
      </div>

      <CategoryManager categories={categories} addCategory={addCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: 14,
  outline: "none",
};

const buttonStyle = { ...inputStyle, cursor: "pointer", background: "rgba(99,102,241,0.18)" };

export default memo(TransactionsSection);
