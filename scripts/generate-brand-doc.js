/**
 * generate-brand-doc.js
 * Generates brand-identity/VerionAI-Brand-Identity.docx
 *
 * All tokens are verified against source files by verify-brand-tokens.js.
 * Run `node scripts/verify-brand-tokens.js` before regenerating to confirm
 * all values still match the live codebase.
 *
 * Verified source file values (verify-brand-tokens.js: 23/23 pass):
 *   index.css       --radius: 0.5rem (8px)
 *   index.css       .section-alt bg: hsl(220 14% 97%)
 *   index.css       --card: hsl(0 0% 98%)
 *   index.css       --border: hsl(220 13% 91%)
 *   index.css       --muted: hsl(220 14% 96%)
 *   index.css       --primary: hsl(328 82% 52%)
 *   index.css       --accent: hsl(262 83% 58%)
 *   index.css       --radius-md: calc(var(--radius) - 2px) = 6px
 *   index.css       --radius-lg: var(--radius) = 8px
 *   index.css       --radius-xl: calc(var(--radius) + 4px) = 12px
 *   index.css       .enterprise-card: bg-white border border-gray-200 rounded-lg shadow-sm
 *   home.tsx        pink = "#D4196A"
 *   home.tsx        purple = "hsl(262 83% 55%)"
 *   home.tsx        hero h1: text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08] text-gray-950
 *   footer.tsx      BLACK = "#111827"  PINK = "#D4196A"
 *   footer.tsx      logo: fontWeight 800, fontSize 18px, letterSpacing -0.03em
 *   footer.tsx      bars: width 2px, height 11px, gap 2px, bar-1 = BLACK, bar-2 = PINK
 */
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType, convertInchesToTwip,
  Header, Footer as DocFooter,
} from "docx";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "brand-identity");
mkdirSync(OUT_DIR, { recursive: true });

// ─── Design tokens — exact values extracted from source, confirmed by verify-brand-tokens.js
// ── Pink note ──────────────────────────────────────────────────────────────
// Two pink values coexist in the codebase:
//   A) JS inline constant: const pink = "#D4196A"  (home.tsx, footer.tsx, solutions.tsx)
//      Used for ALL custom-branded elements (CTAs, emphasis text, bullet dots, logo).
//      This is the authoritative brand pink.
//   B) CSS custom property: --primary: hsl(328 82% 52%) → computed #E9208B
//      Used only by Shadcn UI system components (not visible in custom-built sections).
// Brand identity = #D4196A. Do NOT use #E9208B in new branded assets.

const PINK    = "D4196A";   // const pink = "#D4196A" in home.tsx / footer.tsx (AUTHORITATIVE brand pink)
const PURPLE  = "732DEB";   // hsl(262 83% 55%) computed exactly (verified by verify-brand-tokens.js)
const BLACK   = "111827";   // const BLACK = "#111827" in footer.tsx
const GRAY400 = "9CA3AF";   // Tailwind gray-400
const GRAY500 = "6B7280";   // Tailwind gray-500 / --muted-foreground
const GRAY700 = "374151";   // Tailwind gray-700 (nav link colour)
const GRAY200 = "E5E7EB";   // Tailwind gray-200 = --border: hsl(220 13% 91%) computed
const GRAY300 = "D1D5DB";   // Tailwind gray-300 (secondary button border)
const WHITE   = "FFFFFF";   // --background: hsl(0 0% 100%)
const CARD_BG = "FAFAFA";   // --card: hsl(0 0% 98%) computed
const DARK    = "0A0A0A";   // Verion Engage page dark background (hardcoded in page)

// ─── Helpers ─────────────────────────────────────────────────────────────────
const thinBorder      = { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" };
const thinCellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

const font = "Calibri";

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, color: BLACK, bold: true, size: 40, font })],
    spacing: { before: 0, after: 160 },
  });
}

function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: BLACK, bold: true, size: 26, font })],
    spacing: { before: 300, after: 100 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, color: opts.color ?? GRAY500, size: 20, bold: opts.bold ?? false, font })],
    spacing: { before: 60, after: 60 },
  });
}

function mono(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: GRAY700, size: 18, font: "Courier New" })],
    spacing: { before: 40, after: 40 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text: `• ${text}`, color: GRAY500, size: 20, font })],
    spacing: { before: 40, after: 40 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } },
    spacing: { before: 240, after: 240 },
    text: "",
  });
}

function eyebrow(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), color: PURPLE, bold: true, size: 16, characterSpacing: 150, font })],
    spacing: { before: 360, after: 80 },
  });
}

function tHead(cols, widths) {
  return new TableRow({
    tableHeader: true,
    children: cols.map((col, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.SOLID, fill: "F3F4F6", color: "F3F4F6" },
      borders: thinCellBorders,
      children: [new Paragraph({ children: [new TextRun({ text: col, color: BLACK, bold: true, size: 18, font })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })],
    })),
  });
}

function tRow(cells, widths, shade) {
  return new TableRow({
    children: cells.map((cell, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: shade ? { type: ShadingType.SOLID, fill: "FAFAFA", color: "FAFAFA" } : undefined,
      borders: thinCellBorders,
      children: [new Paragraph({ children: [new TextRun({ text: cell, color: GRAY500, size: 18, font })], spacing: { before: 70, after: 70 }, indent: { left: convertInchesToTwip(0.1) } })],
    })),
  });
}

function swatchRow(hex, label, cssValue, usage) {
  return new TableRow({
    children: [
      new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.SOLID, fill: hex, color: hex }, borders: thinCellBorders, children: [new Paragraph({ text: "" })] }),
      new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, borders: thinCellBorders, children: [new Paragraph({ children: [new TextRun({ text: label, color: BLACK, bold: true, size: 19, font })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })] }),
      new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinCellBorders, children: [new Paragraph({ children: [new TextRun({ text: cssValue, color: GRAY400, size: 17, font: "Courier New" })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })] }),
      new TableCell({ width: { size: 43, type: WidthType.PERCENTAGE }, borders: thinCellBorders, children: [new Paragraph({ children: [new TextRun({ text: usage, color: GRAY500, size: 18, font })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })] }),
    ],
  });
}

// ─── Document ────────────────────────────────────────────────────────────────
const doc = new Document({
  creator: "VerionAI",
  title: "VerionAI Brand Identity",
  description: "Complete brand identity guidelines — verified against live codebase",
  styles: { default: { document: { run: { font, size: 20 } } } },
  sections: [{
    properties: {
      page: {
        margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1.1), right: convertInchesToTwip(1.1) },
      },
    },
    headers: {
      default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "VerionAI", color: PINK, bold: true, size: 20, font }), new TextRun({ text: "  |  Brand Identity Guidelines", color: GRAY400, size: 18, font })], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } }, spacing: { after: 120 } })] }),
    },
    footers: {
      default: new DocFooter({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "© 2026 VerionAI Pvt Ltd  —  Confidential & Internal Use Only", color: GRAY400, size: 16, font })], border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } }, spacing: { before: 120 } })] }),
    },
    children: [

      // ── COVER ────────────────────────────────────────────────────────────
      new Paragraph({ children: [new TextRun({ text: "VerionAI", color: PINK, bold: true, size: 72, font })], spacing: { before: 600, after: 0 } }),
      new Paragraph({ children: [new TextRun({ text: "Brand Identity Guidelines", color: BLACK, bold: true, size: 48, font })], spacing: { before: 40, after: 0 } }),
      new Paragraph({ children: [new TextRun({ text: "AI Consulting & Automation", color: GRAY500, size: 28, font })], spacing: { before: 120, after: 0 } }),
      new Paragraph({ children: [new TextRun({ text: "verionai.in  ·  info@verionai.in", color: GRAY400, size: 22, font })], spacing: { before: 80, after: 0 } }),
      new Paragraph({ children: [new TextRun({ text: "Version 1.0  ·  2026", color: GRAY400, size: 20, font })], spacing: { before: 40, after: 800 } }),
      new Paragraph({ text: "", pageBreakBefore: true }),

      // ── 1. BRAND OVERVIEW ───────────────────────────────────────────────
      eyebrow("01"),
      h1("Brand Overview"),
      body("VerionAI is an enterprise AI consulting and application firm. We design and deploy AI-native applications that integrate directly with existing enterprise systems — SAP, Microsoft, Oracle, and Salesforce — enabling organisations to move from idea to live application in days, not months."),
      new Paragraph({ text: "", spacing: { before: 60 } }),
      body("The brand communicates confidence, precision, and forward momentum. Every visual and editorial choice should feel like it belongs in the boardroom of a FTSE 500 company — minimal, intelligent, direct."),

      divider(),

      // ── 2. LOGO ─────────────────────────────────────────────────────────
      eyebrow("02"),
      h1("Logo"),

      h2("Wordmark Construction"),
      body("Three parts in a single inline row. All source values are from footer.tsx constants (verified):"),
      new Paragraph({ text: "", spacing: { before: 60 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Part", "Content", "Color — Light Bg", "Color — Dark Bg", "Specifications"], [9, 13, 22, 22, 34]),
          tRow(["1", '"Verion"', "#D4196A", "#D4196A (unchanged)", 'Inter, fontWeight: 800, fontSize: 18px, letterSpacing: -0.03em'], [9, 13, 22, 22, 34]),
          tRow(["2", "Breathing bars", "Bar 1: #111827  Bar 2: #D4196A", "Bar 1: #FFFFFF  Bar 2: #D4196A", "width: 2px, height: 11px, gap: 2px, borderRadius: 99px, animates scaleY"], [9, 13, 22, 22, 34], true),
          tRow(["3", '"ai"', "#111827", "#FFFFFF", "Same Inter 800, fontSize: 18px, letterSpacing: -0.03em"], [9, 13, 22, 22, 34]),
        ],
      }),
      new Paragraph({ text: "", spacing: { before: 120 } }),
      body("Container: display inline-flex, alignItems center, gap: 4px, lineHeight: 1, userSelect: none"),

      h2("Favicon / App Icon"),
      body("Pink square (#D4196A) with a white serif 'V', borderRadius: 36px on a 180×180px canvas (20% rounding). Use for browser tabs, app icons, and small digital formats only."),

      h2("Rules — Do Not"),
      bullet("Separate 'Verion' and 'ai' with a space — the breathing bars are the visual separator"),
      bullet("Recolour the #D4196A sections of the wordmark on any background"),
      bullet("Use the wordmark below 14px total height"),
      bullet("Apply drop shadows, gradients, or outlines to the wordmark"),
      bullet("Render bars as static in digital contexts — they animate (scaleY oscillation, 1.5s loop)"),

      divider(),

      // ── 3. COLOR PALETTE ────────────────────────────────────────────────
      eyebrow("03"),
      h1("Color Palette"),
      body("All values extracted and verified from index.css custom properties and page-level JS constants."),
      body("NOTE — Two pink values exist in the codebase. The authoritative brand pink is the JS inline constant #D4196A (used in all custom-built branded elements: logo, CTAs, emphasis). A separate CSS variable --primary: hsl(328 82% 52%) = #E9208B exists for the Shadcn UI component system only — it is NOT the visual brand pink and should not be used in new branded assets.", { color: "92400E" }),
      new Paragraph({ text: "", spacing: { before: 100 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Swatch", "Name", "CSS / JS Value", "Usage"], [10, 22, 28, 40]),
          swatchRow("D4196A", "VerionAI Pink",        "JS const: #D4196A  (authoritative brand pink — see note below)",    "Primary brand. CTA buttons, logo, emphasis text, active states, bullet dots"),
          swatchRow("732DEB", "Brand Purple",          "JS const: hsl(262 83% 55%) = #732DEB (exact)", "Eyebrow / category labels ONLY — always UPPERCASE + wide tracking. Never a CTA colour."),
          swatchRow("111827", "Near Black",            "#111827  (footer.tsx: const BLACK)",         "All headings, nav links, logo 'ai' on light backgrounds, dark text"),
          swatchRow("6B7280", "Body Gray",             "Tailwind gray-500  #6B7280",                 "Body text, descriptions. CSS: --muted-foreground ≈ hsl(220 9% 46%)"),
          swatchRow("9CA3AF", "Muted Gray",            "Tailwind gray-400  #9CA3AF",                 "Captions, timestamps, meta text, placeholder text"),
          swatchRow("E5E7EB", "Border Gray",           "--border: hsl(220 13% 91%)  Tailwind gray-200", "Card borders (border-gray-200), dividers, hairlines"),
          swatchRow("FAFAFA", "Card Surface",          "--card: hsl(0 0% 98%)",                      "Card backgrounds (CSS variable)"),
          swatchRow("F6F7F8", "Section Alt",           ".section-alt: hsl(220 14% 97%) = #F6F7F8 (exact)", "Alternate section backgrounds"),
          swatchRow("FFFFFF", "White",                 "--background: hsl(0 0% 100%)",               "Primary page background. Button text on pink CTAs"),
          swatchRow("0A0A0A", "Dark Surface",          "Verion Engage page only — hardcoded",         "Dark product demo surfaces only — not for general use"),
        ],
      }),
      new Paragraph({ text: "", spacing: { before: 160 } }),
      h2("Usage Rules"),
      bullet("#D4196A is the only colour used for primary CTAs"),
      bullet("hsl(262 83% 55%) is reserved exclusively for eyebrow / category labels"),
      bullet("Tinted card backgrounds use Pink at 5–8% opacity: inline style `${pink}06` to `${pink}08`"),
      bullet("Purple-tinted label pills use hsl(262 83% 55% / 0.07–0.08) background"),
      bullet("Never combine pink and purple at equal visual weight in one element"),

      divider(),

      // ── 4. TYPOGRAPHY ───────────────────────────────────────────────────
      eyebrow("04"),
      h1("Typography"),

      h2("Font Family"),
      body("Inter — Google Fonts. Required weights: 400, 500, 600, 700, 800."),
      mono("font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"),
      body("CSS custom property (index.css): --font-sans: 'Inter', sans-serif  (also --font-display)"),
      new Paragraph({ text: "", spacing: { before: 100 } }),

      h2("Type Scale — Exact Tailwind Classes from Source"),
      body("Pixel values assume 16px browser default. Tailwind class is the authoritative value — use the class name if implementing in Tailwind."),
      new Paragraph({ text: "", spacing: { before: 60 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Element", "Tailwind size class", "px (16px base)", "Weight", "Letter spacing", "Colour"], [18, 17, 11, 12, 18, 24]),
          tRow(["Hero h1 (mobile)", "text-5xl", "48px (3rem)", "700", "tracking-tight", "#111827"], [18, 17, 11, 12, 18, 24]),
          tRow(["Hero h1 (tablet)", "md:text-6xl", "60px (3.75rem)", "700", "tracking-tight", "#111827"], [18, 17, 11, 12, 18, 24], true),
          tRow(["Hero h1 (desktop)", "lg:text-[4.5rem]", "72px (4.5rem)", "700", "tracking-tight", "#111827"], [18, 17, 11, 12, 18, 24]),
          tRow(["Hero h1 line-height", "leading-[1.08]", "1.08", "—", "—", "—"], [18, 17, 11, 12, 18, 24], true),
          tRow(["Section h2", "text-3xl md:text-4xl", "30–36px", "700", "tracking-tight", "#111827"], [18, 17, 11, 12, 18, 24]),
          tRow(["Card / module h2", "text-2xl", "24px (1.5rem)", "700", "default", "#111827"], [18, 17, 11, 12, 18, 24], true),
          tRow(["Eyebrow label (span)", "text-xs", "12px (0.75rem)", "600 SemiBold", "tracking-[0.2em]", "hsl(262 83% 55%)"], [18, 17, 11, 12, 18, 24]),
          tRow(["Nav links (a)", "text-sm", "14px (0.875rem)", "500 Medium", "default", "gray-700 #374151"], [18, 17, 11, 12, 18, 24], true),
          tRow(["Section body (p)", "text-lg", "18px (1.125rem)", "400 Regular", "leading-relaxed", "gray-500 #6B7280"], [18, 17, 11, 12, 18, 24]),
          tRow(["Card body / list (p, span)", "text-sm", "14px (0.875rem)", "400 Regular", "default", "gray-500 #6B7280"], [18, 17, 11, 12, 18, 24], true),
          tRow(["Small meta / caption", "text-xs", "12px (0.75rem)", "500–600", "tracking-widest", "gray-400 #9CA3AF"], [18, 17, 11, 12, 18, 24]),
          tRow(["Button label", "text-sm", "14px (0.875rem)", "600 SemiBold", "default", "#FFFFFF or #374151"], [18, 17, 11, 12, 18, 24], true),
          tRow(["Footer logo", "fontSize: 18px (inline)", "18px", "800 ExtraBold", "letterSpacing: -0.03em", "#D4196A + #111827"], [18, 17, 11, 12, 18, 24]),
        ],
      }),

      divider(),

      // ── 5. BUTTONS ──────────────────────────────────────────────────────
      eyebrow("05"),
      h1("Buttons"),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Type", "Background", "Text colour", "Border", "Tailwind / inline specs"], [16, 16, 14, 18, 36]),
          tRow(["Primary CTA", "#D4196A", "#FFFFFF", "None", "rounded-md (6px)  h-11 (44px)  px-7 (28px h-pad)  text-sm font-semibold"], [16, 16, 14, 18, 36]),
          tRow(["Secondary / Ghost", "#FFFFFF", "#374151 (gray-700)", "border-gray-300 (#D1D5DB)", "Same rounded-md & h-11  hover:bg-gray-50"], [16, 16, 14, 18, 36], true),
          tRow(["Destructive", "#EF4444", "#FFFFFF", "None", "System error states only — not for marketing"], [16, 16, 14, 18, 36]),
        ],
      }),
      new Paragraph({ text: "", spacing: { before: 120 } }),
      body("Button border-radius source: --radius-md = calc(var(--radius) - 2px) = calc(0.5rem - 2px) = 6px"),
      body("Icon inside button: w-4 h-4 (16px), ml-1.5 (6px left margin)."),

      divider(),

      // ── 6. BORDER RADIUS SCALE ──────────────────────────────────────────
      eyebrow("06"),
      h1("Border Radius Scale"),

      body("CSS root: --radius: 0.5rem (8px). All radius utilities derive from this token (index.css verified):"),
      new Paragraph({ text: "", spacing: { before: 80 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Tailwind class", "CSS expression", "px value", "Used for"], [20, 32, 12, 36]),
          tRow(["rounded-sm", "calc(var(--radius) - 4px)", "4px", "Small status chips, micro elements"], [20, 32, 12, 36]),
          tRow(["rounded-md", "calc(var(--radius) - 2px)", "6px", "Buttons (primary & secondary), inputs, form fields"], [20, 32, 12, 36], true),
          tRow(["rounded-lg", "var(--radius)", "8px", ".enterprise-card — standard card used across the site"], [20, 32, 12, 36]),
          tRow(["rounded-xl", "calc(var(--radius) + 4px)", "12px", "Module section cards (solutions.tsx), agent cards"], [20, 32, 12, 36], true),
          tRow(["rounded-full", "9999px", "Pill", "Eyebrow label pills, tags, avatar circles"], [20, 32, 12, 36]),
        ],
      }),

      divider(),

      // ── 7. CARDS & SURFACES ─────────────────────────────────────────────
      eyebrow("07"),
      h1("Cards & Surfaces"),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Property", "Exact value", "Source"], [28, 40, 32]),
          tRow([".enterprise-card radius", "rounded-lg = 8px  (var(--radius))", "index.css: .enterprise-card @apply"], [28, 40, 32]),
          tRow([".enterprise-card background", "bg-white = #FFFFFF", "index.css: .enterprise-card @apply"], [28, 40, 32], true),
          tRow([".enterprise-card border", "border border-gray-200 = 1px solid #E5E7EB", "index.css: .enterprise-card @apply"], [28, 40, 32]),
          tRow([".enterprise-card shadow", "shadow-sm = 0 1px 2px 0 rgb(0 0 0/0.05)", "index.css: .enterprise-card @apply"], [28, 40, 32], true),
          tRow(["Module / agent card radius", "rounded-xl = 12px  (calc(--radius + 4px))", "Inline className in solutions.tsx"], [28, 40, 32]),
          tRow(["Module card hover shadow", "hover:shadow-md", "hover:shadow-md in solutions.tsx"], [28, 40, 32], true),
          tRow(["Card tint — pink", '`${pink}06` to `${pink}08` = rgba(212,25,106,0.06–0.08)', "Inline style backgroundColor in page tsx files"], [28, 40, 32]),
          tRow(["Card tint — purple", "hsl(262 83% 55% / 0.07) to 0.08", "Inline style in eyebrow pill backgrounds"], [28, 40, 32], true),
          tRow(["Section alt background", ".section-alt: hsl(220 14% 97%)", "index.css .section-alt"], [28, 40, 32]),
          tRow(["Page background", "--background: hsl(0 0% 100%) = #FFFFFF", "index.css :root"], [28, 40, 32], true),
          tRow(["Card background (CSS var)", "--card: hsl(0 0% 98%) = #FAFAFA", "index.css :root"], [28, 40, 32]),
        ],
      }),

      divider(),

      // ── 8. SPACING & LAYOUT ─────────────────────────────────────────────
      eyebrow("08"),
      h1("Spacing & Layout"),

      body("All values are Tailwind utility classes used in the live source. Pixel values assume 16px base (1rem = 16px)."),
      new Paragraph({ text: "", spacing: { before: 80 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Element", "Tailwind class", "px value", "Source"], [26, 24, 14, 36]),
          tRow(["Container padding — mobile", "px-4", "16px", "All pages: container mx-auto px-4 md:px-6"], [26, 24, 14, 36]),
          tRow(["Container padding — ≥768px", "md:px-6", "24px", "All pages: container mx-auto px-4 md:px-6"], [26, 24, 14, 36], true),
          tRow(["Section v-padding (standard)", "py-20", "80px (5rem)", "Most content sections"], [26, 24, 14, 36]),
          tRow(["Section v-padding (large)", "py-24 to py-28", "96–112px", "Hero, approach, sprint sections"], [26, 24, 14, 36], true),
          tRow(["Page top offset (nav clearance)", "pt-24", "96px", "contact.tsx, all inner pages"], [26, 24, 14, 36]),
          tRow(["Card internal padding", "p-6 to p-8", "24–32px", "enterprise-card content areas"], [26, 24, 14, 36], true),
          tRow(["Card grid gap", "gap-5", "20px (1.25rem)", "All product / agent grid layouts"], [26, 24, 14, 36]),
          tRow(["Button height", "h-11", "44px (2.75rem)", "Primary and secondary CTAs"], [26, 24, 14, 36], true),
          tRow(["Button h-padding", "px-7", "28px (1.75rem)", "Primary CTA  (px-8 = 32px on lg CTAs)"], [26, 24, 14, 36]),
          tRow(["Footer top padding", "pt-16", "64px (4rem)", "footer.tsx footer element"], [26, 24, 14, 36], true),
        ],
      }),

      divider(),

      // ── 9. VOICE & TONE ─────────────────────────────────────────────────
      eyebrow("09"),
      h1("Voice & Tone"),

      h2("Principles"),
      bullet("Direct and confident — no hedging language, no passive constructions"),
      bullet("Enterprise-first — speaks to senior business and IT decision-makers"),
      bullet("Outcomes over features — lead with the result, not the technology stack"),
      bullet("No emojis — in body copy, headlines, or CTA labels"),
      bullet("Numbers create credibility — 'in days', '5-day sprint', '98% match'"),
      bullet("Eyebrow labels are navigational, not promotional — they orient, not sell"),

      h2("Headlines — Do / Don't"),
      new Paragraph({ text: "", spacing: { before: 60 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Do ✓", "Don't ✗"], [50, 50]),
          tRow(["Designing Autonomous Enterprise", "Our AI Solution Platform"], [50, 50]),
          tRow(["Ready to Deploy", "Available for Deployment"], [50, 50], true),
          tRow(["From idea to application in days.", "We can build your application quickly."], [50, 50]),
          tRow(["The Sovereignty Guarantee", "Security Features Overview"], [50, 50], true),
          tRow(["Purpose-Built AI Agents, Ready to Deploy", "Our AI Agent Products"], [50, 50]),
        ],
      }),

      new Paragraph({ text: "", spacing: { before: 160 } }),
      h2("CTA Labels — Live Examples from Site"),
      bullet("Book a Discovery Call"),
      bullet("Explore Solutions"),
      bullet("View Architecture"),
      bullet("Talk to Us"),
      bullet("Request a Demo"),

      h2("Eyebrow Labels"),
      body("Always UPPERCASE. tracking-[0.2em] to tracking-widest. Used above headings to set category context. In purple hsl(262 83% 55%) on light backgrounds only. Examples from live site:"),
      bullet("ENTERPRISE AI CONSULTING"),
      bullet("OUR APPROACH"),
      bullet("AGENT-AS-A-SERVICE"),
      bullet("HOW IT WORKS"),

      divider(),

      // ── 10. LIGHT vs DARK ───────────────────────────────────────────────
      eyebrow("10"),
      h1("Light vs Dark Theme"),

      h2("Light (Primary — All Main Pages)"),
      bullet("Page background: --background = hsl(0 0% 100%) = #FFFFFF"),
      bullet("Section alt background: .section-alt = hsl(220 14% 97%)"),
      bullet("Headline text: #111827 (footer.tsx: const BLACK = \"#111827\")"),
      bullet("Body text: gray-500 = #6B7280"),
      bullet("Logo: 'Verion' in #D4196A · Bar 1 in #111827 · Bar 2 in #D4196A · 'ai' in #111827"),
      bullet("Primary CTA: bg #D4196A, text #FFFFFF"),

      h2("Dark (Product Demo — Verion Engage page only)"),
      bullet("Page background: #0A0A0A (hardcoded in page)"),
      bullet("All body text: #FFFFFF and white-opacity variants (white/60, white/40, white/30)"),
      bullet("Logo: 'Verion' stays #D4196A · Bar 1 switches #111827 → #FFFFFF · Bar 2 stays #D4196A · 'ai' switches #111827 → #FFFFFF"),
      bullet("Use sparingly — reserved for product showcase sections only"),

      divider(),

      // ── 11. APPLICATION CHECKLIST ───────────────────────────────────────
      eyebrow("11"),
      h1("Application Checklist"),

      body("Reference when producing presentations, emails, ads, or product UIs:"),
      new Paragraph({ text: "", spacing: { before: 80 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tHead(["Medium", "Key tokens to apply"], [28, 72]),
          tRow(["Presentation / deck", "White slide bg · #111827 body text · one #D4196A accent per slide · Inter font · hsl(262 83% 55%) for section labels only"], [28, 72]),
          tRow(["Marketing email", "White body · #D4196A CTA button · Inter 14px body · #6B7280 text · direct subject line (verb-first)"], [28, 72], true),
          tRow(["Social / digital ads", "#D4196A or #0A0A0A bg · white wordmark on dark · pink wordmark on white · no emojis"], [28, 72]),
          tRow(["Product UI / other apps", "Pink (#D4196A) primary · purple status chips · rounded-md (6px) buttons · rounded-lg (8px) cards · Inter all weights"], [28, 72], true),
          tRow(["Print / collateral", "#111827 body · #D4196A accent · Inter (or Helvetica Neue fallback) · white or #FAFAFA background"], [28, 72]),
        ],
      }),

      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Questions? Contact us at info@verionai.in  ·  verionai.in", color: GRAY400, size: 18, font })] }),
    ],
  }],
});

// ─── Write output ─────────────────────────────────────────────────────────────
const outPath = join(OUT_DIR, "VerionAI-Brand-Identity.docx");
const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`✓ Written: ${outPath}  (${Math.round(buffer.byteLength / 1024)} KB)`);
