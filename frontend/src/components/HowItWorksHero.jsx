import boyAvatar from "../assets/boy_avatar.png";
import howitworksBg from "../assets/howitworks_hero.png";

export const HowItWorksHero = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#f0f8ff] px-5 pt-8 pb-0 sm:px-10 sm:pt-10 lg:px-14 lg:pt-10">
      {/* Background Graphic Image */}
      <img
        src={howitworksBg}
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[75%_center] sm:object-right"
      />

      <div className="mx-auto flex max-w-10xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-end lg:gap-8">
        {/* Left Column: Heading & CTAs */}
        <div className="z-10 flex w-full max-w-2xl flex-col items-start text-left pb-8 sm:pb-12 lg:pb-14">
          {/* Badge */}
          <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-semibold text-sky-600 sm:text-sm">
            How It Works
          </span>

          {/* Heading */}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f1d40] sm:text-4xl lg:text-5xl leading-[1.18]">
            Get Started in Just a Few
            <br />
            Simple{" "}
            <span className="relative inline-block text-[#0f1d40]">
              Steps
              {/* Green curved underline accent */}
              <svg
                className="absolute -bottom-2.5 left-0 h-3.5 w-full text-emerald-500"
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
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            Apna School is designed to be simple. No complex setup. Just install, connect your Google Drive, and start managing your school.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            {/* Get Started Button */}
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#009e52] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#008947] active:scale-95 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Get Started →
            </a>

            {/* Watch Demo Button */}
            <a
              href="#watch-demo"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-sky-200/70 bg-[#e0f2fe] px-5 py-3 text-sm font-bold text-[#0f1d40] transition hover:bg-sky-200/80 active:scale-95 sm:px-6 sm:py-3.5 sm:text-base"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1d4ed8] text-white shadow-xs">
                <svg
                  className="h-3 w-3 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Demo
            </a>
          </div>
        </div>

        {/* Right Column: Boy Avatar Touching Bottom and Positioned on top of background */}
        <div className="z-10 flex w-full pr-12 sm:pr-24 lg:pr-36 xl:pr-42 shrink-0 items-end justify-center lg:w-auto lg:-ml-6 xl:-ml-12 lg:self-end">
          <img
            src={boyAvatar}
            alt="Student using tablet"
            className="h-[300px] sm:h-[350px] lg:h-[380px] xl:h-[410px] w-auto max-w-none object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
};
