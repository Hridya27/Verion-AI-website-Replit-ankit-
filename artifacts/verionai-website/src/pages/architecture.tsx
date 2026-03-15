import { Server, Shield, Layers, Workflow, Database, Cpu } from "lucide-react";

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
            A sovereign, secure, and infinitely scalable technology stack designed to extend — not replace — your core enterprise systems.
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
                desc: "LLM orchestration, predictive simulations, and autonomous decision-making engines. This is where business logic becomes intelligent. Models deployed locally in your cloud tenant.",
                highlight: true,
              },
              {
                num: "3",
                label: "AI Native Applications",
                sub: "User-Facing Contextual UI",
                icon: <Layers className="w-5 h-5" />,
                desc: "The user-facing products (P Connect, Trade Scheme, DataWorks, Flow, ServiceWorks). Highly optimized, responsive UIs built for high user adoption. Delivered via web or embedded in Teams/Outlook.",
                highlight: false,
              },
              {
                num: "2",
                label: "VerionAI Integration Layer",
                sub: "Secure Gateways & Data Sync",
                icon: <Workflow className="w-5 h-5" />,
                desc: "Secure API gateways, webhooks, and event streaming architectures that bidirectionally sync data without overloading core ERPs. Handles rate limiting and intelligent caching.",
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

        {/* Security */}
        <div className="mt-28 pt-16 border-t border-gray-100">
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
