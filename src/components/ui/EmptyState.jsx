import { useTheme } from "@/context/ThemeContext";

export default function EmptyState({ text = "Sin resultados" }) {
  const { tokens } = useTheme();
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        textAlign: "center",
        padding: 48,
        color: tokens.text.tertiary,
        fontSize: 14,
        border: `1px dashed ${tokens.border.default}`,
        borderRadius: 14,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 10 }}>◌</div>
      {text}
    </div>
  );
}
