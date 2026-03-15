import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Database, Server, LayoutTemplate, Briefcase, FlaskConical, Factory, Building2, Layers, Cpu, Workflow } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

export default function Home() {
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="mb-5">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: purple }}>
                Enterprise AI Consulting
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight mb-6 leading-[1.08] text-gray-950">
              Designing<br />
              <span style={{ color: pink }}>Autonomous</span><br />
              <span className="text-gray-950">Enterprise</span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-xl leading-relaxed">
              VerionAI builds enterprise-grade AI-native applications in days — integrating seamlessly with SAP, Microsoft, Oracle, and Salesforce.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/solutions">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-11 px-7 rounded-md font-semibold text-sm text-white"
                  style={{ backgroundColor: pink }}
                >
                  Explore Solutions
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-11 px-7 rounded-md border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                >
                  Book a Discovery Call
                </Button>
              </Link>
            </div>

            <div className="mt-14 pt-8 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                Works with
              </p>
              <div className="flex flex-wrap items-center gap-8 md:gap-10">
                {["SAP", "Microsoft", "Oracle", "Salesforce"].map(name => (
                  <span key={name} className="text-base font-bold text-gray-300 tracking-tight">{name}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex-1 hidden lg:block"
          >
            <div className="w-full max-w-md mx-auto border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Architecture Stack</p>
              <div className="space-y-3">
                {[
                  { label: "Enterprise Intelligence", sub: "LLM Orchestration & Logic", icon: <Cpu className="w-4 h-4" />, active: true },
                  { label: "AI Native Applications", sub: "User-facing Contextual UI", icon: <Layers className="w-4 h-4" />, active: false },
                  { label: "VerionAI Integration Layer", sub: "Secure Gateways & Sync", icon: <Workflow className="w-4 h-4" />, active: false },
                  { label: "Core Enterprise Systems", sub: "SAP, Oracle, Dynamics", icon: <Database className="w-4 h-4" />, active: false },
                ].map((layer, i) => (
                  <div key={i}>
                    <div className={`flex items-center gap-3 p-4 rounded-lg border ${layer.active ? "border-pink-200 bg-white shadow-sm" : "border-gray-200 bg-white"}`}>
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${layer.active ? "bg-pink-50" : "bg-gray-100"}`}
                        style={layer.active ? { color: pink } : { color: "#9CA3AF" }}>
                        {layer.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{layer.label}</div>
                        <div className="text-xs text-gray-400">{layer.sub}</div>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center my-1">
                        <div className="w-px h-4 bg-gray-200" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 section-alt border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-950 leading-tight">
                Enterprise systems were never designed for the AI era.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Traditional IT creates bottlenecks. Complex integrations take years. Data remains siloed. We bypass these limitations with pre-architected AI layers.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { num: "01", title: "Long IT Cycles", desc: "Months or years to deploy simple applications.", icon: <Box className="w-4 h-4 text-gray-400" /> },
                { num: "02", title: "Expensive Custom Dev", desc: "High costs for basic integrations and features.", icon: <Database className="w-4 h-4 text-gray-400" /> },
                { num: "03", title: "Disconnected Systems", desc: "Data silos preventing unified intelligence.", icon: <Server className="w-4 h-4 text-gray-400" /> },
                { num: "04", title: "Poor Adoption", desc: "Clunky UI/UX leading to employee friction.", icon: <LayoutTemplate className="w-4 h-4 text-gray-400" /> },
              ].map((item, i) => (
                <div key={i} className="enterprise-card p-6 flex items-start gap-4">
                  <div className="shrink-0 text-xs font-mono font-bold mt-0.5" style={{ color: pink }}>{item.num}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.icon}
                      <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-950">
              From idea to application in days.
            </h2>
            <p className="text-gray-500">
              AI-native ecosystems built on top of your existing investments — not replacing them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Rapid AI App Development", desc: "Deploy in days using our composable AI blocks tailored to your business logic.", icon: <Box className="w-4 h-4" /> },
              { title: "Seamless Enterprise Integration", desc: "Connects securely to SAP, Oracle, and MS without disrupting core systems.", icon: <Workflow className="w-4 h-4" /> },
              { title: "Sovereign Cloud Data Security", desc: "Your data never leaves your environment. Models are deployed locally in your tenant.", icon: <Server className="w-4 h-4" /> },
              { title: "Enterprise-Grade Architecture", desc: "Built to scale across global operations with full RBAC and compliance.", icon: <Layers className="w-4 h-4" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className="enterprise-card p-7 group transition-transform duration-200 cursor-default"
              >
                <div className="w-9 h-9 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center mb-5 text-gray-400">
                  {item.icon}
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-24 section-alt border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: purple }}>
              Methodology
            </span>
            <h2 className="text-3xl font-bold mb-3 text-gray-950">AI Applications Delivered in 5 Steps</h2>
            <p className="text-gray-500">A proven path from problem to production.</p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-0 max-w-5xl relative">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gray-200" />
            {[
              { title: "Discovery", desc: "Identify high-impact operational bottlenecks." },
              { title: "Design", desc: "Map architecture and select AI components." },
              { title: "Development", desc: "Rapidly configure business logic and UI." },
              { title: "Integration", desc: "Connect securely to ERP and CRM systems." },
              { title: "Deployment", desc: "Launch in sovereign cloud with full training." },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-start md:items-center text-left md:text-center px-4 mb-8 md:mb-0">
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold z-10 mb-5 bg-white"
                  style={{ borderColor: pink, color: pink }}
                >
                  0{i + 1}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: purple }}>
                Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-950">Enterprise AI Applications</h2>
              <p className="text-gray-500 mt-3 max-w-xl">
                Pre-architected, highly customizable applications ready to deploy into your environment.
              </p>
            </div>
            <Link href="/solutions">
              <Button variant="outline" className="rounded-md border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium shrink-0">
                View All Solutions
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Verionai Connect", category: "HR & Engagement", desc: "Employee recognition, gamification, and resource allocation workflows.", href: "/connect", external: false },
              { name: "Verion Trade Scheme", category: "Sales & Dealer Ops", desc: "Target schemes, AI simulation, and automated incentive payouts.", href: "/solutions", external: false },
              { name: "Verion DataWorks", category: "Data Governance", desc: "Automated ETL, master data harmonization, and AI data cleansing.", href: "/solutions", external: false },
              { name: "Verion Flow", category: "Workflow Automation", desc: "Multi-level approvals, visual builders, and enterprise integration.", href: "/solutions", external: false },
              { name: "Verion ServiceWorks", category: "ITSM", desc: "AI-driven ticket routing, knowledge base, and SLA management.", href: "/solutions", external: false },
            ].map((prod, i) => (
              prod.external ? (
                <a key={i} href={prod.href} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full enterprise-card p-7 cursor-pointer group transition-all duration-200 hover:border-pink-300 flex flex-col"
                  >
                    <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: pink }}>
                      {prod.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{prod.name}</h3>
                    <p className="text-sm text-gray-500 flex-grow leading-relaxed">{prod.desc}</p>
                    <div className="mt-7 flex items-center text-sm font-medium text-gray-400 group-hover:text-pink transition-colors">
                      View Product <ArrowRight className="w-4 h-4 ml-1.5" />
                    </div>
                  </motion.div>
                </a>
              ) : (
                <Link key={i} href={prod.href}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full enterprise-card p-7 cursor-pointer group transition-all duration-200 hover:border-pink-300 flex flex-col"
                  >
                    <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: pink }}>
                      {prod.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{prod.name}</h3>
                    <p className="text-sm text-gray-500 flex-grow leading-relaxed">{prod.desc}</p>
                    <div className="mt-7 flex items-center text-sm font-medium text-gray-400 group-hover:text-pink transition-colors">
                      Explore <ArrowRight className="w-4 h-4 ml-1.5" />
                    </div>
                  </motion.div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 section-alt border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Industries
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-950">Built for Global Sectors</h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              { name: "Professional Services", icon: <Briefcase className="w-4 h-4" /> },
              { name: "Pharma & Chemicals", icon: <FlaskConical className="w-4 h-4" /> },
              { name: "Industrial Manufacturing", icon: <Factory className="w-4 h-4" /> },
              { name: "Consumer & FMCG", icon: <Box className="w-4 h-4" /> },
              { name: "Engineering & Construction", icon: <Building2 className="w-4 h-4" /> },
            ].map((ind, i) => (
              <Link key={i} href="/industries">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-pink-300 hover:text-pink transition-colors cursor-pointer">
                  <span className="text-gray-400">{ind.icon}</span>
                  <span>{ind.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950 leading-tight">
            Ready to build your first AI application?
          </h2>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            Stop waiting for monolithic IT projects. Deploy enterprise-grade, secure AI applications in days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-11 px-8 rounded-md font-semibold text-sm text-white"
                style={{ backgroundColor: pink }}
              >
                Book a Discovery Call
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-8 rounded-md border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
