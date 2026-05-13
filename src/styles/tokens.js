export const tokens = {
  color: {
    bg: "#0a0a0f",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.45)",
    panel: "rgba(255,255,255,0.03)",
    panelBorder: "rgba(255,255,255,0.07)",
    accent: "#6366f1",
    accentSoft: "rgba(99,102,241,0.15)",
    success: "#10b981",
    danger: "#f43f5e",
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  radius: {
    sm: 10,
    md: 12,
    lg: 16,
    xl: 22,
    pill: 999,
  },
  shadow: {
    card: "0 12px 40px rgba(0,0,0,0.2)",
    float: "0 8px 30px rgba(99,102,241,0.35)",
    modal: "0 -20px 80px rgba(0,0,0,0.4)",
  },
  gradient: {
    primary: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    modal: "linear-gradient(135deg, rgba(15,15,20,0.98), rgba(20,20,30,0.98))",
  },
  typography: {
    label: 12,
    body: 14,
    title: 16,
    stat: 26,
  },
  motion: {
    fast: 0.18,
    normal: 0.24,
    spring: { type: "spring", stiffness: 320, damping: 30 },
  },
  z: {
    navMobile: 1200,
    modal: 1300,
  },
};
