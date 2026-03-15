import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-1 mb-6">
              <span className="font-semibold text-xl tracking-tight text-white">
                Verion<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-8">
              Designing Autonomous Enterprise. We rapidly build and deploy AI-native applications that integrate seamlessly with your existing technology landscape.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/architecture" className="text-muted-foreground hover:text-white transition-colors">Architecture</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-white mb-6 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/solutions" className="text-muted-foreground hover:text-white transition-colors">Verion P Connect</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-white transition-colors">Verion Trade Scheme</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-white transition-colors">Verion DataWorks</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-white transition-colors">Verion Flow</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 VerionAI Pvt Ltd — Designing Autonomous Enterprise
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
