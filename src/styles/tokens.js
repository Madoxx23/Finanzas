export const tokens = {
  color: {
    bg:          "#f5f5f7",
    surface:     "#ffffff",
    text:        "#1a1a1f",
    textMuted:   "rgba(26,26,31,0.45)",
    panel:       "rgba(255,255,255,0.9)",
    panelBorder: "rgba(0,0,0,0.08)",
    accent:      "#4f46e5",
    accentSoft:  "rgba(79,70,229,0.09)",
    success:     "#059669",
    danger:      "#e11d48",
  },
  spacing: {
    xs:  6,
    sm:  10,
    md:  12,
    lg:  16,
    xl:  20,
    xxl: 24,
  },
  radius: {
    sm:   10,
    md:   12,
    lg:   16,
    xl:   22,
    pill: 999,
  },
  shadow: {
    card:  "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
    float: "0 8px 24px rgba(79,70,229,0.28)",
    modal: "0 24px 64px rgba(0,0,0,0.18)",
  },
  gradient: {
    primary: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    modal:   "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,248,252,0.98))",
  },
  typography: {
    label: 12,
    body:  14,
    title: 16,
    stat:  26,
  },
  motion: {
    fast:   0.18,
    normal: 0.24,
    spring: { type: "spring", stiffness: 320, damping: 30 },
  },
  z: {
    navMobile: 1200,
    modal:     1300,
  },
};
