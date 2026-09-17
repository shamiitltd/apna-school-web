import hero from "../assets/hero_bg.png"

export const Hero = () => {
    return (
        <>
            <section className="relative isolate h-[calc(100svh-5rem)] min-h-130 overflow-hidden bg-sky-50 lg:min-h-0">
                <img
                    src={hero}
                    alt="A bright school campus with trees and a garden"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_center] sm:object-center"
                />
                <div className="mx-auto flex h-full max-w-10xl items-center px-5 py-8 sm:px-10 lg:px-14 lg:py-4">
                    <div className="w-full max-w-xl rounded-3xl bg-white/65 p-6 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-0">
                    <p className="mb-3 inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700">
                        Simple - Affordable - Your Data, Your Control
                    </p>
                    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
                        The Digital School <span className="text-blue-600">Register</span> for Every Small School
                    </h1>
                    <p className="mt-4 max-w-lg text-base leading-6 text-slate-700 sm:text-lg lg:text-base">
                        Apna School is a lightweight school management app for small and local schools (100-1,000 students). Manage students, fees, attendance, exams, parents and more - all in one simple mobile app, with your data stored in your own Google Drive.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm font-medium text-slate-700 sm:text-base lg:text-sm">
                        {[
                            "No complex ERP",
                            "No separate database",
                            "Your data in your Google Drive",
                            "Simple for non-technical staff",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white" aria-hidden="true">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a href="#access" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                            <img src="https://cdn.simpleicons.org/googleplay/ffffff" alt="" className="h-5 w-5" />
                            Get it on Google Play
                        </a>
                        <a href="#video" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-white/85 px-6 py-3 font-bold text-blue-900 transition hover:border-blue-400 hover:bg-white">
                            <img src="https://cdn.simpleicons.org/youtube/ff0000" alt="" className="h-5 w-5" />
                            Watch Video
                        </a>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}