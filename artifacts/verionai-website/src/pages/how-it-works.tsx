import { motion } from "framer-motion";
import { Search, PenTool, Code2, PlugZap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Problem Discovery",
      icon: <Search className="w-6 h-6 text-background" />,
      desc: "We analyze your specific enterprise bottlenecks—whether it's manual data entry, complex approvals, or poor system adoption.",
    },
    {
      num: "02",
      title: "Rapid AI App Design",
      icon: <PenTool className="w-6 h-6 text-background" />,
      desc: "Our architects map out a solution using our pre-built composable AI components. We define exact integration points with your ERP.",
    },
    {
      num: "03",
      title: "AI-Assisted Development",
      icon: <Code2 className="w-6 h-6 text-background" />,
      desc: "We don't start from scratch. We customize our core products (Flow, DataWorks, etc.) to match your exact business logic in days.",
    },
    {
      num: "04",
      title: "Enterprise Integration",
      icon: <PlugZap className="w-6 h-6 text-background" />,
      desc: "Secure connection via API or middleware to SAP, Oracle, or Microsoft. We ensure bidirectional data sync with zero core system disruption.",
    },
    {
      num: "05",
      title: "Secure Deployment",
      icon: <Rocket className="w-6 h-6 text-background" />,
      desc: "Deployed to your sovereign cloud tenant. Training and rollout to users, backed by VerionAI continuous support.",
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Methodology</h1>
          <p className="text-xl text-muted-foreground">
            How we go from initial conversation to a live, AI-native enterprise application in record time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row items-start gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2" /> {/* Spacer for desktop layout */}
                
                {/* Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.5)] z-10 shrink-0">
                  {step.icon}
                </div>

                {/* Content */}
                <div className={`md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="glass-panel p-8 rounded-2xl">
                    <div className="text-primary font-display font-bold text-xl mb-2">Phase {step.num}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <Link href="/contact">
            <Button size="lg" className="rounded-full bg-white text-background hover:bg-white/90 text-lg px-8 h-14">
              Start Phase 01 Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
