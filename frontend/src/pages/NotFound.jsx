import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import { Footer } from "../components/Footer";
import { Home, BookOpen, Layers, Phone, HelpCircle } from "lucide-react";

export const NotFound = () => {
  return (
    <>
      <SEOHead
        title="404 Page Not Found"
        description="The page you are looking for does not exist on Apna School."
        noIndex={true}
      />
      <main className="min-h-[75vh] bg-[#f8fbff] flex flex-col justify-center items-center px-4 py-16 text-center antialiased">
        <div className="max-w-xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-4">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071d55] tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let's get you back on track!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <Link
              to="/"
              className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition group"
            >
              <Home className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition" />
              <span className="text-xs font-semibold text-[#071d55]">Home</span>
            </Link>
            <Link
              to="/features"
              className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition group"
            >
              <Layers className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition" />
              <span className="text-xs font-semibold text-[#071d55]">Features</span>
            </Link>
            <Link
              to="/blog"
              className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition group"
            >
              <BookOpen className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition" />
              <span className="text-xs font-semibold text-[#071d55]">Blog</span>
            </Link>
            <Link
              to="/contact"
              className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition group"
            >
              <Phone className="w-5 h-5 text-pink-600 mb-2 group-hover:scale-110 transition" />
              <span className="text-xs font-semibold text-[#071d55]">Contact</span>
            </Link>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};
