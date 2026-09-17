export const WhyApnaSchool = () => {
  const cards = [
    {
      title: "Save Time",
      subtitle: "Automate daily tasks",
      iconBg: "bg-emerald-100 text-emerald-600",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      ),
    },
    {
      title: "Stay Organized",
      subtitle: "Everything in one place",
      iconBg: "bg-amber-100 text-amber-600",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="M6 13l8.5 8" />
          <path d="M6 13h3a4 4 0 0 0 0-8" />
        </svg>
      ),
    },
    {
      title: "Improve Communication",
      subtitle: "Keep parents informed",
      iconBg: "bg-purple-100 text-purple-600",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
    {
      title: "Make Better Decisions",
      subtitle: "With simple reports",
      iconBg: "bg-blue-100 text-blue-600",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white px-5 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-8">
      <div className="mx-auto max-w-10xl">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0f1d40] sm:text-3xl lg:text-4xl">
          Why Schools Love Apna School
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              {/* Icon Box */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg} shadow-xs`}
              >
                {card.icon}
              </div>

              {/* Text Content */}
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#0f1d40] sm:text-base">
                  {card.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 font-normal">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
