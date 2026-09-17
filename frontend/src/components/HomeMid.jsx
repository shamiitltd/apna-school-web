import avatar from "../assets/avatar.png";
export const HomeMid = () => {
  return (
    <section className="mx-auto flex min-h-68 w-full flex-col items-center justify-center gap-6 bg-slate-50 px-6 py-6 lg:flex-row lg:px-10">
      <div className="w-full max-w-125 lg:shrink-0">
        <div className="mb-4 w-fit rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700">
          Build for Real Schools
        </div>

        <div className="text-4xl font-bold leading-[1.08] text-sky-950">
          Everything You Need,{" "}
          <span className="text-blue-600">Nothing You Don't</span>
        </div>
        <div className="mt-4 text-base leading-[1.35] text-slate-600">
          Manage your school's daily operations easily - from student records to
          fees, attendance, exams and more. Apna School keeps it simple, so you
          can focus on what really matters - your students.
        </div>
      </div>
      <div className="flex w-full max-w-75 items-end justify-center lg:shrink-0 lg:self-end">
        <img
          src={avatar}
          alt="Avatar"
          className="h-65 w-full object-contain"
        />
      </div>
      <div className="grid w-full max-w-125 grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-blue-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-blue-700">
          <img
            src="https://api.iconify.design/lucide/users-round.svg?color=%230d6efd"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Student Records</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-rose-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-rose-600">
          <img
            src="https://api.iconify.design/lucide/users-round.svg?color=%23ef476f"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Parent Information</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-emerald-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-emerald-700">
          <img
            src="https://api.iconify.design/lucide/briefcase-business.svg?color=%23088a57"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Fees &amp; Concessions</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-blue-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-blue-700">
          <img
            src="https://api.iconify.design/lucide/calendar-days.svg?color=%230d6efd"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Attendance</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-amber-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-amber-600">
          <img
            src="https://api.iconify.design/lucide/file-text.svg?color=%23f59e0b"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Exam Results</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-rose-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-rose-600">
          <img
            src="https://api.iconify.design/lucide/files.svg?color=%23ef476f"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Expenses</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-violet-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-violet-700">
          <img
            src="https://api.iconify.design/lucide/search.svg?color=%236d28d9"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Search Everything</span>
        </div>
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-emerald-50 px-2 py-3 text-center text-xs font-semibold leading-tight text-emerald-700">
          <img
            src="https://api.iconify.design/lucide/chart-no-axes-column-increasing.svg?color=%23088a57"
            alt=""
            className="mb-2 h-8 w-8"
          />
          <span>Dashboards &amp; Reports</span>
        </div>
      </div>
    </section>
  );
};
