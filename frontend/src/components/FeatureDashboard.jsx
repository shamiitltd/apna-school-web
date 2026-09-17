import dashboardImg from "../assets/feature_dashboard.png";

export const FeatureDashboard = () => {
  const points = [
    "Quick access to all features",
    "Clean and simple interface",
    "Works on all devices",
    "Your data, your Google Drive",
  ];

  return (
    <section className="w-full bg-[#f6faff] px-5 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10 overflow-hidden">
      <div className="mx-auto flex max-w-10xl flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
        {/* Left Column: Heading, Description, Checklist & CTA */}
        <div className="flex w-full max-w-xl flex-col items-start text-left lg:shrink-0">
          {/* Main Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0f1d40] sm:text-4xl lg:text-5xl leading-[1.15]">
            Everything in One
            <br />
            Simple{" "}
            <span className="relative inline-block text-[#0f1d40]">
              Dashboard
              {/* Green curved underline accent */}
              <svg
                className="absolute -bottom-2 left-0 h-3.5 w-full text-emerald-500"
                viewBox="0 0 120 20"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14C38 4 82 4 116 12"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            A clean and easy-to-use interface designed for real schools. No complex setup. Just open and start managing.
          </p>

          {/* Checklist */}
          <ul className="mt-5 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#009e52] text-white font-black text-xs shadow-xs">
                  ✓
                </span>
                <span className="text-sm font-semibold text-[#0f1d40] sm:text-base">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-7">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#009e52] px-7 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#008947] active:scale-95 sm:text-lg"
            >
              Get Started →
            </a>
          </div>
        </div>

        {/* Right Column: Dashboard Image Preview */}
        <div className="flex w-full items-center justify-center lg:justify-end">
          <div className="w-full max-w-2xl lg:max-w-3xl overflow-hidden rounded-3xl shadow-xl border border-slate-100/80 bg-white transition hover:shadow-2xl">
            <img
              src={dashboardImg}
              alt="Apna School Simple Dashboard"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
