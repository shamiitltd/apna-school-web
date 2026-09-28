import cloud_bg from "../assets/howitworks_hero.png";
import { LaunchOffer } from "../components/LaunchOffer";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema, getSoftwareApplicationSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import { Clock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const Pricing = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ];

  const structuredData = [
    getSoftwareApplicationSchema(),
    getBreadcrumbsSchema(breadcrumbs),
  ];

  return (
    <>
      <SEOHead
        title="Pricing (Coming Soon) | Early Bird 100% Free Offer | Apna School"
        description="Explore Apna School pricing plans. We are currently offering 100% free early access with zero hidden costs for Indian schools."
        canonicalUrl="https://apnaschool.in/pricing"
        structuredData={structuredData}
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles size={14} /> Early Bird Launch Phase
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl">
              Transparent &amp; Simple Pricing
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base max-w-xl mx-auto">
              Commercial plans are <strong>coming soon</strong>. Right now, early adopter schools enjoy 100% free access to all core school management features!
            </p>
          </div>
        </section>

        {/* Launch Offer Block */}
        <section className="mx-auto max-w-7xl px-5 -mt-8 sm:px-8 lg:px-10 pb-12">
          <LaunchOffer />
        </section>

        {/* Pricing Guarantee Pillars */}
        <section className="bg-white py-16 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
                Our Pricing Philosophy
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                What to Expect When Commercial Tiers Launch
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-[#071d55] text-lg">Always Affordable</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tailored specifically for local Indian schools with micro-budget requirements. No per-student penalties.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold text-[#071d55] text-lg">Zero Hidden Costs</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clear, upfront terms. Zero setup fees, zero training surcharges, and zero mandatory annual locks.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold text-[#071d55] text-lg">Grandfathered Rates</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Early bird institutions will lock in lifetime preferential rates and complimentary feature upgrades.
                </p>
              </div>
            </div>

            {/* Direct Action */}
            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700"
              >
                Claim Free Early Access Today <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};