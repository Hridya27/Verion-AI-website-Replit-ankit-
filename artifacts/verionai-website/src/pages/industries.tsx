import { Briefcase, FlaskConical, Factory, Box, Building2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

const industries = [
  {
    name: "Professional Services",
    icon: <Briefcase className="w-5 h-5" />,
    challenges: "Resource utilization, tracking complex engagements, unifying global talent data.",
    solution: "Verion P Connect intelligently maps talent to projects based on AI skill matching, while Verion ServiceWorks handles internal IT smoothly.",
  },
  {
    name: "Pharma & Chemicals",
    icon: <FlaskConical className="w-5 h-5" />,
    challenges: "Strict regulatory approvals, massive siloed data sets, complex R&D supply chains.",
    solution: "Verion Flow orchestrates compliant approval matrices, and DataWorks harmonizes critical material master data across global instances.",
  },
  {
    name: "Industrial Manufacturing",
    icon: <Factory className="w-5 h-5" />,
    challenges: "Dealer network management, supply chain visibility, legacy ERP lock-in.",
    solution: "Verion Trade Scheme automates massive global dealer incentives, predicting budget impacts via AI before schemes are launched.",
  },
  {
    name: "Consumer & FMCG",
    icon: <Box className="w-5 h-5" />,
    challenges: "High-volume data deduplication, fast-moving promotions, rapid employee turnover.",
    solution: "DataWorks cleanses retail data instantly. Trade Scheme manages complex promotional payouts. P Connect engages frontline retail teams.",
  },
  {
    name: "Engineering & Construction",
    icon: <Building2 className="w-5 h-5" />,
    challenges: "Project-based workforce, disjointed site reporting, heavy incident management.",
    solution: "ServiceWorks tracks site-level incidents with SLA enforcement, while Flow connects site managers to HQ via mobile-friendly approvals.",
  },
];

export default function Industries() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Industries
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950">Industries We Serve</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            We adapt our AI-native applications to solve the specific bottlenecks of your vertical, integrating securely with your industry-standard systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="enterprise-card p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{industry.name}</h3>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: pink }}>
                  The Challenge
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{industry.challenges}</p>
              </div>

              <div className="mt-auto pt-5 border-t border-gray-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: purple }}>
                  The VerionAI Solution
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{industry.solution}</p>
              </div>
            </motion.div>
          ))}

          <div className="enterprise-card p-8 flex flex-col justify-center border-dashed">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Don't see your industry?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Our core architecture is industry-agnostic. Our components can be adapted to any enterprise workflow.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-md text-white font-semibold text-sm w-fit"
                style={{ backgroundColor: pink }}
              >
                Discuss Your Use Case
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
