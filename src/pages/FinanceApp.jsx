import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DashboardSection from "@/pages/DashboardSection";
import TransactionsSection from "@/pages/TransactionsSection";
import QuickAddModal from "@/components/finance/QuickAddModal";
import { NAV, SEED_GOALS, SEED_SUBS, SEED_TRANSACTIONS, TITLES, fmtShort } from "@/data/financeData";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import AppLayout from "@/layouts/AppLayout";
import CommandPalette from "@/components/quick-actions/CommandPalette";
import LoadingState from "@/components/ui/LoadingState";

const AnalyticsSection = lazy(() => import("@/pages/AnalyticsSection"));
const GoalsSection = lazy(() => import("@/pages/GoalsSection"));
const SubscriptionsSection = lazy(() => import("@/pages/SubscriptionsSection"));
const InsightsSection = lazy(() => import("@/pages/InsightsSection"));
const MonthsSection = lazy(() => import("@/pages/MonthsSection"));
const SettingsSection = lazy(() => import("@/pages/SettingsSection"));

export default function FinanceApp() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { filteredTransactions, transactions, setTransactions, isLoading, activeMonth, setActiveMonth } = useTransactions(SEED_TRANSACTIONS);

  const balance = useMemo(() => {
    const income = filteredTransactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    return income - expenses + 8500000;
  }, [filteredTransactions]);

  const openQuickAdd = useCallback(() => setShowQuickAdd(true), []);
  const closeQuickAdd = useCallback(() => setShowQuickAdd(false), []);
  const closeCommandPalette = useCallback(() => setShowCommandPalette(false), []);
  const handleSave = useCallback((tx) => setTransactions((prev) => [tx, ...prev]), [setTransactions]);
  const monthOptions = useMemo(() => {
    const set = new Set(transactions.map((t) => (t.date || "").slice(0, 7)).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [transactions]);

  const commandActions = useMemo(
    () => [
      { id: "new-transaction", label: "New transaction", run: openQuickAdd },
      ...NAV.map((n) => ({ id: `goto-${n.id}`, label: `Go to ${n.label}`, run: () => setActiveSection(n.id) })),
    ],
    [openQuickAdd]
  );

  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      const isCmd = event.metaKey || event.ctrlKey;
      if (isCmd && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowCommandPalette((v) => !v);
      }
      if (event.key.toLowerCase() === "n" && !isCmd && !isTypingTarget) {
        setShowQuickAdd(true);
      }
      if (event.key === "Escape") {
        setShowQuickAdd(false);
        setShowCommandPalette(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectionNode = useMemo(() => {
    if (activeSection === "dashboard") return <DashboardSection transactions={filteredTransactions} categories={categories} />;
    if (activeSection === "transactions") {
      return (
        <TransactionsSection
          transactions={filteredTransactions}
          allTransactions={transactions}
          categories={categories}
          onAdd={openQuickAdd}
          activeMonth={activeMonth}
          setActiveMonth={setActiveMonth}
          isLoading={isLoading}
          addCategory={addCategory}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
        />
      );
    }
    if (activeSection === "analytics") return <AnalyticsSection transactions={filteredTransactions} categories={categories} />;
    if (activeSection === "goals") return <GoalsSection goals={SEED_GOALS} />;
    if (activeSection === "subscriptions") return <SubscriptionsSection subscriptions={SEED_SUBS} />;
    if (activeSection === "insights") return <InsightsSection />;
    if (activeSection === "months") return <MonthsSection activeMonth={activeMonth} setActiveMonth={setActiveMonth} monthOptions={monthOptions} />;
    return <SettingsSection />;
  }, [
    activeSection,
    filteredTransactions,
    categories,
    activeMonth,
    setActiveMonth,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory,
    monthOptions,
    transactions,
    openQuickAdd,
  ]);

  return (
    <AppLayout
      title={TITLES[activeSection]}
      balanceLabel={fmtShort(balance)}
      navItems={NAV}
      activeSection={activeSection}
      onSelectSection={setActiveSection}
      onQuickAdd={openQuickAdd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <Suspense fallback={<LoadingState text="Cargando seccion..." />}>{sectionNode}</Suspense>
        </motion.div>
      </AnimatePresence>

      {showQuickAdd && <QuickAddModal onClose={closeQuickAdd} onSave={handleSave} categories={categories} />}
      <CommandPalette open={showCommandPalette} onClose={closeCommandPalette} actions={commandActions} />
    </AppLayout>
  );
}
