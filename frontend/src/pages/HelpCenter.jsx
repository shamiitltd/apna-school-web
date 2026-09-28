import cloud_bg from "../assets/howitworks_hero.png";
import booksFaq from "../assets/books_faq.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  BookOpen,
  Users,
  CheckCircle,
  CreditCard,
  GraduationCap,
  Settings,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

export const HelpCenter = () => {
  const [search, setSearch] = useState("");

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Help Center", url: "/help-center" },
  ];

  const categories = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Student Management",
      desc: "How to add new students, manage roll numbers, assign sections, and bulk-import student profiles.",
      link: "/contact",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      title: "Attendance & SMS Alerts",
      desc: "Marking daily attendance, generating monthly attendance summaries, and automated parent alerts.",
      link: "/contact",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      title: "Fee Management & Receipts",
      desc: "Creating fee structures, tracking pending dues, recording payments, and printing digital receipts.",
      link: "/contact",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-pink-600" />,
      title: "Exams & Report Cards",
      desc: "Configuring examination terms, entering student marks, grading scales, and PDF report cards.",
      link: "/contact",
    },
    {
      icon: <Settings className="w-6 h-6 text-amber-600" />,
      title: "Account & Institution Setup",
      desc: "Setting up school profile, configuring academic sessions, adding staff members, and cloud data sync.",
      link: "/contact",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-sky-600" />,
      title: "Google Drive & Sheets Sync",
      desc: "Understanding how your school records are saved safely in your own Google Drive storage.",
      link: "/contact",
    },
  ];

  const filteredCategories = categories.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Help Center & User Guides | Apna School Support"
        description="Find user guides, setup instructions, and dedicated customer assistance for Apna School software. Contact our support team for prompt help."
        canonicalUrl="https://apnaschool.in/help-center"
        structuredData={getBreadcrumbsSchema(breadcrumbs)}
      />

      <main className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased">
        {/* Hero Section */}
        <section className="relative isolate min-h-96 w-full overflow-hidden bg-[#effaff] px-5 pt-10 pb-16 sm:px-10 lg:px-14">
          <img
            src={cloud_bg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center pt-6 sm:pt-10">
            <p className="pb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
              Support & Documentation
            </p>
            <h1 className="text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl">
              How Can We Help You Today?
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base max-w-xl mx-auto">
              Find answers to common questions, explore setup guides, or connect directly with our support team.
            </p>

            {/* Search Box */}
            <div className="relative mx-auto mt-8 max-w-2xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics (e.g., student admission, fee receipts, attendance)..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-800 shadow-md outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>
        </section>

        {/* Guides & Topics Grid */}
        <section className="mx-auto max-w-10xl px-5 py-14 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#071d55]">
                Browse by Topic
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select a category to get guided assistance.
              </p>
            </div>
            <Link
              to="/contact"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              Contact Support <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((c, i) => (
              <Link
                key={i}
                to={c.link}
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50/80 group-hover:bg-blue-100 transition">
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#071d55] group-hover:text-blue-600 transition">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Get help with this</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Support Dedicated Action Banner */}
        <section className="mx-auto max-w-10xl px-5 pb-16 sm:px-10 lg:px-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071d55] to-blue-900 p-8 sm:p-12 text-white shadow-xl">
            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <MessageCircle size={14} /> Direct Human Assistance
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                  Can&apos;t find what you need?
                </h2>
                <p className="mt-2 text-sm text-blue-100 sm:text-base max-w-xl">
                  Our dedicated support engineers are ready to walk you through account setup, data migration, or any questions.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-blue-200">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-emerald-400" /> support@apnaschool.in
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-emerald-400" /> +91 98765 43210
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-emerald-400" /> Mon - Fri, 9 AM - 6 PM IST
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-600 hover:scale-105"
                >
                  Contact Support Team <ArrowRight size={16} />
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
