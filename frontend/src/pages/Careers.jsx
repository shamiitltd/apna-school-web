import cloud_bg from "../assets/howitworks_hero.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Sparkles,
  Heart,
  Users,
  Code2,
  Headphones,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Careers = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ];

  const futureRoles = [
    {
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
      title: "Full-Stack & Mobile Engineers",
      desc: "Building intuitive cloud tools and mobile apps for teachers and school administrators across India.",
    },
    {
      icon: <Headphones className="w-5 h-5 text-emerald-600" />,
      title: "Educator Success & Support",
      desc: "Helping school owners and teachers onboard smoothly, migrate records, and get prompt assistance.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "Product & UI/UX Designers",
      desc: "Designing simple, clutter-free user experiences tailored for everyday non-technical school staff.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Careers (Coming Soon) | Join the Apna School Team"
        description="Explore career opportunities at Apna School. We are building simple, powerful school management technology for Bharat. Open roles coming soon."
        canonicalUrl="https://apnaschool.in/careers"
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
              <Briefcase size={14} /> Join Our Journey
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl">
              Careers at Apna School
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base max-w-xl mx-auto">
              We&apos;re gearing up to expand our team. Open job positions are <strong>coming soon</strong> as we grow to serve thousands of schools across India!
            </p>
          </div>
        </section>

        {/* Coming Soon Notice & Future Roles */}
        <section className="mx-auto max-w-10xl px-5 py-12 sm:px-10 lg:px-14">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Sparkles size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#071d55] sm:text-3xl">
                Building Technology That Matters
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Our mission is to give every local school the power of effortless digital management. Here are the teams we will be hiring for soon:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {futureRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 text-center transition hover:shadow-md"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-2xs">
                    {role.icon}
                  </div>
                  <h3 className="font-bold text-[#071d55] text-base">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* General Inquiries / Early Talent Network */}
            <div className="mt-12 rounded-2xl bg-[#f0f8ff] p-6 sm:p-8 text-center border border-blue-50">
              <h3 className="text-lg font-bold text-[#071d55]">
                Want to Introduce Yourself Early?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                If you are passionate about education technology and want to be considered for upcoming roles, feel free to reach out.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-blue-700 shadow-xs"
                >
                  <Mail size={16} /> Contact Talent Team <ArrowRight size={14} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to Homepage
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
