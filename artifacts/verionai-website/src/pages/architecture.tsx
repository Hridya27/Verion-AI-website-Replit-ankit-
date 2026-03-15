import { Server, Shield, Layers, Workflow, Database, Cpu } from "lucide-react";

export default function Architecture() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Enterprise-Grade Architecture</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A sovereign, secure, and infinitely scalable technology stack designed to extend—not replace—your core enterprise systems.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            
            {/* Layer 4 */}
            <div className="p-6 md:p-8 rounded-lg border border-primary/30 bg-primary/5 relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded border border-white/10 bg-background flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white">4. Enterprise Intelligence Layer</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-14 leading-relaxed">
                LLM orchestration, predictive simulations, and autonomous decision-making engines. This is where business logic becomes intelligent. Models deployed locally in your tenant.
              </p>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center py-2">
              <div className="w-px h-6 bg-white/10"></div>
            </div>

            {/* Layer 3 */}
            <div className="p-6 md:p-8 rounded-lg border border-white/10 bg-card relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">3. AI Native Applications</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-14 leading-relaxed">
                The user-facing products (P Connect, Trade Scheme, DataWorks, Flow). Highly optimized, responsive UIs built for high user adoption. Delivered via web or embedded in Teams/Outlook.
              </p>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center py-2">
              <div className="w-px h-6 bg-white/10"></div>
            </div>

            {/* Layer 2 */}
            <div className="p-6 md:p-8 rounded-lg border border-white/10 bg-card relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">2. VerionAI Integration Layer</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-14 leading-relaxed">
                Secure API gateways, webhooks, and event streaming architectures that bidirectionally sync data without overloading core ERPs. Handles rate limiting and caching.
              </p>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center py-2">
              <div className="w-px h-6 bg-white/10"></div>
            </div>

            {/* Layer 1 */}
            <div className="p-6 md:p-8 rounded-lg border border-white/5 bg-background relative opacity-80">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded border border-white/5 bg-white/5 flex items-center justify-center">
                  <Database className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-white">1. Core Enterprise Systems</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-14 leading-relaxed">
                Your existing systems of record: SAP, Oracle, Microsoft Dynamics, Salesforce, and legacy Mainframes. We read from and write to these securely, maintaining them as the single source of truth.
              </p>
            </div>

          </div>
        </div>

        {/* Security Features */}
        <div className="mt-32 pt-16 border-t border-white/10">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">Security & Governance by Design</h2>
            <p className="text-muted-foreground">Built to meet the strict risk requirements of global enterprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border border-white/10 bg-card">
              <Shield className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Sovereign Cloud Deployment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Deploy in your own AWS, Azure, or GCP tenant. Your data never leaves your perimeter, ensuring absolute privacy and compliance with regional data residency laws.</p>
            </div>
            <div className="p-8 rounded-lg border border-white/10 bg-card">
              <Server className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Role-Based Access Control</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Inherits authorization models directly from your Active Directory, Okta, or existing IAM provider. No parallel shadow security policies to manage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
