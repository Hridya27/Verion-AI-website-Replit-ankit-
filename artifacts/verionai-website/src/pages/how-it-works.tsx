import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Problem Discovery",
      desc: "We analyze your specific enterprise bottlenecks — whether it's manual data entry, complex approvals, or poor system adoption. We map your current workflows to identify the highest-impact automation opportunity.",
    },
    {
      num: "02",
      title: "Architecture & Design",
      desc: "Our architects map out a solution using our pre-built composable AI components. We define exact integration points with your ERP, define data contracts, and produce a detailed technical blueprint.",
    },
    {
      num: "03",
      title: "Rapid Development",
      desc: "We don't start from scratch. We customize our core products to match your exact business logic and brand guidelines in days using our composable AI development framework.",
    },
    {
      num: "04",
      title: "Enterprise Integration",
      desc: "Secure connection via API or middleware to SAP, Oracle, or Microsoft. We ensure bidirectional data sync with zero core system disruption. Full rollback capabilities throughout.",
    },
    {
      num: "05",
      title: "Deployment & Training",
      desc: "Deployed to your sovereign cloud tenant. Complete rollout to users, backed by continuous VerionAI support and SLA guarantees. Ongoing model fine-tuning as your business evolves.",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            Methodology
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950">How VerionAI Works</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            How we go from initial conversation to a live, AI-native enterprise application in record time.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex gap-8"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-11 h-11 shrink-0 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs z-10 bg-white"
                    style={{ borderColor: pink, color: pink }}
                  >
                    {step.num}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="text-xl font-bold text-gray-950 mb-3 mt-2.5">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-12 border-t border-gray-100">
          <Link href="/contact">
            <Button
              className="rounded-md text-white font-semibold text-sm"
              style={{ backgroundColor: pink }}
            >
              Start Phase 01 Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
