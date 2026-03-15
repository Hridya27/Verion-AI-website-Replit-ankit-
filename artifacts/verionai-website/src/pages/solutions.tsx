import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, TrendingUp, Database, GitMerge, HeadphonesIcon } from "lucide-react";

export default function Solutions() {
  const products = [
    {
      id: "verion-p-connect",
      name: "Verion P Connect",
      icon: <Users className="w-8 h-8 text-primary" />,
      tagline: "The AI-Powered HR & Employee Engagement Layer",
      desc: "Transform hire-to-retire workflows. P Connect adds gamification, intelligent resource allocation, and unified employee profiles on top of your existing HRIS.",
      features: ["Employee recognition & gamification", "Points & rewards system", "AI resource allocation", "Hire-to-retire process automation"]
    },
    {
      id: "verion-trade-scheme",
      name: "Verion Trade Scheme",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      tagline: "Intelligent Dealer & Sales Incentive Management",
      desc: "Dynamically manage complex target and growth schemes. Use AI simulations to predict scheme performance and automate global dealer reimbursements.",
      features: ["Target & growth scheme modeling", "AI budget simulation", "Automated reimbursements", "ERP sales data integration"]
    },
    {
      id: "verion-dataworks",
      name: "Verion DataWorks",
      icon: <Database className="w-8 h-8 text-primary" />,
      tagline: "Autonomous Data Harmonization & MDM",
      desc: "Cleanse, deduplicate, and govern your enterprise data autonomously. DataWorks uses LLMs to resolve data conflicts across disconnected systems.",
      features: ["AI data deduplication", "Master data governance workflows", "Custom MDM rules engine", "Automated ETL pipelines"]
    },
    {
      id: "verion-flow",
      name: "Verion Flow",
      icon: <GitMerge className="w-8 h-8 text-primary" />,
      tagline: "Visual Workflow & Approval Automation",
      desc: "Bypass rigid ERP approval processes. Verion Flow allows business users to visually build multi-level approval matrices that integrate directly into Outlook and Teams.",
      features: ["Multi-level visual builder", "Configurable routing rules", "Outlook/Teams actionable cards", "Full audit trailing"]
    },
    {
      id: "verion-serviceworks",
      name: "Verion ServiceWorks",
      icon: <HeadphonesIcon className="w-8 h-8 text-primary" />,
      tagline: "Next-Gen IT & Enterprise Service Management",
      desc: "An AI-native ticketing and knowledge base system that auto-resolves L1 requests and intelligently routes complex incidents to the right teams.",
      features: ["AI ticket triage & routing", "SLA tracking & analytics", "Dynamic knowledge base generation", "Incident management"]
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Solutions</h1>
          <p className="text-xl text-muted-foreground">
            Pre-built, customizable AI applications that layer over your existing enterprise systems to deliver immediate autonomous capabilities.
          </p>
        </div>

        <div className="space-y-24">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  {product.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{product.name}</h2>
                <h3 className="text-xl text-primary font-medium">{product.tagline}</h3>
                <p className="text-lg text-muted-foreground">{product.desc}</p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6">
                  <Link href="/contact">
                    <Button className="rounded-full bg-white text-background hover:bg-gray-200">
                      Request Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="aspect-[4/3] rounded-2xl glass-panel relative overflow-hidden flex items-center justify-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                  {/* Abstract representation of the product UI */}
                  <div className="w-3/4 h-3/4 bg-background/80 rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      <div className="h-8 w-1/3 bg-white/5 rounded-md" />
                      <div className="flex gap-4">
                        <div className="h-24 w-1/2 bg-white/5 rounded-md" />
                        <div className="h-24 w-1/2 bg-white/5 rounded-md" />
                      </div>
                      <div className="h-32 w-full bg-white/5 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
