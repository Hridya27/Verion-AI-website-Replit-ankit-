import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Users, Brain, Shield, BarChart3, MessageSquare, Award,
  ChevronRight, Star, Zap, Globe, Lock, Layers, Briefcase,
  UserCheck, GraduationCap, Target, Clock, FileSpreadsheet,
  ArrowRight, CheckCircle, Sparkles, TrendingUp, Building2,
  Search, Bell, Gamepad2, Handshake, Lightbulb, Menu, X
} from "lucide-react";

const PINK = "#D4196A";
const BLACK = "#111827";

function VerionAILogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.01em", lineHeight: 1, display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <span style={{ color: PINK }}>Verion</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", height: "11px", flexShrink: 0 }}>
          <motion.span
            animate={{ scaleY: [0.35, 1, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
            style={{ width: "2px", height: "11px", borderRadius: "99px", backgroundColor: BLACK, display: "block", transformOrigin: "center" }}
          />
          <motion.span
            animate={{ scaleY: [1, 0.35, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
            style={{ width: "2px", height: "11px", borderRadius: "99px", backgroundColor: PINK, display: "block", transformOrigin: "center" }}
          />
        </span>
        <span style={{ color: dark ? "#fff" : BLACK }}>ai</span>
      </span>
    </Link>
  );
}

const HERO_STATS = [
  { value: "20+", label: "Integrated Modules" },
  { value: "100+", label: "Granular Permissions" },
  { value: "AI", label: "Powered Intelligence" },
  { value: "360°", label: "Employee View" },
];

const CORE_FEATURES = [
  {
    icon: Users,
    title: "Talent Management",
    description: "Comprehensive employee profiles with skills, certifications, work history, and practice area expertise. Discover the right talent instantly with advanced multi-filter search across any service line.",
    highlights: ["Employee Skill Profiles", "Practice Area Expertise Tracking", "Multi-Filter Talent Discovery", "Profile Cards & Data Views"],
    color: "blue",
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Built-in AI assistant for system queries, report generation, and smart recommendations. AI-driven CV parsing, candidate insights, and manager recommendation engine.",
    highlights: ["AI Chat Assistant", "AI CV Parser & Resume Analysis", "Smart Manager Recommendations", "Voice Input via Whisper"],
    color: "purple",
  },
  {
    icon: Briefcase,
    title: "Resource Management",
    description: "End-to-end resource lifecycle management — from opportunity tracking and allocation to towers, utilization dashboards, and capacity planning.",
    highlights: ["Opportunity & Request Pipeline", "Resource Allocation Engine", "Utilization & Capacity Planning", "Tower-Based Organization"],
    color: "green",
  },
  {
    icon: Clock,
    title: "Timesheet Platform",
    description: "Configurable timesheet upload system with dynamic field configuration, Excel template generation, weekly time entry grid, and custom report builder.",
    highlights: ["Weekly Time Entry Grid", "Configurable Upload Fields", "Dynamic Excel Templates", "Custom Report Builder"],
    color: "orange",
  },
  {
    icon: UserCheck,
    title: "Talent Acquisition",
    description: "Full-cycle recruiting with job requisitions, candidate tracking, screening workflows, interview scheduling with scorecards, and offer management.",
    highlights: ["Job Requisitions Pipeline", "AI Candidate Insights", "Interview Scorecards", "Offer Management"],
    color: "indigo",
  },
  {
    icon: GraduationCap,
    title: "Onboarding",
    description: "Structured onboarding with customizable templates, task checklists, document verification workflows, and progress tracking for new hires.",
    highlights: ["Template-Based Workflows", "Task Assignment & Tracking", "Document Verification", "Progress Monitoring"],
    color: "teal",
  },
];

const UNIQUE_FEATURES = [
  {
    icon: Gamepad2,
    title: "Gamification & Points",
    description: "Dynamic points system with configurable scoring rules tied to 20+ modules and 100+ actions. Leaderboards, tiers, and automatic point awards drive engagement.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Handshake,
    title: "GROW Collaboration Feed",
    description: "Enterprise social feed with appreciation posts, spotlights, polls, gives & asks. Star ratings, admin approval workflows, and peer-confirmed appreciation requests.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Rewards & Recognition",
    description: "Structured nomination system with award categories, impact ratings, director review cycles, awards gallery, and weekly R&R reminder campaigns.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Enterprise RBAC",
    description: "Two-tier access control — granular role-based permissions across 20 system modules with 100+ actions, plus a quick-toggle feature access matrix by designation.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Building2,
    title: "Multi-Org Enterprise Structure",
    description: "Hierarchical organization setup with Company → Business Unit → Solution → Sub-Solution. Data isolation, post-login org selection, and admin-managed assignments.",
    gradient: "from-slate-500 to-blue-500",
  },
  {
    icon: Lightbulb,
    title: "Build Your Own Automations",
    description: "Create custom workflows, notification rules, knowledge base articles, and team rituals. Empower users to automate repetitive tasks without code.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const PLATFORM_FEATURES = [
  { icon: MessageSquare, label: "Real-Time Chat & Video Calling" },
  { icon: Bell, label: "Smart Notifications with Quiet Hours" },
  { icon: Search, label: "Global Search (Cmd+K)" },
  { icon: BarChart3, label: "Talent Analytics & Dashboards" },
  { icon: FileSpreadsheet, label: "CSV & Excel Data Export" },
  { icon: Globe, label: "Holiday Calendar Management" },
  { icon: Layers, label: "Interactive Org Hierarchy" },
  { icon: Lock, label: "Secure Authentication & Approvals" },
  { icon: Target, label: "Skill Leaders & Champions" },
  { icon: TrendingUp, label: "KPI & Availability Tracking" },
  { icon: Star, label: "Contextual Did-You-Know Tips" },
  { icon: Sparkles, label: "Dark Mode & Customizable Sidebar" },
];

const ENTERPRISE_PILLARS = [
  {
    icon: Globe,
    title: "Practice-Ready",
    desc: "Configurable skill taxonomies and practice area structures that adapt to any professional services firm — consulting, advisory, or managed services.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "Granular RBAC with 100+ permissions, audit trails, admin approval workflows, and data isolation.",
  },
  {
    icon: Brain,
    title: "AI-First Design",
    desc: "AI assistant, CV parser, candidate insights, and smart recommendations woven into every workflow.",
  },
  {
    icon: TrendingUp,
    title: "Engagement Built In",
    desc: "Gamification, collaboration feeds, recognition, and points systems that drive real adoption.",
  },
];

const NAV_LINKS = ["Features", "Capabilities", "Modules", "Why Engage"];

const colorMap: Record<string, { bg: string; icon: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100", badge: "bg-blue-100 text-blue-700" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100", badge: "bg-purple-100 text-purple-700" },
  green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-100", badge: "bg-green-100 text-green-700" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-100", badge: "bg-orange-100 text-orange-700" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100", badge: "bg-indigo-100 text-indigo-700" },
  teal: { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-100", badge: "bg-teal-100 text-teal-700" },
};

export default function ConnectPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <VerionAILogo />
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  {link}
                </a>
              ))}
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-all text-white"
                style={{ background: "linear-gradient(to right, #1E3A8A, #2563EB)" }}
              >
                Request Demo
              </Link>
            </div>
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-xl">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg text-center"
              >
                Request Demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section
        id="features"
        className="relative overflow-hidden pt-16 pb-32"
        style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #111111 60%, #1a0008 100%)" }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,25,106,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,25,106,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,25,106,0.04) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-8 backdrop-blur-sm" style={{ background: "rgba(212,25,106,0.08)", borderColor: "rgba(212,25,106,0.25)", color: "#f472b6" }}>
              <Zap className="h-3.5 w-3.5" />
              Enterprise Talent & Resource Intelligence Platform
            </div>

            {/* Product name — primary hero */}
            <h1 className="font-extrabold leading-none tracking-tight" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", letterSpacing: "-0.03em" }}>
              <span style={{ color: PINK }}>Verion</span>
              <span className="text-white"> Engage</span>
            </h1>

            {/* Tagline — secondary, visually smaller */}
            <p className="mt-5 text-xl sm:text-2xl font-semibold text-white/60 tracking-wide">
              Grow Your People.
            </p>

            <p className="mt-3 text-sm sm:text-base font-medium tracking-widest uppercase" style={{ color: PINK, opacity: 0.8 }}>
              Engage &nbsp;·&nbsp; Recognize &nbsp;·&nbsp; Succeed
            </p>

            <p className="mt-7 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              The all-in-one platform for professional services firms — talent management, resource allocation,
              recognition, and AI-driven insights across every service line and practice area.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group px-8 py-3.5 font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base text-white"
                style={{
                  background: `linear-gradient(to right, ${PINK}, #e8317a)`,
                  boxShadow: `0 10px 30px -5px rgba(212,25,106,0.35)`,
                }}
              >
                Contact Us
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#capabilities"
                className="group px-8 py-3.5 border text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-base backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              >
                Explore Features
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {HERO_STATS.map((stat) => (
              <div key={stat.value} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>


      <section id="capabilities" className="py-20 sm:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
              <Layers className="h-3.5 w-3.5" />
              CORE PLATFORM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Manage Talent
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Six integrated modules that cover the entire employee lifecycle — from hiring and onboarding 
              to skills tracking, resource allocation, and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_FEATURES.map((feature) => {
              const c = colorMap[feature.color];
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group p-6 rounded-2xl border ${c.border} ${c.bg} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${c.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((h) => (
                      <span key={h} className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>
                        <CheckCircle className="h-3 w-3" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="modules"
        className="py-20 sm:py-28 scroll-mt-20"
        style={{ background: "linear-gradient(to bottom, #f8fafc, #ffffff)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              WHAT MAKES US DIFFERENT
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Beyond Standard HR — Built for Engagement
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Unique capabilities that drive real adoption, recognition, and team cohesion across your organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UNIQUE_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold mb-4">
              <CheckCircle className="h-3.5 w-3.5" />
              PLATFORM CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Packed With Productivity Features
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Every detail engineered to save time, reduce friction, and empower your teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {PLATFORM_FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-engage"
        className="py-20 sm:py-28 relative overflow-hidden scroll-mt-20"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for Enterprise. Designed for People.
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Four pillars that make Verion Engage the platform of choice for professional services organisations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENTERPRISE_PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="p-10 sm:p-14 rounded-3xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)" }}
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Ready to Transform Your Talent Operations?
              </h2>
              <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
                Join leading professional services firms using Verion Engage to manage people, resources,
                and performance — across every practice and service line.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group px-8 py-3.5 bg-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base"
                  style={{ color: "#1D4ED8" }}
                >
                  Get Started Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-base text-center"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0F172A" }} className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <VerionAILogo dark />
              <span className="text-slate-500 text-sm">
                Verion Engage — Enterprise Talent Platform
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-slate-500 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-slate-500 text-xs">© {new Date().getFullYear()} VerionAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
