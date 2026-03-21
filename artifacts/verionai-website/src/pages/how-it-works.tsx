import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, Bot } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Problem Discovery",
      desc: "We analyze your specific enterprise bottlenecks — whether it's manual data entry, complex approvals, poor system adoption, or high-volume repetitive tasks. We map your current workflows to identify the highest-impact opportunity and determine whether the best solution is a full AI-native application, a purpose-built AI Agent, or a combination of both.",
    },
    {
      num: "02",
      title: "Architecture & Design",
      desc: "Our architects map out a solution using our pre-built composable AI components. We define exact integration points with your ERP, define data contracts, and produce a detailed technical blueprint — including agent runtime requirements, action boundaries, and escalation rules if an agent is part of the solution.",
    },
    {
      num: "03",
      title: "Rapid Development",
      desc: "We don't start from scratch. We customize our core products and configure our AI Agents to match your exact business logic and brand guidelines in days, using our composable AI development framework. Agent configurations — including tools, knowledge bases, and decision boundaries — are version-controlled and auditable.",
    },
    {
      num: "04",
      title: "Enterprise Integration",
      desc: "Secure connection via API or middleware to SAP, Oracle, or Microsoft. We ensure bidirectional data sync with zero core system disruption. For agent deployments, this also covers agent runtime connectivity — granting each agent precisely scoped access to read signals and execute actions within your environment. Full rollback capabilities throughout.",
    },
    {
      num: "05",
      title: "Deployment & Training",
      desc: "Deployed to your sovereign cloud tenant. For applications, this means a complete rollout to users. For AI Agents, this includes agent monitoring dashboards, performance SLAs, and a continuous learning cycle — so each agent gets measurably better over time. Ongoing VerionAI support covers both.",
    },
  ];

  const appPath = [
    "Full user-facing application",
    "Custom business logic & branded UI",
    "High user adoption is a key success metric",
    "Workflows span multiple roles or departments",
    "Replaces or extends an existing enterprise process",
  ];

  const agentPath = [
    "Autonomous, always-on task execution",
    "High-volume repetitive work (support, ops, docs)",
    "Works inside existing tools — no new UI needed",
    "Speed and 24/7 uptime are the primary wins",
    "Lower scope, faster time to first value",
  ];

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Methodology
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950">How VerionAI Works</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            The same proven methodology takes you from initial conversation to a live AI-native application or a deployed AI Agent — in record time. Whether we're building software or configuring autonomous agents, the five phases are identical.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex gap-8"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-11 h-11 shrink-0 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs z-10 bg-white"
                    style={{ borderColor: pink, color: pink }}
                  >
                    {step.num}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="text-xl font-bold text-gray-950 mb-3 mt-2.5">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Which path is right for you? */}
        <div className="max-w-3xl mt-4 pt-16 border-t border-gray-100">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: purple }}>
              Choosing Your Path
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 mb-3">Which approach is right for you?</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
              Both paths follow the same five-phase process. The right choice depends on the nature of your challenge. Our discovery session will clarify it — but here's a quick guide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Application path */}
            <div className="enterprise-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-400">Path A</p>
                  <h3 className="text-base font-bold text-gray-900">AI-Native Application</h3>
                </div>
              </div>
              <ul className="space-y-2.5 mb-6">
                {appPath.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "#9CA3AF" }} />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/solutions">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                  View products <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>

            {/* Agent path */}
            <div className="enterprise-card p-7" style={{ borderColor: `${pink}25`, background: `${pink}04` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md border flex items-center justify-center" style={{ borderColor: `${pink}30`, backgroundColor: `${pink}08`, color: pink }}>
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: pink, opacity: 0.7 }}>Path B</p>
                  <h3 className="text-base font-bold text-gray-900">AI Agent Deployment</h3>
                </div>
              </div>
              <ul className="space-y-2.5 mb-6">
                {agentPath.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: pink }} />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/solutions#agent-as-a-service">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: pink }}>
                  Explore AI Agents <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl border border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Not sure which path fits your challenge? Our team will help you decide in a free 30-minute discovery call.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-md text-white font-semibold text-sm shrink-0"
                style={{ backgroundColor: pink }}
              >
                Book a Discovery Call
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-100">
          <Link href="/contact">
            <Button
              className="rounded-md text-white font-semibold text-sm"
              style={{ backgroundColor: pink }}
            >
              Start Phase 01 Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
