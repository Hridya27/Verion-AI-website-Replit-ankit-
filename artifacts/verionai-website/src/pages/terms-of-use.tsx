import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft, AlertTriangle, Info, XCircle } from "lucide-react";

const LAST_UPDATED = "April 15, 2026";
const VERSION = "1.0";

const PINK = "#D4196A";
const BLACK = "#111827";

function VerionAILogo() {
  return (
    <Link href="/" className="flex items-center">
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.03em", lineHeight: 1, display: "inline-flex", alignItems: "center", gap: "4px", userSelect: "none" }}>
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
        <span style={{ color: BLACK }}>ai</span>
      </span>
    </Link>
  );
}

const TOC_SECTIONS = [
  { num: "01", title: "About These Terms" },
  { num: "02", title: "Definitions" },
  { num: "03", title: "Licence Grant" },
  { num: "04", title: "Permitted Use and Restrictions" },
  { num: "05", title: "Authorised Users and Audit Rights" },
  { num: "06", title: "AI Tokens and Fair Use" },
  { num: "07", title: "Payment Terms" },
  { num: "08", title: "As-Is Service During Pilot" },
  { num: "09", title: "Data Protection and Privacy" },
  { num: "10", title: "Hosting and Infrastructure Limitations" },
  { num: "11", title: "Sensitive Data Warning" },
  { num: "12", title: "Intellectual Property" },
  { num: "13", title: "Confidentiality" },
  { num: "14", title: "Acceptable Use Policy" },
  { num: "15", title: "Warranties and Disclaimer" },
  { num: "16", title: "Limitation of Liability" },
  { num: "17", title: "Term and Termination" },
  { num: "18", title: "Product Decommission and Company Wind-Down" },
  { num: "19", title: "First Mover Pricing Lock" },
  { num: "20", title: "Partner Programme" },
  { num: "21", title: "General Provisions" },
  { num: "22", title: "Contact" },
];

function SectionPill({ num }: { num: string }) {
  return (
    <span
      className="inline-flex items-center justify-center text-xs font-bold px-2 py-0.5 rounded-full mb-3"
      style={{ background: `${PINK}14`, color: PINK, letterSpacing: "0.05em" }}
    >
      {num}
    </span>
  );
}

function InfoCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border border-blue-200 bg-blue-50 my-4">
      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-900 leading-relaxed">{children}</div>
    </div>
  );
}

function AmberCallout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50 my-4">
      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-900 leading-relaxed">
        <span className="font-semibold">{label} </span>{children}
      </div>
    </div>
  );
}

function RedCallout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border border-red-200 bg-red-50 my-4">
      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-red-900 leading-relaxed">
        <span className="font-semibold">{label} </span>{children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-3 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: PINK }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-gray-900 text-sm mt-5 mb-1.5">{children}</h3>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 leading-relaxed mb-3">{children}</p>;
}

export default function TermsOfUsePage() {
  const [tocOpen, setTocOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTocOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <VerionAILogo />
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero header */}
      <div className="border-b border-gray-100" style={{ background: "linear-gradient(to bottom, #fafafa, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: PINK }}
            >
              Pilot Agreement — Annexure A
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight mb-4">
              Verion Engage<br />Terms of Use
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>
                <span className="font-medium text-gray-700">Version:</span> {VERSION}
              </span>
              <span className="text-gray-300">·</span>
              <span>
                <span className="font-medium text-gray-700">Last Updated:</span> {LAST_UPDATED}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex gap-12">

          {/* Sticky TOC — desktop */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Contents</p>
              <nav className="space-y-0.5">
                {TOC_SECTIONS.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => scrollTo(`section-${s.num}`)}
                    className="flex items-start gap-2.5 w-full text-left py-1.5 px-2 rounded-md text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors group"
                  >
                    <span
                      className="flex-shrink-0 text-xs font-bold mt-0.5 group-hover:text-pink-600 transition-colors"
                      style={{ color: PINK, opacity: 0.7 }}
                    >
                      {s.num}
                    </span>
                    <span className="leading-snug">{s.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">

            {/* Mobile TOC toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700"
              >
                <span>Jump to section</span>
                {tocOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {tocOpen && (
                <div className="mt-1 border border-gray-200 rounded-lg bg-white shadow-lg divide-y divide-gray-100 overflow-hidden">
                  {TOC_SECTIONS.map((s) => (
                    <button
                      key={s.num}
                      onClick={() => scrollTo(`section-${s.num}`)}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <span className="text-xs font-bold" style={{ color: PINK }}>{s.num}</span>
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Opening important notice */}
            <InfoCallout>
              <span className="font-semibold">Important: </span>
              These Terms of Use apply to all customers who have signed a Verion Engage Pilot Agreement with Verion AI Private Limited. By signing the Pilot Agreement, you confirm that you have read and accepted these Terms in full. These Terms are incorporated into the Pilot Agreement by reference.
            </InfoCallout>

            {/* ── Section 01 ─────────────────────────────── */}
            <section id="section-01" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="01" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">About These Terms</h2>
              <Body>
                These Terms of Use ("Terms") govern your organisation's access to and use of Verion Engage, a cloud-based enterprise platform developed and operated by Verion AI Private Limited ("VerionAI", "we", "us"), a company incorporated under the Companies Act, 2013 with CIN U62090HR2026PTC142622, having its registered office at 346, 219 2F, ILD Trade Centre, Sector 47, Sohna Road, Gurugram – 122018, Haryana, India.
              </Body>
              <Body>
                These Terms apply to the organisation that has executed a Pilot Agreement with VerionAI ("Customer", "you"). They apply from the Effective Date stated in the Pilot Agreement and continue for the duration of the Pilot Period and any post-conversion subscription.
              </Body>
              <Body>
                If there is any conflict between these Terms and the signed Pilot Agreement, the Pilot Agreement shall prevail.
              </Body>
            </section>

            {/* ── Section 02 ─────────────────────────────── */}
            <section id="section-02" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="02" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Definitions</h2>
              <Body>In these Terms, the following words have the meanings given below:</Body>
              <BulletList items={[
                "AI Tokens — Units of AI processing capacity allocated to Customer as set out in Schedule 1 of the Pilot Agreement.",
                "Authorised Users — Employees of Customer granted access to the platform up to the User Limit.",
                "Cloud Services — The Verion Engage platform and all modules provided by VerionAI via the internet.",
                "Customer Data — All data, content, and information submitted to the platform by Customer or Authorised Users.",
                "Hosting Provider — The third-party infrastructure provider(s) on whose servers the platform operates (currently Replit, which provides application hosting and managed database infrastructure).",
                "Pilot Agreement — The signed agreement between VerionAI and Customer to which these Terms are attached as Annexure A.",
                "Pilot Period — The 12-month pilot subscription period stated in the Pilot Agreement.",
                "User Limit — The maximum number of Authorised Users permitted as stated in Schedule 1.",
              ]} />
            </section>

            {/* ── Section 03 ─────────────────────────────── */}
            <section id="section-03" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="03" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Licence Grant</h2>
              <Body>
                Subject to your compliance with these Terms and payment of all applicable fees, VerionAI grants you a limited, non-exclusive, non-transferable, non-sublicensable licence to access and use the Cloud Services solely for your own internal business purposes during the Pilot Period.
              </Body>
              <Body>
                This is a licence to access the Cloud Services. It is not a sale of software and does not transfer any intellectual property rights to you. You obtain no ownership interest in the platform or any underlying technology.
              </Body>
              <Body>
                The licence covers only the modules and service tiers set out in Schedule 1 of your Pilot Agreement.
              </Body>
            </section>

            {/* ── Section 04 ─────────────────────────────── */}
            <section id="section-04" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="04" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Permitted Use and Restrictions</h2>
              <SubHeading>What you may do</SubHeading>
              <Body>
                You may access and use the Cloud Services only: (a) for your own internal business operations; (b) through Authorised Users up to the User Limit; and (c) in compliance with these Terms and applicable law.
              </Body>
              <SubHeading>What you must not do</SubHeading>
              <Body>You shall not, and shall ensure Authorised Users do not:</Body>
              <BulletList items={[
                "Sub-license, sell, resell, transfer, assign, or distribute the Cloud Services to any third party",
                "Reverse engineer, decompile, disassemble, or attempt to derive the source code of the platform",
                "Use the platform to build a competitive product or service",
                "Benchmark the platform against a competitive product without VerionAI's prior written consent",
                "Permit any third party outside your organisation to access the platform",
                "Exceed the User Limit stated in Schedule 1",
                "Circumvent, disable, or interfere with any security or access control feature of the platform",
                "Use automated bots, scripts, or tools to systematically extract content from the platform",
              ]} />
              <SubHeading>User credentials</SubHeading>
              <Body>
                You are solely responsible for maintaining the confidentiality of all usernames, passwords, and access credentials. Notify VerionAI immediately at info@verionai.in if you suspect any unauthorised access to your account.
              </Body>
            </section>

            {/* ── Section 05 ─────────────────────────────── */}
            <section id="section-05" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="05" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Authorised Users and Audit Rights</h2>
              <SubHeading>User limit</SubHeading>
              <Body>
                The maximum number of Authorised Users is the User Limit stated in Schedule 1. VerionAI monitors active user accounts through platform logs. If platform records indicate your User Limit has been exceeded, VerionAI will notify you in writing and you must within 30 days either reduce users to the limit or execute a written amendment and pay additional fees retroactively.
              </Body>
              <SubHeading>Remote compliance audit</SubHeading>
              <Body>
                VerionAI may conduct a remote compliance audit via platform access logs and usage records once per rolling 12-month period, with 14 days' written notice. Audits are conducted at no cost to either party. If an audit reveals excess users or material breach, you shall pay fees for all excess use plus a 10% administration uplift on underpaid amounts.
              </Body>
            </section>

            {/* ── Section 06 ─────────────────────────────── */}
            <section id="section-06" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="06" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">AI Tokens and Fair Use</h2>
              <SubHeading>Annual allocation</SubHeading>
              <Body>
                Each year of your subscription, you receive an Annual Token Allocation as specified in Schedule 1 of your Pilot Agreement. This allocation covers your use of all AI-powered features within the platform.
              </Body>
              <SubHeading>Annual reset — use it or lose it</SubHeading>
              <Body>
                The AI Token allocation resets each annual period. Unused tokens lapse at the end of each year and are non-refundable. Tokens do not carry forward to the next period.
              </Body>
              <SubHeading>On exhaustion — AI features pause</SubHeading>
              <Body>
                When your Annual Token Allocation is fully consumed: (a) AI-powered features will be automatically suspended for the remainder of that annual period; (b) all non-AI platform features continue to operate normally; and (c) you may purchase an additional token block by executing a written amendment at VerionAI's then-current pricing.
              </Body>
              <Body>
                Token monitoring: VerionAI will endeavour to provide visibility into your token consumption through the platform's administrative dashboard. This feature is subject to availability during the Pilot Period.
              </Body>
            </section>

            {/* ── Section 07 ─────────────────────────────── */}
            <section id="section-07" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="07" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Terms</h2>
              <Body>
                All fees are as stated in Schedule 1 of your Pilot Agreement. Fees are due within 30 days of invoice date. Unpaid fees accrue interest at 18% per annum from the due date.
              </Body>
              <Body>
                All fees are exclusive of applicable GST. GST at the prevailing rate will be charged separately on each invoice. Provide your GSTIN to VerionAI before your Pilot Agreement is executed. Issue Withholding Tax certificates (Form 16A) within timelines prescribed by law.
              </Body>
              <Body>
                Payment is not dependent on completion of any implementation. VerionAI may suspend access if any undisputed payment remains outstanding for more than 15 days after the due date.
              </Body>
            </section>

            {/* ── Section 08 ─────────────────────────────── */}
            <section id="section-08" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="08" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">As-Is Service During Pilot</h2>
              <AmberCallout label="Please read carefully.">
                Verion Engage is provided on a best-efforts, as-is basis during the Pilot Period. No formal SLA or uptime guarantee applies.
              </AmberCallout>
              <Body>
                VerionAI will use commercially reasonable efforts to maintain service availability. However, VerionAI bears no liability for downtime, data loss, service interruption, or feature change during the Pilot Period, beyond the refund mechanism described in Section 17.
              </Body>
              <Body>
                The platform is in active development. Features, performance, integrations, and availability may evolve during the Pilot Period. Nothing in the Pilot Agreement or these Terms constitutes a guarantee of feature completeness or fitness for a particular production use case.
              </Body>
              <Body>
                VerionAI's delivery obligation is limited to Platform Provisioning — providing your administrator login credentials and platform access link. Configuration, user onboarding, and day-to-day operation are entirely your responsibility.
              </Body>
            </section>

            {/* ── Section 09 ─────────────────────────────── */}
            <section id="section-09" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="09" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Data Protection and Privacy</h2>
              <Body>
                Both parties acknowledge the existence of the Digital Personal Data Protection Act, 2023 (India) ("DPDP Act") and agree to comply with applicable data protection laws to the extent within their respective reasonable control.
              </Body>
              <AmberCallout label="Important limitation:">
                Full technical compliance with all provisions of the DPDP Act — including data localisation and data residency requirements — cannot be guaranteed by VerionAI during the Pilot Period due to third-party hosting infrastructure. See Section 10.
              </AmberCallout>
              <SubHeading>Your responsibilities</SubHeading>
              <Body>You are solely responsible for:</Body>
              <BulletList items={[
                "Determining what personal data your organisation submits to the platform",
                "Obtaining all necessary consents and notices from your employees before their data is submitted",
                "Notifying your employees that their personal data will be processed on third-party cloud infrastructure that may be located outside India",
                "Assessing whether the platform is suitable for your regulatory environment before submitting personal data",
                "Complying with all data subject rights obligations under applicable law",
              ]} />
              <Body>
                VerionAI bears no liability for your failure to obtain appropriate consents or comply with data subject rights.
              </Body>
            </section>

            {/* ── Section 10 ─────────────────────────────── */}
            <section id="section-10" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="10" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hosting and Infrastructure Limitations</h2>
              <RedCallout label="Please read and acknowledge.">
                By signing the Pilot Agreement, you confirm you have read and accepted the limitations in this section.
              </RedCallout>
              <Body>
                The Cloud Services are built and hosted on third-party cloud infrastructure, currently including:
              </Body>
              <BulletList items={[
                "Replit — application hosting, deployment, and managed database infrastructure",
              ]} />
              <Body>
                VerionAI does not own, operate, or control the physical servers. The geographic location of servers is determined by the Hosting Provider and may be outside India. Customer Data, including employee personal data, may be stored and processed on servers in the United States or other jurisdictions.
              </Body>
              <Body>
                Replit maintains a publicly available Data Processing Addendum (DPA) which governs how Replit processes data within applications hosted on its platform, including all managed infrastructure services. You may review Replit's DPA at: replit.com/dpa. By accepting these Terms, you acknowledge that you have had the opportunity to review Replit's DPA and that your Customer Data is subject to Replit's data processing terms in addition to VerionAI's obligations under these Terms. VerionAI is not a party to and bears no responsibility for Replit's DPA or any obligations arising under it.
              </Body>
              <Body>
                By signing the Pilot Agreement, you expressly acknowledge and accept all of the following:
              </Body>
              <BulletList items={[
                "VerionAI cannot guarantee data localisation within India during the Pilot Period",
                "VerionAI cannot guarantee compliance with DPDP Act data residency requirements during the Pilot Period",
                "VerionAI is not liable for any data breach, loss, unauthorised access, or regulatory penalty arising from acts or omissions of the Hosting Providers",
                "In the event of a data breach at infrastructure level, VerionAI's obligation is limited to notifying you promptly upon becoming aware and cooperating in your response to the extent within VerionAI's knowledge and control",
                "You have independently assessed and accepted these risks as a condition of entering the Pilot Agreement",
              ]} />
            </section>

            {/* ── Section 11 ─────────────────────────────── */}
            <section id="section-11" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="11" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sensitive Data Warning</h2>
              <RedCallout label="Strong advisory.">
                VerionAI strongly advises against submitting highly sensitive personal data during the Pilot Period.
              </RedCallout>
              <Body>
                Given the hosting infrastructure limitations described in Section 10, VerionAI strongly advises you not to submit the following categories of data to the platform during the Pilot Period:
              </Body>
              <BulletList items={[
                "Government-issued identification numbers — Aadhaar, PAN, Passport numbers",
                "Financial account details, bank account numbers, or payment card information",
                "Biometric data of any kind",
                "Medical, health, or insurance information",
                "Any data classified as sensitive personal data under the DPDP Act or applicable law",
              ]} />
              <Body>
                VerionAI bears no liability for any loss, breach, or regulatory consequence arising from your decision to submit such data. If you nevertheless choose to submit sensitive personal data, you do so entirely at your own risk with full acknowledgement of the limitations in Section 10.
              </Body>
            </section>

            {/* ── Section 12 ─────────────────────────────── */}
            <section id="section-12" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="12" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <SubHeading>VerionAI IP</SubHeading>
              <Body>
                Verion AI Private Limited retains all right, title, and interest in and to the platform, all underlying software, AI models, algorithms, frameworks, methodologies, documentation, and any enhancements thereto. No rights in VerionAI's IP are transferred to you.
              </Body>
              <SubHeading>Customer Data</SubHeading>
              <Body>
                You retain ownership of all data you submit to the platform. You grant VerionAI a limited licence to process your data solely to provide the Cloud Services during the subscription period.
              </Body>
              <SubHeading>Aggregated data</SubHeading>
              <Body>
                VerionAI may use anonymised, aggregated, de-identified data derived from platform usage to improve the platform, provided such data does not identify your organisation or any individual.
              </Body>
              <SubHeading>Feedback</SubHeading>
              <Body>
                Any suggestions or feedback you provide regarding the platform may be used by VerionAI freely without obligation to you.
              </Body>
            </section>

            {/* ── Section 13 ─────────────────────────────── */}
            <section id="section-13" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="13" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confidentiality</h2>
              <Body>
                Each party will hold in strict confidence all non-public information of the other party that is designated as confidential or that reasonably should be understood to be confidential. Confidential Information will be used only for the purposes of the Pilot Agreement and not disclosed to third parties without prior written consent.
              </Body>
              <Body>
                Confidentiality obligations survive for 3 years after termination or expiry of the Pilot Agreement.
              </Body>
            </section>

            {/* ── Section 14 ─────────────────────────────── */}
            <section id="section-14" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="14" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
              <Body>You shall not use the platform to:</Body>
              <BulletList items={[
                "Upload unlawful, defamatory, threatening, abusive, or objectionable content",
                "Infringe any third-party intellectual property or privacy rights",
                "Upload or introduce malicious code, viruses, or harmful data",
                "Conduct network attacks or penetration testing without VerionAI's prior written consent",
                "Attempt to gain unauthorised access to any VerionAI system or account",
                "Violate applicable export control, sanctions, or anti-money laundering laws",
                "Process special category personal data without informing VerionAI in advance",
              ]} />
              <Body>
                VerionAI may immediately suspend your access if it reasonably believes you are in breach of this policy.
              </Body>
            </section>

            {/* ── Section 15 ─────────────────────────────── */}
            <section id="section-15" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="15" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Warranties and Disclaimer</h2>
              <Body>
                VerionAI warrants that it has the right to grant the licence in Section 3 and will provide the platform with reasonable skill and care.
              </Body>
              <p className="text-xs text-gray-500 leading-relaxed mb-3 tracking-wide">
                EXCEPT AS ABOVE, THE CLOUD SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" DURING THE PILOT PERIOD. VERIONAI MAKES NO WARRANTY AS TO UPTIME, ERROR-FREE OPERATION, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. AI-GENERATED OUTPUTS ARE PROVIDED FOR INFORMATIONAL PURPOSES ONLY. CUSTOMER ASSUMES SOLE RESPONSIBILITY FOR ANY DECISIONS MADE ON THE BASIS OF SUCH OUTPUTS.
              </p>
            </section>

            {/* ── Section 16 ─────────────────────────────── */}
            <section id="section-16" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="16" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <SubHeading>Cap on liability</SubHeading>
              <Body>
                VerionAI's total aggregate liability under the Pilot Agreement and these Terms shall not exceed the total fees actually paid by you to VerionAI up to the date of the claim.
              </Body>
              <SubHeading>Exclusions</SubHeading>
              <Body>
                Neither party shall be liable for indirect, consequential, special, punitive, or exemplary damages including loss of profits, revenue, data, or goodwill, even if advised of the possibility of such damages.
              </Body>
              <SubHeading>Your indemnity</SubHeading>
              <Body>
                You shall indemnify and hold harmless Verion AI Private Limited, its directors, founders, employees, and agents from third-party claims arising from: your breach of these Terms; excess or unauthorised use of the platform; the content of your data; or your violation of applicable law.
              </Body>
            </section>

            {/* ── Section 17 ─────────────────────────────── */}
            <section id="section-17" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="17" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Term and Termination</h2>
              <SubHeading>Mutual exit</SubHeading>
              <Body>
                Either party may terminate the Pilot Agreement during the Pilot Period with 30 days' written notice, without cause and without penalty. If VerionAI terminates without cause, a pro-rata refund of prepaid fees will be provided for the unexpired period.
              </Body>
              <SubHeading>Termination for cause</SubHeading>
              <Body>
                Either party may terminate immediately if the other commits a material breach and fails to cure it within 30 days of written notice.
              </Body>
              <SubHeading>Non-payment</SubHeading>
              <Body>
                VerionAI may suspend access after 15 days of an overdue undisputed payment and terminate after 30 days.
              </Body>
              <SubHeading>On termination</SubHeading>
              <Body>
                Your licence ceases immediately. VerionAI will provide a 30-day data export window. All outstanding fees become due. Each party returns the other's Confidential Information.
              </Body>
            </section>

            {/* ── Section 18 ─────────────────────────────── */}
            <section id="section-18" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="18" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Decommission and Company Wind-Down</h2>
              <SubHeading>Product discontinuation</SubHeading>
              <Body>
                If VerionAI resolves to discontinue Verion Engage during the Pilot Period, VerionAI will: (a) provide at least 60 days' prior written notice; (b) maintain platform access during the notice period; (c) provide a 30-day data export window; and (d) refund a pro-rata portion of prepaid fees for the period after discontinuation.
              </Body>
              <SubHeading>Company wind-down</SubHeading>
              <Body>
                If Verion AI Private Limited resolves to wind down its business during the Pilot Period, VerionAI will: (a) provide at least 60 days' prior written notice; (b) provide a 30-day data export window; and (c) refund a pro-rata portion of prepaid fees for the unexpired period.
              </Body>
              <Body>
                Upon such refund being made, VerionAI's total liability is fully and finally discharged. You shall have no further claim against Verion AI Private Limited, its directors, founders, shareholders, employees, or affiliates in connection with the discontinuation or wind-down.
              </Body>
            </section>

            {/* ── Section 19 ─────────────────────────────── */}
            <section id="section-19" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="19" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">First Mover Pricing Lock</h2>
              <Body>
                The pricing in Schedule 1 of your Pilot Agreement is your First Mover Price, offered at a preferential rate in recognition of your early adoption.
              </Body>
              <Body>
                Subject to you executing a formal Order Form within 30 days of Pilot Period expiry, your First Mover Price per user and AI Token rate will be locked for a further 2 years from the Conversion Date — providing a total of 3 years at First Mover pricing (1-year Pilot + 2 years post-conversion).
              </Body>
              <Body>
                The Pricing Lock applies only if: you have not materially breached the Pilot Agreement; you execute the Order Form within 30 days of Pilot Period end; and the subscribed User Limit and module scope remain the same or greater. If you do not execute the Order Form in time, the Pricing Lock lapses and VerionAI may offer standard pricing.
              </Body>
            </section>

            {/* ── Section 20 ─────────────────────────────── */}
            <section id="section-20" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="20" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Partner Programme</h2>
              <Body>
                If an implementation or referral partner is identified in your Pilot Agreement, you agree that such partner may share with VerionAI information provided by you as evidence of partner activities. VerionAI's remuneration of the partner will not affect your pricing or VerionAI's obligations to you.
              </Body>
            </section>

            {/* ── Section 21 ─────────────────────────────── */}
            <section id="section-21" className="pt-10 pb-6 border-b border-gray-100">
              <SectionPill num="21" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Provisions</h2>
              <BulletList items={[
                "Governing Law: These Terms and the Pilot Agreement are governed by the laws of India.",
                "Disputes: Disputes will be resolved by binding arbitration in Gurugram, Haryana, India under the Arbitration and Conciliation Act, 1996, conducted in English by a sole mutually agreed arbitrator.",
                "Jurisdiction: Subject to arbitration, the courts of Gurugram, Haryana shall have exclusive jurisdiction.",
                "Entire Agreement: The Pilot Agreement (including Schedule 1) and these Terms constitute the entire agreement between the parties.",
                "Amendments: No amendment is effective unless in writing and signed by both parties.",
                "Assignment: You may not assign the Pilot Agreement without VerionAI's written consent.",
                "Force Majeure: Neither party is liable for delays caused by events beyond its reasonable control.",
                "Severability: If any provision is held invalid, the remaining provisions continue in full force.",
                "Electronic Signatures: Electronic signatures are valid and binding.",
                "Updates to Terms: VerionAI may update these Terms from time to time. Material changes will be notified to active customers by email at least 30 days before taking effect. Continued use of the platform after the effective date of changes constitutes acceptance.",
              ]} />
            </section>

            {/* ── Section 22 ─────────────────────────────── */}
            <section id="section-22" className="pt-10 pb-6">
              <SectionPill num="22" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <Body>For any questions about these Terms, data handling, or your subscription:</Body>
              <div className="p-5 rounded-lg border border-gray-200 bg-gray-50 mt-3">
                <p className="text-sm font-semibold text-gray-900 mb-1">Verion AI Private Limited</p>
                <p className="text-sm text-gray-600">346, 219 2F, ILD Trade Centre, Sector 47, Sohna Road</p>
                <p className="text-sm text-gray-600">Gurugram – 122018, Haryana, India</p>
                <p className="text-sm text-gray-600 mt-2">CIN: U62090HR2026PTC142622</p>
                <p className="text-sm text-gray-600 mt-2">
                  E:{" "}
                  <a href="mailto:info@verionai.in" className="hover:underline" style={{ color: PINK }}>
                    info@verionai.in
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  W:{" "}
                  <a href="https://verionai.in" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: PINK }}>
                    verionai.in
                  </a>
                </p>
              </div>
            </section>

            {/* Back to top / home */}
            <div className="pt-10 flex items-center justify-between border-t border-gray-100 mt-6">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
              >
                ↑ Back to top
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page footer */}
      <footer className="border-t border-gray-100 bg-gray-50 mt-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <VerionAILogo />
              <span>·</span>
              <span>Verion Engage Terms of Use — Version {VERSION}</span>
            </div>
            <div className="flex gap-6">
              <span>© {new Date().getFullYear()} Verion AI Private Limited</span>
              <span>·</span>
              <span>Last Updated: {LAST_UPDATED}</span>
              <span>·</span>
              <a href="mailto:info@verionai.in" className="hover:text-gray-600 transition-colors">info@verionai.in</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
