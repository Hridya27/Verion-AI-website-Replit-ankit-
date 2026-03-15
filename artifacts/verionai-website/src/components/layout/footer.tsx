import { Link } from "wouter";

const pink = "#D4196A";
const black = "#111827";
const capW = 2;
const capH = 5.5;
const stemW = 5.5;
const stemH = 10;

function FooterLogo() {
  return (
    <Link href="/" className="flex items-center">
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "1.1rem",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "flex-end",
          userSelect: "none",
        }}
      >
        <span style={{ color: black }}>Verion</span>
        <span style={{ color: pink }}>A</span>
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "1.1rem",
            position: "relative",
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.5px",
              position: "absolute",
              top: "1px",
            }}
          >
            <span style={{ width: `${capW}px`, height: `${capH}px`, borderRadius: "99px", backgroundColor: pink, display: "block" }} />
            <span style={{ width: `${capW}px`, height: `${capH}px`, borderRadius: "99px", backgroundColor: pink, display: "block" }} />
          </span>
          <span style={{ width: `${stemW}px`, height: `${stemH}px`, borderRadius: "2px", backgroundColor: pink, display: "block" }} />
        </span>
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <FooterLogo />
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-2">
              Designing Autonomous Enterprise.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              We rapidly build and deploy AI-native applications that integrate seamlessly with your existing enterprise landscape.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-foreground mb-5 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link href="/architecture" className="text-muted-foreground hover:text-foreground transition-colors">Architecture</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-foreground mb-5 uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Verion P Connect</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Verion Trade Scheme</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Verion DataWorks</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Verion Flow</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Verion ServiceWorks</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 VerionAI Pvt Ltd — Designing Autonomous Enterprise
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
