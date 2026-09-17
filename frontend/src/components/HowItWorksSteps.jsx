export const HowItWorksSteps = () => {
  const steps = [
    {
      step: 1,
      badgeColor: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      ),
      title: "Install the App",
      description: "Download and install Apna School on your device.",
    },
    {
      step: 2,
      badgeColor: "bg-sky-100 text-sky-700",
      iconBg: "bg-sky-50 text-sky-600",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
        </svg>
      ),
      title: "Login or Sign Up",
      description: "Create your account or login if you already have one.",
    },
    {
      step: 3,
      badgeColor: "bg-amber-100 text-amber-700",
      iconBg: "bg-amber-50 text-amber-500",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l-10 6v2h2v11h6v-6h4v6h6V10h2V8L12 2zm0 2.5L18.5 8H5.5L12 4.5zM10 10h4v2h-4v-2z" />
        </svg>
      ),
      title: "Create Your School",
      description: "Add your school details to set up your workspace.",
    },
    {
      step: 4,
      badgeColor: "bg-purple-100 text-purple-700",
      iconBg: "bg-purple-50",
      icon: (
        <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#FFBA00" d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5z" />
          <path fill="#0066DA" d="M16.29 3.5H7.71l6.56 11.5h8.58z" />
          <path fill="#00AC47" d="M1.15 15l3.43 6h17.14l-3.43-6z" />
        </svg>
      ),
      title: "Connect Google Drive",
      description: "Link your Google Drive to securely store your data.",
    },
    {
      step: 5,
      badgeColor: "bg-pink-100 text-pink-700",
      iconBg: "bg-pink-50 text-pink-500",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      title: "You're Ready!",
      description: "Start managing students, fees, attendance and more.",
    },
  ];

  return (
    <section className="w-full bg-white px-5 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10">
      <div className="mx-auto max-w-10xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0f1d40] sm:text-3xl lg:text-4xl">
            Get Started with Apna School
          </h2>
          <div className="mt-2 inline-flex flex-col items-center">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Follow these simple steps and your school will be ready in minutes.
            </p>
            {/* Green curved accent */}
            <svg
              className="mt-1 h-2.5 w-24 text-emerald-500"
              viewBox="0 0 100 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 11C30 4 70 4 96 9"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Steps Row with Arrow Separators */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="flex flex-1 items-center gap-2 lg:gap-3"
            >
              {/* Step Card */}
              <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-slate-100 bg-white shadow-xs transition hover:border-blue-100 hover:shadow-md sm:p-6">
                <div>
                  {/* Top: Step Badge & Large Icon */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${item.badgeColor}`}
                    >
                      {item.step}
                    </div>

                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-base font-bold text-[#0f1d40] sm:text-lg">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500 font-normal sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Arrow Connector (between cards on large screens) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden shrink-0 text-sky-400 lg:flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
