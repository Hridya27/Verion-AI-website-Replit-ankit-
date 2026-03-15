import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Users, TrendingUp, Database, GitMerge, HeadphonesIcon } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

export default function Solutions() {
  const products = [
    {
      id: "verion-p-connect",
      name: "Verion P Connect",
      icon: <Users className="w-5 h-5" />,
      tagline: "HR & Employee Engagement",
      desc: "Transform hire-to-retire workflows. P Connect adds gamification, intelligent resource allocation, and unified employee profiles on top of your existing HRIS.",
      features: ["Employee recognition & gamification", "Points & rewards system", "AI resource allocation", "Hire-to-retire process automation"],
    },
    {
      id: "verion-trade-scheme",
      name: "Verion Trade Scheme",
      icon: <TrendingUp className="w-5 h-5" />,
      tagline: "Dealer & Sales Incentive Management",
      desc: "Dynamically manage complex target and growth schemes. Use AI simulations to predict scheme performance and automate global dealer reimbursements.",
      features: ["Target & growth scheme modeling", "AI budget simulation", "Automated reimbursements", "ERP sales data integration"],
    },
    {
      id: "verion-dataworks",
      name: "Verion DataWorks",
      icon: <Database className="w-5 h-5" />,
      tagline: "Data Harmonization & MDM",
      desc: "Cleanse, deduplicate, and govern your enterprise data autonomously. DataWorks uses LLMs to resolve data conflicts across disconnected systems.",
      features: ["AI data deduplication", "Master data governance workflows", "Custom MDM rules engine", "Automated ETL pipelines"],
    },
    {
      id: "verion-flow",
      name: "Verion Flow",
      icon: <GitMerge className="w-5 h-5" />,
      tagline: "Workflow & Approval Automation",
      desc: "Bypass rigid ERP approval processes. Verion Flow allows business users to visually build multi-level approval matrices that integrate directly into Outlook and Teams.",
      features: ["Multi-level visual builder", "Configurable routing rules", "Outlook/Teams actionable cards", "Full audit trailing"],
    },
    {
      id: "verion-serviceworks",
      name: "Verion ServiceWorks",
      icon: <HeadphonesIcon className="w-5 h-5" />,
      tagline: "IT & Enterprise Service Management",
      desc: "An AI-native ticketing and knowledge base system that auto-resolves L1 requests and intelligently routes complex incidents to the right teams.",
      features: ["AI ticket triage & routing", "SLA tracking & analytics", "Dynamic knowledge base generation", "Incident management"],
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Our Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950">Enterprise AI Applications</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Pre-built, customizable AI applications that layer over your existing enterprise systems. Zero disruption to core ERPs.
          </p>
        </div>

        <div className="space-y-28">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="lg:w-1/2">
                <div
                  className="w-10 h-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center mb-6 text-gray-400"
                >
                  {product.icon}
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: purple }}>
                  {product.tagline}
                </span>
                <h2 className="text-3xl font-bold text-gray-950 mb-4">{product.name}</h2>
                <p className="text-gray-500 leading-relaxed mb-7">{product.desc}</p>

                <ul className="space-y-2.5 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: pink }} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className="rounded-md text-white font-semibold text-sm"
                    style={{ backgroundColor: pink }}
                  >
                    Request a Demo
                  </Button>
                </Link>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="aspect-[4/3] rounded-xl border border-gray-200 bg-gray-50 flex flex-col overflow-hidden shadow-sm">
                  <div className="h-11 border-b border-gray-200 bg-white flex items-center px-5 gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    <div className="flex-1 h-5 bg-gray-100 rounded ml-4 max-w-[180px]" />
                  </div>
                  <div className="flex-1 p-5 flex gap-4">
                    <div className="w-1/3 flex flex-col gap-3">
                      <div className="h-16 bg-white border border-gray-200 rounded-lg" />
                      <div className="h-16 bg-white border border-gray-200 rounded-lg" />
                      <div className="h-16 bg-white border border-gray-200 rounded-lg" />
                    </div>
                    <div className="w-2/3 flex flex-col gap-3">
                      <div className="h-6 w-2/3 bg-white border border-gray-200 rounded" />
                      <div className="flex-1 bg-white border border-gray-200 rounded-lg" />
                      <div className="h-8 w-1/3 rounded-md" style={{ backgroundColor: `${pink}20` }} />
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
