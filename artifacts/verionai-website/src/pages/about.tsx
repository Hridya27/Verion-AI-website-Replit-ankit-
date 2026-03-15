import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe2, Lightbulb, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Building the Autonomous Enterprise</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            VerionAI was born from a simple observation: large enterprises have massive amounts of data and powerful core systems, but the human workflows surrounding them are slow, manual, and disconnected. We exist to close that gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="p-8 rounded-lg border border-white/10 bg-card">
            <Lightbulb className="w-6 h-6 text-primary mb-6" />
            <h3 className="text-base font-bold text-white mb-3">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">To rapidly deploy AI-native applications that bridge the gap between human intent and complex enterprise systems.</p>
          </div>
          
          <div className="p-8 rounded-lg border border-white/10 bg-card">
            <ShieldCheck className="w-6 h-6 text-primary mb-6" />
            <h3 className="text-base font-bold text-white mb-3">Our Philosophy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Extend, don't replace. We build secure layers on top of your existing investments rather than enforcing costly migrations.</p>
          </div>

          <div className="p-8 rounded-lg border border-white/10 bg-card">
            <Globe2 className="w-6 h-6 text-primary mb-6" />
            <h3 className="text-base font-bold text-white mb-3">Global Scale</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Built from day one to handle the scale, compliance, and multi-region complexities of Fortune 500 companies securely.</p>
          </div>
        </div>

        <div className="p-12 rounded-lg border border-white/10 bg-card">
          <h2 className="text-2xl font-bold mb-4 text-white">Join the Future of Enterprise IT</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Whether you are looking to transform your internal workflows or join our team of world-class AI engineers and enterprise architects.
          </p>
          <Link href="/contact">
            <Button className="rounded-md bg-white text-background font-medium hover:bg-gray-200">
              Contact Leadership
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
