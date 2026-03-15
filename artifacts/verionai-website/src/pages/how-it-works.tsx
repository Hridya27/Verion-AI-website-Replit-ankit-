import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Problem Discovery",
      desc: "We analyze your specific enterprise bottlenecks—whether it's manual data entry, complex approvals, or poor system adoption.",
    },
    {
      num: "02",
      title: "Architecture & Design",
      desc: "Our architects map out a solution using our pre-built composable AI components. We define exact integration points with your ERP.",
    },
    {
      num: "03",
      title: "Rapid Development",
      desc: "We don't start from scratch. We customize our core products to match your exact business logic and brand guidelines in days.",
    },
    {
      num: "04",
      title: "Enterprise Integration",
      desc: "Secure connection via API or middleware to SAP, Oracle, or Microsoft. We ensure bidirectional data sync with zero core system disruption.",
    },
    {
      num: "05",
      title: "Deployment & Training",
      desc: "Deployed to your sovereign cloud tenant. Complete rollout to users, backed by continuous VerionAI support and SLA guarantees.",
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Methodology</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            How we go from initial conversation to a live, AI-native enterprise application in record time.
          </p>
        </div>

        <div className="max-w-3xl">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 shrink-0 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-sm">
                    {step.num}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="w-px h-full bg-white/10 mt-4 mb-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-white mb-3 mt-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 pt-12 border-t border-white/10">
          <Link href="/contact">
            <Button className="rounded-md bg-white text-background font-medium hover:bg-gray-200">
              Start Phase 01 Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
