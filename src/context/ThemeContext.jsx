import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const DARK_TOKENS = {
  bg: {
    base:     "#09090e",
    surface:  "#111118",
    elevated: "#18181f",
    subtle:   "rgba(255,255,255,0.035)",
    muted:    "rgba(255,255,255,0.06)",
    overlay:  "rgba(0,0,0,0.60)",
  },
  text: {
    primary:   "#f2f2f5",
    secondary: "rgba(242,242,245,0.60)",
    tertiary:  "rgba(242,242,245,0.35)",
    disabled:  "rgba(242,242,245,0.22)",
    onAccent:  "#ffffff",
  },
  border: {
    default: "rgba(255,255,255,0.07)",
    subtle:  "rgba(255,255,255,0.04)",
    strong:  "rgba(255,255,255,0.13)",
    focus:   "rgba(99,102,241,0.55)",
  },
  accent: {
    indigo:       "#6366f1",
    indigoDim:    "rgba(99,102,241,0.15)",
    indigoBorder: "rgba(99,102,241,0.30)",
    indigoText:   "#a5b4fc",
    green:        "#10b981",
    greenDim:     "rgba(16,185,129,0.12)",
    red:          "#f43f5e",
    redDim:       "rgba(244,63,94,0.12)",
    amber:        "#f59e0b",
    amberDim:     "rgba(245,158,11,0.10)",
    cyan:         "#06b6d4",
    purple:       "#8b5cf6",
    pink:         "#ec4899",
  },
  chart: {
    income:          "#10b981",
    expense:         "#f43f5e",
    savings:         "#6366f1",
    grid:            "rgba(255,255,255,0.04)",
    tick:            "rgba(242,242,245,0.35)",
    tooltip:         { bg: "rgba(13,13,22,0.96)", border: "rgba(255,255,255,0.10)" },
    areaOpacityHigh: 0.20,
    areaOpacityLow:  0,
  },
  shadow: {
    card:      "0 2px 16px rgba(0,0,0,0.30)",
    cardHover: "0 12px 40px rgba(0,0,0,0.40)",
    modal:     "0 32px 80px rgba(0,0,0,0.55)",
    fab:       "0 8px 30px rgba(99,102,241,0.40)",
  },
  glass: {
    bg:             "linear-gradient(135deg, rgba(15,15,22,0.97) 0%, rgba(20,20,32,0.97) 100%)",
    border:         "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px) saturate(180%)",
  },
  sidebar: {
    bg:           "rgba(255,255,255,0.018)",
    activeBg:     "rgba(99,102,241,0.15)",
    activeText:   "#a5b4fc",
    inactiveText: "rgba(242,242,245,0.42)",
    hoverBg:      "rgba(255,255,255,0.04)",
    border:       "rgba(255,255,255,0.06)",
  },
  header: {
    bg:             "rgba(9,9,14,0.88)",
    backdropFilter: "blur(16px) saturate(180%)",
    border:         "rgba(255,255,255,0.06)",
  },
  input: {
    bg:          "rgba(255,255,255,0.04)",
    border:      "rgba(255,255,255,0.08)",
    color:       "#f2f2f5",
    placeholder: "rgba(242,242,245,0.32)",
    colorScheme: "dark",
  },
  scrollbar: {
    thumb: "rgba(255,255,255,0.10)",
    track: "transparent",
  },
};

export const LIGHT_TOKENS = {
  bg: {
    base:     "#f5f5f7",
    surface:  "#ffffff",
    elevated: "#ffffff",
    subtle:   "rgba(0,0,0,0.025)",
    muted:    "rgba(0,0,0,0.050)",
    overlay:  "rgba(0,0,0,0.32)",
  },
  text: {
    primary:   "#1a1a1f",
    secondary: "rgba(26,26,31,0.58)",
    tertiary:  "rgba(26,26,31,0.38)",
    disabled:  "rgba(26,26,31,0.24)",
    onAccent:  "#ffffff",
  },
  border: {
    default: "rgba(0,0,0,0.08)",
    subtle:  "rgba(0,0,0,0.05)",
    strong:  "rgba(0,0,0,0.13)",
    focus:   "rgba(79,70,229,0.50)",
  },
  accent: {
    indigo:       "#4f46e5",
    indigoDim:    "rgba(79,70,229,0.09)",
    indigoBorder: "rgba(79,70,229,0.22)",
    indigoText:   "#4f46e5",
    green:        "#059669",
    greenDim:     "rgba(5,150,105,0.09)",
    red:          "#e11d48",
    redDim:       "rgba(225,29,72,0.08)",
    amber:        "#d97706",
    amberDim:     "rgba(217,119,6,0.09)",
    cyan:         "#0891b2",
    purple:       "#7c3aed",
    pink:         "#db2777",
  },
  chart: {
    income:          "#059669",
    expense:         "#e11d48",
    savings:         "#4f46e5",
    grid:            "rgba(0,0,0,0.05)",
    tick:            "rgba(26,26,31,0.40)",
    tooltip:         { bg: "rgba(255,255,255,0.98)", border: "rgba(0,0,0,0.10)" },
    areaOpacityHigh: 0.15,
    areaOpacityLow:  0,
  },
  shadow: {
    card:      "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
    cardHover: "0 8px 32px rgba(0,0,0,0.12)",
    modal:     "0 24px 64px rgba(0,0,0,0.18)",
    fab:       "0 8px 24px rgba(79,70,229,0.28)",
  },
  glass: {
    bg:             "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,248,252,0.98) 100%)",
    border:         "rgba(0,0,0,0.08)",
    backdropFilter: "blur(20px) saturate(200%)",
  },
  sidebar: {
    bg:           "rgba(0,0,0,0.012)",
    activeBg:     "rgba(79,70,229,0.09)",
    activeText:   "#4f46e5",
    inactiveText: "rgba(26,26,31,0.50)",
    hoverBg:      "rgba(0,0,0,0.04)",
    border:       "rgba(0,0,0,0.07)",
  },
  header: {
    bg:             "rgba(245,245,247,0.92)",
    backdropFilter: "blur(16px) saturate(200%)",
    border:         "rgba(0,0,0,0.07)",
  },
  input: {
    bg:          "rgba(0,0,0,0.035)",
    border:      "rgba(0,0,0,0.09)",
    color:       "#1a1a1f",
    placeholder: "rgba(26,26,31,0.36)",
    colorScheme: "light",
  },
  scrollbar: {
    thumb: "rgba(0,0,0,0.13)",
    track: "transparent",
  },
};

const ThemeContext = createContext({
  theme: "light",
  tokens: LIGHT_TOKENS,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function getInitialTheme() {
  try {
    const stored = localStorage.getItem("mf_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const tokens = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try { localStorage.setItem("mf_theme", next); } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.transition = "background-color 0.35s ease";
    document.documentElement.style.backgroundColor = tokens.bg.base;
  }, [theme, tokens.bg.base]);

  const value = useMemo(() => ({ theme, tokens, toggleTheme }), [theme, tokens, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <motion.div
        animate={{ backgroundColor: tokens.bg.base }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ minHeight: "100vh", colorScheme: theme }}
      >
        {children}
      </motion.div>
    </ThemeContext.Provider>
  );
}

export function ThemeToggle({ style = {} }) {
  const { theme, tokens, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.93 }}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        borderRadius: 10,
        border: `1px solid ${tokens.border.default}`,
        background: tokens.bg.muted,
        color: tokens.text.secondary,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 0.18s, border-color 0.18s, color 0.18s",
        userSelect: "none",
        whiteSpace: "nowrap",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = tokens.bg.subtle;
        e.currentTarget.style.borderColor = tokens.border.strong;
        e.currentTarget.style.color = tokens.text.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = tokens.bg.muted;
        e.currentTarget.style.borderColor = tokens.border.default;
        e.currentTarget.style.color = tokens.text.secondary;
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
      <span>{isDark ? "Claro" : "Oscuro"}</span>
    </motion.button>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
