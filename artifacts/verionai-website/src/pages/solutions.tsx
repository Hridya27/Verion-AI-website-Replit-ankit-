import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, TrendingUp, Database, GitMerge, HeadphonesIcon } from "lucide-react";

export default function Solutions() {
  const products = [
    {
      id: "verion-p-connect",
      name: "Verion P Connect",
      icon: <Users className="w-6 h-6 text-white" />,
      tagline: "The AI-Powered HR & Employee Engagement Layer",
      desc: "Transform hire-to-retire workflows. P Connect adds gamification, intelligent resource allocation, and unified employee profiles on top of your existing HRIS.",
      features: ["Employee recognition & gamification", "Points & rewards system", "AI resource allocation", "Hire-to-retire process automation"]
    },
    {
      id: "verion-trade-scheme",
      name: "Verion Trade Scheme",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      tagline: "Intelligent Dealer & Sales Incentive Management",
      desc: "Dynamically manage complex target and growth schemes. Use AI simulations to predict scheme performance and automate global dealer reimbursements.",
      features: ["Target & growth scheme modeling", "AI budget simulation", "Automated reimbursements", "ERP sales data integration"]
    },
    {
      id: "verion-dataworks",
      name: "Verion DataWorks",
      icon: <Database className="w-6 h-6 text-white" />,
      tagline: "Autonomous Data Harmonization & MDM",
      desc: "Cleanse, deduplicate, and govern your enterprise data autonomously. DataWorks uses LLMs to resolve data conflicts across disconnected systems.",
      features: ["AI data deduplication", "Master data governance workflows", "Custom MDM rules engine", "Automated ETL pipelines"]
    },
    {
      id: "verion-flow",
      name: "Verion Flow",
      icon: <GitMerge className="w-6 h-6 text-white" />,
      tagline: "Visual Workflow & Approval Automation",
      desc: "Bypass rigid ERP approval processes. Verion Flow allows business users to visually build multi-level approval matrices that integrate directly into Outlook and Teams.",
      features: ["Multi-level visual builder", "Configurable routing rules", "Outlook/Teams actionable cards", "Full audit trailing"]
    },
    {
      id: "verion-serviceworks",
      name: "Verion ServiceWorks",
      icon: <HeadphonesIcon className="w-6 h-6 text-white" />,
      tagline: "Next-Gen IT & Enterprise Service Management",
      desc: "An AI-native ticketing and knowledge base system that auto-resolves L1 requests and intelligently routes complex incidents to the right teams.",
      features: ["AI ticket triage & routing", "SLA tracking & analytics", "Dynamic knowledge base generation", "Incident management"]
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Solutions</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pre-built, customizable AI applications that layer over your existing enterprise systems to deliver immediate autonomous capabilities. Zero disruption to core ERPs.
          </p>
        </div>

        <div className="space-y-32">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2">
                <div className="w-12 h-12 rounded border border-white/10 bg-white/5 flex items-center justify-center mb-6">
                  {product.icon}
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{product.name}</h2>
                <h3 className="text-primary font-medium text-sm tracking-wider uppercase mb-6">{product.tagline}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{product.desc}</p>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/contact">
                  <Button className="rounded-md bg-white text-background hover:bg-gray-200 font-medium">
                    Request Demo
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="aspect-[4/3] rounded-lg border border-white/10 bg-card relative overflow-hidden flex items-center justify-center p-8">
                  {/* Abstract representation of the product UI */}
                  <div className="w-full h-full bg-background rounded border border-white/5 flex flex-col shadow-lg">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4">
                      <div className="w-24 h-3 bg-white/10 rounded" />
                      <div className="w-16 h-3 bg-white/10 rounded" />
                    </div>
                    <div className="flex-1 p-6 flex gap-6">
                      <div className="w-1/3 flex flex-col gap-4">
                        <div className="h-20 bg-white/5 rounded" />
                        <div className="h-20 bg-white/5 rounded" />
                        <div className="h-20 bg-white/5 rounded" />
                      </div>
                      <div className="w-2/3 flex flex-col gap-4">
                        <div className="h-8 w-1/2 bg-white/5 rounded" />
                        <div className="flex-1 bg-white/5 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
