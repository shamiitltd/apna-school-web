import logo from "../assets/logo.png";
import footerBg from "../assets/footer.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  
  return (
    <footer className="w-full bg-white pt-8">

      {/* ================= 2. MAIN FOOTER LINKS & BRAND ================= */}
      <div className="mx-auto max-w-10xl px-5 sm:px-10 lg:px-14 pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand Column (Left - 4 Cols) */}
          <div className="lg:col-span-4">
            <img
              src={logo}
              alt="Apna School"
              className="h-20 sm:h-24 w-auto object-contain"
            />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-sm">
              Apna School is a lightweight school management app for small and local schools.
              Manage students, fees, attendance, exams and more — with your data stored in your
              own Google Drive.
            </p>

            {/* Feature Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {/* Badge 1: Google Drive */}
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#FFBA00" d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5z" />
                  <path fill="#0066DA" d="M16.29 3.5H7.71l6.56 11.5h8.58z" />
                  <path fill="#00AC47" d="M1.15 15l3.43 6h17.14l-3.43-6z" />
                </svg>
                <span>Your Data<br />Your Drive</span>
              </div>

              {/* Badge 2: Google Sheets */}
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#0F9D58" d="M37 45H11c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4h18l12 12v26c0 2.2-1.8 4-4 4z" />
                  <path fill="#87CEAC" d="M29 3v12h12" />
                  <path fill="#F1F1F1" d="M14 20h20v2.5H14zm0 6h20v2.5H14zm0 6h20v2.5H14z" />
                  <path fill="#F1F1F1" d="M23 17v18h2.5V17z" />
                </svg>
                <span>Powered by<br />Google Sheets</span>
              </div>

              {/* Badge 3: Firebase */}
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-700">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#0288D1" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  <path fill="#FFF" d="M12 7a3 3 0 0 0-3 3v2h6v-2a3 3 0 0 0-3-3zm-4 5v6h8v-6H8z" />
                </svg>
                <span>Secure with<br />Firebase</span>
              </div>
            </div>
          </div>

          {/* Product Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#0f1d40]">Product</h4>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><Link to="/features" className="hover:text-blue-600 transition">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-blue-600 transition">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-600 transition">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600 transition">FAQ</Link></li>
              <li><Link to="/updates" className="hover:text-blue-600 transition">Updates</Link></li>
            </ul>
          </div>

          {/* Resources Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#0f1d40]">Resources</h4>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><Link to="/help-center" className="hover:text-blue-600 transition">Help Center</Link></li>
              <li><Link to="/user-guides" className="hover:text-blue-600 transition">User Guides</Link></li>
              <li><Link to="/video-tutorials" className="hover:text-blue-600 transition">Video Tutorials</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition">Blog</Link></li>
              <li><Link to="/refund" className="hover:text-blue-600 transition">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Company Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#0f1d40]">Company</h4>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
              <li><Link to="/mission" className="hover:text-blue-600 transition">Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 transition">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Get in Touch & Socials (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-[#0f1d40]">Get in Touch</h4>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:support@apna.school" className="hover:text-blue-600 transition">
                  support@apna.school
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Uttar Pradesh, India</span>
              </li>
            </ul>

            {/* Follow Us */}
            <h4 className="mt-6 text-sm font-bold text-[#0f1d40]">Follow Us</h4>
            <div className="mt-3 flex items-center gap-2.5">
              {/* YouTube */}
              <Link
                to="/youtube"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ef4444] text-white transition hover:opacity-90"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                to="/linkedin"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0077b5] text-white transition hover:opacity-90"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6s.72 1.6 1.6 1.6 1.6-.72 1.6-1.6-.72-1.6-1.6-1.6z" />
                </svg>
              </Link>

              {/* X */}
              <Link
                to="/x"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition hover:opacity-90"
              >
                <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                to="/instagram"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white transition hover:opacity-90"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 3. ILLUSTRATION BANNER ================= */}
      {/* <div className="w-full overflow-hidden leading-none">
        <img
          src={footerBg}
          alt="Apna School Community"
          className="w-full object-cover object-center"
        />
      </div> */}

      {/* ================= 4. DARK BOTTOM COPYRIGHT BAR ================= */}
      <div className="w-full bg-[#0c1838] px-5 py-5 text-slate-300 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-10xl flex-col items-center justify-between gap-4 text-xs lg:flex-row">
          
          {/* Copyright Info */}
          <div className="text-center lg:text-left">
            <p className="font-semibold text-white">
              © 2026 Apna School. All rights reserved.
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              A product of Shami Innovation and Technologies LLP (SHAMIIT)
            </p>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:gap-6">
            {/* Item 1 */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              <span>Data stays in your Google Drive</span>
            </div>

            <span className="hidden text-slate-600 sm:inline">|</span>

            {/* Item 2 */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <svg className="h-4 w-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <span>Trusted by School Owners</span>
            </div>

            <span className="hidden text-slate-600 sm:inline">|</span>

            {/* Item 3 */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
              <span>Proudly Made for Indian Schools</span>
            </div>
          </div>

          {/* Simple Schools Brighter Futures Tag */}
          <div className="flex items-center gap-1.5 font-medium italic text-slate-200">
            <span>Simple Schools</span>
            <span>Brighter Futures</span>
            <span className="text-red-500 not-italic text-sm">❤️</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
