import cloud_bg from "../assets/howitworks_hero.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  EyeOff,
  Server,
  FileText,
  CheckCircle2,
  Database,
  ArrowRight,
  Mail,
  Phone,
  Clock,
  KeyRound,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("core-commitments");

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ];

  const tocItems = [
    { id: "core-commitments", label: "Core Privacy Commitments" },
    { id: "data-collection", label: "1. Information We Collect" },
    { id: "data-usage", label: "2. How We Use Information" },
    { id: "google-drive", label: "3. Google Drive & Cloud Sync" },
    { id: "security", label: "4. Security & Encryption" },
    { id: "cookies", label: "5. Cookies & Tracking" },
    { id: "retention", label: "6. Data Retention & Deletion" },
    { id: "contact-privacy", label: "7. Contact Privacy Desk" },
  ];

  // Auto-highlight active TOC item on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <SEOHead
        title="Privacy Policy | Data Protection & Ownership | Apna School"
        description="Read Apna School's Privacy Policy. Understand our commitment to student data sovereignty, Google Drive privacy, and zero data selling."
        canonicalUrl="https://apnaschool.in/privacy"
        structuredData={getBreadcrumbsSchema(breadcrumbs)}
      />

      <main className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased">
        {/* Hero Banner with Full Width Occupancy */}
        <section className="relative isolate min-h-80 w-full overflow-hidden bg-[#effaff] px-5 pt-10 pb-16 sm:px-10 lg:px-14">
          <img
            src={cloud_bg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          />

          <div className="relative z-10 mx-auto max-w-10xl">
            <div className="max-w-3xl pt-4 sm:pt-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Shield size={14} /> Trust, Sovereignty &amp; Security
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl tracking-tight">
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Your school&apos;s data belongs entirely to you. We are engineered to respect student privacy with zero monetization and absolute cloud transparency.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span>Effective Date: September 2026</span>
                <span>•</span>
                <span>Version 1.2</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Horizontal Quick Jump Nav */}
        <div className="lg:hidden sticky top-20 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-5 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Full-Width Responsive 2-Column Grid */}
        <section className="mx-auto w-full max-w-10xl px-5 py-8 sm:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[310px_1fr] items-start">
            
            {/* Left Sticky Table of Contents Navigation (Firmly anchored to top) */}
            <aside className="hidden lg:block sticky top-24 self-start z-20 w-full">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-md">
                <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#071d55] uppercase tracking-wider">
                      Contents
                    </h3>
                    <p className="text-[11px] text-slate-400">Jump to section</p>
                  </div>
                </div>

                <nav className="mt-3 flex flex-col gap-1">
                  {tocItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-between group ${
                          isActive
                            ? "bg-blue-600 text-white shadow-xs font-bold"
                            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <ChevronRight
                          size={13}
                          className={`transition-transform ${
                            isActive ? "text-white translate-x-0.5" : "opacity-0 group-hover:opacity-60"
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>

                {/* Built-in Compact Trust Badge */}
                <div className="mt-4 pt-4 border-t border-slate-100 rounded-2xl bg-[#f0f8ff] p-3.5 border border-blue-50 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#071d55] mb-1">
                    <ShieldCheck className="text-emerald-600" size={16} />
                    <span>Your Data &bull; Your Drive</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Student records stay secured in your own Google Drive.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    Contact Privacy Team <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Detailed Legal Content */}
            <div className="space-y-8 min-w-0">

              {/* 3 Visual Core Guarantees Cards */}
              <div id="core-commitments" className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-xs">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Database size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#071d55]">100% School Ownership</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    You own all student, staff, and fee records. Export or delete data anytime without penalties.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-xs">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <EyeOff size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#071d55]">Zero Data Selling</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    We never sell, rent, or monetize educational records to third-party ad networks or brokers.
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-xs">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#071d55]">Bank-Grade Security</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    Encrypted transmissions over modern TLS protocols with role-based staff authentication.
                  </p>
                </div>
              </div>

              {/* Section 1: Information We Collect */}
              <div id="data-collection" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-xl font-bold text-[#071d55]">
                    Information We Collect
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Apna School operates strictly as a service provider (data processor) to schools. We only collect information that authorized administrators deliberately enter into the system:
                </p>
                <div className="grid gap-3 sm:grid-cols-3 pt-2">
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#071d55] mb-1">
                      School Profile
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Institution name, registration code, address, administrator contact email, and phone number.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#071d55] mb-1">
                      Student Profiles
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Student name, roll number, class/grade, parent/guardian phone number, and attendance status.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#071d55] mb-1">
                      Fee Ledgers
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Receipt numbers, fee category breakdown, payment dates, and payment modes for school records.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: How We Use Information */}
              <div id="data-usage" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                    02
                  </div>
                  <h2 className="text-xl font-bold text-[#071d55]">
                    How We Use Information
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  All stored records are used exclusively to provide administrative functionality requested by the school:
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2 pt-1 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-50">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Managing student admission registries and classroom rosters</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-50">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Triggering daily SMS/WhatsApp attendance alerts to parents</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-50">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Generating downloadable fee receipts and annual revenue statements</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-50">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Calculating academic grades and creating printable report cards</span>
                  </li>
                </ul>
              </div>

              {/* Section 3: Google Drive Integration */}
              <div id="google-drive" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-xl font-bold text-[#071d55]">
                    Google Drive &amp; Cloud Sovereignty
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Apna School provides optional direct integration with Google Drive and Google Sheets. When enabled:
                </p>
                <div className="rounded-2xl bg-emerald-50/70 p-5 border border-emerald-100">
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                    Your student admissions, attendance logs, and fee tables are written directly to your institution&apos;s own Google Drive folder. You retain complete access to your spreadsheets even if you choose to discontinue using Apna School.
                  </p>
                </div>
              </div>

              {/* Section 4: Security & Encryption */}
              <div id="security" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-xl font-bold text-[#071d55]">
                    Security, Encryption &amp; Access Controls
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  We maintain strict administrative safeguards to protect institutional records against unauthorized access, destruction, or disclosure:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 pt-1 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <KeyRound className="w-5 h-5 text-purple-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800 block mb-0.5">Token Authentication</strong>
                      Master password protection and JWT sessions ensure only authorized school administrators can view dashboard data.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Server className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800 block mb-0.5">Encrypted Transit</strong>
                      All data exchanges between client browsers and backend APIs utilize modern SSL/TLS 256-bit encryption.
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Cookies & Analytics */}
              <div id="cookies" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                    05
                  </div>
                  <h2 className="text-xl font-bold text-[#071d55]">
                    Cookies &amp; Local Storage
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  We use strictly essential local storage tokens to keep administrators securely authenticated across sessions. We do not use third-party marketing or profiling cookies to track users across external websites.
                </p>
              </div>

              {/* Section 6: Data Retention & Deletion */}
              <div id="retention" className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-xl font-bold text-[#071d55]">
                    Data Retention &amp; Permanent Deletion
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Institutions maintain full rights to request complete deletion of their account records at any time. Upon formal cancellation request, all corresponding server database entries are permanently purged within 30 days.
                </p>
              </div>

              {/* Section 7: Contact Privacy Desk */}
              <div id="contact-privacy" className="rounded-3xl bg-[#f0f8ff] p-6 sm:p-8 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#071d55]">
                    Questions Regarding Data Protection?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Reach out directly to our Privacy &amp; Data Security Office.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-blue-600" /> support@apnaschool.in
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-blue-600" /> +91 98765 43210
                    </span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-blue-700"
                >
                  Contact Privacy Desk <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
