import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Star, TrendingUp, Award, CheckCircle, Users, Brain } from "lucide-react";

const PINK = "#D4196A";
const TOTAL_SCENES = 7;

// Minimum scene display time (ms) — scene won't advance until BOTH audio ends AND min time passes
const MIN_DURATIONS = [3200, 5000, 5500, 5500, 5500, 5000, 3200];
// Max safety timeout in case audio fails to fire onended
const AUDIO_SAFETY_MS = 20000;

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

// ── Web Audio Music Engine — Energetic Electronic ─────────────────
// 126 BPM · four-on-floor kick · punchy bass · 8th-note hi-hats · synth pads
// Scheduled per 16th-note grid for tight groove

class MusicEngine {
  private ctx: AudioContext;
  private master: GainNode;
  private reverb!: ConvolverNode;
  private wetBus: GainNode;
  private dryBus: GainNode;
  private running = false;
  private timerID: ReturnType<typeof setTimeout> | null = null;
  private nextTick = 0;   // next 16th-note timestamp
  private tickCount = 0;  // absolute 16th-note counter
  private readonly bpm = 126;
  private readonly s16: number; // seconds per 16th note

  // Am → Dm → Fmaj → Em  (each chord lasts 16 ticks = 1 bar)
  private readonly progression = [
    [110, 130.81, 164.81], // Am
    [73.42, 110, 146.83],  // Dm
    [87.31, 110, 130.81],  // Fmaj
    [82.41, 98,  123.47],  // Em
  ];
  // Staccato bass root notes (Hz) per bar, mirrors chord roots
  private readonly bassRoots = [55, 36.71, 43.65, 41.2];

  constructor() {
    this.ctx = new AudioContext();
    this.s16 = (60 / this.bpm) / 4;
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.17; // stays under the voice
    this.master.connect(this.ctx.destination);
    this.dryBus = this.ctx.createGain();
    this.dryBus.gain.value = 0.82;
    this.dryBus.connect(this.master);
    this.wetBus = this.ctx.createGain();
    this.wetBus.gain.value = 0.18;
    this.wetBus.connect(this.master);
    this.buildReverb(0.9); // shorter reverb = punchier
  }

  private buildReverb(dur: number) {
    const sr = this.ctx.sampleRate;
    const len = Math.ceil(sr * dur);
    const buf = this.ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.5);
    }
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = buf;
    this.reverb.connect(this.wetBus);
  }

  // Four-on-floor kick — punchy sine sweep, prominent
  private kick(t: number) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.38);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.68, t + 0.004); // sharp attack
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(g); g.connect(this.dryBus);
    osc.start(t); osc.stop(t + 0.42);
  }

  // Snare — noise + body tone
  private snare(t: number) {
    // Noise component
    const nLen = Math.ceil(this.ctx.sampleRate * 0.14);
    const nBuf = this.ctx.createBuffer(1, nLen, this.ctx.sampleRate);
    const nd = nBuf.getChannelData(0);
    for (let i = 0; i < nLen; i++) nd[i] = Math.random() * 2 - 1;
    const nSrc = this.ctx.createBufferSource(); nSrc.buffer = nBuf;
    const bp = this.ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = 0.7;
    const nG = this.ctx.createGain();
    nG.gain.setValueAtTime(0.38, t); nG.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    nSrc.connect(bp); bp.connect(nG); nG.connect(this.dryBus); nG.connect(this.reverb);
    nSrc.start(t);
    // Body tone
    const bOsc = this.ctx.createOscillator(); bOsc.type = "triangle"; bOsc.frequency.value = 200;
    const bG = this.ctx.createGain();
    bG.gain.setValueAtTime(0.22, t); bG.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    bOsc.connect(bG); bG.connect(this.dryBus);
    bOsc.start(t); bOsc.stop(t + 0.1);
  }

  // Closed hi-hat — tight, 8th-note energy
  private hihatClosed(t: number) {
    const len = Math.ceil(this.ctx.sampleRate * 0.032);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const hp = this.ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 9500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.11, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.032);
    src.connect(hp); hp.connect(g); g.connect(this.dryBus);
    src.start(t);
  }

  // Open hi-hat — accent on upbeats
  private hihatOpen(t: number) {
    const len = Math.ceil(this.ctx.sampleRate * 0.18);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const hp = this.ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 9000;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    src.connect(hp); hp.connect(g); g.connect(this.dryBus); g.connect(this.reverb);
    src.start(t);
  }

  // Punchy staccato bass — square → low-pass, short envelope
  private bass(t: number, freq: number) {
    const dur = this.s16 * 1.6;
    // Sub sine layer
    const sub = this.ctx.createOscillator(); sub.type = "sine"; sub.frequency.value = freq;
    // Square layer (harmonics)
    const sq = this.ctx.createOscillator(); sq.type = "square"; sq.frequency.value = freq;
    const lp = this.ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 380;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.42, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    sub.connect(g); sq.connect(lp); lp.connect(g); g.connect(this.dryBus);
    sub.start(t); sub.stop(t + dur + 0.05);
    sq.start(t); sq.stop(t + dur + 0.05);
  }

  // Synth pad — sustained chord, subtle presence under the groove
  private pad(t: number, tones: number[], dur: number) {
    tones.forEach((freq) => {
      [0, 7, -7].forEach((cents) => {
        const osc = this.ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.value = freq * Math.pow(2, cents / 1200);
        const lp = this.ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.028, t + 0.25); // fast-ish attack for energy
        g.gain.setValueAtTime(0.028, t + dur - 0.3);
        g.gain.linearRampToValueAtTime(0, t + dur);
        osc.connect(lp); lp.connect(g);
        g.connect(this.dryBus); g.connect(this.reverb);
        osc.start(t); osc.stop(t + dur + 0.1);
      });
    });
  }

  private schedule() {
    while (this.nextTick < this.ctx.currentTime + 0.15) {
      const t = this.nextTick;
      const s = this.tickCount;
      const pos = s % 16;            // position within bar (0–15)
      const barIdx = Math.floor(s / 16) % this.progression.length;

      // ── Kick: four-on-floor (every 4 sixteenths = every beat)
      if (pos % 4 === 0) this.kick(t);

      // ── Snare: beats 2 and 4 (positions 4 and 12)
      if (pos === 4 || pos === 12) this.snare(t);

      // ── Hi-hats: closed on every 8th note (pos 0,2,4,6,8,10,12,14)
      //            open on "and" of beat 3 (pos 10) and beat 4 (pos 14)
      if (pos % 2 === 0) {
        if (pos === 10 || pos === 14) this.hihatOpen(t);
        else this.hihatClosed(t);
      }

      // ── Bass: on every 8th note, staccato pattern
      //   Root on beat 1 (pos 0), fifth on other 8th notes
      if (pos % 2 === 0) {
        const root = this.bassRoots[barIdx];
        const fifth = root * 1.5;
        const bassPattern = [root, fifth, root, fifth, root, fifth, fifth, root];
        this.bass(t, bassPattern[(pos / 2) % bassPattern.length]);
      }

      // ── Chord pad: fire once per bar, sustain for the bar duration
      if (pos === 0) {
        const barDur = this.s16 * 16.8; // slightly longer for overlap
        this.pad(t, this.progression[barIdx], barDur);
      }

      this.nextTick += this.s16;
      this.tickCount++;
    }
    if (this.running) this.timerID = setTimeout(() => this.schedule(), 20);
  }

  start() {
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.running = true;
    this.nextTick = this.ctx.currentTime + 0.05;
    this.tickCount = 0;
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
      this.nextTick = this.ctx.currentTime + 0.05;
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

// ── Scene 4 — GROW Collaboration Feed ────────────────────────────
function SceneCollab() {
  const posts = [
    {
      from: "Alex K",
      fromInitials: "AK",
      action: "spotlighted",
      to: "Sarah C",
      toInitials: "SC",
      message: "Sarah's data analysis on the Deloitte pitch was exceptional. She owned the room.",
      tag: "🌟 Spotlight",
      tagColor: "#F59E0B",
      reactions: [{ emoji: "👏", count: 34 }, { emoji: "❤️", count: 19 }, { emoji: "🏆", count: 11 }],
      delay: 0.3,
    },
    {
      from: "Priya R",
      fromInitials: "PR",
      action: "appreciated",
      to: "Raj M",
      toInitials: "RM",
      message: "Outstanding problem-solving on the SAP migration. True team player — went above and beyond.",
      tag: "💎 Appreciate",
      tagColor: PINK,
      reactions: [{ emoji: "👏", count: 28 }, { emoji: "🙌", count: 16 }],
      delay: 0.85,
    },
    {
      from: "Team Lead",
      fromInitials: "TL",
      action: "spotlighted the team",
      to: "Digital Transform",
      toInitials: "DT",
      message: "Maya R · Sam K · Alex T — delivered 3 weeks ahead of schedule. Phenomenal effort.",
      tag: "🎯 Team Spotlight",
      tagColor: "#10B981",
      reactions: [{ emoji: "🚀", count: 52 }, { emoji: "👏", count: 41 }, { emoji: "❤️", count: 38 }],
      delay: 1.45,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        className="flex items-center gap-2">
        <span className="text-base md:text-xl font-bold text-white">GROW</span>
        <span className="text-base md:text-xl font-bold text-white/50">Collaboration Feed</span>
        <span className="ml-auto text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border"
          style={{ borderColor: PINK, color: PINK }}>Live</span>
      </motion.div>

      <div className="flex flex-col gap-2.5 flex-1">
        {posts.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: p.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-white/10 bg-white/5 p-3.5 flex flex-col gap-2">
            {/* Header row */}
            <div className="flex items-center gap-2.5">
              {/* From avatar */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                style={{ background: `${PINK}55`, border: `1.5px solid ${PINK}` }}>
                {p.fromInitials}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-white">{p.from}</span>
                <span className="text-xs text-white/40"> {p.action} </span>
                <span className="text-xs font-bold" style={{ color: PINK }}>{p.to}</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: `${p.tagColor}22`, color: p.tagColor }}>
                {p.tag}
              </span>
            </div>
            {/* Message */}
            <p className="text-[11px] text-white/65 leading-snug pl-9">{p.message}</p>
            {/* Reactions */}
            <div className="flex items-center gap-2 pl-9">
              {p.reactions.map((r, j) => (
                <motion.span key={j}
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: p.delay + 0.35 + j * 0.1 }}
                  className="flex items-center gap-1 text-[10px] text-white/50 bg-white/5 rounded-full px-2 py-0.5">
                  <span>{r.emoji}</span>
                  <span className="font-semibold">{r.count}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
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

const SCENES = [Scene0, Scene1, Scene2, Scene3, SceneCollab, Scene4, Scene5];

// ── Main Component ────────────────────────────────────────────────

export default function ConnectVideo() {
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [scene, setScene] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Refs
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<MusicEngine | null>(null);
  const audioDoneRef = useRef(false);
  const minDoneRef = useRef(false);
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMutedRef = useRef(false);
  const statusRef = useRef<"idle" | "playing" | "paused">("idle");
  const sceneRef = useRef(0);

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { sceneRef.current = scene; }, [scene]);

  const clearTimers = () => {
    if (minTimerRef.current) { clearTimeout(minTimerRef.current); minTimerRef.current = null; }
    if (safetyTimerRef.current) { clearTimeout(safetyTimerRef.current); safetyTimerRef.current = null; }
  };

  const stopVoiceAudio = () => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.src = "";
      voiceAudioRef.current = null;
    }
  };

  const advance = () => {
    setScene((prev) => (prev + 1) % TOTAL_SCENES);
  };

  const tryAdvance = () => {
    if (audioDoneRef.current && minDoneRef.current) advance();
  };

  const playVoiceForScene = (idx: number) => {
    stopVoiceAudio();
    if (isMutedRef.current) {
      audioDoneRef.current = true;
      return;
    }
    const base = (import.meta.env.BASE_URL as string).replace(/\/$/, "");
    const audio = new Audio(`${base}/audio/scene-${idx}.mp3`);
    audio.volume = 1.0;
    voiceAudioRef.current = audio;
    audio.onended = () => {
      if (statusRef.current !== "playing") return;
      audioDoneRef.current = true;
      tryAdvance();
    };
    audio.onerror = () => {
      audioDoneRef.current = true;
      tryAdvance();
    };
    audio.play().catch(() => {
      audioDoneRef.current = true;
      tryAdvance();
    });
  };

  const startScene = (idx: number) => {
    audioDoneRef.current = false;
    minDoneRef.current = false;
    clearTimers();

    minTimerRef.current = setTimeout(() => {
      minDoneRef.current = true;
      tryAdvance();
    }, MIN_DURATIONS[idx]);

    safetyTimerRef.current = setTimeout(() => {
      audioDoneRef.current = true;
      minDoneRef.current = true;
      advance();
    }, MIN_DURATIONS[idx] + AUDIO_SAFETY_MS);

    playVoiceForScene(idx);
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
      // Resume paused voice audio
      voiceAudioRef.current?.play().catch(() => {});
    }
    setStatus("playing");
  };

  const handlePause = () => {
    clearTimers();
    voiceAudioRef.current?.pause();
    musicRef.current?.pause();
    setStatus("paused");
  };

  const handleReplay = () => {
    clearTimers();
    stopVoiceAudio();
    if (!musicRef.current) musicRef.current = new MusicEngine();
    musicRef.current.start();
    audioDoneRef.current = false;
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
      voiceAudioRef.current?.pause();
      musicRef.current?.setVolume(0);
      audioDoneRef.current = true;
    } else {
      musicRef.current?.setVolume(0.22);
      if (status === "playing") playVoiceForScene(sceneRef.current);
    }
  };

  useEffect(() => {
    return () => {
      clearTimers();
      stopVoiceAudio();
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
