import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Brain, Shield, Crosshair, Target, Lock, Workflow, BarChart, Zap, Globe, Sparkles, Cpu } from "lucide-react";

const PINK = "#D4196A";
const DARK_BG = "#0A0A0A";

const SCENE_DURATIONS = [2500, 3500, 4000, 4000, 3500, 2500];

export default function ConnectVideo() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScene((prev) => (prev + 1) % SCENE_DURATIONS.length);
    }, SCENE_DURATIONS[scene]);
    return () => clearTimeout(timer);
  }, [scene]);

  // Persistent line progression
  const progressWidth = `${((scene + 1) / SCENE_DURATIONS.length) * 100}%`;

  return (
    <div className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-2xl shadow-2xl border border-white/10 font-sans" style={{ fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif' }}>
      
      {/* Persistent Background Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${PINK} 0%, transparent 70%)` }}
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Persistent Accent Line */}
      <motion.div 
        className="absolute top-0 left-0 h-1 z-50"
        style={{ backgroundColor: PINK }}
        animate={{ width: progressWidth }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Scene Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 md:p-16">
        <AnimatePresence mode="wait">
          {/* BEAT 1: Brand Reveal */}
          {scene === 0 && (
            <motion.div
              key="scene0"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter flex items-center gap-2"
              >
                <span style={{ color: PINK }}>Verion</span>
                <span className="text-white">ai</span>
                <span className="text-white"> Connect</span>
              </motion.div>
            </motion.div>
          )}

          {/* BEAT 2: The Problem */}
          {scene === 1 && (
            <motion.div
              key="scene1"
              className="flex flex-col items-start justify-center w-full h-full"
              initial={{ x: "10%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-10%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight max-w-3xl leading-tight">
                Your talent is your <br/>
                <span style={{ color: PINK }}>most complex asset.</span>
              </h2>
              
              <div className="flex flex-col gap-4">
                {[
                  "Data scattered across systems",
                  "People mismatched to projects",
                  "Growth potential invisible"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (i * 0.3), duration: 0.5 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-lg backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PINK }} />
                    <span className="text-lg md:text-xl text-white/80">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 3: The Platform */}
          {scene === 2 && (
            <motion.div
              key="scene2"
              className="flex flex-col items-center justify-center w-full h-full text-center"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight"
              >
                One platform. <span style={{ color: PINK }}>Total clarity.</span>
              </motion.h2>

              <div className="grid grid-cols-3 gap-8 md:gap-16 w-full max-w-4xl">
                {[
                  { title: "Connect", icon: Workflow, delay: 0.6 },
                  { title: "Recognize", icon: Sparkles, delay: 1.0 },
                  { title: "Succeed", icon: Target, delay: 1.4 }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: item.delay, duration: 0.7, type: "spring" }}
                    className="flex flex-col items-center gap-4 relative"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <item.icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: PINK }} />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 4: Feature Highlights */}
          {scene === 3 && (
            <motion.div
              key="scene3"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
                {[
                  { title: "Skill Intelligence", desc: "AI-powered employee profiles", icon: Brain, delay: 0.2, pos: { x: -50, y: -50 } },
                  { title: "AI Matching", desc: "Intelligent project staffing", icon: Crosshair, delay: 0.8, pos: { x: 50, y: -50 } },
                  { title: "Recognition Engine", desc: "Gamified points economy", icon: Zap, delay: 1.4, pos: { x: -50, y: 50 } },
                  { title: "360° View", desc: "Hire-to-retire analytics", icon: BarChart, delay: 2.0, pos: { x: 50, y: 50 } }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: feature.pos.x, y: feature.pos.y, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: feature.delay, duration: 0.6, type: "spring" }}
                    className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md flex flex-col items-start gap-4 relative overflow-hidden group"
                  >
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: PINK }} />
                    <feature.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: PINK }} />
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-white/60">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 5: Differentiators */}
          {scene === 4 && (
            <motion.div
              key="scene4"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ perspective: 1000 }}
            >
              <div className="flex flex-col gap-6 md:gap-8 w-full max-w-4xl">
                {[
                  { text: "Practice-Ready.", icon: Globe, highlight: true },
                  { text: "Enterprise-Secure.", icon: Lock, highlight: false },
                  { text: "AI-Native.", icon: Cpu, highlight: true }
                ].map((diff, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (i * 0.4), duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="flex items-center gap-6 bg-gradient-to-r from-white/5 to-transparent p-6 rounded-2xl border-l-4"
                    style={{ borderLeftColor: diff.highlight ? PINK : "rgba(255,255,255,0.2)" }}
                  >
                    <diff.icon className="w-8 h-8 md:w-12 md:h-12" style={{ color: diff.highlight ? PINK : "white" }} />
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                      {diff.text}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 6: Close/Loop */}
          {scene === 5 && (
            <motion.div
              key="scene5"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-4xl font-semibold text-white/60 mb-8 tracking-widest uppercase"
              >
                Grow Your People.
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter flex items-center gap-2"
              >
                <span style={{ color: PINK }}>Verion</span>
                <span className="text-white">ai</span>
                <span className="text-white"> Connect</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
