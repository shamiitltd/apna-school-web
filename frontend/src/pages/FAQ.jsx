import { useState } from "react";
import boyAvatar from "../assets/boy_avatar.png";
import faqBackground from "../assets/howitworks_hero.png";
import booksFaq from "../assets/books_faq.png";
import textFaq from "../assets/text-faq.png";
import { Footer } from "../components/Footer";

export const FAQ = () => {
  const questions = [
    {
      question: "What is Apna School?",
      answer:
        "Apna School is a simple platform that helps schools manage students, fees, attendance and reports.",
    },
    {
      question: "Who can use Apna School?",
      answer:
        "Small schools, teachers, administrators and school owners can use Apna School.",
    },
    {
      question: "Is my data safe and secure?",
      answer: "Yes, your school data is securely stored and protected.",
    },
    {
      question: "Is there any installation required?",
      answer:
        "No installation is required. You can use it directly from your browser.",
    },
    {
      question: "Can multiple users access the same school account?",
      answer:
        "Yes, multiple authorized users can access the same school account.",
    },
    {
      question: "Can I export reports and data?",
      answer: "Yes, you can export important school reports and data.",
    },
    {
      question: "Do you provide customer support?",
      answer: "Yes, customer support is available whenever you need help.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, you can try Apna School before choosing a plan.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <main className="relative min-h-screen overflow-x-hidden bg-[#effaff]">
        <img
          src={faqBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <section className="grid min-h-72 items-end gap-2 pt-9 sm:min-h-80 sm:pt-10 lg:grid-cols-[1fr_auto] lg:gap-10">
            <div className="pb-8 sm:pb-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
                FAQ
              </p>

              <h1 className="max-w-xl text-4xl font-bold leading-[1.1] text-[#071d55] sm:text-5xl">
                Got Questions?
                <span className="block text-blue-600">We've Got Answers!</span>
              </h1>

              <p className="mt-4 max-w-lg text-base leading-6 text-slate-600 sm:text-lg">
                Find quick answers to the most common questions about Apna
                School. Still unsure? We’re here to help!
              </p>
            </div>

            <div className="flex items-start justify-start lg:justify-end">
              <img
                src={boyAvatar}
                alt="Boy Avatar"
                className="h-60 w-auto max-w-none object-contain object-bottom sm:h-72"
              />
            </div>
          </section>

          <section className="grid items-start gap-3 pb-12 md:grid-cols-2 lg:gap-4 lg:pb-16">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;
              return (
                <article
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-200 ${
                    isOpen ? "border-blue-300" : "border-blue-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex min-h-16 w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 font-semibold text-[#071d55]">
                      {item.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 text-[#071d55] transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-blue-50" : "bg-white"
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="border-t border-blue-50 px-5 pb-5 pl-18 pt-4 text-sm leading-6 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>

        <section className="relative min-h-[280px] w-full overflow-hidden">
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
            <h2 className="max-w-md text-3xl font-bold leading-tight text-[#071d55] sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
              We'are just a message away. Our team is happy to help you!
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-emerald-500 px-7 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Contact Us <span className="ml-2">→</span>
            </button>
          </div>
          <img
            src={booksFaq}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 right-[25%] z-10 hidden h-40 w-auto object-contain lg:block"
          />

          <img
            src={textFaq}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[5%] top-24 z-20 hidden h-40 w-auto object-contain lg:block"
          />
        </section>
      </main>
      <Footer />
    </>
  );
};
