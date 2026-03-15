import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Database, LayoutTemplate, Box, Server, Factory, Building2, FlaskConical, Briefcase } from "lucide-react";

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
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Futuristic AI Enterprise Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/80 dark:text-primary tracking-wide">
                The Next Generation of Enterprise AI
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-8 leading-tight">
              Designing <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary text-glow">
                Autonomous Enterprise
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              VerionAI is an AI consulting firm that designs and deploys enterprise-grade AI-native applications in <span className="text-white font-semibold">days — not months</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/solutions">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-background font-semibold shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all">
                  Explore Solutions
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-white/20 hover:bg-white/5 text-white transition-all">
                  Book a Discovery Call
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Trusted Integrations Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-24 pt-10 border-t border-white/10"
          >
            <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
              Seamlessly integrates with enterprise systems
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl font-display font-bold">SAP</div>
              <div className="text-xl font-display font-bold">Microsoft</div>
              <div className="text-xl font-display font-bold">Oracle</div>
              <div className="text-xl font-display font-bold">Salesforce</div>
              <div className="text-xl font-display font-bold">Enterprise DMS</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Enterprise Problem */}
      <section className="py-24 bg-secondary/20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Enterprise systems were never designed for the AI era.
            </h2>
            <p className="text-xl text-muted-foreground">
              Traditional IT creates bottlenecks. We bypass them.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Long IT Cycles", desc: "Months or years to deploy simple applications.", icon: <Box className="w-6 h-6 text-red-400" /> },
              { title: "Expensive Custom Dev", desc: "High costs for basic integrations and features.", icon: <Database className="w-6 h-6 text-orange-400" /> },
              { title: "Disconnected Systems", desc: "Data silos preventing unified intelligence.", icon: <Server className="w-6 h-6 text-yellow-400" /> },
              { title: "Poor Adoption", desc: "Clunky UI/UX leading to employee friction.", icon: <LayoutTemplate className="w-6 h-6 text-rose-400" /> }
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-panel p-8 rounded-2xl glow-border">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The VerionAI Approach */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                From Idea to Enterprise Application in <span className="text-primary">Days</span>.
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We don't just build software. We build AI-native ecosystems that operate autonomously, learning and adapting to your enterprise needs securely.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Rapid AI App Development", desc: "Deploy in days using our composable AI blocks." },
                  { title: "Seamless Enterprise Integration", desc: "Connects securely to SAP, Oracle, and MS." },
                  { title: "Sovereign Cloud Data Security", desc: "Your data never leaves your environment." },
                  { title: "Enterprise-Grade Architecture", desc: "Built to scale across global operations." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link href="/how-it-works">
                <Button variant="link" className="mt-8 text-primary hover:text-primary/80 p-0 h-auto font-semibold text-lg flex items-center gap-2 group">
                  See our methodology <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 aspect-square lg:aspect-[4/3]">
                <img 
                  src={`${import.meta.env.BASE_URL}images/abstract-globe.png`}
                  alt="Global Enterprise Network" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-24 bg-background border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Enterprise AI Applications</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Pre-architected, highly customizable applications ready to deploy into your environment.
              </p>
            </div>
            <Link href="/solutions">
              <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                View All Solutions
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Verion P Connect", category: "HR & Engagement", desc: "Employee recognition, gamification, and resource allocation workflows." },
              { name: "Verion Trade Scheme", category: "Sales & Dealer Ops", desc: "Target schemes, AI simulation, and automated incentive payouts." },
              { name: "Verion DataWorks", category: "Data Governance", desc: "Automated ETL, master data harmonization, and AI data cleansing." },
              { name: "Verion Flow", category: "Workflow Automation", desc: "Multi-level approvals, visual builders, and deep Outlook integration." },
              { name: "Verion ServiceWorks", category: "ITSM", desc: "AI-driven ticket routing, knowledge base, and SLA management." }
            ].map((prod, i) => (
              <Link key={i} href="/solutions">
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="h-full glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="text-primary text-sm font-semibold tracking-wider uppercase mb-4">{prod.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{prod.name}</h3>
                  <p className="text-muted-foreground">{prod.desc}</p>
                  <div className="mt-8 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Designed for Your Industry</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI applications are contextualized for the unique demands of global sectors.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Professional Services", icon: <Briefcase className="w-5 h-5" /> },
              { name: "Pharma & Chemicals", icon: <FlaskConical className="w-5 h-5" /> },
              { name: "Industrial Manufacturing", icon: <Factory className="w-5 h-5" /> },
              { name: "Consumer & FMCG", icon: <Box className="w-5 h-5" /> },
              { name: "Engineering & Construction", icon: <Building2 className="w-5 h-5" /> },
            ].map((ind, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-full bg-secondary/50 border border-white/10 hover:border-primary/50 transition-colors cursor-default">
                <span className="text-primary">{ind.icon}</span>
                <span className="font-semibold text-white">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-background z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-8">
            Ready to Build Your First <br/> AI Application?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop waiting for monolithic IT projects. Deploy enterprise-grade, secure AI applications in days with VerionAI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full bg-white text-background hover:bg-white/90 text-lg font-bold">
                Book a Discovery Call
              </Button>
            </Link>
            <Link href="/solutions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-full border-primary text-primary hover:bg-primary/10 text-lg font-bold">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
