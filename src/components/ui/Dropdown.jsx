import { tokens } from "@/styles/tokens";

export default function Dropdown({ value, onChange, options, style = {}, ariaLabel = "Dropdown" }) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.color.panelBorder}`,
        background: "rgba(255,255,255,0.04)",
        color: tokens.color.text,
        fontSize: tokens.typography.body,
        outline: "none",
        ...style,
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
