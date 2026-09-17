import { useState } from "react";

export const FeaturesGrid = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: "students",
      title: "Student Records",
      description:
        "Keep all student information organized and easily accessible in one place.",
      iconBg: "bg-blue-100 text-blue-600",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      details: {
        tagline: "Comprehensive student profiles stored directly in Google Sheets",
        points: [
          "Complete bio data, admission details, blood group, and emergency contacts.",
          "Class, section, and roll number assignment with quick bulk promotions.",
          "Document upload & photo storage in your school's private Google Drive.",
          "Instant search by name, admission number, or contact details.",
        ],
      },
    },
    {
      id: "parents",
      title: "Parent Information",
      description:
        "Maintain parent details and stay connected with families effortlessly.",
      iconBg: "bg-emerald-100 text-emerald-600",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      details: {
        tagline: "Maintain active communication with parents and guardians",
        points: [
          "Father, mother, and guardian contact profiles and addresses.",
          "One-click WhatsApp messaging and direct phone dial from the app.",
          "Emergency notification logs and parent-teacher meeting notes.",
          "Automatic mapping between siblings in different classes.",
        ],
      },
    },
    {
      id: "fees",
      title: "Fees Management",
      description:
        "Track fee collection, dues and payment history with complete transparency.",
      iconBg: "bg-amber-100 text-amber-600",
      icon: (
        <svg
          className="h-7.5 w-7.5 sm:h-8 sm:w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="M6 13l8.5 8" />
          <path d="M6 13h3a4 4 0 0 0 0-8" />
        </svg>
      ),
      details: {
        tagline: "Zero fee confusion, instant receipts, and automated ledger",
        points: [
          "Custom fee structures by class, term, transport, or special concession.",
          "Instant digital receipts sent directly via WhatsApp or printed.",
          "Real-time pending dues tracking with smart reminder generation.",
          "Daily collection summary reports reconciled with your Google Sheets.",
        ],
      },
    },
    {
      id: "attendance",
      title: "Attendance",
      description:
        "Mark and monitor attendance in seconds. View daily, monthly and custom reports.",
      iconBg: "bg-purple-100 text-purple-600",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
        </svg>
      ),
      details: {
        tagline: "Speedy roll-call with automated attendance calculation",
        points: [
          "Class-wise quick attendance marking in less than 30 seconds.",
          "Instant absent SMS/WhatsApp alert dispatch to parents.",
          "Monthly percentage calculation and low-attendance warnings.",
          "Staff and teacher attendance logging.",
        ],
      },
    },
    {
      id: "exams",
      title: "Exams & Results",
      description:
        "Manage exam schedules, marks and generate report cards with ease.",
      iconBg: "bg-rose-100 text-rose-500",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
      details: {
        tagline: "Effortless marks entry and customizable report cards",
        points: [
          "Unit test, term exam, and final assessment grade sheet templates.",
          "Automatic grade, percentage, and class ranking calculations.",
          "One-click printable PDF report cards with school logo.",
          "Historical performance tracking across terms.",
        ],
      },
    },
    {
      id: "expenses",
      title: "Expenses",
      description:
        "Track school expenses and maintain financial records simply.",
      iconBg: "bg-teal-100 text-teal-600",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
        </svg>
      ),
      details: {
        tagline: "Track petty cash, salaries, utilities, and vendor costs",
        points: [
          "Categorized expense entries (Salaries, Maintenance, Utilities, Stationery).",
          "Attach bill receipts and invoices directly from camera to Drive.",
          "Monthly expenditure breakdowns with income vs expense comparison.",
          "Export clean tax-ready expense sheets in seconds.",
        ],
      },
    },
    {
      id: "search",
      title: "Search",
      description: "Find any student, parent or record instantly.",
      iconBg: "bg-red-100 text-red-500",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 11.99 14 9.5 14z" />
        </svg>
      ),
      details: {
        tagline: "Universal spotlight search across your entire school database",
        points: [
          "Type any name, roll number, phone number, or vehicle number.",
          "Sub-second search results powered by Google Sheets indexing.",
          "Quick action shortcuts (Call, Message, View Dues) from search.",
          "Filter by active status, class, gender, or scholarship group.",
        ],
      },
    },
    {
      id: "reports",
      title: "Dashboards & Reports",
      description:
        "Get clear insights with simple reports and charts to make better decisions.",
      iconBg: "bg-sky-100 text-blue-600",
      icon: (
        <svg className="h-7.5 w-7.5 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v8.99L21.99 11C21.47 5.94 17.56 2 13 2zm0 11.01V22c4.56 0 8.47-3.94 8.99-9H13z" />
        </svg>
      ),
      details: {
        tagline: "Visual business intelligence built specifically for school owners",
        points: [
          "Live student strength, gender ratio, and admission trends.",
          "Monthly fee collection vs pending arrears bar charts.",
          "Daily attendance rate heatmaps.",
          "One-click export to Excel, Google Sheets, or PDF format.",
        ],
      },
    },
  ];

  return (
    <section className="w-full bg-white px-5 py-8 sm:px-10 sm:py-8 lg:px-14 lg:py-10">
      <div className="mx-auto max-w-10xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0f1d40] sm:text-3xl lg:text-4xl">
            Powerful Features for Every School
          </h2>
          <div className="mt-2 inline-flex flex-col items-center">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Simple. Practical. Made for real schools.
            </p>
            {/* Green curved underline under the subtitle */}
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

        {/* Features 4x2 Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
            >
              <div>
                {/* Icon Box */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg} mb-5 shadow-xs`}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0f1d40] sm:text-lg">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Learn More Button */}
              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedFeature(feature)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f7ff] px-4 py-1.5 text-xs font-semibold text-[#0284c7] transition-all duration-200 hover:bg-[#0284c7] hover:text-white cursor-pointer active:scale-95"
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Interactive Learn More Modal ================= */}
      {selectedFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 transition-all transform scale-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              aria-label="Close feature details"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${selectedFeature.iconBg}`}
              >
                {selectedFeature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0f1d40]">
                  {selectedFeature.title}
                </h3>
                <span className="text-xs font-semibold text-emerald-600">
                  Apna School Feature
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-4 text-sm font-semibold text-slate-700">
              {selectedFeature.details.tagline}
            </p>

            {/* Feature Points */}
            <ul className="mt-4 space-y-2.5">
              {selectedFeature.details.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Modal Actions */}
            <div className="mt-7 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Close
              </button>
              <a
                href="#get-started"
                onClick={() => setSelectedFeature(null)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#009e52] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#008947] transition"
              >
                Try this Feature →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
