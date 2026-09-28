import cloud_bg from "../assets/howitworks_hero.png";
import boyAvatar from "../assets/boy_avatar.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema, getOrganizationSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import {
  Target,
  Compass,
  Lightbulb,
  Award,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const Mission = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Our Mission", url: "/mission" },
  ];

  const structuredData = [
    getOrganizationSchema(),
    getBreadcrumbsSchema(breadcrumbs),
  ];

  const pillars = [
    {
      number: "01",
      title: "Democratize EdTech Access",
      desc: "High-grade management software should not be a luxury reserved for elite private institutions. We are making powerful administrative tools affordable for every school in India.",
      color: "bg-blue-500",
    },
    {
      number: "02",
      title: "Eliminate Operational Waste",
      desc: "Teachers belong in classrooms inspiring students — not spending hours recording attendance in physical registers, compiling paper report cards, or chasing manual fee dues.",
      color: "bg-emerald-500",
    },
    {
      number: "03",
      title: "Foster Transparent Communities",
      desc: "By bridging the real-time communication gap between schools and parents, we help create a supportive ecosystem where student performance and well-being thrive.",
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <SEOHead
        title="Our Mission & Vision | Apna School Management System"
        description="Discover Apna School's mission to empower educators, simplify school administration, and eliminate administrative burdens with accessible digital tools."
        canonicalUrl="https://apnaschool.in/mission"
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased">
        {/* Hero Section */}
        <section className="relative isolate min-h-112 w-full overflow-hidden bg-[#effaff] px-5 pt-10 sm:px-10 lg:px-14">
          <img
            src={cloud_bg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          />

          <div className="relative z-10 mx-auto flex max-w-10xl flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 sm:pb-0">
            <div className="max-w-3xl pt-6 sm:pt-10 lg:pt-14">
              <p className="pb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-base">
                Our Purpose
              </p>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-[#071d55] sm:text-5xl lg:text-6xl">
                Transforming School Administration
                <br />
                <span className="text-blue-600">One Classroom at a Time</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Our mission is to eliminate paper-heavy inefficiencies and empower school leaders with intuitive, cloud-first technology that puts educators and students first.
              </p>
            </div>

            <div className="flex shrink-0 justify-center sm:block">
              <img
                src={boyAvatar}
                alt="Our Mission"
                className="h-48 sm:h-64 lg:h-80 xl:h-88 w-auto object-contain object-bottom sm:absolute sm:-right-6 sm:top-10 lg:right-10 lg:top-14 xl:right-36"
              />
            </div>
          </div>
        </section>

        {/* Mission Statement Box */}
        <section className="mx-auto max-w-10xl px-5 py-14 sm:px-10 lg:px-14">
          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 sm:p-12 shadow-md">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">
              <Target className="w-5 h-5" /> Mission Statement
            </div>
            <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed text-[#071d55]">
              &ldquo;To provide the most intuitive, trustworthy, and affordable school management system that saves schools 10+ hours every week and brings complete transparency to parents and teachers.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* 3 Core Pillars */}
        <section className="mx-auto max-w-10xl px-5 pb-20 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              The Framework
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#071d55] sm:text-4xl">
              Our 3 Strategic Pillars
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              How we turn our vision into tangible impact for school communities every day.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-4xl font-black text-slate-200">
                  {p.number}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#071d55]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision for the Future */}
        <section className="bg-white py-16 border-t border-slate-100">
          <div className="mx-auto max-w-10xl px-5 sm:px-10 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <Compass size={14} /> Our Long-Term Vision
                </div>
                <h2 className="mt-4 text-3xl font-extrabold text-[#071d55] sm:text-4xl leading-tight">
                  A World Where Every School Runs on Pure Efficiency
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  We envision an education ecosystem where administrative paperwork is replaced by instant automated records, fee collection is transparent and frictionless, and every parent is actively engaged in their child's daily growth.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">100% paperless administration workflows</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">Automated parent communications and fee receipts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">Secure data sovereignty with zero vendor lock-in</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#f0f8ff] p-8 sm:p-10 border border-blue-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#071d55] flex items-center gap-2">
                    <Lightbulb className="text-amber-500" /> Have ideas or questions?
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We build directly with feedback from real school principals, administrators, and educators. Reach out and tell us what features would make your school run smoother.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 shadow-sm"
                >
                  Talk With Our Team <ArrowRight size={16} />
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
