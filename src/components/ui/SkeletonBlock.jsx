export default function SkeletonBlock({ height = 16, radius = 10, style = {} }) {
  return (
    <div
      style={{
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
        backgroundSize: "200% 100%",
        animation: "mfPulse 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}
