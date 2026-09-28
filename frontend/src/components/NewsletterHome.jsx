import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export const NewsletterHome = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address to subscribe.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g. principal@school.com).");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/subscriber`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (data.success) {
        setEmail("");
        setSuccess("🎉 Thank you for subscribing! You'll receive our newest updates.");
      } else {
        setError(data.message || "Unable to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Server connection issue. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= 1. NEWSLETTER BANNER ================= */}
      <div className="mx-auto max-w-10xl px-5 sm:px-10 lg:px-14 mb-12">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#d6f3e2] bg-[#ebf9f1] px-6 py-6 sm:px-8 sm:py-7 lg:flex-row lg:px-10 lg:py-8">
          {/* Left Side: Icon & Heading */}
          <div className="flex w-full items-center gap-4 sm:gap-5 lg:w-auto">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d2f6e2] sm:h-16 sm:w-16">
              <svg
                className="h-7 w-7 text-[#009e52] sm:h-8 sm:w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 3.2L12 12.5 4 7.2V6l8 5 8-5v1.2zm0 10.8H4V9.3l8 5 8-5V18z" />
              </svg>
            </div>

            <div className="min-w-0">
              <span className="block text-[11px] font-bold tracking-wider text-[#009e52] sm:text-xs">
                STAY UPDATED
              </span>
              <h3 className="mt-0.5 text-base font-bold tracking-tight text-[#0f1d40] sm:text-lg lg:text-xl">
                Get product updates, new features and school success stories
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Join our newsletter and be the first to know.
              </p>
            </div>
          </div>

          {/* Right Side: Subscription Form with Styled Custom Validation Error */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-start lg:w-auto"
          >
            <div className="flex flex-col w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                  if (success) setSuccess("");
                }}
                placeholder="Enter your email address"
                className={`w-full rounded-2xl border bg-white px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 shadow-xs transition-colors focus:outline-none sm:w-64 md:w-72 lg:w-80 ${
                  error
                    ? "border-red-400 text-red-950 focus:border-red-500 focus:ring-2 focus:ring-red-200/50"
                    : "border-slate-200 focus:border-[#009e52] focus:ring-1 focus:ring-[#009e52]"
                }`}
              />

              {/* Styled Inline Error Message */}
              {error && (
                <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[11px] font-semibold text-red-600 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Styled Inline Success Confirmation */}
              {success && (
                <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[11px] font-bold text-emerald-700 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>{success}</span>
                </div>
              )}

              {!error && !success && (
                <span className="mt-1.5 pl-1 text-[11px] text-slate-500 font-medium">
                  No spam. Only important updates.
                </span>
              )}
            </div>

            <div className="relative shrink-0">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#009e52] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#008745] active:scale-95 disabled:opacity-70 sm:w-auto sm:text-base cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white shrink-0" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4 fill-current text-white shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    <span>Subscribe</span>
                  </>
                )}
              </button>

              <div
                className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-0.5 sm:block"
                aria-hidden="true"
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <line
                    x1="2"
                    y1="12"
                    x2="18"
                    y2="4"
                    stroke="#009e52"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="2"
                    y1="20"
                    x2="18"
                    y2="28"
                    stroke="#009e52"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
