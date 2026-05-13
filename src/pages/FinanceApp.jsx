import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DashboardSection from "@/pages/DashboardSection";
import TransactionsSection from "@/pages/TransactionsSection";
import QuickAddModal from "@/components/finance/QuickAddModal";
import { NAV, TITLES, SEED_TRANSACTIONS, fmtShort } from "@/data/financeData";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useGoals } from "@/hooks/useGoals";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import AppLayout from "@/layouts/AppLayout";
import CommandPalette from "@/components/quick-actions/CommandPalette";
import LoadingState from "@/components/ui/LoadingState";
import { ThemeProvider, ThemeToggle, useTheme } from "@/context/ThemeContext";

// Re-export so external code that imported from here still works
export { useTheme, DARK_TOKENS, LIGHT_TOKENS } from "@/context/ThemeContext";

const AnalyticsSection     = lazy(() => import("@/pages/AnalyticsSection"));
const GoalsSection         = lazy(() => import("@/pages/GoalsSection"));
const SubscriptionsSection = lazy(() => import("@/pages/SubscriptionsSection"));
const InsightsSection      = lazy(() => import("@/pages/InsightsSection"));
const MonthsSection        = lazy(() => import("@/pages/MonthsSection"));
const SettingsSection      = lazy(() => import("@/pages/SettingsSection"));

export default function FinanceApp() {
  return (
    <ThemeProvider>
      <FinanceAppInner />
    </ThemeProvider>
  );
}

function FinanceAppInner() {
  const { tokens } = useTheme();

  const [activeSection,      setActiveSection]      = useState("dashboard");
  const [showQuickAdd,       setShowQuickAdd]        = useState(false);
  const [showCommandPalette, setShowCommandPalette]  = useState(false);

  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const {
    filteredTransactions,
    transactions,
    setTransactions,
    deleteTransaction,
    updateTransaction,
    isLoading,
    activeMonth,
    setActiveMonth,
  } = useTransactions(SEED_TRANSACTIONS);

  const { goals,         addGoal,         updateGoal,         deleteGoal         } = useGoals();
  const { subscriptions, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();

  // ── Balance ──────────────────────────────────────────────────────────────
  const balance = useMemo(() => {
    const income   = filteredTransactions.filter((t) => t.type === "income" ).reduce((a, t) => a + t.amount, 0);
    const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    return income - expenses;
  }, [filteredTransactions]);

  // ── Quick-add handlers ───────────────────────────────────────────────────
  const openQuickAdd        = useCallback(() => setShowQuickAdd(true),  []);
  const closeQuickAdd       = useCallback(() => setShowQuickAdd(false), []);
  const closeCommandPalette = useCallback(() => setShowCommandPalette(false), []);
  const handleSave          = useCallback(
    (tx) => setTransactions((prev) => [tx, ...prev]),
    [setTransactions],
  );

  // ── Month options ────────────────────────────────────────────────────────
  const monthOptions = useMemo(() => {
    const set = new Set(transactions.map((t) => (t.date || "").slice(0, 7)).filter(Boolean));
    return ["all", ...Array.from(set).sort().reverse()];
  }, [transactions]);

  // ── Command palette actions ──────────────────────────────────────────────
  const commandActions = useMemo(
    () => [
      { id: "new-transaction", label: "Nueva transacción", run: openQuickAdd },
      ...NAV.map((n) => ({
        id:    `goto-${n.id}`,
        label: `Ir a ${n.label}`,
        run:   () => setActiveSection(n.id),
      })),
    ],
    [openQuickAdd],
  );

  // ── Keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      const isInput =
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" ||
         t.tagName === "SELECT" || t.isContentEditable);
      const isCmd = e.metaKey || e.ctrlKey;

      if (isCmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommandPalette((v) => !v);
      }
      if (e.key.toLowerCase() === "n" && !isCmd && !isInput) setShowQuickAdd(true);
      if (e.key === "Escape") { setShowQuickAdd(false); setShowCommandPalette(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Section router ───────────────────────────────────────────────────────
  const sectionNode = useMemo(() => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardSection
            transactions={filteredTransactions}
            categories={categories}
            tokens={tokens}
          />
        );
      case "transactions":
        return (
          <TransactionsSection
            transactions={filteredTransactions}
            allTransactions={transactions}
            categories={categories}
            onAdd={openQuickAdd}
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
            activeMonth={activeMonth}
            setActiveMonth={setActiveMonth}
            isLoading={isLoading}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            tokens={tokens}
          />
        );
      case "analytics":
        return (
          <AnalyticsSection
            transactions={filteredTransactions}
            categories={categories}
            tokens={tokens}
          />
        );
      case "goals":
        return (
          <GoalsSection
            goals={goals}
            addGoal={addGoal}
            updateGoal={updateGoal}
            deleteGoal={deleteGoal}
            tokens={tokens}
          />
        );
      case "subscriptions":
        return (
          <SubscriptionsSection
            subscriptions={subscriptions}
            addSubscription={addSubscription}
            updateSubscription={updateSubscription}
            deleteSubscription={deleteSubscription}
            tokens={tokens}
          />
        );
      case "insights":
        return (
          <InsightsSection
            transactions={filteredTransactions}
            subscriptions={subscriptions}
            tokens={tokens}
          />
        );
      case "months":
        return (
          <MonthsSection
            activeMonth={activeMonth}
            setActiveMonth={setActiveMonth}
            transactions={transactions}
            onNavigate={setActiveSection}
            tokens={tokens}
          />
        );
      default:
        return <SettingsSection transactions={transactions} tokens={tokens} />;
    }
  }, [
    activeSection, filteredTransactions, categories, activeMonth, setActiveMonth,
    isLoading, addCategory, updateCategory, deleteCategory, monthOptions,
    transactions, openQuickAdd, tokens,
    goals, addGoal, updateGoal, deleteGoal,
    subscriptions, addSubscription, updateSubscription, deleteSubscription,
    deleteTransaction, updateTransaction,
  ]);

  return (
    <AppLayout
      title={TITLES[activeSection]}
      balanceLabel={fmtShort(balance)}
      navItems={NAV}
      activeSection={activeSection}
      onSelectSection={setActiveSection}
      onQuickAdd={openQuickAdd}
      tokens={tokens}
      themeToggle={<ThemeToggle />}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          exit={{    opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Suspense fallback={<LoadingState text="Cargando sección..." />}>
            {sectionNode}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {showQuickAdd && (
        <QuickAddModal
          onClose={closeQuickAdd}
          onSave={handleSave}
          categories={categories}
          activeMonth={activeMonth}
          tokens={tokens}
        />
      )}

      <CommandPalette
        open={showCommandPalette}
        onClose={closeCommandPalette}
        actions={commandActions}
        tokens={tokens}
      />
    </AppLayout>
  );
}
