import { useTheme } from "@/context/ThemeContext";

export default function LoadingState({ text = "Cargando..." }) {
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
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 10, opacity: 0.6 }}>⏳</div>
      {text}
    </div>
  );
}
