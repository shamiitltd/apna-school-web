import cloud_bg from "../assets/howitworks_hero.png";
import avatar from "../assets/contact_avatar.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getOrganizationSchema, getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Sparkles,
  Users,
  GraduationCap,
  ArrowRight,
  Database,
  CheckCircle2,
} from "lucide-react";

export const About = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ];

  const structuredData = [
    getOrganizationSchema(),
    getBreadcrumbsSchema(breadcrumbs),
  ];

  const values = [
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Your Data, Your Ownership",
      desc: "Unlike traditional ERPs that lock your institution in, Apna School gives you total control by storing records securely in your own cloud infrastructure.",
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: "Radical Simplicity",
      desc: "Designed for everyday teachers and administrators. Zero steep learning curves, no complicated training manuals, and immediate productivity.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      title: "Security & Reliability",
      desc: "Engineered with bank-grade encryption and cloud redundancy so your student admissions, attendance, and financial data remain safe 24/7.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-pink-600" />,
      title: "Empowering Local Schools",
      desc: "Built specifically to make world-class school management accessible and affordable for local, private, and growing schools across India.",
    },
  ];

  return (
    <>
      <SEOHead
        title="About Us | Empowering Schools with Simple Management Software"
        description="Learn about Apna School — our story, values, and mission to revolutionize school administration across India with simple, powerful, and accessible cloud tools."
        canonicalUrl="https://apnaschool.in/about"
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased">
        {/* Hero Section */}
        <section className="relative isolate min-h-112 w-full overflow-hidden bg-[#f0f8ff] px-5 pt-10 sm:px-10 lg:px-14">
          <img
            src={cloud_bg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          />

          <div className="relative z-10 mx-auto flex max-w-10xl flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 sm:pb-0">
            <div className="max-w-3xl pt-6 sm:pt-10 lg:pt-14">
              <p className="pb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-base">
                About Apna School
              </p>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-[#071d55] sm:text-5xl lg:text-6xl">
                Making School Management
                <br />
                <span className="text-blue-600">Effortless & Accessible</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                We believe that every school — regardless of size or budget — deserves modern, intuitive digital tools that save time, eliminate paper clutter, and keep parents actively engaged in their child's education.
              </p>
            </div>

            <div className="flex shrink-0 justify-center sm:block">
              <img
                src={avatar}
                alt="Apna School Team"
                className="h-44 sm:h-56 lg:h-84 xl:h-92 w-auto object-contain object-bottom sm:absolute sm:-right-10 sm:top-12 lg:right-8 lg:top-16 xl:right-32"
              />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mx-auto max-w-10xl px-5 py-16 sm:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles size={14} /> Our Story
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#071d55] sm:text-4xl">
                Built from the Ground Up for Modern Educational Leaders
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>
                  Most existing school management systems are overly complex, bloated with confusing menus, and prohibitively expensive. School owners and teachers often spend hours struggling with complicated software instead of focusing on what matters most: educating students.
                </p>
                <p>
                  <strong>Apna School</strong> was built to solve this exact problem. By combining a clean interface with the familiarity of cloud spreadsheets and instant notifications, we created a tool that anyone can learn in minutes.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-xs border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#071d55]">Zero Training Needed</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-xs border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#071d55]">100% Cloud-Based</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-xs border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#071d55]">Complete Data Security</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl">
                <GraduationCap className="w-10 h-10 opacity-80 mb-4" />
                <h3 className="text-2xl font-bold">Smart Student Records</h3>
                <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Track admissions, roll numbers, guardian contacts, and blood groups in one centralized dashboard.
                </p>
              </div>
              <div className="rounded-3xl bg-emerald-600 p-8 text-white shadow-xl sm:translate-y-6">
                <Users className="w-10 h-10 opacity-80 mb-4" />
                <h3 className="text-2xl font-bold">Parent Connection</h3>
                <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Instant daily attendance updates, fee due reminders, and exam results delivered directly to parents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-white py-16 sm:py-20 border-y border-slate-100">
          <div className="mx-auto max-w-10xl px-5 sm:px-10 lg:px-14">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Guiding Principles
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071d55] sm:text-4xl">
                The Values That Drive Us
              </h2>
              <p className="mt-3 text-sm text-slate-500 sm:text-base">
                Every feature we build is designed to respect your time, data privacy, and institutional autonomy.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#071d55]">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto max-w-10xl px-5 py-16 sm:px-10 lg:px-14">
          <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Ready to Upgrade Your School Operations?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-blue-100">
              Join forward-thinking schools that have simplified their daily workflow with Apna School.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 shadow-md"
              >
                Contact Us <ArrowRight size={16} />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-xs px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
