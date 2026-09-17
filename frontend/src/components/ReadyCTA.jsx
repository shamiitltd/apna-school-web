export const ReadyCTA = () => {
  return (
    <section className="w-full bg-white px-5 py-4 sm:px-10 sm:py-6 lg:px-14 lg:py-6">
      <div className="mx-auto max-w-10xl">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#d6f3e2] bg-[#ebf9f1] px-6 py-6 sm:px-8 sm:py-7 lg:flex-row lg:px-10 lg:py-8">
          {/* Left Side: Paper Airplane Icon & Text */}
          <div className="flex w-full items-center gap-4 sm:gap-5 lg:w-auto">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d2f6e2] sm:h-16 sm:w-16">
              <svg
                className="h-7 w-7 text-[#009e52] sm:h-8 sm:w-8 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>

            <div className="min-w-0">
              <span className="block text-[11px] font-bold tracking-wider text-[#009e52] sm:text-xs">
                READY TO GET STARTED?
              </span>
              <h3 className="mt-0.5 text-base font-bold tracking-tight text-[#0f1d40] sm:text-lg lg:text-xl">
                Join hundreds of schools already using Apna School.
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Simple setup. No training required.
              </p>
            </div>
          </div>

          {/* Right Side: CTA Button */}
          <div className="w-full shrink-0 sm:w-auto">
            <a
              href="#get-started"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#009e52] px-7 py-3 sm:py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#008745] active:scale-95 sm:w-auto sm:text-base cursor-pointer"
            >
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
