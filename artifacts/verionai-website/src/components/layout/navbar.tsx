import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Architecture", href: "/architecture" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
];

const BLACK = "#111827";
const PINK = "#D4196A";

function BreathingBars({ color, height = 14, barW = 2.5, gap = 2.5 }: { color: string; height?: number; barW?: number; gap?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: `${gap}px`, height: `${height}px`, flexShrink: 0 }}>
      <motion.span
        animate={{ scaleY: [0.35, 1, 0.35] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
        style={{ width: `${barW}px`, height: `${height}px`, borderRadius: "99px", backgroundColor: color, display: "block", transformOrigin: "center" }}
      />
      <motion.span
        animate={{ scaleY: [1, 0.35, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
        style={{ width: `${barW}px`, height: `${height}px`, borderRadius: "99px", backgroundColor: color, display: "block", transformOrigin: "center" }}
      />
    </span>
  );
}

function CustomI({ stemColor, dotColor, size }: { stemColor: string; dotColor: string; size: number }) {
  const dotSize = size * 0.18;
  const stemW = size * 0.12;
  const stemH = size * 0.46;
  const gap = size * 0.06;
  const totalH = dotSize + gap + stemH;
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", height: `${totalH}px`, verticalAlign: "bottom", flexShrink: 0 }}>
      <span style={{ width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: "50%", backgroundColor: dotColor, flexShrink: 0 }} />
      <span style={{ height: `${gap}px`, flexShrink: 0 }} />
      <span style={{ width: `${stemW}px`, height: `${stemH}px`, borderRadius: "2px", backgroundColor: stemColor, flexShrink: 0 }} />
    </span>
  );
}

const FS = 22;

function VerionLogo() {
  return (
    <Link href="/" className="flex items-center">
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: `${FS}px`, letterSpacing: "-0.03em", lineHeight: 1, display: "inline-flex", alignItems: "center", gap: "5px", userSelect: "none" }}>
        <span style={{ color: BLACK, display: "inline-flex", alignItems: "center" }}>
          <span>Ver</span>
          <CustomI stemColor={BLACK} dotColor={PINK} size={FS} />
          <span>on</span>
        </span>
        <BreathingBars color={PINK} height={14} barW={2.5} gap={2.5} />
        <span style={{ color: PINK, display: "inline-flex", alignItems: "center" }}>
          <span>a</span>
          <CustomI stemColor={PINK} dotColor={BLACK} size={FS} />
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm" : "bg-white/80 backdrop-blur-sm py-4 border-b border-gray-100"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <VerionLogo />
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-sm font-medium transition-colors hover:text-foreground ${location === link.href ? "text-foreground" : "text-muted-foreground"}`}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <Button className="rounded-md px-5 text-sm font-semibold" style={{ backgroundColor: PINK, color: "#fff" }}>
                Book a Discovery Call
              </Button>
            </Link>
          </div>
          <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-b border-gray-200 overflow-hidden">
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${location === link.href ? "bg-pink-50 text-pink" : "text-muted-foreground hover:text-foreground hover:bg-gray-50"}`}>
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <Link href="/contact" className="block w-full">
                  <Button className="w-full rounded-md text-white font-semibold" style={{ backgroundColor: PINK }}>
                    Book a Discovery Call
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
