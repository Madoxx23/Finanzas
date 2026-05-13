import { useTheme } from "@/context/ThemeContext";

export default function Dropdown({
  value,
  onChange,
  options,
  style = {},
  ariaLabel = "Dropdown",
}) {
  const { tokens } = useTheme();
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "10px 12px",
        borderRadius: 12,
        border: `1px solid ${tokens.border.default}`,
        background: tokens.input.bg,
        color: tokens.input.color,
        /* fontSize must be 16px on mobile to prevent iOS auto-zoom */
        fontSize: 14,
        outline: "none",
        cursor: "pointer",
        colorScheme: tokens.input.colorScheme,
        minWidth: 0,
        maxWidth: "100%",
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
