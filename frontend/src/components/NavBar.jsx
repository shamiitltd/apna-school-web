import logo from "../assets/logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-20 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-10xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <NavLink to="/" aria-label="Apna School home" className="shrink-0">
          <img
            src={logo}
            alt="Apna School"
            className="h-16 w-auto object-contain"
          />
        </NavLink>

        <div className="hidden items-center gap-0.5 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:transition-all ease-in-out duration-300"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:transition-all ease-in-out duration-300"
              }`
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:transition-all ease-in-out duration-300"
              }`
            }
          >
            How It Works
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:transition-all ease-in-out duration-300"
              }`
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:transition-all ease-in-out duration-300"
              }`
            }
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:transition-all ease-in-out duration-300"
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/access"
            className="hidden rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 sm:inline-flex"
          >
            Get Early Access
          </NavLink>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 transition hover:bg-sky-50 hover:text-blue-600 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen ? "M6 18 18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`grid overflow-hidden border-t border-slate-100 px-5 md:hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 pb-5 pt-3">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-sky-50"
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-sky-50"
          >
            Features
          </NavLink>
          <NavLink
            to="/how-it-works"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-sky-50"
          >
            How It Works
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-sky-50"
          >
            Pricing
          </NavLink>
          <NavLink
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-sky-50"
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-sky-50"
          >
            Contact
          </NavLink>
          <NavLink
            to="/access"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex justify-center rounded-lg bg-emerald-600 px-5 py-3 font-bold text-white sm:hidden"
          >
            Get Early Access
          </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
