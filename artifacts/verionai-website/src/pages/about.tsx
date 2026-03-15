import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe2, Lightbulb, ShieldCheck } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            About VerionAI
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950 leading-tight">
            Building the Autonomous Enterprise
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            VerionAI was founded in 2026 with a simple mission: help enterprises become truly autonomous. We observed that large enterprises have massive data assets and powerful core systems — but the human workflows surrounding them are slow, manual, and disconnected. We exist to close that gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {[
            {
              icon: <Lightbulb className="w-5 h-5" style={{ color: pink }} />,
              title: "Our Mission",
              desc: "To rapidly deploy AI-native applications that bridge the gap between human intent and complex enterprise systems — in days, not months.",
            },
            {
              icon: <ShieldCheck className="w-5 h-5" style={{ color: purple }} />,
              title: "Our Philosophy",
              desc: "Extend, don't replace. We build secure, intelligent layers on top of your existing investments rather than enforcing costly migrations.",
            },
            {
              icon: <Globe2 className="w-5 h-5" style={{ color: pink }} />,
              title: "Global Scale",
              desc: "Built from day one to handle the scale, compliance, and multi-region complexities of Fortune 500 enterprises securely.",
            },
          ].map((item, i) => (
            <div key={i} className="enterprise-card p-8">
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-alt rounded-xl border border-gray-200 p-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
              Get in touch
            </span>
            <h2 className="text-2xl font-bold mb-3 text-gray-950">
              Instead of replacing enterprise systems, VerionAI extends them.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
              Whether you are looking to transform your internal workflows or want to partner with our team of world-class AI engineers and enterprise architects — we'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-md text-white font-semibold text-sm"
                style={{ backgroundColor: pink }}
              >
                Contact Leadership
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
