import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Database, GitMerge, HeadphonesIcon, ArrowRight, Sparkles } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  focus: string;
  desc: string;
  keyFeatureName: string;
  keyFeatureDesc: string;
  features: string[];
  externalLink?: string;
}

const modules: Module[] = [
  {
    id: "verion-p-connect",
    name: "Verion P Connect",
    icon: <Users className="w-5 h-5" />,
    focus: "Employee Experience & HR",
    desc: "Transform hire-to-retire workflows with gamified engagement, intelligent resource matching, and unified employee intelligence on top of your existing HRIS.",
    keyFeatureName: "Resource Intelligence",
    keyFeatureDesc: "AI-driven skill mapping and gamified engagement that surfaces the right people for every project — automatically.",
    features: [
      "AI skill mapping & talent matching",
      "Gamified recognition & rewards",
      "Points economy & incentive engine",
      "Hire-to-retire process automation",
    ],
    externalLink: "https://a1676b3c-5801-4366-8da5-14d049128b06-00-1xaudefy2swlh.worf.replit.dev/product",
  },
  {
    id: "verion-trade-scheme",
    name: "Verion Trade Scheme",
    icon: <TrendingUp className="w-5 h-5" />,
    focus: "Incentive & Channel MGMT",
    desc: "Dynamically model complex dealer and sales target schemes. Simulate performance impacts before launch and automate global reimbursements end-to-end.",
    keyFeatureName: "Scheme Simulation",
    keyFeatureDesc: "Use AI to predict dealer behavior and model budget outcomes before a scheme goes live — eliminating costly mis-launches.",
    features: [
      "Target & growth scheme modeling",
      "AI budget simulation & forecasting",
      "Automated global reimbursements",
      "ERP sales data integration",
    ],
  },
  {
    id: "verion-dataworks",
    name: "Verion DataWorks",
    icon: <Database className="w-5 h-5" />,
    focus: "ETL & Master Data",
    desc: "Cleanse, deduplicate, and govern your enterprise data at scale. DataWorks uses LLMs to autonomously resolve conflicts and harmonize records across disconnected systems.",
    keyFeatureName: "Auto-Harmonization",
    keyFeatureDesc: "AI-driven deduplication across disparate ERP systems — resolving master data conflicts that would take months manually.",
    features: [
      "AI-driven data deduplication",
      "Master data governance workflows",
      "Custom MDM rules engine",
      "Automated ETL pipelines",
    ],
  },
  {
    id: "verion-flow",
    name: "Verion Flow",
    icon: <GitMerge className="w-5 h-5" />,
    focus: "Workflow Automation",
    desc: "Bypass rigid ERP approval chains. Flow lets business users build multi-level approval matrices that plug directly into Outlook and Teams — no IT involvement needed.",
    keyFeatureName: "Cognitive Approvals",
    keyFeatureDesc: "Multi-level approval logic that learns your business rules over time, auto-routing edge cases and reducing decision latency.",
    features: [
      "Visual multi-level approval builder",
      "Configurable dynamic routing rules",
      "Outlook & Teams actionable cards",
      "Full audit trail & compliance logs",
    ],
  },
  {
    id: "verion-serviceworks",
    name: "Verion ServiceWorks",
    icon: <HeadphonesIcon className="w-5 h-5" />,
    focus: "ITSM & Operations",
    desc: "An AI-native service desk that auto-resolves L1 requests, intelligently routes incidents, and surfaces patterns before they escalate into outages.",
    keyFeatureName: "Predictive Resolution",
    keyFeatureDesc: "Resolving tickets before they are filed via pattern recognition — proactively identifying recurring issues and acting on them first.",
    features: [
      "Proactive incident pattern detection",
      "AI ticket triage & smart routing",
      "SLA tracking & real-time analytics",
      "Dynamic knowledge base generation",
    ],
  },
];

function PreviewCard({ module }: { module: Module }) {
  const card = (
    <div
      className={`rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white transition-all duration-200 ${
        module.externalLink ? "group-hover:shadow-md group-hover:border-pink-200 cursor-pointer" : ""
      }`}
    >
      <div className="h-10 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        </div>
        <div className="flex-1 h-4 bg-gray-100 rounded max-w-[160px]" />
        <div
          className="h-5 px-3 rounded text-[10px] font-medium flex items-center text-white"
          style={{ backgroundColor: pink }}
        >
          {module.keyFeatureName}
        </div>
      </div>

      <div className="p-5 bg-white">
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[["Active", "247"], ["Resolved", "1.2k"], ["Pending", "18"]].map(([label, val], i) => (
            <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <div className="text-[10px] text-gray-400 mb-1">{label}</div>
              <div className="text-lg font-bold text-gray-900">{val}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-2.5">
            {[80, 55, 90, 65].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 rounded bg-gray-100" style={{ width: `${w}%` }} />
                  <div className="h-2 rounded bg-gray-50" style={{ width: `${w - 20}%` }} />
                </div>
                <div
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: i === 0 ? pink : i === 2 ? purple : "#E5E7EB",
                    color: i === 0 || i === 2 ? "white" : "#6B7280",
                  }}
                >
                  {i === 0 ? "AI" : i === 2 ? "Live" : "—"}
                </div>
              </div>
            ))}
          </div>

          <div className="w-28 flex flex-col gap-2.5 shrink-0">
            <div className="flex-1 rounded-lg border border-gray-100 bg-gray-50 p-2.5 flex flex-col justify-between">
              <div className="text-[10px] text-gray-400">AI Score</div>
              <div className="text-2xl font-bold" style={{ color: pink }}>94%</div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "94%", backgroundColor: pink }} />
              </div>
            </div>
            <div className="h-14 rounded-lg border border-gray-100 bg-gray-50 p-2.5 flex items-center justify-center">
              <div className="text-[10px] text-gray-400 text-center leading-relaxed">
                Auto-resolved<br />
                <span className="font-semibold text-gray-700">48 items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (module.externalLink) {
    return (
      <a
        href={module.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        {card}
      </a>
    );
  }

  return <>{card}</>;
}

export default function Solutions() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="pt-24 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
              The Verion Suite
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950 leading-tight">
              Modules for the<br />
              <span style={{ color: pink }}>Autonomous Enterprise</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Five pre-architected AI modules that layer over your existing enterprise stack — zero ERP disruption, deployed in days.
            </p>
          </div>

          {/* Module nav pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {modules.map((m) => (
              <a
                key={m.id}
                href={m.externalLink ?? `#${m.id}`}
                target={m.externalLink ? "_blank" : undefined}
                rel={m.externalLink ? "noopener noreferrer" : undefined}
              >
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-pink-300 transition-colors cursor-pointer bg-white">
                  <span className="text-gray-300 w-4 h-4 flex items-center justify-center">{m.icon}</span>
                  {m.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Module Sections */}
      <div className="pb-20">
        {modules.map((module, index) => (
          <motion.section
            key={module.id}
            id={module.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={`py-20 ${index % 2 !== 0 ? "section-alt" : "bg-white"} border-b border-gray-100`}
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className={`flex flex-col lg:flex-row gap-16 items-start ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>

                {/* Left: Content */}
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono text-gray-300 font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-gray-200 max-w-[40px]" />
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: purple }}>
                      {module.focus}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-md border flex items-center justify-center shrink-0"
                      style={{ borderColor: `${pink}30`, backgroundColor: `${pink}08`, color: pink }}
                    >
                      {module.icon}
                    </div>
                    {module.externalLink ? (
                      <a
                        href={module.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2"
                      >
                        <h2 className="text-2xl font-bold text-gray-950 group-hover:underline decoration-pink-300">
                          {module.name}
                        </h2>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink transition-colors" />
                      </a>
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-950">{module.name}</h2>
                    )}
                  </div>

                  <p className="text-gray-500 leading-relaxed mb-8 text-[0.95rem]">{module.desc}</p>

                  <div
                    className="rounded-xl p-5 mb-8 border"
                    style={{ borderColor: `${pink}25`, backgroundColor: `${pink}06` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: pink }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: pink }}>
                        Key Capability — {module.keyFeatureName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{module.keyFeatureDesc}</p>
                  </div>

                  <ul className="space-y-2 mb-8">
                    {module.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: pink }} />
                        <span className="text-sm text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {module.externalLink ? (
                    <a href={module.externalLink} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="rounded-md text-white font-semibold text-sm h-10 px-6"
                        style={{ backgroundColor: pink }}
                      >
                        View Product
                      </Button>
                    </a>
                  ) : (
                    <Link href="/contact">
                      <Button
                        className="rounded-md text-white font-semibold text-sm h-10 px-6"
                        style={{ backgroundColor: pink }}
                      >
                        Request a Demo
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Right: Preview */}
                <div className="lg:w-1/2 w-full">
                  {module.externalLink && (
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xs text-gray-400">Live product</span>
                      <span className="text-xs text-gray-300">→</span>
                      <span className="text-xs font-medium" style={{ color: pink }}>
                        {module.externalLink.replace("https://", "")}
                      </span>
                    </div>
                  )}
                  <PreviewCard module={module} />
                </div>

              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Deploy the Suite
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-950">
            Deploy one module. Or all five.
          </h2>
          <p className="text-gray-500 mb-9 leading-relaxed">
            Every Verion module is independently deployable and integrates with your existing enterprise stack. Start with the highest-impact area and expand from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-11 px-8 rounded-md text-white font-semibold text-sm"
                style={{ backgroundColor: pink }}
              >
                Book a Discovery Call
              </Button>
            </Link>
            <Link href="/architecture">
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-8 rounded-md border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
              >
                View Architecture <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
