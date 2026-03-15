const PINK = "#D4196A";
const PURPLE = "hsl(262, 83%, 55%)";
const BLACK = "#111827";

function CustomI({ stemColor, dotColor, size }: { stemColor: string; dotColor: string; size: number }) {
  const dotSize = size * 0.18;
  const stemW = size * 0.12;
  const stemH = size * 0.46;
  const gap = size * 0.06;
  const totalH = dotSize + gap + stemH;

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", height: `${totalH}px`, verticalAlign: "bottom" }}>
      <span style={{ width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: "50%", backgroundColor: dotColor, flexShrink: 0 }} />
      <span style={{ height: `${gap}px`, flexShrink: 0 }} />
      <span style={{ width: `${stemW}px`, height: `${stemH}px`, borderRadius: "2px", backgroundColor: stemColor, flexShrink: 0 }} />
    </span>
  );
}

const FS = 52;

export function PurpleNoBars() {
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
          gap: 0,
        }}
      >
        <span style={{ color: PURPLE, display: "inline-flex", alignItems: "center" }}>
          <span>Ver</span>
          <CustomI stemColor={PURPLE} dotColor={PINK} size={FS} />
          <span>on</span>
        </span>
        <span style={{ color: PINK, display: "inline-flex", alignItems: "center" }}>
          <span>a</span>
          <CustomI stemColor={PINK} dotColor={BLACK} size={FS} />
        </span>
      </span>

      <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: "#9CA3AF", textTransform: "uppercase" }}>
        Proposal — Purple, No Bars
      </span>

      <div style={{ display: "flex", gap: "20px", fontSize: "11px", color: "#9CA3AF" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: PINK, display: "inline-block" }} />
          Verion dot
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: BLACK, display: "inline-block" }} />
          ai dot
        </span>
      </div>
    </div>
  );
}
