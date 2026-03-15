import { motion } from "framer-motion";
import { Briefcase, FlaskConical, Factory, Box, Building2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const industries = [
  {
    name: "Professional Services",
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    challenges: "Resource utilization, tracking complex engagements, unifying global talent data.",
    solution: "Verion P Connect intelligently maps talent to projects based on AI skill matching, while Verion ServiceWorks handles internal firm IT smoothly.",
  },
  {
    name: "Pharma & Chemicals",
    icon: <FlaskConical className="w-10 h-10 text-primary" />,
    challenges: "Strict regulatory approvals, massive siloed data sets, complex R&D supply chains.",
    solution: "Verion Flow orchestrates compliant approval matrices, and Verion DataWorks harmonizes critical material master data across global instances.",
  },
  {
    name: "Industrial Manufacturing",
    icon: <Factory className="w-10 h-10 text-primary" />,
    challenges: "Dealer network management, supply chain visibility, legacy ERP lock-in.",
    solution: "Verion Trade Scheme automates massive global dealer incentives, predicting budget impacts via AI before schemes are launched.",
  },
  {
    name: "Consumer & FMCG",
    icon: <Box className="w-10 h-10 text-primary" />,
    challenges: "High-volume data deduplication, fast-moving promotions, rapid employee turnover.",
    solution: "DataWorks cleanses retail data instantly. Trade Scheme manages complex promotional payouts. P Connect engages massive frontline retail teams.",
  },
  {
    name: "Engineering & Construction",
    icon: <Building2 className="w-10 h-10 text-primary" />,
    challenges: "Project-based workforce, disjointed site reporting, heavy incident management.",
    solution: "ServiceWorks tracks site-level incidents with SLA enforcement, while Flow connects site managers to HQ via mobile-friendly approvals.",
  }
];

export default function Industries() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl text-muted-foreground">
            We adapt our AI-native applications to solve the specific bottlenecks of your vertical, integrating with your industry-standard systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col h-full hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {industry.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{industry.name}</h3>
              
              <div className="mb-6 flex-grow">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">The Challenge</h4>
                <p className="text-muted-foreground text-sm">{industry.challenges}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">The VerionAI Solution</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{industry.solution}</p>
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-8 rounded-2xl border border-primary bg-primary/5 flex flex-col items-center justify-center text-center h-full"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Don't see your industry?</h3>
            <p className="text-muted-foreground mb-8">Our core architecture is industry-agnostic. Let's discuss your specific enterprise use case.</p>
            <Link href="/contact" className="w-full">
              <button className="w-full py-3 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
