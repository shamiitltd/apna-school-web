import driveGraphic from "../assets/howitworks.png";

export const HowItWorksDrive = () => {
  const points = [
    "Your data stays in your Google Drive",
    "Access it anytime, from any device",
    "No separate server or complicated setup",
    "Simple, secure and reliable",
  ];

  return (
    <section className="w-full bg-[#f6faff] px-5 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10 overflow-hidden">
      <div className="mx-auto flex max-w-10xl flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
        {/* Left Side: Cloud & Google Drive Laptop Graphic */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <img
            src={driveGraphic}
            alt="Your Data, Your Google Drive"
            className="h-auto w-full max-w-md lg:max-w-xl object-contain"
          />
        </div>

        {/* Right Side: Headline, Description & Checklist */}
        <div className="flex w-full max-w-xl min-h-64 flex-col items-start text-left lg:w-1/2">
          {/* Headline with Green Curved Underline */}
          <div className="relative inline-block">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0f1d40] sm:text-3xl lg:text-4xl">
              Your Data, Your Google Drive
            </h2>
            {/* Green curved accent */}
            <svg
              className="mt-1 h-3 w-40 text-emerald-500"
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
          </div>

          {/* Description */}
          <p className="mt-3.5 max-w-lg text-xs leading-relaxed text-slate-600 sm:text-sm">
            All your school data is stored in your own Google Drive. This keeps your information safe, private and under your control.
          </p>

          {/* Checklist */}
          <ul className="mt-5 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#009e52] text-white font-black text-xs shadow-xs">
                  ✓
                </div>
                <br />
                <div className="text-xs font-semibold text-[#0f1d40] sm:text-sm">
                  {point}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
