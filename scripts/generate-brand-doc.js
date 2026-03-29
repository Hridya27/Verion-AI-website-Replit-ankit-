import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType, convertInchesToTwip,
  PageOrientation, Header, Footer as DocFooter,
} from "docx";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "brand-identity");
mkdirSync(OUT_DIR, { recursive: true });

// ─── Design tokens (exact website values) ───────────────────────────────────
const PINK    = "D4196A";
const PURPLE  = "7C3AED";
const BLACK   = "111827";
const GRAY50  = "F9FAFB";
const GRAY400 = "9CA3AF";
const GRAY500 = "6B7280";
const WHITE   = "FFFFFF";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const cellBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" };
const thinCellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function heading1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    run: { color: BLACK, bold: true, size: 36 },
  });
}

function heading2(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: BLACK, bold: true, size: 26 })],
    spacing: { before: 320, after: 100 },
  });
}

function heading3(text, color = BLACK) {
  return new Paragraph({
    children: [new TextRun({ text, color, bold: true, size: 22 })],
    spacing: { before: 200, after: 60 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, color: opts.color ?? GRAY500, size: 20, bold: opts.bold ?? false })],
    spacing: { before: 60, after: 60 },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text: `• ${text}`, color: GRAY500, size: 20 })],
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

function swatch(hex, label, description) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 15, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, fill: hex, color: hex },
        borders: thinCellBorders,
        children: [new Paragraph({ text: "" })],
      }),
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        borders: thinCellBorders,
        children: [new Paragraph({
          children: [new TextRun({ text: label, color: BLACK, bold: true, size: 20 })],
          spacing: { before: 80, after: 80 },
          indent: { left: convertInchesToTwip(0.1) },
        })],
      }),
      new TableCell({
        width: { size: 20, type: WidthType.PERCENTAGE },
        borders: thinCellBorders,
        children: [new Paragraph({
          children: [new TextRun({ text: `#${hex}`, color: GRAY400, size: 18 })],
          spacing: { before: 80, after: 80 },
          indent: { left: convertInchesToTwip(0.1) },
        })],
      }),
      new TableCell({
        width: { size: 40, type: WidthType.PERCENTAGE },
        borders: thinCellBorders,
        children: [new Paragraph({
          children: [new TextRun({ text: description, color: GRAY500, size: 18 })],
          spacing: { before: 80, after: 80 },
          indent: { left: convertInchesToTwip(0.1) },
        })],
      }),
    ],
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
        children: [new TextRun({ text: col, color: BLACK, bold: true, size: 18 })],
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
        children: [new TextRun({ text: cell, color: GRAY500, size: 18 })],
        spacing: { before: 70, after: 70 },
        indent: { left: convertInchesToTwip(0.1) },
      })],
    })),
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
    })],
    spacing: { before: 360, after: 80 },
  });
}

// ─── Document ────────────────────────────────────────────────────────────────
const doc = new Document({
  creator: "VerionAI",
  title: "VerionAI Brand Identity",
  description: "Complete brand identity guidelines for VerionAI — AI Consulting & Automation",
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 20 },
      },
      heading1: {
        run: { font: "Calibri", color: BLACK, bold: true, size: 40 },
        paragraph: { spacing: { before: 400, after: 160 } },
      },
      heading2: {
        run: { font: "Calibri", color: BLACK, bold: true, size: 28 },
        paragraph: { spacing: { before: 320, after: 120 } },
      },
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
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: "VerionAI", color: PINK, bold: true, size: 20, font: "Calibri" }),
                new TextRun({ text: "  |  Brand Identity Guidelines", color: GRAY400, size: 18, font: "Calibri" }),
              ],
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } },
              spacing: { after: 120 },
            }),
          ],
        }),
      },
      footers: {
        default: new DocFooter({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "© 2026 VerionAI Pvt Ltd  —  Confidential & Internal Use Only", color: GRAY400, size: 16, font: "Calibri" }),
              ],
              border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } },
              spacing: { before: 120 },
            }),
          ],
        }),
      },
      children: [

        // ── COVER ──────────────────────────────────────────────────────────
        new Paragraph({
          children: [new TextRun({ text: "VerionAI", color: PINK, bold: true, size: 72, font: "Calibri" })],
          spacing: { before: 600, after: 0 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Brand Identity Guidelines", color: BLACK, bold: true, size: 48, font: "Calibri" })],
          spacing: { before: 40, after: 0 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "AI Consulting & Automation", color: GRAY500, size: 28, font: "Calibri" })],
          spacing: { before: 120, after: 0 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "verionai.in  ·  info@verionai.in", color: GRAY400, size: 22, font: "Calibri" })],
          spacing: { before: 80, after: 0 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Version 1.0  ·  2026", color: GRAY400, size: 20, font: "Calibri" })],
          spacing: { before: 40, after: 800 },
        }),
        new Paragraph({ text: "", pageBreakBefore: true }),

        // ── 1. BRAND OVERVIEW ─────────────────────────────────────────────
        eyebrow("01"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Brand Overview", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        body("VerionAI is an enterprise AI consulting and application firm. We design and deploy AI-native applications that integrate directly with existing enterprise systems — SAP, Microsoft, Oracle, and Salesforce — enabling organisations to move from idea to live application in days, not months."),
        new Paragraph({ text: "", spacing: { before: 60 } }),
        body("The brand communicates confidence, precision, and forward momentum. Every visual and editorial choice should feel like it belongs in the boardroom of a FTSE 500 company — minimal, intelligent, direct."),

        divider(),

        // ── 2. LOGO ────────────────────────────────────────────────────────
        eyebrow("02"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Logo", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        heading2("Logo Construction"),
        body("The wordmark is assembled from three parts in a single inline row:"),
        new Paragraph({ text: "", spacing: { before: 40 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Part", "Text", "Color", "Weight"], [20, 20, 30, 30]),
            tableRow(["1", '"Verion"', "#D4196A  (VerionAI Pink)", "Inter 800 / ExtraBold"], [20, 20, 30, 30]),
            tableRow(["2 — Breathing Bars", "Two animated bars", "Bar 1: #111827 (Black)  |  Bar 2: #D4196A (Pink)", "2 px wide, 11 px tall, pill-shaped"], [20, 20, 30, 30], true),
            tableRow(["3", '"ai"', "#111827  (Black)  |  White on dark backgrounds", "Inter 800 / ExtraBold"], [20, 20, 30, 30]),
          ],
        }),
        new Paragraph({ text: "", spacing: { before: 160 } }),
        body("Letter spacing: −0.03em  ·  Line height: 1  ·  Gap between parts: 4 px"),

        heading2("Logo on Dark Backgrounds"),
        bullet('"Verion" remains #D4196A (pink — unchanged)'),
        bullet("Breathing bar 1 switches from black (#111827) to white (#FFFFFF)"),
        bullet('"ai" switches from black (#111827) to white (#FFFFFF)'),

        heading2("Favicon / App Icon"),
        body("Pink square (#D4196A) with a white 'V' letterform in a serif typeface, border-radius 20%. Use this for browser tabs, app icons, and small-format digital contexts."),

        heading2("Do Not"),
        bullet("Separate 'Verion' and 'ai' with a space — the bars are the separator"),
        bullet("Recolour the pink wordmark on any background"),
        bullet("Use the logo below 14 px total height"),
        bullet("Apply drop shadows or gradients to the wordmark"),

        divider(),

        // ── 3. COLOR PALETTE ───────────────────────────────────────────────
        eyebrow("03"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Color Palette", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Swatch", "Name", "Hex", "Usage"], [15, 25, 20, 40]),
            swatch("D4196A", "VerionAI Pink", "Primary brand color. CTA buttons, logo, headings emphasis, active states, bullet dots"),
            swatch("7C3AED", "Brand Purple", "Eyebrow / category labels ONLY. Never use at the same visual weight as pink"),
            swatch("111827", "Near Black", "All body headings, nav links, logo 'ai', card titles"),
            swatch("6B7280", "Cool Gray", "Body text, descriptions, secondary copy"),
            swatch("9CA3AF", "Muted Gray", "Captions, timestamps, meta text, placeholder text"),
            swatch("E5E7EB", "Border Gray", "Card borders, dividers, hairlines"),
            swatch("F9FAFB", "Surface Gray", "Alternate section backgrounds (section-alt)"),
            swatch("FFFFFF", "White", "Primary page background. Card surfaces"),
            swatch("0A0A0A", "Near Black (Dark)", "Dark-theme surfaces (product demo pages only)"),
          ],
        }),

        new Paragraph({ text: "", spacing: { before: 160 } }),
        heading2("Color Usage Rules"),
        bullet("Pink (#D4196A) is the only color used for primary CTAs"),
        bullet("Purple (#7C3AED) is reserved exclusively for eyebrow/category labels — always uppercase, wide letter-spacing"),
        bullet("Never use pink and purple at the same visual weight in the same element"),
        bullet("Tinted backgrounds use Pink at 5–8% opacity → rgba(212,25,106,0.06)"),
        bullet("Purple-tinted label backgrounds use Purple at 7–8% opacity"),

        divider(),

        // ── 4. TYPOGRAPHY ──────────────────────────────────────────────────
        eyebrow("04"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Typography", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        heading2("Font Family"),
        body("Inter — Google Fonts. Load weights: 400, 500, 600, 700, 800."),
        body("Fallback stack: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"),
        new Paragraph({ text: "", spacing: { before: 100 } }),

        heading2("Type Scale"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Element", "Size (desktop)", "Weight", "Letter Spacing", "Color"], [22, 18, 18, 20, 22]),
            tableRow(["Hero headline", "72 px  (fluid, clamp)", "700 Bold", "−0.03em (tight)", "#111827"], [22, 18, 18, 20, 22]),
            tableRow(["Section headline", "36–40 px", "700 Bold", "tight", "#111827"], [22, 18, 18, 20, 22], true),
            tableRow(["Card / module title", "24 px", "700 Bold", "default", "#111827"], [22, 18, 18, 20, 22]),
            tableRow(["Eyebrow label", "12 px", "600 SemiBold", "+0.20em (very wide)", "#7C3AED"], [22, 18, 18, 20, 22], true),
            tableRow(["Nav links", "14 px", "500 Medium", "default", "#374151"], [22, 18, 18, 20, 22]),
            tableRow(["Body text", "18 px", "400 Regular", "default", "#6B7280"], [22, 18, 18, 20, 22], true),
            tableRow(["Small body / list", "14 px", "400 Regular", "default", "#6B7280"], [22, 18, 18, 20, 22]),
            tableRow(["Caption / meta", "12 px", "500 Medium", "+0.15em", "#9CA3AF"], [22, 18, 18, 20, 22], true),
            tableRow(["Button text", "14 px", "600 SemiBold", "default", "#FFFFFF or #374151"], [22, 18, 18, 20, 22]),
          ],
        }),

        new Paragraph({ text: "", spacing: { before: 160 } }),
        heading2("Headline Line Height"),
        body("1.08 — Extremely tight, giving headlines a confident, modern feel. Body copy uses 1.6 (leading-relaxed)."),

        heading2("Eyebrow Label Rules"),
        body("Always UPPERCASE. Wide letter spacing (0.15–0.20em). Never used as a headline — always appears above a headline as a category label. Appears in purple (#7C3AED) on light backgrounds."),

        divider(),

        // ── 5. BUTTONS & INTERACTIVE ELEMENTS ─────────────────────────────
        eyebrow("05"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Buttons & Interactive Elements", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Type", "Background", "Text Color", "Border", "Specs"], [18, 20, 18, 20, 24]),
            tableRow(["Primary CTA", "#D4196A", "#FFFFFF", "None", "border-radius: 6px  ·  height: 44px  ·  padding: 0 28px  ·  font: 14px/600"], [18, 20, 18, 20, 24]),
            tableRow(["Secondary / Ghost", "#FFFFFF", "#374151", "#D1D5DB", "Same radius & height  ·  hover: #F9FAFB bg"], [18, 20, 18, 20, 24], true),
            tableRow(["Destructive", "Red (#EF4444)", "#FFFFFF", "None", "System error states only — never for marketing or CTAs"], [18, 20, 18, 20, 24]),
          ],
        }),

        new Paragraph({ text: "", spacing: { before: 160 } }),
        body("Primary button hover: slight opacity reduction (90%). Icon inside buttons: 16px, margin-left: 6px."),

        divider(),

        // ── 6. CARDS & SURFACES ────────────────────────────────────────────
        eyebrow("06"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Cards & Surfaces", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Property", "Value"], [30, 70]),
            tableRow(["Card border radius", "12 px"], [30, 70]),
            tableRow(["Card border", "1 px solid #E5E7EB"], [30, 70], true),
            tableRow(["Card background", "#FFFFFF (white)"], [30, 70]),
            tableRow(["Card hover shadow", "0 4px 20px rgba(0,0,0,0.06)"], [30, 70], true),
            tableRow(["Tinted card bg (pink)", "rgba(212,25,106,0.05–0.08)"], [30, 70]),
            tableRow(["Tinted card bg (purple)", "hsl(262, 83%, 55%, 0.07)"], [30, 70], true),
            tableRow(["Section alt background", "#F9FAFB"], [30, 70]),
            tableRow(["Button border radius", "6 px"], [30, 70], true),
            tableRow(["Input border radius", "6 px"], [30, 70]),
            tableRow(["Tag / pill border radius", "99 px (fully rounded)"], [30, 70], true),
          ],
        }),

        divider(),

        // ── 7. SPACING & LAYOUT ────────────────────────────────────────────
        eyebrow("07"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Spacing & Layout", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Element", "Value"], [40, 60]),
            tableRow(["Page container", "max-width: 1280px  ·  padding: 0 24px (mobile) / 0 24px (desktop)"], [40, 60]),
            tableRow(["Section vertical padding", "80–96 px top and bottom"], [40, 60], true),
            tableRow(["Card internal padding", "28–32 px"], [40, 60]),
            tableRow(["Grid gap (cards)", "20 px"], [40, 60], true),
            tableRow(["Nav height", "64–72 px"], [40, 60]),
            tableRow(["Hero top padding", "96 px (accounts for fixed nav)"], [40, 60], true),
          ],
        }),

        divider(),

        // ── 8. VOICE & TONE ────────────────────────────────────────────────
        eyebrow("08"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Voice & Tone", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        heading2("Principles"),
        bullet("Direct and confident — no hedging language, no passive constructions"),
        bullet("Enterprise-first — assumes a senior business or IT decision-maker audience"),
        bullet("Outcomes over features — lead with the result, not the technology"),
        bullet("No emojis — in any body copy, headlines, or CTA labels"),
        bullet("Numbers when possible — 'in days', '98% match', '6 months' — specificity builds credibility"),

        heading2("Headlines"),
        body("Use verbs, not nouns. Show action and state of arrival, not description."),
        new Paragraph({ text: "", spacing: { before: 40 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Do", "Don't"], [50, 50]),
            tableRow(["Designing Autonomous Enterprise", "Our AI Solution Platform"], [50, 50]),
            tableRow(["Ready to Deploy", "Available for Deployment"], [50, 50], true),
            tableRow(["From idea to application in days.", "We can build your application quickly."], [50, 50]),
            tableRow(["The Sovereignty Guarantee", "Security Features"], [50, 50], true),
          ],
        }),

        new Paragraph({ text: "", spacing: { before: 160 } }),
        heading2("Eyebrow Labels"),
        body("Always UPPERCASE with wide letter-spacing. Used to categorise and orient, not to sell. Examples: ENTERPRISE AI CONSULTING  ·  OUR APPROACH  ·  AGENT-AS-A-SERVICE"),

        heading2("CTA Labels"),
        body("Specific and action-oriented. Examples:  Book a Discovery Call  ·  Explore Solutions  ·  View Architecture  ·  Talk to Us"),

        divider(),

        // ── 9. DARK THEME USAGE ────────────────────────────────────────────
        eyebrow("09"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Light vs Dark Theme", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        heading2("Light (Primary)"),
        bullet("Background: #FFFFFF"),
        bullet("Headline text: #111827"),
        bullet("Body text: #6B7280"),
        bullet("Logo: 'Verion' in pink · bars in black+pink · 'ai' in black"),
        bullet("CTA buttons: pink fill, white text"),
        bullet("Section alternates use #F9FAFB"),

        heading2("Dark (Product / Demo Pages Only)"),
        bullet("Background: #0A0A0A"),
        bullet("All text: #FFFFFF and white-opacity variants"),
        bullet("Logo: 'Verion' in pink (unchanged) · bars switch bar-1 to white · 'ai' in white"),
        bullet("Use sparingly — reserved for product showcase sections"),

        divider(),

        // ── 10. APPLICATION CHECKLIST ──────────────────────────────────────
        eyebrow("10"),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Application Checklist", color: BLACK, bold: true, size: 40, font: "Calibri" })], spacing: { before: 0, after: 160 } }),

        body("Use this when creating presentations, emails, ads, or product UIs:", { bold: true }),
        new Paragraph({ text: "", spacing: { before: 80 } }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableHeader(["Medium", "Key Tokens to Apply"], [28, 72]),
            tableRow(["Presentation / deck", "White slide bg · #111827 text · one pink accent per slide · Inter font · purple for section labels only"], [28, 72]),
            tableRow(["Marketing email", "White body · pink CTA button · Inter 16 px body · #6B7280 text · direct subject line"], [28, 72], true),
            tableRow(["Social / digital ads", "Pink or #0A0A0A bg · white wordmark on dark · pink wordmark on white"], [28, 72]),
            tableRow(["Product UI / other apps", "Same token set: pink primary · purple status chips · 6 px inputs/buttons · 12 px cards · Inter"], [28, 72], true),
            tableRow(["Print / collateral", "#111827 body · #D4196A accent · Inter (or fallback: Helvetica Neue) · white background"], [28, 72]),
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

// ─── Write output ────────────────────────────────────────────────────────────
const outPath = join(OUT_DIR, "VerionAI-Brand-Identity.docx");
const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`✓ Written: ${outPath} (${Math.round(buffer.byteLength / 1024)} KB)`);
