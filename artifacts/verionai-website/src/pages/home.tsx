import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Database, Server, LayoutTemplate, Briefcase, FlaskConical, Factory, Building2, Layers, Cpu, Workflow } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="mb-6">
              <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
                Enterprise AI Consulting
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
              Designing <br/>
              <span className="text-primary">
                Autonomous Enterprise
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              VerionAI builds and deploys enterprise-grade, secure AI-native applications in days — completely bypassing traditional IT bottlenecks.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/solutions">
                <Button size="lg" className="w-full sm:w-auto text-sm h-12 px-8 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all">
                  Explore Solutions
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm h-12 px-8 rounded-md border-white/20 hover:bg-white/5 text-white transition-all">
                  Book a Discovery Call
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
                Works with
              </p>
              <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-60">
                <div className="text-lg font-semibold tracking-tight">SAP</div>
                <div className="text-lg font-semibold tracking-tight">Microsoft</div>
                <div className="text-lg font-semibold tracking-tight">Oracle</div>
                <div className="text-lg font-semibold tracking-tight">Salesforce</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 hidden lg:block"
          >
            {/* Architectural Diagram representation in pure CSS/SVG */}
            <div className="w-full max-w-lg mx-auto border border-white/10 rounded-lg p-8 bg-card/50">
              <div className="space-y-4">
                <div className="border border-white/10 rounded-md p-4 bg-background relative z-10 flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Enterprise Intelligence</div>
                    <div className="text-xs text-muted-foreground">LLM Orchestration & Logic</div>
                  </div>
                </div>
                <div className="flex justify-center -my-2"><div className="w-px h-6 bg-white/20"></div></div>
                <div className="border border-white/10 rounded-md p-4 bg-background relative z-10 flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AI Native Apps</div>
                    <div className="text-xs text-muted-foreground">User-facing Contextual UI</div>
                  </div>
                </div>
                <div className="flex justify-center -my-2"><div className="w-px h-6 bg-white/20"></div></div>
                <div className="border border-white/10 rounded-md p-4 bg-background relative z-10 flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">VerionAI Integration Layer</div>
                    <div className="text-xs text-muted-foreground">Secure Gateways & Sync</div>
                  </div>
                </div>
                <div className="flex justify-center -my-2"><div className="w-px h-6 bg-white/20"></div></div>
                <div className="border border-white/10 rounded-md p-4 bg-background relative z-10 flex items-center gap-4 opacity-70">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Core Enterprise Systems</div>
                    <div className="text-xs text-muted-foreground">SAP, Oracle, Dynamics</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 border-y border-white/5 bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Enterprise systems were never designed for the AI era.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Traditional IT creates bottlenecks. Complex integrations take years. Data remains siloed. We bypass these limitations with pre-architected, highly contextualized AI layers.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { num: "01", title: "Long IT Cycles", desc: "Months or years to deploy simple applications.", icon: <Box className="w-5 h-5 text-white" /> },
                { num: "02", title: "Expensive Custom Dev", desc: "High costs for basic integrations and features.", icon: <Database className="w-5 h-5 text-white" /> },
                { num: "03", title: "Disconnected Systems", desc: "Data silos preventing unified intelligence.", icon: <Server className="w-5 h-5 text-white" /> },
                { num: "04", title: "Poor Adoption", desc: "Clunky UI/UX leading to employee friction.", icon: <LayoutTemplate className="w-5 h-5 text-white" /> }
              ].map((item, i) => (
                <div key={i} className="enterprise-card p-6 flex items-start gap-4">
                  <div className="shrink-0 text-primary font-mono text-sm mt-1">{item.num}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              From idea to application in days.
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't just build software. We build AI-native ecosystems that operate autonomously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Rapid AI App Development", desc: "Deploy in days using our composable AI blocks tailored to your logic.", icon: <Box className="w-5 h-5" /> },
              { title: "Seamless Enterprise Integration", desc: "Connects securely to SAP, Oracle, and MS without disrupting core systems.", icon: <Workflow className="w-5 h-5" /> },
              { title: "Sovereign Cloud Data Security", desc: "Your data never leaves your environment. Models are deployed locally.", icon: <Server className="w-5 h-5" /> },
              { title: "Enterprise-Grade Architecture", desc: "Built to scale across global operations with full RBAC and compliance.", icon: <Layers className="w-5 h-5" /> }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="enterprise-card p-8 group transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center mb-6 text-white group-hover:text-primary transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Methodology</h2>
            <p className="text-muted-foreground">A proven path to AI transformation.</p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-start gap-8 relative">
            {/* Connecting line desktop */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
            
            {/* Connecting line mobile */}
            <div className="block md:hidden absolute left-4 top-0 bottom-0 w-px bg-white/10" />

            {[
              { title: "Discovery", desc: "Analyze enterprise bottlenecks and identify integration points." },
              { title: "Design", desc: "Map architecture and select composable AI components." },
              { title: "Development", desc: "Rapidly configure business logic and UI layer." },
              { title: "Integration", desc: "Connect securely to core systems (ERP, CRM)." },
              { title: "Deployment", desc: "Launch in sovereign cloud with full team training." }
            ].map((step, i) => (
              <div key={i} className="flex-1 relative pl-12 md:pl-0">
                <div className="absolute left-0 md:left-auto md:mx-auto md:right-auto md:relative w-8 h-8 rounded-full bg-background border border-primary text-primary flex items-center justify-center text-xs font-mono font-bold z-10 mb-6">
                  0{i+1}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Enterprise AI Applications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Pre-architected, highly customizable applications ready to deploy.
              </p>
            </div>
            <Link href="/solutions">
              <Button variant="outline" className="rounded-md border-white/20 text-white hover:bg-white/5">
                View All Solutions
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Verion P Connect", category: "HR & Engagement", desc: "Employee recognition, gamification, and resource allocation workflows." },
              { name: "Verion Trade Scheme", category: "Sales & Dealer Ops", desc: "Target schemes, AI simulation, and automated incentive payouts." },
              { name: "Verion DataWorks", category: "Data Governance", desc: "Automated ETL, master data harmonization, and AI data cleansing." },
              { name: "Verion Flow", category: "Workflow Automation", desc: "Multi-level approvals, visual builders, and deep integration." },
              { name: "Verion ServiceWorks", category: "ITSM", desc: "AI-driven ticket routing, knowledge base, and SLA management." }
            ].map((prod, i) => (
              <Link key={i} href="/solutions">
                <motion.div 
                  className="h-full enterprise-card p-8 hover:border-primary transition-colors cursor-pointer group flex flex-col"
                >
                  <div className="text-primary text-xs font-semibold tracking-wider uppercase mb-4">{prod.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{prod.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{prod.desc}</p>
                  <div className="mt-8 flex items-center text-sm font-medium text-white group-hover:text-primary transition-colors">
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-card/30 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-white">Built for Global Sectors</h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { name: "Professional Services", icon: <Briefcase className="w-4 h-4" /> },
              { name: "Pharma & Chemicals", icon: <FlaskConical className="w-4 h-4" /> },
              { name: "Industrial Manufacturing", icon: <Factory className="w-4 h-4" /> },
              { name: "Consumer & FMCG", icon: <Box className="w-4 h-4" /> },
              { name: "Engineering", icon: <Building2 className="w-4 h-4" /> },
            ].map((ind, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-3 rounded border border-white/10 bg-background text-sm font-medium text-white">
                <span className="text-muted-foreground">{ind.icon}</span>
                <span>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to deploy your first AI application?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Stop waiting for monolithic IT projects. Deploy enterprise-grade, secure AI applications in days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                Book a Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
