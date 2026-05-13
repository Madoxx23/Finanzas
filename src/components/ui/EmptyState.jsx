export default function EmptyState({ text = "Sin resultados" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        textAlign: "center",
        padding: 48,
        color: "rgba(255,255,255,0.4)",
        fontSize: 14,
        border: "1px dashed rgba(255,255,255,0.12)",
        borderRadius: 14,
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 8 }}>◌</div>
      {text}
    </div>
  );
}
