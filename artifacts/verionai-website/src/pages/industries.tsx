import { Briefcase, FlaskConical, Factory, Box, Building2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const industries = [
  {
    name: "Professional Services",
    icon: <Briefcase className="w-6 h-6 text-white" />,
    challenges: "Resource utilization, tracking complex engagements, unifying global talent data.",
    solution: "Verion P Connect intelligently maps talent to projects based on AI skill matching, while Verion ServiceWorks handles internal firm IT smoothly.",
  },
  {
    name: "Pharma & Chemicals",
    icon: <FlaskConical className="w-6 h-6 text-white" />,
    challenges: "Strict regulatory approvals, massive siloed data sets, complex R&D supply chains.",
    solution: "Verion Flow orchestrates compliant approval matrices, and Verion DataWorks harmonizes critical material master data across global instances.",
  },
  {
    name: "Industrial Manufacturing",
    icon: <Factory className="w-6 h-6 text-white" />,
    challenges: "Dealer network management, supply chain visibility, legacy ERP lock-in.",
    solution: "Verion Trade Scheme automates massive global dealer incentives, predicting budget impacts via AI before schemes are launched.",
  },
  {
    name: "Consumer & FMCG",
    icon: <Box className="w-6 h-6 text-white" />,
    challenges: "High-volume data deduplication, fast-moving promotions, rapid employee turnover.",
    solution: "DataWorks cleanses retail data instantly. Trade Scheme manages complex promotional payouts. P Connect engages massive frontline retail teams.",
  },
  {
    name: "Engineering & Construction",
    icon: <Building2 className="w-6 h-6 text-white" />,
    challenges: "Project-based workforce, disjointed site reporting, heavy incident management.",
    solution: "ServiceWorks tracks site-level incidents with SLA enforcement, while Flow connects site managers to HQ via mobile-friendly approvals.",
  }
];

export default function Industries() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Industries We Serve</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We adapt our AI-native applications to solve the specific bottlenecks of your vertical, integrating securely with your industry-standard systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="enterprise-card p-8 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{industry.name}</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">The Challenge</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{industry.challenges}</p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/5">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">The VerionAI Solution</h4>
                <p className="text-white text-sm leading-relaxed">{industry.solution}</p>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="enterprise-card p-8 flex flex-col justify-center bg-card/50 border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Don't see your industry?</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Our core architecture is industry-agnostic. Our components can be adapted to any enterprise workflow.
            </p>
            <Link href="/contact">
              <Button className="rounded-md bg-white text-background font-medium hover:bg-gray-200">
                Discuss Your Use Case
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
