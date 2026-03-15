import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe2, Lightbulb, ShieldCheck, Quote } from "lucide-react";

const pink = "#D4196A";
const purple = "hsl(262 83% 55%)";

const founderParagraphs = [
  "For over two decades, I have been in the trenches of digital transformation, leading large-scale implementations and navigating the complexities of the global Enterprise Apps ecosystem. Throughout those 20 years, I've seen a recurring challenge: organizations spend millions on systems that store data perfectly, yet struggle to make that data actually work for them.",
  "We have reached a tipping point. The \"Legacy Debt\" of traditional software — long development cycles, disconnected silos, and rigid workflows — is no longer just an IT hurdle; it is a business bottleneck.",
  "I founded VerionAI to solve this.",
  "Our mission is centered on a singular, foundational principle: the process of turning enterprise data into actionable truth.",
  "We don't believe in replacing the core systems that run your business. Instead, we architect a \"Neural Bridge\" that extends them. By combining AI-native development with deep enterprise architecture, we help organizations move from being \"data-rich\" to \"intelligence-driven\" in a matter of days, not months.",
  "VerionAI is about more than just speed; it's about clarity. It's about building the Autonomous Enterprise where systems don't just record the past, but actively guide the future.",
  "I invite you to join us in redefining what is possible.",
];

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        <div className="max-w-2xl mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
            About VerionAI
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-950 leading-tight">
            Building the Autonomous Enterprise
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            VerionAI was founded with a simple mission: help enterprises become truly autonomous. We observed that large enterprises have massive data assets and powerful core systems — but the human workflows surrounding them are slow, manual, and disconnected. We exist to close that gap.
          </p>
        </div>

        <div className="mb-20 border-t border-gray-100 pt-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            <div className="lg:w-1/3 lg:sticky lg:top-28 self-start">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
                A Message from Our Founder
              </span>
              <div className="relative">
                <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: pink }} />
                <p className="text-xl md:text-2xl font-bold text-gray-950 leading-snug italic">
                  "The process of turning enterprise data into actionable truth."
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: `linear-gradient(135deg, ${pink}, hsl(262 83% 55%))` }}
                  >
                    F
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Founder</p>
                    <p className="text-xs text-gray-400">VerionAI</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="space-y-6">
                {founderParagraphs.map((para, i) => {
                  const isPrinciple = para.startsWith("Our mission");
                  const isShort = para === "I founded VerionAI to solve this.";
                  const isClosing = para.startsWith("I invite you");

                  if (isPrinciple) {
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-base leading-relaxed pl-5 border-l-2 py-1"
                        style={{ borderColor: pink, color: "#111827" }}
                      >
                        <span className="text-gray-500">
                          Our mission is centered on a singular, foundational principle:{" "}
                        </span>
                        <span className="font-bold italic" style={{ color: pink }}>
                          the process of turning enterprise data into actionable truth.
                        </span>
                      </motion.p>
                    );
                  }

                  if (isShort) {
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-lg font-bold text-gray-950"
                      >
                        {para}
                      </motion.p>
                    );
                  }

                  if (isClosing) {
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-base text-gray-500 leading-relaxed italic pt-4 border-t border-gray-100"
                      >
                        {para}
                      </motion.p>
                    );
                  }

                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-base text-gray-500 leading-relaxed"
                    >
                      {para}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 pt-4 border-t border-gray-100">
          {[
            {
              icon: <Lightbulb className="w-5 h-5" style={{ color: pink }} />,
              title: "Our Mission",
              desc: "To rapidly deploy AI-native applications that bridge the gap between human intent and complex enterprise systems — in days, not months.",
            },
            {
              icon: <ShieldCheck className="w-5 h-5" style={{ color: purple }} />,
              title: "Our Philosophy",
              desc: "Extend, don't replace. We build secure, intelligent layers on top of your existing investments rather than enforcing costly migrations.",
            },
            {
              icon: <Globe2 className="w-5 h-5" style={{ color: pink }} />,
              title: "Global Scale",
              desc: "Built from day one to handle the scale, compliance, and multi-region complexities of Fortune 500 enterprises securely.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="enterprise-card p-8"
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="section-alt rounded-xl border border-gray-200 p-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: purple }}>
              Get in touch
            </span>
            <h2 className="text-2xl font-bold mb-3 text-gray-950">
              Instead of replacing enterprise systems, VerionAI extends them.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
              Whether you are looking to transform your internal workflows or want to partner with our team of world-class AI engineers and enterprise architects — we'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-md text-white font-semibold text-sm"
                style={{ backgroundColor: pink }}
              >
                Contact Leadership
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
