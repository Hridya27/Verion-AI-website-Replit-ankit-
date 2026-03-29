/**
 * verify-brand-tokens.js
 * Reads source files and asserts that the documented brand token values
 * match the live codebase. Run before regenerating the brand doc.
 * Exit code 0 = all pass. Exit code 1 = at least one mismatch.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const css     = readFileSync(join(ROOT, "artifacts/verionai-website/src/index.css"), "utf8");
const homeTsx = readFileSync(join(ROOT, "artifacts/verionai-website/src/pages/home.tsx"), "utf8");
const footerTsx = readFileSync(join(ROOT, "artifacts/verionai-website/src/components/layout/footer.tsx"), "utf8");

let pass = 0;
let fail = 0;

function assert(label, expected, actual) {
  const ok = actual === expected;
  if (ok) {
    console.log(`  ✓ ${label}: "${actual}"`);
    pass++;
  } else {
    console.error(`  ✗ ${label}: expected "${expected}", got "${actual ?? "(not found)"}"`);
    fail++;
  }
}

function extract(source, regex) {
  return source.match(regex)?.[1]?.trim() ?? null;
}

console.log("\n── CSS Tokens (index.css) ──────────────────────────────");
assert("--radius",           "0.5rem",              extract(css, /--radius:\s*([^;]+)/));
assert(".section-alt bg",    "hsl(220 14% 97%)",    extract(css, /\.section-alt\s*\{[^}]*background-color:\s*([^;]+)/));
assert("--card",             "0 0% 98%",            extract(css, /--card:\s*([^;]+)/));
assert("--border",           "220 13% 91%",         extract(css, /--border:\s*([^;]+)/));
assert("--muted",            "220 14% 96%",         extract(css, /--muted:\s*([^;]+)/));
assert("--primary (HSL)",    "328 82% 52%",         extract(css, /--primary:\s*([^;]+)/));
assert("--accent (HSL)",     "262 83% 58%",         extract(css, /--accent:\s*([^;]+)/));
assert("--radius-lg (var)",  "var(--radius)",       extract(css, /--radius-lg:\s*([^;]+)/));
assert("--radius-md (calc)", "calc(var(--radius) - 2px)", extract(css, /--radius-md:\s*([^;]+)/));
assert("--radius-xl (calc)", "calc(var(--radius) + 4px)", extract(css, /--radius-xl:\s*([^;]+)/));
assert(".enterprise-card classes", "@apply bg-white border border-gray-200 rounded-lg shadow-sm;",
  extract(css, /\.enterprise-card\s*\{([^}]+)\}/)?.trim());

console.log("\n── JS Constants (home.tsx) ─────────────────────────────");
assert("pink constant",   "#D4196A",              extract(homeTsx, /const pink = "([^"]+)"/));
assert("purple constant", "hsl(262 83% 55%)",    extract(homeTsx, /const purple = "([^"]+)"/));
assert("hero h1 classes",
  "text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight mb-6 leading-[1.08] text-gray-950",
  extract(homeTsx, /h1 className="([^"]+)"/));

console.log("\n── JS Constants (footer.tsx) ───────────────────────────");
assert("footer BLACK", "#111827",  extract(footerTsx, /const BLACK = "([^"]+)"/));
assert("footer PINK",  "#D4196A",  extract(footerTsx, /const PINK = "([^"]+)"/));
assert("logo fontWeight", "800",   extract(footerTsx, /fontWeight: (\d+)/));
assert("logo fontSize",   "18px",  extract(footerTsx, /fontSize: "([^"]+)"/));
assert("logo letterSpacing", "-0.03em", extract(footerTsx, /letterSpacing: "([^"]+)"/));
assert("bar width",       "2px",   extract(footerTsx, /width: "(\d+px)", height: "11px"/));
assert("bar height",      "11px",  extract(footerTsx, /width: "2px", height: "(\d+px)"/));
assert("bar gap",         "2px",   extract(footerTsx, /gap: "(\d+px)", height: "11px"/));
assert("bar BLACK color ref", "BLACK", extract(footerTsx, /backgroundColor: (BLACK),/));

console.log(`\n── Result: ${pass} passed, ${fail} failed ─────────────────────\n`);
if (fail > 0) process.exit(1);
