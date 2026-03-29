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

// ─── Exact design tokens from live codebase ────────────────────────────────
//
// Source: artifacts/verionai-website/src/index.css
//         artifacts/verionai-website/src/pages/home.tsx
//         artifacts/verionai-website/src/components/layout/footer.tsx
//
// CSS custom properties (light theme):
//   --background:  0 0% 100%        → #FFFFFF
//   --foreground:  222 47% 9%       → #111827 (near black)
//   --card:        0 0% 98%         → #FAFAFA
//   --card-border: 220 13% 90%      → #E3E5E8
//   --muted:       220 14% 96%      → #F3F4F6
//   --muted-foreground: 220 9% 46%  → #6B7280
//   --border:      220 13% 91%      → #E5E7EB
//   --primary:     328 82% 52%      → #D4196A  (hardcoded in JS as "#D4196A")
//   --accent:      262 83% 58%      → hsl(262 83% 55%) in JS = ~#7735ED
//   --radius:      0.5rem           → 8px base
//
// Tailwind radius scale built on --radius:
//   rounded-sm  = calc(0.5rem - 4px) = 4px
//   rounded-md  = calc(0.5rem - 2px) = 6px   (buttons, inputs)
//   rounded-lg  = 0.5rem             = 8px   (enterprise-card class)
//   rounded-xl  = calc(0.5rem + 4px) = 12px  (module section cards, agent cards)
//   rounded-full = 9999px                    (tags, pills)
//
// .enterprise-card = bg-white border border-gray-200 rounded-lg shadow-sm
//   → bg: #FFFFFF, border: #E5E7EB, radius: 8px, shadow: 0 1px 2px rgba(0,0,0,0.05)
//
// .section-alt = hsl(220 14% 97%) → ~#F5F6F8
//
// Container in pages: `container mx-auto px-4 md:px-6`
//   → px-4 = 16px mobile, px-6 = 24px md+ (768px+)

const PINK     = "D4196A";  // hardcoded in all page files as "#D4196A"
const PURPLE   = "7735ED";  // hsl(262 83% 55%) computed
const BLACK    = "111827";  // hsl(222 47% 9%) = Tailwind gray-950
const GRAY500  = "6B7280";  // Tailwind gray-500 / --muted-foreground approx
const GRAY400  = "9CA3AF";  // Tailwind gray-400
const GRAY200  = "E5E7EB";  // Tailwind gray-200 / --border
const WHITE    = "FFFFFF";
const FAFAFA   = "FAFAFA";  // --card: hsl(0 0% 98%)
const SECTALT  = "F5F6F8";  // .section-alt: hsl(220 14% 97%)
const DARK     = "0A0A0A";  // connect product page dark bg

// ─── Helpers ─────────────────────────────────────────────────────────────────
const noBorder   = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" };
const thinCellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, color: BLACK, bold: true, size: 40, font: "Calibri" })],
    spacing: { before: 0, after: 160 },
  });
}

function heading2(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: BLACK, bold: true, size: 26, font: "Calibri" })],
    spacing: { before: 320, after: 100 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, color: opts.color ?? GRAY500, size: 20, bold: opts.bold ?? false, font: "Calibri" })],
    spacing: { before: 60, after: 60 },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text: `• ${text}`, color: GRAY500, size: 20, font: "Calibri" })],
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
    children: [new TextRun({
      text: text.toUpperCase(),
      color: PURPLE,
      bold: true,
      size: 16,
      characterSpacing: 150,
      font: "Calibri",
    })],
    spacing: { before: 360, after: 80 },
  });
}

function tableHeader(cols, widths) {
  return new TableRow({
    tableHeader: true,
    children: cols.map((col, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.SOLID, fill: "F3F4F6", color: "F3F4F6" },
      borders: thinCellBorders,
      children: [new Paragraph({
        children: [new TextRun({ text: col, color: BLACK, bold: true, size: 18, font: "Calibri" })],
        spacing: { before: 80, after: 80 },
        indent: { left: convertInchesToTwip(0.1) },
      })],
    })),
  });
}

function tableRow(cells, widths, shade) {
  return new TableRow({
    children: cells.map((cell, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: shade ? { type: ShadingType.SOLID, fill: "FAFAFA", color: "FAFAFA" } : undefined,
      borders: thinCellBorders,
      children: [new Paragraph({
        children: [new TextRun({ text: cell, color: GRAY500, size: 18, font: "Calibri" })],
        spacing: { before: 70, after: 70 },
        indent: { left: convertInchesToTwip(0.1) },
      })],
    })),
  });
}

function swatchRow(hex, label, hexDisplay, description) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 12, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, fill: hex, color: hex },
        borders: thinCellBorders,
        children: [new Paragraph({ text: "" })],
      }),
      new TableCell({
        width: { size: 23, type: WidthType.PERCENTAGE },
        borders: thinCellBorders,
        children: [new Paragraph({ children: [new TextRun({ text: label, color: BLACK, bold: true, size: 20, font: "Calibri" })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })],
      }),
      new TableCell({
        width: { size: 22, type: WidthType.PERCENTAGE },
        borders: thinCellBorders,
        children: [new Paragraph({ children: [new TextRun({ text: hexDisplay, color: GRAY400, size: 18, font: "Calibri" })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })],
      }),
      new TableCell({
        width: { size: 43, type: WidthType.PERCENTAGE },
        borders: thinCellBorders,
        children: [new Paragraph({ children: [new TextRun({ text: description, color: GRAY500, size: 18, font: "Calibri" })], spacing: { before: 80, after: 80 }, indent: { left: convertInchesToTwip(0.1) } })],
      }),
    ],
  });
}

// ─── Document ────────────────────────────────────────────────────────────────
const doc = new Document({
  creator: "VerionAI",
  title: "VerionAI Brand Identity",
  description: "Complete brand identity guidelines for VerionAI — AI Consulting & Automation",
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 20 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1.1),
            right: convertInchesToTwip(1.1),
          },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [
              new TextRun({ text: "VerionAI", color: PINK, bold: true, size: 20, font: "Calibri" }),
              new TextRun({ text: "  |  Brand Identity Guidelines", color: GRAY400, size: 18, font: "Calibri" }),
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } },
            spacing: { after: 120 },
          })],
        }),
      },
      footers: {
        default: new DocFooter({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "© 2026 VerionAI Pvt Ltd  —  Confidential & Internal Use Only", color: GRAY400, size: 16, font: "Calibri" })],
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } },
            spacing: { before: 120 },
          })],
        }),
      },
      children: [

        // ── COVER ──────────────────────────────────────────────────────────
        new Paragraph({ children: [new TextRun({ text: "VerionAI", color: PINK, bold: true, size: 72, font: "Calibri" })], spacing: { before: 600, after: 0 } }),
        new Paragraph({ children: [new TextRun({ text: "Brand Identity Guidelines", color: BLACK, bold: true, size: 48, font: "Calibri" })], spacing: { before: 40, after: 0 } }),
        new Paragraph({ children: [new TextRun({ text: "AI Consulting & Automation", color: GRAY500, size: 28, font: "Calibri" })], spacing: { before: 120, after: 0 } }),
        new Paragraph({ children: [new TextRun({ text: "verionai.in  ·  info@verionai.in", color: GRAY400, size: 22, font: "Calibri" })], spacing: { before: 80, after: 0 } }),
        new Paragraph({ children: [new TextRun({ text: "Version 1.0  ·  2026", color: GRAY400, size: 20, font: "Calibri" })], spacing: { before: 40, after: 800 } }),
        new Paragraph({ text: "", pageBreakBefore: true }),

        // ── 1. BRAND OVERVIEW ─────────────────────────────────────────────
        eyebrow("01"),
        heading1("Brand Overview"),
        body("VerionAI is an enterprise AI consulting and application firm. We design and deploy AI-native applications that integrate directly with existing enterprise systems — SAP, Microsoft, Oracle, and Salesforce — enabling organisations to move from idea to live application in days, not months."),
        new Paragraph({ text: "", spacing: { before: 60 } }),
        body("The brand communicates confidence, precision, and forward momentum. Every visual and editorial choice should feel like it belongs in the boardroom of a FTSE 500 company — minimal, intelligent, direct."),

        divider(),

        // ── 2. LOGO ────────────────────────────────────────────────────────
        eyebrow("02"),
        heading1("Logo"),

        heading2("Logo Construction"),
        body("The wordmark is assembled from three parts in a single inline row, using Inter ExtraBold (weight 800):"),
        new Paragraph({ text: "", spacing: { before: 60 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Part", "Text", "Color (Light Bg)", "Color (Dark Bg)", "Style"], [12, 14, 22, 22, 30]),
            tableRow(["1", '"Verion"', "#D4196A (Pink)", "#D4196A (unchanged)", "Inter 800, letter-spacing: −0.03em"], [12, 14, 22, 22, 30]),
            tableRow(["2 — Bars", "2 animated bars", "Bar 1: #111827 · Bar 2: #D4196A", "Bar 1: #FFFFFF · Bar 2: #D4196A", "2 px wide, 11 px tall, pill-shaped, gap: 2 px between bars"], [12, 14, 22, 22, 30], true),
            tableRow(["3", '"ai"', "#111827 (Black)", "#FFFFFF (White)", "Inter 800, same specs as part 1"], [12, 14, 22, 22, 30]),
          ],
        }),
        new Paragraph({ text: "", spacing: { before: 120 } }),
        body("Letter spacing: −0.03em  ·  Line height: 1  ·  Gap between the three parts: 4 px  ·  All parts inline-flex, vertically centred"),

        heading2("Favicon / App Icon"),
        body("Pink square (#D4196A) with a white serif 'V' letterform, border-radius ~20% (36 px on a 180×180 canvas). Use for browser tabs, app icons, and small-format digital contexts only."),

        heading2("Do Not"),
        bullet("Separate 'Verion' and 'ai' with a plain space — the breathing bars are the visual separator"),
        bullet("Recolour the pink (#D4196A) part of the wordmark on any background"),
        bullet("Use the logo below 14 px total height"),
        bullet("Apply drop shadows, gradients, or outlines to the wordmark"),
        bullet("Render the bars as static — they animate (scaleY) in digital contexts"),

        divider(),

        // ── 3. COLOR PALETTE ───────────────────────────────────────────────
        eyebrow("03"),
        heading1("Color Palette"),
        body("All values are taken directly from the site's CSS custom properties and inline JS constants (index.css + page files)."),
        new Paragraph({ text: "", spacing: { before: 120 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Swatch", "Name", "Value", "Usage"], [12, 24, 26, 38]),
            swatchRow("D4196A", "VerionAI Pink", "#D4196A  (hsl 328 82% 52%)", "Primary brand. CTA buttons, logo, emphasis text, active states, bullet dots"),
            swatchRow("7735ED", "Brand Purple", "hsl(262 83% 55%)", "Eyebrow / category labels ONLY — always UPPERCASE, wide spacing. Never used as a CTA."),
            swatchRow("111827", "Near Black", "#111827  (hsl 222 47% 9%)", "All headings, nav links, logo 'ai' on light backgrounds. Tailwind: gray-950"),
            swatchRow("6B7280", "Cool Gray", "#6B7280  (Tailwind gray-500)", "Body text, descriptions, secondary copy. CSS: --muted-foreground ≈ hsl(220 9% 46%)"),
            swatchRow("9CA3AF", "Muted Gray", "#9CA3AF  (Tailwind gray-400)", "Captions, timestamps, meta text, placeholder text"),
            swatchRow("E5E7EB", "Border Gray", "#E5E7EB  (Tailwind gray-200)", "Card borders (enterprise-card), dividers, hairlines. CSS: --border: hsl(220 13% 91%)"),
            swatchRow("FAFAFA", "Card Surface", "#FAFAFA  (hsl 0 0% 98%)", "Card backgrounds. CSS var: --card: hsl(0 0% 98%)"),
            swatchRow("F5F6F8", "Section Alt", "hsl(220 14% 97%)", "Alternate section backgrounds. CSS class: .section-alt"),
            swatchRow("FFFFFF", "White", "#FFFFFF", "Primary page background. Button text on pink CTAs"),
            swatchRow("0A0A0A", "Near Black (Dark)", "#0A0A0A", "Dark-theme surfaces (product demo pages only — Verion Engage page)"),
          ],
        }),
        new Paragraph({ text: "", spacing: { before: 160 } }),
        heading2("Color Usage Rules"),
        bullet("Pink (#D4196A) is the only colour used for primary CTAs"),
        bullet("Purple (hsl 262 83% 55%) is reserved exclusively for eyebrow/category labels"),
        bullet("Tinted card backgrounds use Pink at 5–8% opacity → rgba(212,25,106,0.05–0.08)"),
        bullet("Purple-tinted label pills use Purple at 7–8% opacity background"),
        bullet("Never use pink and purple at the same visual weight in the same element"),

        divider(),

        // ── 4. TYPOGRAPHY ──────────────────────────────────────────────────
        eyebrow("04"),
        heading1("Typography"),

        heading2("Font Family"),
        body("Inter — Google Fonts. Load these weights: 400, 500, 600, 700, 800."),
        body("CSS declaration: font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"),
        body("CSS custom property in site: --font-sans: 'Inter', sans-serif  (also --font-display)"),
        new Paragraph({ text: "", spacing: { before: 100 } }),

        heading2("Type Scale — Exact Values from Source"),
        body("Sizes below are from Tailwind utility classes used in the live codebase. Pixel equivalents assume default 16px base."),
        new Paragraph({ text: "", spacing: { before: 60 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Element", "Tailwind Class", "px Equiv.", "Weight", "Letter Spacing", "Color"], [20, 18, 10, 14, 16, 22]),
            tableRow(["Hero headline (h1)", "text-5xl → text-[4.5rem]", "80–72px (fluid)", "700", "tracking-tight (−0.025em)", "#111827"], [20, 18, 10, 14, 16, 22]),
            tableRow(["Section headline (h2)", "text-3xl md:text-4xl", "30–36px", "700", "tracking-tight", "#111827"], [20, 18, 10, 14, 16, 22], true),
            tableRow(["Card / module title (h2)", "text-2xl", "24px", "700", "default", "#111827"], [20, 18, 10, 14, 16, 22]),
            tableRow(["Eyebrow label (span)", "text-xs", "12px", "600 SemiBold", "tracking-[0.2em] (very wide)", "#7735ED (purple)"], [20, 18, 10, 14, 16, 22], true),
            tableRow(["Nav links (a)", "text-sm", "14px", "500 Medium", "default", "#374151 (gray-700)"], [20, 18, 10, 14, 16, 22]),
            tableRow(["Hero / section body (p)", "text-lg", "18px", "400 Regular", "default", "#6B7280 (gray-500)"], [20, 18, 10, 14, 16, 22], true),
            tableRow(["Card body / list items (p, span)", "text-sm", "14px", "400 Regular", "default", "#6B7280 (gray-500)"], [20, 18, 10, 14, 16, 22]),
            tableRow(["Small meta / caption", "text-xs", "12px", "500 Medium", "tracking-widest (0.1em+)", "#9CA3AF (gray-400)"], [20, 18, 10, 14, 16, 22], true),
            tableRow(["Button label", "text-sm", "14px", "600 SemiBold", "default", "#FFFFFF or #374151"], [20, 18, 10, 14, 16, 22]),
            tableRow(["Footer nav links", "text-sm", "14px", "400 Regular", "default", "muted-foreground"], [20, 18, 10, 14, 16, 22], true),
          ],
        }),
        new Paragraph({ text: "", spacing: { before: 160 } }),
        heading2("Line Heights"),
        bullet("Hero headline: 1.08 (leading-[1.08]) — very tight, distinctive and confident"),
        bullet("Section headlines: leading-tight ≈ 1.25"),
        bullet("Body paragraphs: leading-relaxed ≈ 1.625"),
        bullet("Navigation / labels: leading-none = 1"),

        heading2("Eyebrow Label Rules"),
        body("Always UPPERCASE. Wide letter spacing (tracking-[0.2em] to tracking-widest). Never used as a headline — always appears above a headline as a category/section label. Appears in purple (hsl 262 83% 55%) on light backgrounds only."),

        divider(),

        // ── 5. BUTTONS & INTERACTIVE ELEMENTS ─────────────────────────────
        eyebrow("05"),
        heading1("Buttons & Interactive Elements"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Type", "Background", "Text", "Border", "Specs"], [18, 18, 16, 18, 30]),
            tableRow(["Primary CTA", "#D4196A", "#FFFFFF", "None", "rounded-md (6px)  ·  h-11 (44px)  ·  px-7 (28px)  ·  14px / 600"], [18, 18, 16, 18, 30]),
            tableRow(["Secondary / Ghost", "#FFFFFF", "#374151", "#D1D5DB (gray-300)", "Same radius & height  ·  hover: bg #F9FAFB"], [18, 18, 16, 18, 30], true),
            tableRow(["Destructive", "#EF4444", "#FFFFFF", "None", "System error states only — not marketing"], [18, 18, 16, 18, 30]),
          ],
        }),
        new Paragraph({ text: "", spacing: { before: 160 } }),
        body("Button border-radius: rounded-md = calc(--radius - 2px) = calc(0.5rem - 2px) = 6px"),
        body("Hover on primary: opacity reduction to ~90%. Icon inside buttons: 14–16px, ml-1.5 (6px)."),

        divider(),

        // ── 6. BORDER RADIUS SCALE ─────────────────────────────────────────
        eyebrow("06"),
        heading1("Border Radius Scale"),

        body("The site's CSS defines --radius: 0.5rem (8px). The Tailwind scale is built from this token:"),
        new Paragraph({ text: "", spacing: { before: 80 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Class", "CSS Calc", "px Value", "Used For"], [22, 30, 14, 34]),
            tableRow(["rounded-sm", "calc(0.5rem − 4px)", "4px", "Small chips, micro elements"], [22, 30, 14, 34]),
            tableRow(["rounded-md", "calc(0.5rem − 2px)", "6px", "Buttons (primary & secondary), inputs, form fields"], [22, 30, 14, 34], true),
            tableRow(["rounded-lg", "0.5rem", "8px", "enterprise-card class — the standard card across the site"], [22, 30, 14, 34]),
            tableRow(["rounded-xl", "calc(0.5rem + 4px)", "12px", "Module section cards, agent cards, feature highlight boxes"], [22, 30, 14, 34], true),
            tableRow(["rounded-full", "9999px", "Pill", "Tags, eyebrow label pills, avatar circles"], [22, 30, 14, 34]),
          ],
        }),

        divider(),

        // ── 7. CARDS & SURFACES ────────────────────────────────────────────
        eyebrow("07"),
        heading1("Cards & Surfaces"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Property", "Value", "Source"], [30, 40, 30]),
            tableRow(["enterprise-card radius", "rounded-lg = 8px", ".enterprise-card in index.css"], [30, 40, 30]),
            tableRow(["enterprise-card bg", "#FFFFFF (white)", ".enterprise-card: bg-white"], [30, 40, 30], true),
            tableRow(["enterprise-card border", "1px solid #E5E7EB (gray-200)", ".enterprise-card: border border-gray-200"], [30, 40, 30]),
            tableRow(["enterprise-card shadow", "shadow-sm (0 1px 2px rgba(0,0,0,0.05))", ".enterprise-card: shadow-sm"], [30, 40, 30], true),
            tableRow(["Module / agent card radius", "rounded-xl = 12px", "Inline className in solutions.tsx"], [30, 40, 30]),
            tableRow(["Module card hover shadow", "hover:shadow-md (0 4px 6px rgba(0,0,0,0.07))", "hover:shadow-md in solutions.tsx"], [30, 40, 30], true),
            tableRow(["Card bg tint (pink)", "rgba(212,25,106,0.06) to 0.08", "Inline style: backgroundColor: `${pink}06`"], [30, 40, 30]),
            tableRow(["Card bg tint (purple)", "hsl(262 83% 55% / 0.07–0.08)", "Inline style in eyebrow pill backgrounds"], [30, 40, 30], true),
            tableRow(["Section alt background", "hsl(220 14% 97%) ≈ #F5F6F8", ".section-alt in index.css"], [30, 40, 30]),
            tableRow(["Page background", "#FFFFFF", "--background: 0 0% 100%"], [30, 40, 30], true),
          ],
        }),

        divider(),

        // ── 8. SPACING & LAYOUT ────────────────────────────────────────────
        eyebrow("08"),
        heading1("Spacing & Layout"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Element", "Value", "Source"], [32, 38, 30]),
            tableRow(["Page container", "container mx-auto", "Tailwind container (max-width fluid)"], [32, 38, 30]),
            tableRow(["Container padding (mobile)", "px-4 = 16px left + right", "All pages: px-4 md:px-6"], [32, 38, 30], true),
            tableRow(["Container padding (≥768px)", "px-6 = 24px left + right", "md:px-6 breakpoint"], [32, 38, 30]),
            tableRow(["Section vertical padding", "py-20 to py-28 (80–112px)", "Varies per section"], [32, 38, 30], true),
            tableRow(["Card internal padding", "p-6 to p-8 (24–32px)", "enterprise-card content areas"], [32, 38, 30]),
            tableRow(["Grid gap (card grids)", "gap-5 = 20px", "All product/agent grids"], [32, 38, 30], true),
            tableRow(["Nav height / top offset", "pt-24 = 96px", "Page top padding to clear fixed nav"], [32, 38, 30]),
            tableRow(["Footer padding-top", "pt-16 = 64px", "Footer element in footer.tsx"], [32, 38, 30], true),
          ],
        }),

        divider(),

        // ── 9. VOICE & TONE ────────────────────────────────────────────────
        eyebrow("09"),
        heading1("Voice & Tone"),

        heading2("Principles"),
        bullet("Direct and confident — no hedging language, no passive constructions"),
        bullet("Enterprise-first — speaks to senior business and IT decision-makers"),
        bullet("Outcomes over features — lead with the result, not the technology stack"),
        bullet("No emojis — in any body copy, headlines, or CTA labels"),
        bullet("Numbers create credibility — 'in days', '98% match', '5-day sprint'"),
        bullet("Eyebrow labels are navigational, not promotional — they orient, not sell"),

        heading2("Headlines — Do / Don't"),
        new Paragraph({ text: "", spacing: { before: 60 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Do", "Don't"], [50, 50]),
            tableRow(["Designing Autonomous Enterprise", "Our AI Solution Platform"], [50, 50]),
            tableRow(["Ready to Deploy", "Available for Deployment"], [50, 50], true),
            tableRow(["From idea to application in days.", "We can build your application quickly."], [50, 50]),
            tableRow(["The Sovereignty Guarantee", "Security Features Overview"], [50, 50], true),
            tableRow(["Purpose-Built AI Agents, Ready to Deploy", "Our AI Agent Products"], [50, 50]),
          ],
        }),

        new Paragraph({ text: "", spacing: { before: 160 } }),
        heading2("CTA Labels"),
        body("Specific and action-oriented. From the live site:"),
        bullet("Book a Discovery Call"),
        bullet("Explore Solutions"),
        bullet("View Architecture"),
        bullet("Talk to Us"),
        bullet("Request a Demo"),

        divider(),

        // ── 10. LIGHT vs DARK THEME ────────────────────────────────────────
        eyebrow("10"),
        heading1("Light vs Dark Theme"),

        heading2("Light (Primary — Used Across All Main Pages)"),
        bullet("Page background: #FFFFFF"),
        bullet("Section alt background: hsl(220 14% 97%) — .section-alt"),
        bullet("Headline text: #111827 (hsl 222 47% 9%)"),
        bullet("Body text: #6B7280 (Tailwind gray-500)"),
        bullet("Logo: 'Verion' in #D4196A · Bar 1 in #111827 · Bar 2 in #D4196A · 'ai' in #111827"),
        bullet("Primary CTA button: #D4196A fill, #FFFFFF text"),

        heading2("Dark (Product Demo — Verion Engage Page Only)"),
        bullet("Page background: #0A0A0A"),
        bullet("All body text: #FFFFFF and white-opacity variants (e.g. white/60, white/40)"),
        bullet("Logo: 'Verion' stays #D4196A · Bar 1 switches to #FFFFFF · Bar 2 stays #D4196A · 'ai' switches to #FFFFFF"),
        bullet("Use sparingly — reserved for product showcase sections only"),

        divider(),

        // ── 11. APPLICATION CHECKLIST ──────────────────────────────────────
        eyebrow("11"),
        heading1("Application Checklist"),

        body("Reference when producing presentations, emails, ads, or product UIs:"),
        new Paragraph({ text: "", spacing: { before: 80 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Medium", "Key tokens to apply"], [28, 72]),
            tableRow(["Presentation / deck", "White slide bg · #111827 body text · one pink (#D4196A) accent per slide · Inter font · purple for section labels only"], [28, 72]),
            tableRow(["Marketing email", "White body · pink CTA button (#D4196A) · Inter 14–16px body · #6B7280 text · direct subject line"], [28, 72], true),
            tableRow(["Social / digital ads", "Pink (#D4196A) or #0A0A0A bg · white wordmark on dark · pink wordmark on white · no emojis"], [28, 72]),
            tableRow(["Product UI / other apps", "Pink primary · purple status chips · 6px button radius · 8px card (enterprise-card) · Inter"], [28, 72], true),
            tableRow(["Print / collateral", "#111827 body · #D4196A accent · Inter (or Helvetica Neue fallback) · white background"], [28, 72]),
          ],
        }),

        new Paragraph({ text: "", spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Questions? Contact us at info@verionai.in  ·  verionai.in", color: GRAY400, size: 18, font: "Calibri" })],
        }),
      ],
    },
  ],
});

// ─── Write output ─────────────────────────────────────────────────────────────
const outPath = join(OUT_DIR, "VerionAI-Brand-Identity.docx");
const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`✓ Written: ${outPath} (${Math.round(buffer.byteLength / 1024)} KB)`);
