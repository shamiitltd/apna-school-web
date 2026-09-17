export const Three_Steps = () => {
  const steps = [
    {
      step: 1,
      numberBg: "bg-blue-100 text-blue-600",
      icon: (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      ),
      title: "Connect Google Drive",
      description: "Sign in with your school's Google account.",
    },
    {
      step: 2,
      numberBg: "bg-emerald-100 text-emerald-600",
      icon: (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#0F9D58"
            d="M37 45H11c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4h18l12 12v26c0 2.2-1.8 4-4 4z"
          />
          <path fill="#87CEAC" d="M29 3v12h12" />
          <path fill="#F1F1F1" d="M14 20h20v2.5H14zm0 6h20v2.5H14zm0 6h20v2.5H14z" />
          <path fill="#F1F1F1" d="M23 17v18h2.5V17z" />
        </svg>
      ),
      title: "Set Up Your School",
      description: "We create the required sheets and folders for you.",
    },
    {
      step: 3,
      numberBg: "bg-purple-100 text-purple-600",
      icon: (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#8B5CF6"
            d="M34.5 4.5c-6.8 0-14.8 5.7-19.1 12.1-1.3 1.9-2.1 4.1-2.4 6.4L7 29l8 4 4 8 6-6c2.3-.3 4.5-1.1 6.4-2.4 6.4-4.3 12.1-12.3 12.1-19.1 0-3.9-5-9-9-9z"
          />
          <circle cx="31.5" cy="16.5" r="4.5" fill="#DDD6FE" />
          <path
            fill="#F97316"
            d="M11 37l-4 4c-1.1 1.1-.9 2.9.4 3.7 1.1.7 2.6.4 3.3-.7l3.3-4.5-3-2.5z"
          />
          <path
            fill="#FBBF24"
            d="M13 35l-2 2c-.6.6-.5 1.5.2 1.9.6.4 1.3.2 1.7-.4l1.7-2.3-1.6-1.2z"
          />
        </svg>
      ),
      title: "Start Managing",
      description: "Add your data and begin using the app on your phone.",
    },
  ];

  return (
    <section className="w-full bg-[#f0f7ff] px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Create your school workspace and start managing records in minutes.
          </p>
        </div>

        {/* Steps and Badge Container */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4 lg:mt-8 lg:flex-row lg:items-center">
          {steps.map((item, index) => (
            <div key={item.step} className="flex w-full items-center gap-3 lg:w-auto lg:flex-1">
              {/* Card */}
              <div className="flex w-full items-center gap-3.5 rounded-2xl border border-blue-100/70 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
                {/* Step Number Circle */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-black ${item.numberBg}`}
                >
                  {item.step}
                </div>

                {/* Brand / Step Icon */}
                <div className="shrink-0">{item.icon}</div>

                {/* Text Content */}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Arrow separator (except after last step) */}
              {index < steps.length - 1 && (
                <div className="hidden shrink-0 text-slate-400 lg:block" aria-hidden="true">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* "Ready in Minutes!" Badge */}
          <div className="mt-2 flex shrink-0 -rotate-6 select-none flex-col items-center justify-center pl-2 lg:mt-0 lg:pl-3">
            <span className="text-base font-extrabold tracking-tight text-sky-600 sm:text-lg">
              Ready
            </span>
            <span className="text-base font-extrabold tracking-tight text-sky-600 sm:text-lg">
              in Minutes!
            </span>
            {/* Green hand-drawn swoosh underline */}
            <svg
              className="mt-0.5 h-3 w-20 text-emerald-500"
              viewBox="0 0 100 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 14C32 5 68 3 96 11"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};