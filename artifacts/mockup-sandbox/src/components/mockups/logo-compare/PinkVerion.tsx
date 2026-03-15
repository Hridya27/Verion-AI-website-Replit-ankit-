import { motion } from "framer-motion";

const PINK = "#D4196A";
const BLACK = "#111827";

function BreathingBars() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "2.5px", height: "16px", flexShrink: 0 }}>
      <motion.span
        animate={{ scaleY: [0.35, 1, 0.35] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "3px", height: "16px", borderRadius: "99px", backgroundColor: BLACK, display: "block", transformOrigin: "center" }}
      />
      <motion.span
        animate={{ scaleY: [1, 0.35, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "3px", height: "16px", borderRadius: "99px", backgroundColor: PINK, display: "block", transformOrigin: "center" }}
      />
    </span>
  );
}

const FS = 52;

export function PinkVerion() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "32px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <span
        style={{
          fontWeight: 800,
          fontSize: `${FS}px`,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ color: PINK }}>Verion</span>
        <BreathingBars />
        <span style={{ color: BLACK }}>ai</span>
      </span>

      <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: "#9CA3AF", textTransform: "uppercase" }}>
        Reverse — Pink Verion, Black ai
      </span>
    </div>
  );
}
