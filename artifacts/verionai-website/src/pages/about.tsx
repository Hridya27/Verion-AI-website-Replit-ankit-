import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Lightbulb, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30">
            <span className="text-sm font-medium text-primary tracking-wide">Founded 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Building the Autonomous Enterprise</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            VerionAI was born from a simple observation: large enterprises have massive amounts of data and powerful core systems (ERPs), but the human workflows surrounding them are slow, manual, and disconnected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-secondary/30 border border-white/5"
          >
            <Lightbulb className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-muted-foreground">To rapidly deploy AI-native applications that bridge the gap between human intent and complex enterprise systems.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-secondary/30 border border-white/5"
          >
            <ShieldCheck className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Our Philosophy</h3>
            <p className="text-muted-foreground">Extend, don't replace. We believe in building secure layers on top of your existing investments (SAP, Oracle) rather than enforcing costly migrations.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-secondary/30 border border-white/5"
          >
            <Globe2 className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Global Scale</h3>
            <p className="text-muted-foreground">Built to handle the scale, compliance, and multi-region complexities of Fortune 500 companies securely.</p>
          </motion.div>
        </div>

        <div className="glass-panel rounded-3xl p-10 md:p-16 border-primary/20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Join the Future of Enterprise IT</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you are looking to transform your internal workflows or join our team of world-class AI engineers and enterprise architects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-primary text-background font-bold hover:bg-primary/90">
                Contact Leadership
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
