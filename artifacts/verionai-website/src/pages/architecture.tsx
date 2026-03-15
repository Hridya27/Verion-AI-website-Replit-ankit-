import { motion } from "framer-motion";
import { Server, Shield, Layers, Workflow, Database, Cpu } from "lucide-react";

export default function Architecture() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/architecture-bg.png`}
            alt="Architecture Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Enterprise-Grade AI Architecture</h1>
            <p className="text-xl text-muted-foreground">
              A sovereign, secure, and infinitely scalable technology stack designed to extend—not replace—your core enterprise systems.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Layers Diagram equivalent */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            
            <div className="space-y-6">
              {/* Layer 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center shadow-lg">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">4. Enterprise Intelligence Layer</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  LLM orchestration, predictive simulations, and autonomous decision-making engines. This is where business logic becomes intelligent.
                </p>
              </motion.div>

              <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-primary rotate-90" /></div>

              {/* Layer 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl glass-panel border-white/10 relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">3. AI Native Applications</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  The user-facing products (P Connect, Trade Scheme, DataWorks, etc.). Highly optimized, responsive UIs built for high user adoption.
                </p>
              </motion.div>

              <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-primary rotate-90" /></div>

              {/* Layer 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl glass-panel border-white/10 relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">2. VerionAI Integration Layer</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  Secure API gateways, webhooks, and event streaming architectures that bidirectionally sync data without overloading core ERPs.
                </p>
              </motion.div>

              <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-primary rotate-90" /></div>

              {/* Layer 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-secondary border border-white/5 relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                    <Database className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">1. Core Enterprise Systems</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  Your existing systems of record: SAP, Oracle, Microsoft Dynamics, Salesforce, and legacy Mainframes. We read from and write to these securely.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Security & Governance by Design</h2>
            <p className="text-xl text-muted-foreground">We understand the risk appetite of global enterprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl glass-panel">
              <Shield className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Sovereign Cloud Deployment</h3>
              <p className="text-muted-foreground">Deploy in your own AWS, Azure, or GCP tenant. Your data never leaves your perimeter, and models are fine-tuned locally.</p>
            </div>
            <div className="p-8 rounded-2xl glass-panel">
              <Server className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Role-Based Access Control (RBAC)</h3>
              <p className="text-muted-foreground">Inherits authorization models directly from your Active Directory or Okta setup. No parallel shadow security policies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
