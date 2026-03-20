import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Crosshair, Target, Lock, Workflow,
  BarChart, Zap, Globe, Sparkles, Cpu,
  Pause, Play, RotateCcw, Volume2, VolumeX,
} from "lucide-react";

const PINK = "#D4196A";

const SCENE_DURATIONS = [2500, 3500, 4000, 4000, 3500, 2500];

const VOICEOVER = [
  "Introducing Verionai Connect — the enterprise talent and resource intelligence platform.",
  "Your talent is your most complex asset. Data scattered. People mismatched. Growth potential invisible.",
  "One platform. Total clarity. Connect your people. Recognize their value. Help them succeed.",
  "Skill Intelligence, AI Matching, a powerful Recognition Engine, and complete three-sixty employee views — all unified.",
  "Practice-Ready for any professional services firm. Enterprise-Secure with full audit trails. And completely AI-Native.",
  "Grow your people. Verionai Connect.",
];

function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-US" && v.name.toLowerCase().includes("google")) ||
    voices.find((v) => v.lang === "en-GB" && v.name.toLowerCase().includes("google")) ||
    voices.find((v) => v.lang === "en-US" && v.localService === false) ||
    voices.find((v) => v.lang.startsWith("en-US")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null
  );
}

export default function ConnectVideo() {
  const [scene, setScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sceneStartRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);

  const progressWidth = `${((scene + 1) / SCENE_DURATIONS.length) * 100}%`;

  // Load voices (they load async in most browsers)
  useEffect(() => {
    const tryLoad = () => {
      if (window.speechSynthesis.getVoices().length > 0) setVoicesReady(true);
    };
    tryLoad();
    window.speechSynthesis?.addEventListener("voiceschanged", tryLoad);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", tryLoad);
  }, []);

  const speakScene = useCallback((index: number, muted: boolean) => {
    if (typeof window === "undefined" || !window.speechSynthesis || muted) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(VOICEOVER[index]);
    utter.rate = 0.93;
    utter.pitch = 1.05;
    utter.volume = 1.0;
    const voice = getPreferredVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  }, []);

  const startSceneTimer = useCallback((sceneIndex: number, fromElapsed: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    sceneStartRef.current = Date.now();
    const remaining = Math.max(SCENE_DURATIONS[sceneIndex] - fromElapsed, 100);
    timerRef.current = setTimeout(() => {
      elapsedRef.current = 0;
      setScene((prev) => (prev + 1) % SCENE_DURATIONS.length);
    }, remaining);
  }, []);

  // Drive the scene progression
  useEffect(() => {
    if (isPaused) return;
    startSceneTimer(scene, elapsedRef.current);
    speakScene(scene, isMuted);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, isPaused]);

  // Handle mute toggling without changing scene
  useEffect(() => {
    if (isMuted) {
      window.speechSynthesis?.cancel();
    } else if (!isPaused) {
      speakScene(scene, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePauseToggle = () => {
    if (isPaused) {
      // Resume — elapsedRef already has the stored elapsed time
      setIsPaused(false);
    } else {
      // Pause — record how much of current scene has elapsed
      const nowElapsed = elapsedRef.current + (Date.now() - sceneStartRef.current);
      elapsedRef.current = nowElapsed;
      if (timerRef.current) clearTimeout(timerRef.current);
      window.speechSynthesis?.cancel();
      setIsPaused(true);
    }
  };

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    window.speechSynthesis?.cancel();
    elapsedRef.current = 0;
    setIsPaused(false);
    if (scene === 0) {
      // Already on scene 0 — restart timer and speech manually
      startSceneTimer(0, 0);
      speakScene(0, isMuted);
    } else {
      setScene(0);
    }
  };

  return (
    <div
      className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-2xl shadow-2xl border border-white/10"
      style={{ fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${PINK} 0%, transparent 70%)`, opacity: 0.15 }}
          animate={{ scale: [1, 1.2, 0.95, 1.1, 1], opacity: [0.1, 0.2, 0.12, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Pink progress bar (top) */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] z-50"
        style={{ backgroundColor: PINK }}
        animate={{ width: progressWidth }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Scene content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 pb-14 pt-6 md:px-16">
        <AnimatePresence mode="wait">

          {/* BEAT 1 — Brand Reveal */}
          {scene === 0 && (
            <motion.div
              key="s0"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ scale: 0.82, opacity: 0, filter: "blur(12px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.18, opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none flex items-baseline gap-2"
              >
                <span style={{ color: PINK }}>Verion</span>
                <span className="text-white">ai</span>
                <span className="text-white"> Connect</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="mt-5 text-sm md:text-base tracking-[0.25em] uppercase text-white/40 font-medium"
              >
                Enterprise Talent & Resource Intelligence
              </motion.p>
            </motion.div>
          )}

          {/* BEAT 2 — The Problem */}
          {scene === 1 && (
            <motion.div
              key="s1"
              className="flex flex-col items-start justify-center w-full h-full"
              initial={{ x: "8%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-8%", opacity: 0 }}
              transition={{ duration: 0.75, ease: "circOut" }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                Your talent is your <br />
                <span style={{ color: PINK }}>most complex asset.</span>
              </h2>
              <div className="flex flex-col gap-3">
                {["Data scattered across systems", "People mismatched to projects", "Growth potential invisible"].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.28, duration: 0.45 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PINK }} />
                    <span className="text-base md:text-lg text-white/75">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 3 — The Platform */}
          {scene === 2 && (
            <motion.div
              key="s2"
              className="flex flex-col items-center justify-center w-full h-full text-center"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <motion.h2
                initial={{ y: -18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight"
              >
                One platform.{" "}
                <span style={{ color: PINK }}>Total clarity.</span>
              </motion.h2>
              <div className="grid grid-cols-3 gap-6 md:gap-12 w-full max-w-3xl">
                {[
                  { title: "Connect", icon: Workflow, delay: 0.55 },
                  { title: "Recognize", icon: Sparkles, delay: 0.95 },
                  { title: "Succeed", icon: Target, delay: 1.35 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 36, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: item.delay, duration: 0.65, type: "spring", bounce: 0.3 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden"
                      style={{ background: "rgba(212,25,106,0.1)" }}
                    >
                      <item.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: PINK }} />
                    </div>
                    <span className="text-base md:text-lg font-bold text-white tracking-widest uppercase">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 4 — Feature Highlights */}
          {scene === 3 && (
            <motion.div
              key="s3"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="grid grid-cols-2 gap-3 md:gap-5 w-full max-w-4xl">
                {[
                  { title: "Skill Intelligence", desc: "AI-powered employee profiles", icon: Brain, delay: 0.15, from: { x: -40, y: -30 } },
                  { title: "AI Matching", desc: "Intelligent project staffing", icon: Crosshair, delay: 0.6, from: { x: 40, y: -30 } },
                  { title: "Recognition Engine", desc: "Gamified points economy", icon: Zap, delay: 1.1, from: { x: -40, y: 30 } },
                  { title: "360° View", desc: "Hire-to-retire analytics", icon: BarChart, delay: 1.6, from: { x: 40, y: 30 } },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: f.from.x, y: f.from.y, opacity: 0, scale: 0.85 }}
                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: f.delay, duration: 0.55, type: "spring", bounce: 0.25 }}
                    className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex items-start gap-4 relative overflow-hidden"
                  >
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-2xl opacity-20" style={{ backgroundColor: PINK }} />
                    <f.icon className="w-7 h-7 md:w-9 md:h-9 shrink-0 mt-0.5" style={{ color: PINK }} />
                    <div>
                      <h3 className="text-base md:text-xl font-bold text-white mb-0.5">{f.title}</h3>
                      <p className="text-xs md:text-sm text-white/50">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 5 — Differentiators */}
          {scene === 4 && (
            <motion.div
              key="s4"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ opacity: 0, rotateX: 15 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -15 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              style={{ perspective: 1200 }}
            >
              <div className="flex flex-col gap-4 md:gap-5 w-full max-w-3xl">
                {[
                  { text: "Practice-Ready.", icon: Globe, accent: true },
                  { text: "Enterprise-Secure.", icon: Lock, accent: false },
                  { text: "AI-Native.", icon: Cpu, accent: true },
                ].map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: i % 2 === 0 ? -80 : 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.38, duration: 0.7, type: "spring", bounce: 0.25 }}
                    className="flex items-center gap-5 bg-gradient-to-r from-white/5 to-transparent px-6 py-4 rounded-2xl border-l-4"
                    style={{ borderLeftColor: d.accent ? PINK : "rgba(255,255,255,0.2)" }}
                  >
                    <d.icon className="w-7 h-7 md:w-9 md:h-9 shrink-0" style={{ color: d.accent ? PINK : "rgba(255,255,255,0.5)" }} />
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{d.text}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BEAT 6 — Close */}
          {scene === 5 && (
            <motion.div
              key="s5"
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.75 }}
                className="text-xl md:text-3xl font-semibold text-white/50 mb-6 tracking-[0.2em] uppercase"
              >
                Grow Your People.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none flex items-baseline gap-2"
              >
                <span style={{ color: PINK }}>Verion</span>
                <span className="text-white">ai</span>
                <span className="text-white"> Connect</span>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Pause overlay when paused */}
      {isPaused && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: PINK, boxShadow: `0 0 40px rgba(212,25,106,0.4)` }}
          >
            <Pause className="w-7 h-7 text-white" />
          </motion.div>
        </div>
      )}

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center gap-3 px-5 py-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">

        {/* Scene progress segments */}
        <div className="flex gap-1 flex-1">
          {SCENE_DURATIONS.map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                flex: i === scene ? 2 : 1,
                backgroundColor: i < scene ? PINK : i === scene ? PINK : "rgba(255,255,255,0.2)",
                opacity: i < scene ? 0.5 : 1,
              }}
            />
          ))}
        </div>

        {/* Replay */}
        <button
          onClick={handleReplay}
          title="Replay from start"
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={handlePauseToggle}
          title={isPaused ? "Play" : "Pause"}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: PINK, boxShadow: `0 0 16px rgba(212,25,106,0.35)` }}
        >
          {isPaused
            ? <Play className="w-4 h-4 text-white ml-0.5" />
            : <Pause className="w-4 h-4 text-white" />}
        </button>

        {/* Mute / Unmute */}
        <button
          onClick={() => setIsMuted((m) => !m)}
          title={isMuted ? "Unmute voiceover" : "Mute voiceover"}
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
