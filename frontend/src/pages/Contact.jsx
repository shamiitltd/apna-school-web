import avatar from "../assets/contact_avatar.png";
import cloud_bg from "../assets/howitworks_hero.png";
import text_contact from "../assets/text-faq.png";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Footer } from "../components/Footer";

export const Contact = () => {
  return (
    <>
      <section className="relative isolate min-h-112 w-full overflow-hidden bg-[#f0f8ff] px-5 pt-10 sm:px-10 lg:px-14">
        <img
          src={cloud_bg}
          alt=""
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />

        <div className="relative z-10 mx-auto px-5 flex max-w-10xl items-start justify-between">
          <div className="max-w-2xl pt-6 sm:pt-10 lg:pt-14">
            <p className="pb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-base">
              Contact
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[#071d55] sm:text-6xl">
              We&apos;d Love to
              <br />
              <span className="text-blue-600">Hear From You!</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
              Have a question, suggestion, or need support? Our team is here to
              help. Get in touch with us and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <img
            src={avatar}
            alt="Apna School support representative"
            className="pointer-events-none absolute -right-10 top-12 hidden h-56 w-auto object-contain sm:block lg:right-8 lg:top-20 lg:h-84 xl:right-38"
          />
        </div>
      </section>
      
      <section className="flex mt-4 mb-6 mx-auto w-full max-w-9xl flex-col gap-6 px-5 sm:px-10 lg:flex-row lg:px-14">
        <div className="flex-1 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Mail size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#071d55]">
                Send us a message
              </h3>
              <p className="text-xs text-slate-400">
                Fill out the form and we&apos;ll get back to you shortly.
              </p>
            </div>
          </div>
          <form className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm
                outline-none transition-colors focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#08b968] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#079f5b]"
            >
              Send Message
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
        <div className="flex-1 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Phone size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#071d55]">Get in touch</h3>
              <p className="text-xs text-slate-400">
                You can also reach us through the following channels.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
                <Mail size={21} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#071d55]">Email</h4>
                <p className="text-sm text-slate-600">support@apnaschool.in</p>
                <p className="text-xs text-slate-400">
                  We usually respond within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-500">
                <Phone size={21} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#071d55]">Phone</h4>
                <p className="text-sm text-slate-600">+91 98765 43210</p>
                <p className="text-xs text-slate-400">
                  Mon - Fri, 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-500">
                <MapPin size={21} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#071d55]">
                  Address
                </h4>
                <p className="text-sm text-slate-600">Uttar Pradesh, India</p>
                <p className="text-xs text-slate-400">
                  Serving schools across India
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#071d55]">
                  Follow Us
                </h4>
                <p className="text-xs text-slate-400">
                  Stay updated with our latest news and features.
                </p>
              </div>

              <div className="flex gap-3 text-lg">
                <a href="#" aria-label="LinkedIn" className="text-blue-600 hover:text-blue-800">
                  <FaLinkedinIn />
                </a>
                <a href="#" aria-label="X" className="text-slate-800 hover:text-slate-600">
                  <FaXTwitter />
                </a>
                <a href="#" aria-label="Instagram" className="text-pink-500 hover:text-pink-700">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="YouTube" className="text-red-500 hover:text-red-700">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-5 pb-8 sm:px-10 lg:px-14">
        <div className="relative mx-auto flex max-w-9xl min-h-44 overflow-hidden rounded-2xl border border-[#d9eef8] bg-[#eefaff] px-6 py-6 sm:px-10 sm:py-8 lg:items-center lg:px-14">
          <div className="relative z-10 flex max-w-2xl items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#08b968] shadow-sm sm:h-16 sm:w-16">
              <Clock3 className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold leading-tight text-[#071d55] sm:text-3xl">
                We&apos;re Here to Help!
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Our support team is always ready to assist you. Whether it&apos;s
                a question, feedback, or a partnership inquiry, feel free to
                reach out.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 right-4 hidden h-full max-h-48 w-[24rem] sm:block lg:right-10 lg:w-md">
            <img
              src={text_contact}
              alt="Let&apos;s make school management easier together"
              className="absolute bottom-0 right-0 h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
