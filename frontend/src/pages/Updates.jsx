import cloud_bg from "../assets/howitworks_hero.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import {
  Megaphone,
  Sparkles,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const Updates = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Product Updates", url: "/updates" },
  ];

  const recentReleases = [
    {
      version: "v1.2 (September 2026)",
      title: "Real-Time Dashboard & WordPress-Style CMS",
      desc: "Live database analytics tracking, media library asset picker, dynamic category distribution, and automated technical SEO.",
      status: "Released",
    },
    {
      version: "v1.1 (September 2026)",
      title: "Google Drive & Cloud Sync Engine",
      desc: "Automatic backup and synchronization of student rosters, daily attendance logs, and fee transactions directly to your Google Drive.",
      status: "Released",
    },
    {
      version: "v1.3 (Upcoming)",
      title: "Instant WhatsApp Notification Gateway",
      desc: "Automated real-time WhatsApp alerts to parents for student attendance, exam report cards, and fee receipt confirmations.",
      status: "In Development",
    },
  ];

  return (
    <>
      <SEOHead
        title="Product Updates & Changelog (Coming Soon) | Apna School"
        description="Stay informed with the latest Apna School releases, feature additions, and product changelogs. Dedicated updates hub coming soon."
        canonicalUrl="https://apnaschool.in/updates"
        structuredData={getBreadcrumbsSchema(breadcrumbs)}
      />

      <main className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased">
        {/* Hero Section */}
        <section className="relative isolate min-h-80 w-full overflow-hidden bg-[#effaff] px-5 pt-10 pb-16 sm:px-10 lg:px-14">
          <img
            src={cloud_bg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center pt-6 sm:pt-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Megaphone size={14} /> Product Changelog
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl">
              Product Updates &amp; Roadmap
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base max-w-xl mx-auto">
              Our dedicated live changelog hub is <strong>coming soon</strong>. Here is a sneak peek at what we've shipped and what's next!
            </p>
          </div>
        </section>

        {/* Timeline & Highlights */}
        <section className="mx-auto max-w-10xl px-5 py-12 sm:px-10 lg:px-14">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-md space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Rocket size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#071d55] sm:text-3xl">
                Continuous Innovation for Indian Schools
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We release weekly speed enhancements and new capabilities.
              </p>
            </div>

            <div className="space-y-6">
              {recentReleases.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 transition hover:shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {item.version}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.status === "Released"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#071d55]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Read Product Blogs CTA */}
            <div className="mt-8 rounded-2xl bg-[#f0f8ff] p-6 sm:p-8 text-center border border-blue-50">
              <h3 className="text-lg font-bold text-[#071d55]">
                Want In-Depth Feature Guides?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Read our detailed articles explaining how to leverage new tools to save time in your daily school management.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link
                  to="/blog?category=Product%20Updates"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-blue-700 shadow-xs"
                >
                  <BookOpen size={16} /> Read Product Update Blogs <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Suggest a Feature
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
