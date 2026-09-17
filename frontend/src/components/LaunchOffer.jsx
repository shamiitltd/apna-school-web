export const LaunchOffer = () => {
  const checklist = [
    "Lifetime Access",
    "No Monthly Fees",
    "All Core Features",
    "Your Data, Your Drive",
    "Built for Small Schools",
  ];

  return (
    <section className="w-full bg-[#fffef0] px-4 py-8 sm:px-6 sm:py-10 lg:py-12 overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-center lg:justify-around">
        
        {/* ================= LEFT: Limited Time Offer Tag ================= */}
        <div className="relative flex shrink-0 items-center justify-center">
          {/* Card Container with exact tilt */}
          <div className="relative -rotate-6 transition-transform hover:rotate-0">
            {/* Sparkles: Top-Right (anchored directly to card top-right corner) */}
            <div
              className="pointer-events-none absolute -top-5 -right-6 h-8 w-8"
              aria-hidden="true"
            >
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                {/* Upper ray pointing up-right */}
                <line
                  x1="8"
                  y1="22"
                  x2="24"
                  y2="8"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Lower ray pointing right */}
                <line
                  x1="10"
                  y1="28"
                  x2="28"
                  y2="20"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Sparkles: Bottom-Left (anchored directly to card bottom-left corner) */}
            <div
              className="pointer-events-none absolute -bottom-4 -left-8 h-8 w-8"
              aria-hidden="true"
            >
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                {/* Upper ray pointing left */}
                <line
                  x1="26"
                  y1="12"
                  x2="8"
                  y2="10"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Lower ray pointing down-left */}
                <line
                  x1="24"
                  y1="18"
                  x2="8"
                  y2="28"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Yellow Card */}
            <div className="w-36 sm:w-44 rounded-2xl bg-[#ffd154] px-4 py-5 text-center shadow-md sm:py-6">
              <span className="block text-lg font-bold tracking-tight text-[#b91c1c] sm:text-2xl">
                Limited
              </span>
              <span className="block text-lg font-bold tracking-tight text-[#b91c1c] sm:text-2xl">
                Time Offer!
              </span>
            </div>
          </div>
        </div>

        {/* ================= CENTER: Headline, Price, CTA & Arrow ================= */}
        <div className="flex max-w-xl flex-1 flex-col items-center text-center">
          {/* Title */}
          <h2 className="text-xl font-bold tracking-tight text-[#0f1d40] sm:text-2xl lg:text-3xl">
            Launch Offer for First 100 Schools
          </h2>

          {/* Price with Red Strike */}
          <div className="mt-2.5 flex items-center justify-center gap-3">
            <span className="text-3xl font-black tracking-tight text-[#009e52] sm:text-4xl lg:text-[2.6rem]">
              Only ₹499
            </span>
            <span className="relative text-2xl font-bold text-slate-500 sm:text-3xl lg:text-4xl">
              ₹1,999
              {/* Red strike line that extends slightly past text */}
              <span
                className="absolute left-[-5px] right-[-5px] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#ef4444]"
                aria-hidden="true"
              ></span>
            </span>
          </div>

          {/* Subtitle */}
          <p className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
            One-time payment. Lifetime access. No hidden charges.
          </p>

          {/* CTA Button & Blue Arrow */}
          <div className="relative mt-4 flex flex-col items-center">
            <div className="relative inline-flex items-center">
              <a
                href="#get-on-playstore"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#009e52] px-6 py-2.5 text-base font-bold text-white shadow-md transition hover:bg-[#008947] hover:shadow-lg active:scale-95 sm:px-8 sm:py-3 sm:text-lg"
              >
                {/* Google Play Triangle Logo */}
                <svg
                  className="h-5 w-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.436V3.25c0-.55.228-1.049.609-1.436zm11.24 11.24l2.127 2.128-11.89 6.848 9.763-8.976zm0-2.108L5.087 1.972l11.889 6.848-2.127 2.126zm1.488 1.488l3.966 2.285a1.25 1.25 0 0 0 0-2.17l-3.966-2.285-1.054 1.085 1.054 1.085z" />
                </svg>
                Get on Google Play
              </a>

              {/* Blue Curved Arrow pointing to the button from bottom right */}
              <div
                className="pointer-events-none absolute -right-10 -bottom-4 hidden sm:block md:-right-12"
                aria-hidden="true"
              >
                <svg
                  className="h-9 w-9 text-[#2563eb]"
                  viewBox="0 0 45 45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Smooth curve upward to left towards button */}
                  <path d="M 36 38 C 36 22, 26 12, 10 8" />
                  {/* Arrowhead */}
                  <path d="M 12 18 L 10 8 L 20 6" />
                </svg>
              </div>
            </div>

            {/* Micro Tagline */}
            <span className="mt-2 text-xs font-medium text-slate-500">
              Start your digital journey today!
            </span>
          </div>
        </div>

        {/* ================= RIGHT: Checklist Card ================= */}
        <div className="relative shrink-0">
          {/* Card Container with exact tilt */}
          <div className="relative rotate-3 transition-transform hover:rotate-0">
            {/* Sparkles: Top-Right (anchored directly to card top-right corner) */}
            <div
              className="pointer-events-none absolute -top-6 -right-8 h-8 w-8"
              aria-hidden="true"
            >
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                {/* Upper ray pointing up-right */}
                <line
                  x1="8"
                  y1="22"
                  x2="24"
                  y2="8"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Lower ray pointing right */}
                <line
                  x1="10"
                  y1="28"
                  x2="28"
                  y2="20"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Sparkles: Left (anchored directly to card left edge) */}
            <div
              className="pointer-events-none absolute top-1/2 -left-8 -translate-y-1/2 h-8 w-8"
              aria-hidden="true"
            >
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                {/* Upper ray pointing left-up */}
                <line
                  x1="26"
                  y1="12"
                  x2="8"
                  y2="10"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Lower ray pointing left-down */}
                <line
                  x1="26"
                  y1="18"
                  x2="8"
                  y2="26"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* White Card */}
            <div className="w-60 sm:w-68 rounded-2xl border border-amber-100/70 bg-white p-4 sm:p-5 shadow-lg">
              <ul className="space-y-2 text-xs font-bold text-[#0f1d40] sm:text-sm">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-[#009e52] sm:h-5 sm:w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};