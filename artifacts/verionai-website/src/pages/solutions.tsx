import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Users, TrendingUp, Database, GitMerge, HeadphonesIcon, ArrowRight, Sparkles,
  MessageSquare, Monitor, Shield, FileText, Megaphone, Bot,
} from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";
const black = "#111827";

function StyledModuleName({ name, className }: { name: string; className?: string }) {
  if (name === "Verionai Connect") {
    return (
      <span className={className}>
        <span style={{ color: pink }}>Verion</span>
        <span style={{ color: black }}>ai Connect</span>
      </span>
    );
  }
  return <span className={className}>{name}</span>;
}

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  focus: string;
  desc: string;
  keyFeatureName: string;
  keyFeatureDesc: string;
  features: string[];
  productPage?: string;
}

interface Agent {
  id: string;
  name: string;
  icon: React.ReactNode;
  focus: string;
  desc: string;
  capabilities: string[];
}

const modules: Module[] = [
  {
    id: "verionai-connect",
    name: "Verionai Connect",
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
    productPage: "/connect",
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
    desc: "Bypass rigid approval chains. Flow lets business users build multi-level approval matrices that push actionable notifications directly into email and collaboration tools — no IT involvement needed.",
    keyFeatureName: "Cognitive Approvals",
    keyFeatureDesc: "Multi-level approval logic that learns your business rules over time, auto-routing edge cases and reducing decision latency.",
    features: [
      "Visual multi-level approval builder",
      "Configurable dynamic routing rules",
      "Email & collaboration integration (Outlook, Teams, Slack)",
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

const agents: Agent[] = [
  {
    id: "cx-agent",
    name: "CX Agent",
    icon: <MessageSquare className="w-5 h-5" />,
    focus: "Customer Experience & Support",
    desc: "24/7 AI-powered chat and voice support that instantly resolves everyday customer inquiries — with the tone and knowledge of your best human agent. Seamlessly escalates complex cases while maintaining full conversation context.",
    capabilities: [
      "Omnichannel chat & voice support",
      "Natural language understanding",
      "Intelligent human escalation",
      "Multilingual, always-on operation",
    ],
  },
  {
    id: "it-ops-agent",
    name: "IT Ops Agent",
    icon: <Monitor className="w-5 h-5" />,
    focus: "IT Operations & Incident Management",
    desc: "An autonomous agent that monitors your IT environment in real time, triages incidents across multiple systems simultaneously, and resolves common issues before they impact end users — acting as a 10× multiplier for your SRE team.",
    capabilities: [
      "Real-time infrastructure monitoring",
      "Parallel incident triage & resolution",
      "MTTR reduction & root-cause analysis",
      "Continuous self-learning from past incidents",
    ],
  },
  {
    id: "sec-ops-agent",
    name: "Sec Ops Agent",
    icon: <Shield className="w-5 h-5" />,
    focus: "Security, Governance & Compliance",
    desc: "Monitors all AI tool usage across your organisation, detects policy violations, protects sensitive data from exposure, and ensures your GenAI adoption stays within enterprise compliance boundaries — all in one autonomous agent.",
    capabilities: [
      "AI tool usage visibility & control",
      "Sensitive data leak detection",
      "Compliance policy enforcement",
      "Risk scoring & audit reporting",
    ],
  },
  {
    id: "ocr-agent",
    name: "OCR Agent",
    icon: <FileText className="w-5 h-5" />,
    focus: "Intelligent Document Processing",
    desc: "Goes far beyond simple text extraction — it understands document structure, detects patterns, validates data against business rules, and pushes clean, structured output directly into your downstream workflows. Eliminate manual data entry entirely.",
    capabilities: [
      "Structured data extraction & validation",
      "Multi-format document ingestion",
      "Workflow integration (ERP, CRM, RPA)",
      "Exception handling & human-in-loop routing",
    ],
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    icon: <Megaphone className="w-5 h-5" />,
    focus: "Marketing Automation & Growth",
    desc: "An always-on marketing team member that generates campaign content, personalises outreach, identifies trending topics, and optimises live campaigns in real time — all tuned to your brand voice and business objectives.",
    capabilities: [
      "AI content creation (posts, emails, newsletters)",
      "Lead generation & qualification",
      "Campaign performance optimisation",
      "Brand-voice-tuned output",
    ],
  },
];

function PreviewCard({ module }: { module: Module }) {
  const card = (
    <div
      className={`rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white transition-all duration-200 ${
        module.productPage ? "group-hover:shadow-md group-hover:border-pink-200 cursor-pointer" : ""
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

  if (module.productPage) {
    return (
      <Link href={module.productPage} className="block group">
        {card}
      </Link>
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
              Five pre-architected AI application modules plus a fleet of purpose-built AI Agents — all layering over your existing enterprise stack with zero ERP disruption, deployed in days.
            </p>
          </div>

          {/* Nav pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {modules.map((m) => (
              m.productPage ? (
                <Link key={m.id} href={m.productPage}>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-pink-300 transition-colors cursor-pointer bg-white">
                    <span className="text-gray-300 w-4 h-4 flex items-center justify-center">{m.icon}</span>
                    {m.name}
                  </span>
                </Link>
              ) : (
                <a key={m.id} href={`#${m.id}`}>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-pink-300 transition-colors cursor-pointer bg-white">
                    <span className="text-gray-300 w-4 h-4 flex items-center justify-center">{m.icon}</span>
                    {m.name}
                  </span>
                </a>
              )
            ))}
            <a href="#agent-as-a-service">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer" style={{ borderColor: `${pink}40`, backgroundColor: `${pink}06`, color: pink }}>
                <Bot className="w-4 h-4" />
                AI Agents
              </span>
            </a>
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
                    {module.productPage ? (
                      <Link
                        href={module.productPage}
                        className="group flex items-center gap-2"
                      >
                        <h2 className="text-2xl font-bold group-hover:underline decoration-pink-300">
                          <StyledModuleName name={module.name} />
                        </h2>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink transition-colors" />
                      </Link>
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-950"><StyledModuleName name={module.name} /></h2>
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

                  {module.productPage ? (
                    <Link href={module.productPage}>
                      <Button
                        className="rounded-md text-white font-semibold text-sm h-10 px-6"
                        style={{ backgroundColor: pink }}
                      >
                        View Product
                      </Button>
                    </Link>
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
                  {module.productPage && (
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xs text-gray-400">Live product</span>
                      <span className="text-xs text-gray-300">→</span>
                      <span className="text-xs font-medium" style={{ color: pink }}>
                        Verionai Connect
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

      {/* Agent-as-a-Service Section */}
      <section id="agent-as-a-service" className="py-24 border-t border-gray-100 scroll-mt-20" style={{ background: "linear-gradient(180deg, #fafafa 0%, #fff 100%)" }}>
        <div className="container mx-auto px-4 md:px-6">

          {/* Section header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 text-xs font-semibold" style={{ borderColor: "hsl(262 83% 55% / 0.3)", backgroundColor: "hsl(262 83% 55% / 0.07)", color: purple }}>
              <Bot className="w-3.5 h-3.5" />
              Agent-as-a-Service
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-950 leading-tight">
              Purpose-Built AI Agents,<br />
              <span style={{ color: pink }}>Ready to Deploy</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Not every problem needs a full application. Our AI Agents are autonomous workers you deploy directly into your operations — integrating with your existing systems to automate processes, resolve issues, and deliver outcomes around the clock.
            </p>
          </div>

          {/* Agent cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="rounded-xl border border-gray-200 bg-white p-7 flex flex-col hover:border-pink-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-md border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${pink}30`, backgroundColor: `${pink}08`, color: pink }}
                  >
                    {agent.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ color: purple, background: "hsl(262 83% 55% / 0.08)" }}>
                    {agent.focus.split(" ")[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-950 mb-1">{agent.name}</h3>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: purple }}>{agent.focus}</p>
                <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-6">{agent.desc}</p>

                <ul className="space-y-1.5 mb-6">
                  {agent.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: pink }} />
                      <span className="text-xs text-gray-500">{cap}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: pink }}>
                    Talk to Us <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Agent CTA strip */}
          <div className="mt-14 rounded-xl border border-gray-200 bg-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: purple }}>Get Started</p>
              <p className="text-lg font-bold text-gray-950">Not sure which agent fits your problem?</p>
              <p className="text-sm text-gray-500 mt-1">Our team will map your operational challenge to the right agent — or a combination of several.</p>
            </div>
            <Link href="/contact">
              <Button
                className="rounded-md text-white font-semibold text-sm h-10 px-7 shrink-0"
                style={{ backgroundColor: pink }}
              >
                Book a Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Deploy the Suite
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-950">
            Deploy one module. An AI Agent. Or the entire suite.
          </h2>
          <p className="text-gray-500 mb-9 leading-relaxed">
            Every Verion module and AI Agent is independently deployable and integrates with your existing enterprise stack. Start with the highest-impact area and expand from there.
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
