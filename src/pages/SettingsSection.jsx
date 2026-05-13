import { memo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ThemeToggle } from "@/context/ThemeContext";

function SettingsSection({ transactions, tokens }) {
  const [exportMsg, setExportMsg] = useState("");

  const flash = (msg) => {
    setExportMsg(msg);
    setTimeout(() => setExportMsg(""), 3000);
  };

  const exportCSV = () => {
    const headers = "id,nombre,monto,tipo,categoria,metodo,fecha,nota";
    const rows = transactions.map(
      (t) =>
        `${t.id},"${t.name}",${t.amount},${t.type},"${t.category}","${t.method ?? ""}",${t.date},"${t.note ?? ""}"`,
    );
    downloadBlob([headers, ...rows].join("\n"), "text/csv", "finanzas.csv");
    flash("✓ CSV exportado");
  };

  const exportJSON = () => {
    downloadBlob(JSON.stringify(transactions, null, 2), "application/json", "finanzas.json");
    flash("✓ JSON exportado");
  };

  const clearAll = () => {
    if (!window.confirm("¿Eliminar TODOS los datos? Esta acción no se puede deshacer.")) return;
    ["mf_transactions", "mf_goals", "mf_subscriptions", "mf_categories"].forEach((k) =>
      localStorage.removeItem(k),
    );
    window.location.reload();
  };

  const divider = { borderBottom: `1px solid ${tokens.border.subtle}`, margin: "2px 0" };

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 640 }}>
      {/* Appearance */}
      <GlassCard>
        <SectionTitle label="Apariencia" tokens={tokens} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <span style={{ fontSize: 14, color: tokens.text.secondary }}>Tema</span>
          <ThemeToggle />
        </div>
      </GlassCard>

      {/* Profile */}
      <GlassCard>
        <SectionTitle label="Perfil" tokens={tokens} />
        <Row label="Moneda"           value="COP — Peso Colombiano" tokens={tokens} />
        <div style={divider} />
        <Row label="Zona horaria"     value="America/Bogota"        tokens={tokens} />
        <div style={divider} />
        <Row label="Transacciones"    value={`${transactions.length} registros`} tokens={tokens} />
      </GlassCard>

      {/* Export */}
      <GlassCard>
        <SectionTitle label="Exportar Datos" tokens={tokens} />
        <p style={{ fontSize: 13, color: tokens.text.tertiary, margin: "0 0 14px" }}>
          Descarga tus transacciones en el formato que prefieras.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <PrimaryButton onClick={exportCSV}  ariaLabel="Exportar CSV">📄 Exportar CSV</PrimaryButton>
          <PrimaryButton onClick={exportJSON} ariaLabel="Exportar JSON">📦 Exportar JSON</PrimaryButton>
        </div>
        {exportMsg && (
          <div style={{ marginTop: 10, fontSize: 13, color: tokens.accent.green, fontWeight: 600 }}>
            {exportMsg}
          </div>
        )}
      </GlassCard>

      {/* Storage */}
      <GlassCard>
        <SectionTitle label="Almacenamiento" tokens={tokens} />
        <Row label="Persistencia"           value="localStorage (local)"    tokens={tokens} />
        <div style={divider} />
        <Row label="Sync Supabase"          value="Disponible vía .env"     tokens={tokens} />
        <div style={divider} />
        <Row label="Atajos de teclado"      value="N = nueva tx · Ctrl+K = búsqueda" tokens={tokens} />
      </GlassCard>

      {/* Danger zone */}
      <GlassCard>
        <SectionTitle label="Zona Peligrosa" tokens={tokens} />
        <p style={{ fontSize: 13, color: tokens.text.tertiary, margin: "0 0 14px" }}>
          Elimina todos los datos guardados localmente (transacciones, metas, suscripciones).
        </p>
        <button
          onClick={clearAll}
          style={{
            padding: "8px 16px",
            borderRadius: 10,
            background: tokens.accent.redDim,
            border: `1px solid ${tokens.accent.red}40`,
            color: tokens.accent.red,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          🗑️ Borrar todos los datos
        </button>
      </GlassCard>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function SectionTitle({ label, tokens }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: tokens.text.tertiary,
        textTransform: "uppercase",
        fontWeight: 700,
        letterSpacing: "0.06em",
        marginBottom: 12,
      }}
    >
      {label}
    </div>
  );
}

function Row({ label, value, tokens }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
      <span style={{ color: tokens.text.secondary }}>{label}</span>
      <span style={{ color: tokens.text.tertiary,  textAlign: "right", maxWidth: "55%" }}>{value}</span>
    </div>
  );
}

function downloadBlob(content, type, filename) {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default memo(SettingsSection);
