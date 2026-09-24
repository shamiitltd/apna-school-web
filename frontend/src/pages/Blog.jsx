import { Footer } from "../components/Footer";
import cloud_bg from "../assets/howitworks_hero.png";
import heroImg from "../assets/hero-avatar-blog.png";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { BsGridFill } from "react-icons/bs";
import {
  LayoutGrid,
  Layers,
  Users,
  GraduationCap,
  Presentation,
  Megaphone,
  Lightbulb,
  Flame,
  Mail,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

import arrow from "../assets/newsletter_arrow.png";

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [visibleCount, setVisibleCount] = useState(6);

  const searchItems = [
    "All Posts",
    "For Parents",
    "For Students",
    "For Teachers",
    "Product Updates",
    "Tips & Guides",
  ];

  const categoriesList = [
    {
      name: "All Posts",
      count: 24,
      color: "text-emerald-600",
      icon: <Layers className="w-4 h-4 text-emerald-600" />,
      bg: "bg-emerald-100/70",
    },
    {
      name: "For Parents",
      count: 6,
      color:"text-amber-600",
      icon: <Users className="w-4 h-4 text-amber-600" />,
      bg: "bg-amber-100/70",
    },
    {
      name: "For Students",
      count: 8,
      color: "text-pink-600",
      icon: <GraduationCap className="w-4 h-4 text-pink-600" />,
      bg: "bg-pink-100/70",
    },
    {
      name: "For Teachers",
      count: 5,
      color: "text-orange-600",
      icon: <Presentation className="w-4 h-4 text-orange-600" />,
      bg: "bg-orange-100/70",
    },
    {
      name: "Product Updates",
      count: 3,
      color: "text-blue-600",
      icon: <Megaphone className="w-4 h-4 text-blue-600" />,
      bg: "bg-blue-100/70",
    },
    {
      name: "Tips & Guides",
      count: 7,
      color: "text-sky-600",
      icon: <Lightbulb className="w-4 h-4 text-sky-600" />,
      bg: "bg-sky-100/70",
    },
  ];

  const post = [
    {
      id: 1,
      title: "10 Simple Habits for a More Organized School Life",
      description:
        "Discover easy and effective habits that help students stay organized, reduce stress, and achieve more every day.",
      image: "",

      category: "Students",

      author: {
        name: "Priya Sharma",
        publishedAt: "Aug 20, 2024",
        readTime: 5,
      },
      isFeatured: true,
    },
    {
      id: 2,
      title: "How to Build a Study Routine That Actually Works",
      description:
        "Learn how to create a realistic study routine that keeps you consistent, focused, and stress-free.",
      image: "",
      category: "Students",
      author: {
        name: "Aarav Mehta",
        publishedAt: "Aug 18, 2024",
        readTime: 4,
      },
    },

    {
      id: 3,
      title: "5 Ways to Stay Focused While Studying",
      description:
        "Discover simple strategies to avoid distractions, improve concentration, and make every study session more productive.",
      image: "",
      category: "Students",
      author: {
        name: "Ananya Verma",
        publishedAt: "Aug 15, 2024",
        readTime: 3,
      },
    },

    {
      id: 4,
      title: "How to Prepare for Exams Without Stress",
      description:
        "A practical guide to planning your revision, managing your time, and staying confident during exam season.",
      image: "",
      category: "Students",
      author: {
        name: "Rohan Kapoor",
        publishedAt: "Aug 12, 2024",
        readTime: 6,
      },
    },

    {
      id: 5,
      title: "Building Skills Beyond the Classroom",
      description:
        "Explore how personal projects, communication, and practical experience can help you grow beyond academics.",
      image: "",
      category: "Students",
      author: {
        name: "Meera Joshi",
        publishedAt: "Aug 10, 2024",
        readTime: 4,
      },
    },
  ];

  const popularPosts = [
    {
      id: 1,
      title: "10 Simple Habits for a More Organized School Life",
      date: "Aug 20, 2024",
      image: heroImg, // ya specific image path
    },
    {
      id: 2,
      title: "How Parents Can Support Better Learning at Home",
      date: "Aug 15, 2024",
      image: heroImg,
    },
    {
      id: 3,
      title: "Top 5 Study Techniques That Really Work",
      date: "Aug 10, 2024",
      image: heroImg,
    },
  ];

  const filteredPosts =
    activeCategory === "All Posts"
      ? post
      : post.filter((item) => {
          const cleanActive = activeCategory.replace("For ", "").toLowerCase();
          const itemCat = item.category.toLowerCase();

          return itemCat.includes(cleanActive) || cleanActive.includes(itemCat);
        });
    
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <>
      <section className="relative isolate min-h-112 w-full overflow-hidden bg-[#f0f8ff] px-5 pt-10 sm:px-10 lg:px-14">
        <img
          src={cloud_bg}
          alt=""
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />
        <div className="relative z-10 mx-auto flex max-w-10xl items-start justify-between">
          <div className="pt-6 max-w-3xl sm:pt-10 lg:pt-14">
            <p className="pb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-base">
              Our Blog
            </p>
            <h1 className="text-4xl font-bold text-[#071d55] sm:text-5xl lg:text-5xl">
              Ideas, Tips &amp; Stories
              <br />
              <span className="text-blue-600">
                for a Brighter Learning Tomorrow
              </span>
            </h1>
            <p className="mt-5 text-md max-w-xl text-slate-600 sm:text-lg lg:text-xl">
              Explore expert tips, practical guides, and inspiring stories to
              help students, parents, and teachers make school management easier
              and learning more joyful.
            </p>
          </div>
          <img
            src={heroImg}
            className="max-w-2xl pointer-events-none absolute hidden lg:block lg:h-94 lg:top-10 lg:right-8 xl-right-38"
          />
        </div>
      </section>

      {/* middle part */}
      <section className="w-full py-8 sm:py-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 lg:gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 xl:px-12">
          <div className="w-full">
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {searchItems.map((items, key) => {
                const isActive = activeCategory === items;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(items)}
                    className={`bg-[#f1f5fb] py-2 px-4 text-sm rounded-xl font-semibold text-[#071d55] cursor-pointer shadow-2xs transition-all duration-200 ${isActive ? "bg-blue-600 text-white shadow-md" : "bg-[#f1f5fb] text-[#071d55] hover:bg-blue100 hover:text-blue-700"}`}
                  >
                    <div>{items}</div>
                  </button>
                );
              })}
            </div>

            {post[0].isFeatured && (
              <div className="bg-sky-100 flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 lg:p-10 mt-6 rounded-3xl gap-8">
                <div className="w-full flex-1">
                  <p className="bg-[#fef1c9] py-1.5 px-4 text-xs font-bold text-amber-800 w-fit flex justify-center rounded-full">
                    Featured
                  </p>
                  <h1 className="mt-4 text-2xl font-bold text-[#071d55] sm:text-3xl lg:text-4xl">
                    {post[0].title}
                  </h1>
                  <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
                    {post[0].description}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex justify-center items-center text-lg font-bold bg-amber-200 text-amber-900 shrink-0">
                      {post[0].author.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        By {post[0].author.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {post[0].author.publishedAt} | {post[0].author.readTime}{" "}
                        min read
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 mt-6 font-bold text-sky-700 hover:text-sky-800 cursor-pointer">
                    <div>Read More</div>
                    <FaArrowRight />
                  </button>
                </div>
                <div className="w-full lg:w-5/12 flex justify-center shrink-0">
                  <img
                    src={heroImg}
                    className="max-h-64 sm:max-h-72 w-auto object-contain"
                  />
                </div>
              </div>
            )}
            {filteredPosts.length > 0 ? (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                {visiblePosts.map((item, key) => {
                  return (
                    <article
                      key={key}
                      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    >
                      {/* Card Image Container */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100 flex items-center justify-center p-4">
                        <img
                          src={item.image || heroImg}
                          alt={item.title}
                          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs border border-blue-100">
                          {item.category}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                        <div>
                          <h2 className="text-lg font-bold text-[#071d55] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h2>
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Author & Read More Footer */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                              {item.author?.name ? item.author.name[0] : "A"}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                                {item.author?.name}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {item.author?.publishedAt || "Aug 2024"} ·{" "}
                                {item.author?.readTime || 4} min read
                              </span>
                            </div>
                          </div>

                          <button className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50 transition-colors cursor-pointer">
                            <FaArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              {visibleCount < filteredPosts.length && (
                <div className="flex justify-center mt-10">
                  <button onClick={() => setVisibleCount(prev => prev + 6)} className="px-6 py-3 bg-white border border-slate-200 text-[#071d55] font-bold text-sm rounded-2xl shadow-xs hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer flex gap-3 items-center justify-center">
                    Load More Articles
                    <span><ArrowDown className="w-4 h-4 font-bold text-[#071d55]" /></span>
                  </button>
                </div>
              )}
            </> 
            ) : (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold mb-3">
                  📁
                </div>
                <h3 className="text-lg font-bold text-[#071d55]">
                  No Articles Found
                </h3>
                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                  We couldn't find any articles in "{activeCategory}". Try
                  exploring other categories!
                </p>
                <button
                  onClick={() => {setActiveCategory("All Posts")
                    setVisibleCount(6);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  View All Posts
                </button>
              </div>
            )}
          </div>

          {/* Right Side Search Bar */}
          <div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            </div>
            <div className="mt-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-md">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <BsGridFill className="text-sm" />
                </div>
                <h3 className="text-lg font-bold text-[#071d55]">Categories</h3>
              </div>

              <div className="flex flex-col gap-1.5 mt-3">
                {categoriesList.map((cat, index) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setVisibleCount(6);
                      }}

                      className={`flex items-center justify-between p-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-left w-full ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.bg}`}
                        >
                          {cat.icon}
                        </div>
                        <span className="text-sm font-semibold text-[#071d55]">
                          {cat.name}
                        </span>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 ${isActive ? "bg-blue-200 text-blue-800" : "bg-slate-200 text-slate-600"}`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-md">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-rose-600 fill-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-[#071d55]">
                  Popular Posts
                </h3>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {popularPosts.map((item, key) => {
                  return (
                    <article
                      key={key}
                      className="group flex items-center gap-3.5 cursor-pointer"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#071d55] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium mt-1 block">
                          {item.date}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 bg-green-100 rounded-xl p-4 border border-blue-100 shadow-md">
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0">
                  <img
                    src={arrow}
                    alt="Stay in Loop"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-[#071d55]">
                    Stay in the Loop!
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Get the latest articles, tips, and updates delivered to your
                    inbox.
                  </p>
                </div>
              </div>
              <form className="mt-5 flex flex-col gap-3">
                <div className="relative w-full">
                  <input type="email" required placeholder="Your email address" className="w-full pl-10 pr-4 py-3 bg-white border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs" />
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white font-bold text-sml rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99]">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
