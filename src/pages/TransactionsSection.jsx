import { memo, useMemo, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import LoadingState from "@/components/ui/LoadingState";
import TxItem from "@/components/finance/TxItem";
import CategoryManager from "@/components/finance/CategoryManager";
import Dropdown from "@/components/ui/Dropdown";
import { useIsMobile } from "@/hooks/useIsMobile";

function TransactionsSection({
  transactions,
  allTransactions = transactions,
  categories,
  onAdd,
  onDelete,
  activeMonth,
  setActiveMonth,
  isLoading,
  addCategory,
  updateCategory,
  deleteCategory,
  tokens,
}) {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const inp = {
    padding: "10px 12px",
    borderRadius: 12,
    border: `1px solid ${tokens.border.default}`,
    background: tokens.input.bg,
    color: tokens.input.color,
    fontSize: 14,
    outline: "none",
    colorScheme: tokens.input.colorScheme,
    minWidth: 0,
  };

  const monthOptions = useMemo(() => {
    const set = new Set(allTransactions.map((t) => (t.date || "").slice(0, 7)));
    return ["all", ...Array.from(set).filter(Boolean).sort().reverse()];
  }, [allTransactions]);

  const filtered = useMemo(
    () =>
      transactions.filter((tx) => {
        if (filter !== "all" && tx.type !== filter) return false;
        if (search && !`${tx.name} ${tx.category}`.toLowerCase().includes(search.toLowerCase()))
          return false;
        return true;
      }),
    [transactions, filter, search],
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Filters — stacked on mobile */}
      {isMobile ? (
        <div style={{ display: "grid", gap: 8 }}>
          <input
            aria-label="Buscar transacciones"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inp, width: "100%" }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Dropdown
              value={activeMonth}
              onChange={setActiveMonth}
              ariaLabel="Filtrar por mes"
              options={monthOptions.map((m) => ({ value: m, label: m === "all" ? "Todos" : m }))}
            />
            <Dropdown
              value={filter}
              onChange={setFilter}
              ariaLabel="Filtrar por tipo"
              options={[
                { value: "all",     label: "Todos"    },
                { value: "income",  label: "Ingresos" },
                { value: "expense", label: "Gastos"   },
              ]}
            />
          </div>
          <button
            aria-label="Agregar transaccion"
            onClick={onAdd}
            style={{
              ...inp,
              cursor: "pointer",
              background: tokens.accent.indigoDim,
              color:      tokens.accent.indigoText,
              border:     `1px solid ${tokens.accent.indigoBorder}`,
              fontWeight: 600,
              textAlign:  "center",
            }}
          >
            + Nueva transacción
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 10 }}>
          <input
            aria-label="Buscar transacciones"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inp, width: "100%" }}
          />
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
              { value: "all",     label: "Todos"    },
              { value: "income",  label: "Ingresos" },
              { value: "expense", label: "Gastos"   },
              { value: "savings", label: "Ahorros"  },
            ]}
          />
          <button
            aria-label="Agregar transaccion"
            onClick={onAdd}
            style={{
              ...inp,
              cursor: "pointer",
              background: tokens.accent.indigoDim,
              color:      tokens.accent.indigoText,
              border:     `1px solid ${tokens.accent.indigoBorder}`,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            + Agregar
          </button>
        </div>
      )}

      {/* Transaction list */}
      <div
        style={{
          background:   tokens.bg.surface,
          border:       `1px solid ${tokens.border.default}`,
          borderRadius: 16,
          overflow:     "hidden",
          boxShadow:    tokens.shadow.card,
        }}
      >
        {isLoading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState text="Sin transacciones. ¡Agrega una!" />
        ) : (
          filtered.map((tx) => (
            <TxItem key={tx.id} tx={tx} categories={categories} onDelete={onDelete} />
          ))
        )}
      </div>

      {/* Category manager */}
      <CategoryManager
        categories={categories}
        addCategory={addCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
      />
    </div>
  );
}

export default memo(TransactionsSection);
