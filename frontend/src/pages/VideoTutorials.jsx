import cloud_bg from "../assets/howitworks_hero.png";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";
import { Link } from "react-router-dom";
import {
  Video,
  PlayCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
} from "lucide-react";

export const VideoTutorials = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Video Tutorials", url: "/video-tutorials" },
  ];

  const upcomingSeries = [
    {
      title: "1-Minute Quick Start Guide",
      duration: "60 sec",
      desc: "How to set up your school profile and import your student list in under 60 seconds.",
      tag: "Getting Started",
    },
    {
      title: "Daily Attendance in 3 Clicks",
      duration: "2 min",
      desc: "Step-by-step walkthrough of marking daily attendance and triggering instant parent SMS notifications.",
      tag: "Attendance",
    },
    {
      title: "Fee Collection & Receipt Printing",
      duration: "3 min",
      desc: "Creating customized fee categories, logging cash/UPI payments, and downloading receipts.",
      tag: "Fees",
    },
    {
      title: "Exam Report Card Generation",
      duration: "4 min",
      desc: "Entering subject marks, applying grading formulas, and generating printable student report cards.",
      tag: "Academics",
    },
  ];

  return (
    <>
      <SEOHead
        title="Video Tutorials (Coming Soon) | Step-by-Step Guides | Apna School"
        description="Learn how to use Apna School with concise, step-by-step video masterclasses. Video tutorials are coming soon."
        canonicalUrl="https://apnaschool.in/video-tutorials"
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-700">
              <Video size={14} /> Masterclasses &amp; Demos
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-[#071d55] sm:text-4xl lg:text-5xl">
              Video Tutorials
            </h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base max-w-xl mx-auto">
              Bite-sized, step-by-step video guides are <strong>coming soon</strong> to help your staff master Apna School in minutes!
            </p>
          </div>
        </section>

        {/* Coming Soon Notice & Upcoming Video Modules */}
        <section className="mx-auto max-w-10xl px-5 py-12 sm:px-10 lg:px-14">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <PlayCircle size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#071d55] sm:text-3xl">
                Upcoming Video Series
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We are producing high-definition video walkthroughs in Hindi and English. Here is what's on the way:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {upcomingSeries.map((video, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 transition hover:shadow-md hover:border-rose-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        {video.tag}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {video.duration}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#071d55] text-base mb-1">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {video.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                    <span className="flex items-center gap-1">
                      <Sparkles size={13} /> Recording in Progress
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Help Now Callout */}
            <div className="mt-12 rounded-2xl bg-[#f0f8ff] p-6 sm:p-8 text-center border border-blue-50">
              <h3 className="text-lg font-bold text-[#071d55]">
                Need Step-by-Step Assistance Right Now?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Our support team is happy to provide a 1-on-1 live walkthrough or answer any specific questions.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link
                  to="/help-center"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-blue-700 shadow-xs"
                >
                  <BookOpen size={16} /> Explore Help Center
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Contact Support Team <ArrowRight size={14} />
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
