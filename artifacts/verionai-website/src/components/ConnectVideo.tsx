import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Star, TrendingUp, Award, CheckCircle, Users, Brain } from "lucide-react";

const PINK = "#D4196A";
const TOTAL_SCENES = 6;

const MIN_DURATIONS = [3200, 5000, 5500, 5500, 5000, 3200];
const SPEECH_SAFETY_MS = 9000;

// Each scene is an array of short phrases — spoken one by one with natural breath gaps.
// "Verrion AI" is spelled phonetically so TTS pronounces it correctly.
const VOICEOVER: string[][] = [
  [
    "Introducing Verrion AI Connect.",
    "The enterprise talent and resource intelligence platform.",
  ],
  [
    "Right now, your talent data is scattered across disconnected systems.",
    "People are mismatched to projects.",
    "And growth potential stays completely invisible.",
  ],
  [
    "Verrion AI Connect brings everything together.",
    "Every employee profile. Every skill. Every opportunity.",
    "Intelligently matched — on one platform.",
  ],
  [
    "The Recognition Engine makes performance visible.",
    "Gamified points, achievement badges, and live leaderboards.",
    "Driving genuine engagement, every single day.",
  ],
  [
    "Three-sixty workforce analytics — from hire to retire.",
    "Every resource decision. Every hiring call.",
    "Powered by AI.",
  ],
  [
    "Grow your people.",
    "Verrion AI Connect.",
  ],
];

// ── Helpers ──────────────────────────────────────────────────────

function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-US" && v.name.toLowerCase().includes("google")) ||
    voices.find((v) => v.lang === "en-GB" && v.name.toLowerCase().includes("google")) ||
    voices.find((v) => v.lang === "en-US" && !v.localService) ||
    voices.find((v) => v.lang.startsWith("en-US")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null
  );
}

function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [to, duration]);
  return <>{val.toLocaleString()}</>;
}

// ── Web Audio Music Engine ────────────────────────────────────────

class MusicEngine {
  private ctx: AudioContext;
  private master: GainNode;
  private reverb!: ConvolverNode;
  private reverbSend: GainNode;
  private dryBus: GainNode;
  private running = false;
  private timerID: ReturnType<typeof setTimeout> | null = null;
  private nextNote = 0;
  private tick = 0;
  private readonly bpm = 120;
  private readonly beat: number;

  constructor() {
    this.ctx = new AudioContext();
    this.beat = 60 / this.bpm;
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.26;
    this.master.connect(this.ctx.destination);
    this.dryBus = this.ctx.createGain();
    this.dryBus.gain.value = 1;
    this.dryBus.connect(this.master);
    this.reverbSend = this.ctx.createGain();
    this.reverbSend.gain.value = 0.22;
    this.reverbSend.connect(this.master);
    this.buildReverb();
  }

  private buildReverb() {
    const sr = this.ctx.sampleRate;
    const len = sr * 2;
    const buf = this.ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.8);
    }
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = buf;
    this.reverb.connect(this.reverbSend);
  }

  private wire(node: AudioNode, wet = false) {
    node.connect(this.dryBus);
    if (wet) node.connect(this.reverb);
  }

  private kick(t: number) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.setValueAtTime(170, t);
    osc.frequency.exponentialRampToValueAtTime(0.001, t + 0.48);
    g.gain.setValueAtTime(1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
    osc.connect(g); this.wire(g);
    osc.start(t); osc.stop(t + 0.5);
  }

  private clap(t: number) {
    const buf = this.ctx.createBuffer(1, Math.ceil(this.ctx.sampleRate * 0.18), this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const bp = this.ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 0.6;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.42, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    src.connect(bp); bp.connect(g); this.wire(g, true);
    src.start(t);
  }

  private hihat(t: number, open = false) {
    const dur = open ? 0.14 : 0.038;
    const buf = this.ctx.createBuffer(1, Math.ceil(this.ctx.sampleRate * dur), this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const hp = this.ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 9500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(open ? 0.22 : 0.13, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(hp); hp.connect(g); this.wire(g);
    src.start(t);
  }

  private readonly bassSeq = [55, 55, 73.4, 55, 82.4, 73.4, 55, 82.4];
  private bass(t: number, freq: number) {
    const osc = this.ctx.createOscillator(); osc.type = "sawtooth"; osc.frequency.value = freq;
    const lp = this.ctx.createBiquadFilter(); lp.type = "lowpass";
    lp.frequency.setValueAtTime(240, t); lp.frequency.exponentialRampToValueAtTime(70, t + this.beat * 0.9);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + this.beat * 0.92);
    osc.connect(lp); lp.connect(g); this.wire(g);
    osc.start(t); osc.stop(t + this.beat);
  }

  private readonly melodyNotes = [440, 523.25, 587.33, 659.25, 783.99, 659.25, 523.25, 440];
  private readonly melodyMask = [1, 0, 1, 0, 1, 0, 1, 0];
  private pluck(t: number, freq: number) {
    const osc = this.ctx.createOscillator(); osc.type = "triangle"; osc.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(g); this.wire(g, true);
    osc.start(t); osc.stop(t + 0.3);
  }

  private schedule() {
    while (this.nextNote < this.ctx.currentTime + 0.12) {
      const n16 = this.tick % 16;
      const n32 = this.tick % 32;
      const t = this.nextNote;
      if (n16 === 0 || n16 === 8) this.kick(t);
      if (n16 === 4 || n16 === 12) this.clap(t);
      if (n16 % 2 === 0) this.hihat(t, n16 === 10);
      if (n16 % 4 === 0) this.bass(t, this.bassSeq[(n16 / 4) % this.bassSeq.length]);
      const mi = (n32 / 4) % this.melodyNotes.length;
      if (n32 % 4 === 0 && this.melodyMask[mi]) this.pluck(t, this.melodyNotes[mi]);
      this.nextNote += this.beat / 4;
      this.tick++;
    }
    if (this.running) this.timerID = setTimeout(() => this.schedule(), 22);
  }

  start() {
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.running = true;
    this.nextNote = this.ctx.currentTime + 0.05;
    this.tick = 0;
    this.schedule();
  }

  pause() {
    this.running = false;
    if (this.timerID) { clearTimeout(this.timerID); this.timerID = null; }
    this.ctx.suspend();
  }

  resume() {
    this.running = true;
    this.ctx.resume().then(() => {
      this.nextNote = this.ctx.currentTime + 0.05;
      this.schedule();
    });
  }

  setVolume(v: number) {
    this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.08);
  }

  destroy() {
    this.running = false;
    if (this.timerID) clearTimeout(this.timerID);
    this.ctx.close();
  }
}

// ── Scene Components ──────────────────────────────────────────────

function SkillBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.4 }} className="space-y-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-white/60 font-medium">{label}</span>
        <span className="font-bold" style={{ color: PINK }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: PINK }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: delay + 0.1, duration: 0.9, ease: "easeOut" }} />
      </div>
    </motion.div>
  );
}

function Scene0() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white/20"
            style={{ left: `${(i % 10) * 11 + 5}%`, top: `${Math.floor(i / 10) * 13 + 6}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.6, 1] }}
            transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
        ))}
      </div>
      <motion.div initial={{ scale: 0.7, opacity: 0, filter: "blur(16px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none flex items-baseline gap-3 z-10">
        <span style={{ color: PINK }}>Verion</span><span className="text-white">ai</span><span className="text-white">Connect</span>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
        className="text-xs md:text-sm tracking-[0.22em] uppercase text-white/40 font-semibold z-10">
        Enterprise Talent & Resource Intelligence
      </motion.p>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        className="w-16 h-0.5 rounded-full z-10" style={{ backgroundColor: PINK }} />
    </div>
  );
}

function Scene1() {
  const systems = [
    { label: "HRMS", warning: "No skill data", icon: "⚠" },
    { label: "Spreadsheets", warning: "Outdated records", icon: "⚠" },
    { label: "Email threads", warning: "Context lost", icon: "⚠" },
  ];
  return (
    <div className="flex flex-col items-start justify-center w-full h-full gap-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-xl md:text-3xl font-bold text-white leading-tight">
        Talent data is <span style={{ color: PINK }}>fragmented.</span>
      </motion.div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {systems.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.25, duration: 0.5 }}
            className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 flex flex-col gap-2">
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/30">{s.label}</div>
            <div className="text-xl font-bold text-red-400">{s.icon}</div>
            <div className="text-[10px] text-red-400/70 font-medium">{s.warning}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 w-full">
        {["Projects delayed by skill gaps", "90% of HR time spent on manual reporting"].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 + i * 0.2 }} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: PINK }} />
            <span className="text-sm text-white/50">{t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Scene2() {
  return (
    <div className="flex gap-4 w-full h-full items-center justify-center">
      {/* Employee card */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-4 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
            style={{ background: `linear-gradient(135deg, ${PINK}, #8B22A0)` }}>SC</div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white truncate">Sarah Chen</div>
            <div className="text-[10px] text-white/40 truncate">Senior Strategy Consultant · L4</div>
          </div>
          <div className="ml-auto flex items-center gap-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">Available</span>
          </div>
        </div>
        {/* Skill Intelligence */}
        <div>
          <div className="text-[9px] font-bold tracking-widest uppercase mb-2.5" style={{ color: PINK }}>Skill Intelligence</div>
          <div className="space-y-2.5">
            <SkillBar label="Data Analysis" pct={94} delay={0.5} />
            <SkillBar label="Project Management" pct={87} delay={0.7} />
            <SkillBar label="Python & Analytics" pct={78} delay={0.9} />
            <SkillBar label="Client Relations" pct={72} delay={1.1} />
          </div>
        </div>
      </motion.div>

      {/* Arrow + AI badge */}
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
        className="flex flex-col items-center gap-1 shrink-0">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="text-[10px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: PINK }}>
          AI
        </motion.div>
        <div className="w-8 h-px" style={{ backgroundColor: PINK }} />
        <div className="text-[9px] text-white/30 font-medium">98% match</div>
      </motion.div>

      {/* Project card */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        className="flex-1 rounded-2xl border bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-4 min-w-0"
        style={{ borderColor: `${PINK}50` }}>
        <div>
          <div className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color: PINK }}>Best Match Found</div>
          <div className="text-sm font-bold text-white">Digital Transformation</div>
          <div className="text-[10px] text-white/40 mt-0.5">Financial Services · 6 months</div>
        </div>
        <div className="space-y-1.5">
          {["AI Strategy", "Process Re-engineering", "Data Governance"].map((tag, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 + i * 0.15 }}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white/70 border border-white/10 mr-1">
              <CheckCircle className="w-2.5 h-2.5 text-green-400" /> {tag}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
          className="mt-auto rounded-lg p-3 text-center font-bold text-sm text-white cursor-pointer"
          style={{ background: `linear-gradient(135deg, ${PINK}, #8B22A0)` }}>
          Assign Now →
        </motion.div>
      </motion.div>
    </div>
  );
}

function Scene3() {
  return (
    <div className="flex gap-4 w-full h-full items-center justify-center">
      {/* Points card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
        className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
          <div className="text-[9px] font-bold tracking-widest uppercase mb-1 text-white/40">Your Points</div>
          <div className="text-4xl md:text-5xl font-extrabold" style={{ color: PINK }}>
            <CountUp to={2847} duration={2200} />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-1 mt-1 text-green-400 text-xs font-bold">
            <TrendingUp className="w-3 h-3" /> +180 today
          </motion.div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[9px] font-bold tracking-widest uppercase mb-3 text-white/40">Recent Badges</div>
          <div className="space-y-2">
            {[
              { icon: "🏆", label: "Q3 Star Performer", pts: "+500" },
              { icon: "⚡", label: "Sprint Hero", pts: "+250" },
              { icon: "🎯", label: "Client Favourite", pts: "+180" },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.3 }}
                className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-white/70">
                  <span className="text-sm">{b.icon}</span>{b.label}
                </span>
                <span className="text-[10px] font-bold" style={{ color: PINK }}>{b.pts}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}
        className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 min-w-0">
        <div className="text-[9px] font-bold tracking-widest uppercase mb-4 text-white/40">🏆 Leaderboard</div>
        <div className="space-y-3">
          {[
            { name: "Alex K", pts: 4201, rank: 1, you: false },
            { name: "Sarah C", pts: 3847, rank: 2, you: false },
            { name: "Maya R", pts: 2991, rank: 3, you: false },
            { name: "You", pts: 2847, rank: 4, you: true },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.22 }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${p.you ? "border" : "bg-white/3"}`}
              style={p.you ? { borderColor: PINK, background: `${PINK}15` } : {}}>
              <span className="text-xs font-bold w-4 text-white/30">#{p.rank}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold truncate ${p.you ? "text-white" : "text-white/70"}`}>{p.name}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-2.5 h-2.5" style={{ color: PINK }} />
                <span className="text-xs font-bold" style={{ color: p.you ? PINK : "rgba(255,255,255,0.5)" }}>
                  {p.pts.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Scene4() {
  const kpis = [
    { label: "Retention Rate", value: 94, suffix: "%" },
    { label: "AI Match Accuracy", value: 98, suffix: "%" },
    { label: "Engagement Score", value: 91, suffix: "%" },
    { label: "Faster Matching", value: 3.2, suffix: "x", isFloat: true },
  ];
  const bars = [38, 55, 47, 71, 89, 95];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        className="text-base md:text-xl font-bold text-white">
        360° Workforce Analytics
      </motion.div>
      {/* KPI grid */}
      <div className="grid grid-cols-4 gap-2.5">
        {kpis.map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.45 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-[9px] font-semibold text-white/40 uppercase tracking-wider mb-1">{k.label}</div>
            <div className="text-xl md:text-2xl font-extrabold" style={{ color: PINK }}>
              {k.isFloat ? k.value : <CountUp to={k.value as number} duration={1800} />}{k.suffix}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Bar chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col justify-end">
        <div className="text-[9px] font-bold tracking-widest uppercase mb-3 text-white/30">Hiring Pipeline Performance</div>
        <div className="flex items-end gap-2 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div className="w-full rounded-sm" style={{ backgroundColor: PINK, opacity: 0.7 + i * 0.05 }}
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.7, ease: "easeOut" }} />
              <span className="text-[8px] text-white/30 font-medium">{months[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Scene5() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      <motion.p initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-2xl font-semibold text-white/40 tracking-[0.25em] uppercase">
        Grow Your People.
      </motion.p>
      <motion.div initial={{ scale: 1.4, opacity: 0, filter: "blur(16px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none flex items-baseline gap-3">
        <span style={{ color: PINK }}>Verion</span>
        <span className="text-white">ai</span>
        <span className="text-white">Connect</span>
      </motion.div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6, duration: 0.9 }}
        className="w-24 h-0.5 rounded-full" style={{ backgroundColor: PINK }} />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
        className="text-sm text-white/25 tracking-wider">verionai.in</motion.p>
    </div>
  );
}

const SCENES = [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5];

// ── Main Component ────────────────────────────────────────────────

export default function ConnectVideo() {
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [scene, setScene] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const musicRef = useRef<MusicEngine | null>(null);
  const speechDoneRef = useRef(false);
  const minDoneRef = useRef(false);
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMutedRef = useRef(false);
  const statusRef = useRef<"idle" | "playing" | "paused">("idle");
  const sceneRef = useRef(0);

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { sceneRef.current = scene; }, [scene]);

  const clearTimers = () => {
    if (minTimerRef.current) { clearTimeout(minTimerRef.current); minTimerRef.current = null; }
    if (maxTimerRef.current) { clearTimeout(maxTimerRef.current); maxTimerRef.current = null; }
  };

  const advance = () => {
    setScene((prev) => (prev + 1) % TOTAL_SCENES);
  };

  const tryAdvance = () => {
    if (speechDoneRef.current && minDoneRef.current) advance();
  };

  const speakScene = (idx: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis || isMutedRef.current) {
      speechDoneRef.current = true;
      return;
    }
    window.speechSynthesis.cancel();

    const phrases = VOICEOVER[idx];
    const voice = getPreferredVoice();
    let phraseIdx = 0;

    function speakNext() {
      if (statusRef.current !== "playing") return;
      if (phraseIdx >= phrases.length) {
        speechDoneRef.current = true;
        tryAdvance();
        return;
      }
      const utter = new SpeechSynthesisUtterance(phrases[phraseIdx]);
      utter.rate = 0.84;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      if (voice) utter.voice = voice;
      utter.onend = () => {
        if (statusRef.current !== "playing") return;
        phraseIdx++;
        // Natural breath gap between phrases (180 ms)
        setTimeout(speakNext, 180);
      };
      utter.onerror = () => {
        phraseIdx++;
        setTimeout(speakNext, 100);
      };
      window.speechSynthesis.speak(utter);
    }

    speakNext();
  };

  const startScene = (idx: number) => {
    speechDoneRef.current = false;
    minDoneRef.current = false;
    clearTimers();

    minTimerRef.current = setTimeout(() => {
      minDoneRef.current = true;
      tryAdvance();
    }, MIN_DURATIONS[idx]);

    maxTimerRef.current = setTimeout(() => {
      speechDoneRef.current = true;
      minDoneRef.current = true;
      advance();
    }, MIN_DURATIONS[idx] + SPEECH_SAFETY_MS);

    speakScene(idx);
  };

  useEffect(() => {
    if (status === "playing") {
      startScene(scene);
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, status]);

  const handlePlay = () => {
    if (!musicRef.current) musicRef.current = new MusicEngine();
    if (status === "idle") {
      musicRef.current.start();
    } else {
      musicRef.current.resume();
      window.speechSynthesis?.resume();
    }
    setStatus("playing");
  };

  const handlePause = () => {
    clearTimers();
    window.speechSynthesis?.cancel();
    musicRef.current?.pause();
    setStatus("paused");
  };

  const handleReplay = () => {
    clearTimers();
    window.speechSynthesis?.cancel();
    if (!musicRef.current) musicRef.current = new MusicEngine();
    musicRef.current.start();
    speechDoneRef.current = false;
    minDoneRef.current = false;
    if (scene === 0) {
      setStatus("idle");
      setTimeout(() => { setStatus("playing"); }, 40);
    } else {
      setScene(0);
      setStatus("playing");
    }
  };

  const handleMuteToggle = () => {
    const next = !isMuted;
    isMutedRef.current = next;
    setIsMuted(next);
    if (next) {
      window.speechSynthesis?.cancel();
      musicRef.current?.setVolume(0);
      speechDoneRef.current = true;
    } else {
      musicRef.current?.setVolume(0.26);
      if (status === "playing") speakScene(sceneRef.current);
    }
  };

  useEffect(() => {
    return () => {
      clearTimers();
      window.speechSynthesis?.cancel();
      musicRef.current?.destroy();
    };
  }, []);

  const SceneComponent = SCENES[scene];
  const progressPct = ((scene + 1) / TOTAL_SCENES) * 100;

  return (
    <div
      className="relative w-full aspect-video bg-[#0A0A0A] overflow-hidden rounded-2xl shadow-2xl border border-white/10 select-none"
      style={{ fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${PINK} 0%, transparent 70%)`, opacity: 0.12 }}
          animate={{ scale: [1, 1.15, 0.95, 1.1, 1], opacity: [0.08, 0.16, 0.1, 0.15, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
      </div>

      {/* Pink progress bar (top) */}
      <motion.div className="absolute top-0 left-0 h-[3px] z-50" style={{ backgroundColor: PINK }}
        animate={{ width: `${progressPct}%` }} transition={{ duration: 0.65, ease: "easeInOut" }} />

      {/* Scene content */}
      <div className="absolute inset-0 z-10 px-6 pb-14 pt-5 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div key={scene} className="w-full h-full"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <SceneComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Idle / play overlay */}
      {status === "idle" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={handlePlay}>
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: PINK, backgroundColor: `${PINK}25` }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: [`0 0 0 0 ${PINK}40`, `0 0 0 20px ${PINK}00`, `0 0 0 0 ${PINK}40`] }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.div>
          <p className="text-white/50 text-sm font-medium tracking-wide">Click to play with audio</p>
        </motion.div>
      )}

      {/* Paused dim overlay */}
      {status === "paused" && (
        <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] pointer-events-none" />
      )}

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center gap-3 px-5 py-3 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
        {/* Scene segments */}
        <div className="flex gap-1 flex-1">
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <div key={i} className="h-[3px] rounded-full transition-all duration-500"
              style={{
                flex: i === scene ? 2 : 1,
                backgroundColor: i < scene ? `${PINK}60` : i === scene ? PINK : "rgba(255,255,255,0.15)",
              }} />
          ))}
        </div>
        {/* Replay */}
        <button onClick={handleReplay} title="Replay"
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        {/* Play / Pause */}
        {status !== "idle" && (
          <button onClick={status === "playing" ? handlePause : handlePlay} title={status === "playing" ? "Pause" : "Play"}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: PINK, boxShadow: `0 0 18px ${PINK}55` }}>
            {status === "playing"
              ? <Pause className="w-4 h-4 text-white" />
              : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>
        )}
        {/* Mute */}
        <button onClick={handleMuteToggle} title={isMuted ? "Unmute" : "Mute"}
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all">
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
