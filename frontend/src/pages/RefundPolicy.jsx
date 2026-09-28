import cloud_bg from "../assets/howitworks_hero.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import { Clock, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const RefundPolicy = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Refund Policy", url: "/refund" },
  ];

  return (
    <>
      <SEOHead
        title="Refund Policy (Coming Soon) | Apna School"
        description="Learn about Apna School's refund policy. We are currently offering 100% free early access with transparent terms."
        canonicalUrl="https://apnaschool.in/refund"
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Clock size={14} /> Policy Update
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Current Status: Early Access Launch Phase (100% Free)
            </p>
          </div>
        </section>

        {/* Coming Soon Notice Card */}
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-10 lg:px-14">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 sm:p-12 shadow-md text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Sparkles size={32} />
            </div>

            <h2 className="text-2xl font-extrabold text-[#071d55] sm:text-3xl">
              Commercial Terms Coming Soon
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base max-w-xl mx-auto">
              Apna School is currently in our <strong>Early Bird Launch Phase</strong> and is provided completely free of charge to registered educational institutions. Because there are currently zero mandatory fees charged, no payments or refunds are being processed.
            </p>

            <div className="rounded-2xl bg-[#f0f8ff] p-6 text-left border border-blue-50">
              <h3 className="text-sm font-bold text-[#071d55] mb-3 flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" />
                Our Commitment for Paid Tiers
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent 14-day risk-free evaluation guarantee on future premium plans.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No hidden maintenance fees or automatic surprise renewals.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant prorated cancellation support upon request.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 shadow-sm"
              >
                Questions? Contact Us <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
