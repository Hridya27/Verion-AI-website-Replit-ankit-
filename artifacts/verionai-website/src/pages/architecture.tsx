import { Link } from "wouter";
import { Server, Shield, Layers, Workflow, Database, Cpu, Bot, LayoutTemplate } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

export default function Architecture() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Architecture
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950">Enterprise-Grade Architecture</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            A sovereign, secure, and infinitely scalable technology stack designed to extend — not replace — your core enterprise systems. The same four layers power both our AI-native applications and our AI Agent fleet.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {[
              {
                num: "4",
                label: "Enterprise Intelligence Layer",
                sub: "LLM Orchestration & Logic",
                icon: <Cpu className="w-5 h-5" />,
                desc: "LLM orchestration, predictive simulations, and autonomous decision-making engines. This is where business logic becomes intelligent — powering both application UIs and the continuous reasoning and action loops that drive our AI Agents. Models deployed locally in your cloud tenant.",
                highlight: true,
              },
              {
                num: "3",
                label: "AI Native Applications & Agents",
                sub: "User-Facing UIs · Autonomous Agent Runtimes",
                icon: <Layers className="w-5 h-5" />,
                desc: "Two delivery vehicles built at this layer: (1) User-facing AI applications — Verionai Connect, Trade Scheme, DataWorks, Flow, and ServiceWorks — highly optimized, responsive UIs delivered via web or embedded in Teams/Outlook; and (2) Purpose-built AI Agents (CX, IT Ops, Sec Ops, OCR, Marketing) — autonomous workers that operate continuously within your enterprise stack, acting on data without requiring a human in the loop.",
                highlight: false,
              },
              {
                num: "2",
                label: "VerionAI Integration Layer",
                sub: "Secure Gateways & Data Sync",
                icon: <Workflow className="w-5 h-5" />,
                desc: "Secure API gateways, webhooks, and event streaming architectures that bidirectionally sync data without overloading core ERPs. Handles rate limiting and intelligent caching. Also provides the runtime connectivity agents need to read signals, execute actions, and report outcomes across enterprise systems.",
                highlight: false,
              },
              {
                num: "1",
                label: "Core Enterprise Systems",
                sub: "SAP · Oracle · Microsoft · Salesforce",
                icon: <Database className="w-5 h-5" />,
                desc: "Your existing systems of record: SAP, Oracle, Microsoft Dynamics, Salesforce, and legacy Mainframes. We read from and write to these securely, maintaining them as the single source of truth.",
                highlight: false,
              },
            ].map((layer, i) => (
              <div key={i}>
                <div className={`p-6 md:p-8 rounded-xl border flex flex-col md:flex-row md:items-start gap-5 ${layer.highlight ? "border-pink-200 bg-pink-50/30" : "border-gray-200 bg-white"}`}>
                  <div className="flex items-center gap-4 md:w-72 shrink-0">
                    <div
                      className="w-10 h-10 rounded-md border flex items-center justify-center shrink-0"
                      style={layer.highlight ? { borderColor: `${pink}40`, backgroundColor: `${pink}10`, color: pink } : { borderColor: "#E5E7EB", backgroundColor: "#F9FAFB", color: "#9CA3AF" }}
                    >
                      {layer.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-gray-400 mb-0.5">Layer {layer.num}</div>
                      <div className="text-sm font-bold text-gray-900">{layer.label}</div>
                      <div className="text-xs text-gray-400">{layer.sub}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{layer.desc}</p>
                </div>
                {i < 3 && (
                  <div className="flex justify-center my-1">
                    <div className="w-px h-5 bg-gray-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two Delivery Models callout */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: purple }}>
              Two Delivery Models, One Stack
            </span>
            <p className="text-gray-500 text-sm max-w-xl">
              The same four-layer architecture underpins both ways VerionAI delivers value — choose the model that fits your challenge, or combine both.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="enterprise-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900">AI-Native Applications</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Full-featured, user-facing software products that replace or extend specific enterprise workflows. Highly customized to your business logic and brand, deployed in days.
              </p>
              <ul className="space-y-1.5">
                {["Verionai Connect (HR & Engagement)", "Verion Trade Scheme (Incentives)", "Verion DataWorks (Data Governance)", "Verion Flow (Approvals)", "Verion ServiceWorks (ITSM)"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: pink }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/solutions">
                <span className="inline-flex items-center gap-1 text-xs font-semibold mt-5 transition-colors" style={{ color: pink }}>
                  View all modules →
                </span>
              </Link>
            </div>

            <div className="enterprise-card p-7" style={{ borderColor: `${pink}25`, background: `${pink}04` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-md border flex items-center justify-center" style={{ borderColor: `${pink}30`, backgroundColor: `${pink}08`, color: pink }}>
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">AI Agents as a Service</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Autonomous agents deployed into specific operational functions. They monitor, reason, and act continuously — integrating with your existing tools without requiring a new application layer.
              </p>
              <ul className="space-y-1.5">
                {["CX Agent (Customer Support)", "IT Ops Agent (Incident Management)", "Sec Ops Agent (Governance & Compliance)", "OCR Agent (Document Processing)", "Marketing Agent (Campaigns & Content)"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: pink }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/solutions#agent-as-a-service">
                <span className="inline-flex items-center gap-1 text-xs font-semibold mt-5 transition-colors" style={{ color: pink }}>
                  Explore AI Agents →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: purple }}>
              Security & Governance
            </span>
            <h2 className="text-2xl font-bold text-gray-950">Built for Enterprise Risk Standards</h2>
            <p className="text-gray-500 mt-2">Meeting the strict requirements of global enterprises from day one.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: <Shield className="w-5 h-5" style={{ color: pink }} />,
                title: "Sovereign Cloud Deployment",
                desc: "Deploy in your own AWS, Azure, or GCP tenant. Your data never leaves your perimeter, ensuring absolute privacy and compliance with regional data residency laws.",
              },
              {
                icon: <Server className="w-5 h-5" style={{ color: purple }} />,
                title: "Role-Based Access Control",
                desc: "Inherits authorization models directly from your Active Directory, Okta, or existing IAM provider. No parallel shadow security policies to manage.",
              },
            ].map((item, i) => (
              <div key={i} className="enterprise-card p-8">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
