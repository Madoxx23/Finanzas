import SkeletonBlock from "@/components/ui/SkeletonBlock";

export default function LoadingState({ text = "Cargando..." }) {
  return (
    <div style={{ padding: 22 }}>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 12 }}>{text}</div>
      <div style={{ display: "grid", gap: 8 }}>
        <SkeletonBlock height={14} />
        <SkeletonBlock height={14} style={{ width: "92%" }} />
        <SkeletonBlock height={14} style={{ width: "78%" }} />
        <SkeletonBlock height={48} />
      </div>
    </div>
  );
}
