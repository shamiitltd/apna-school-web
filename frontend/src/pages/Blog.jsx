import { Footer } from "../components/Footer";
import cloud_bg from "../assets/howitworks_hero.png";
import heroImg from "../assets/hero-avatar-blog.png";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import {
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
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";

import arrow from "../assets/newsletter_arrow.png";

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [visibleCount, setVisibleCount] = useState(6);
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Newsletter Email State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  // Custom Styled Dialog State (Replaces native alerts)
  const [dialog, setDialog] = useState({
    open: false,
    type: "success", // "success" | "error" | "info"
    title: "",
    message: "",
  });

  const [categoryCounts, setCategoryCounts] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // 1. Fetch Main Blogs (Category + Search + Limit)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        let url = `${API_URL}/blogs?limit=50`;

        if (activeCategory && activeCategory !== "All Posts") {
          url += `&category=${encodeURIComponent(activeCategory)}`;
        }

        if (searchQuery.trim()) {
          url += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeCategory, searchQuery]);

  // 2. Fetch Popular Blogs, Featured Blog & Dynamic Category Counts
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const [popularRes, featuredRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/blogs/popular`),
          fetch(`${API_URL}/blogs/featured`),
          fetch(`${API_URL}/blogs/categories`),
        ]);

        const popularData = await popularRes.json();
        const featuredData = await featuredRes.json();
        const categoriesData = await categoriesRes.json();

        if (popularData.success && popularData.data) {
          setPopularBlogs(popularData.data);
        }
        if (featuredData.success && featuredData.data) {
          setFeaturedBlog(featuredData.data);
        }
        if (categoriesData.success && categoriesData.data) {
          setCategoryCounts(categoriesData.data);
        }
      } catch (error) {
        console.error("Error fetching sidebar data: ", error);
      }
    };

    fetchSidebarData();
  }, []);

  // 3. Handle Newsletter Submit with Styled Error & Dialog
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = newsletterEmail.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    try {
      setSubscribing(true);
      const res = await fetch(`${API_URL}/subscriber`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (data.success) {
        setNewsletterEmail("");
        setDialog({
          open: true,
          type: "success",
          title: "Successfully Subscribed!",
          message:
            data.message ||
            "Welcome to Apna School! You'll receive our newest articles directly in your inbox.",
        });
      } else {
        setDialog({
          open: true,
          type: "error",
          title: "Subscription Notice",
          message: data.message || "Unable to subscribe. Please try again.",
        });
      }
    } catch (error) {
      setDialog({
        open: true,
        type: "error",
        title: "Connection Error",
        message: "Server is unreachable. Please make sure the backend is running.",
      });
    } finally {
      setSubscribing(false);
    }
  };

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
      count: categoryCounts["All Posts"] ?? blogs.length,
      icon: <Layers className="w-4 h-4 text-emerald-600" />,
      bg: "bg-emerald-100/70",
    },
    {
      name: "For Parents",
      count: categoryCounts["For Parents"] ?? 0,
      icon: <Users className="w-4 h-4 text-amber-600" />,
      bg: "bg-amber-100/70",
    },
    {
      name: "For Students",
      count: categoryCounts["For Students"] ?? 0,
      icon: <GraduationCap className="w-4 h-4 text-pink-600" />,
      bg: "bg-pink-100/70",
    },
    {
      name: "For Teachers",
      count: categoryCounts["For Teachers"] ?? 0,
      icon: <Presentation className="w-4 h-4 text-orange-600" />,
      bg: "bg-orange-100/70",
    },
    {
      name: "Product Updates",
      count: categoryCounts["Product Updates"] ?? 0,
      icon: <Megaphone className="w-4 h-4 text-blue-600" />,
      bg: "bg-blue-100/70",
    },
    {
      name: "Tips & Guides",
      count: categoryCounts["Tips & Guides"] ?? 0,
      icon: <Lightbulb className="w-4 h-4 text-sky-600" />,
      bg: "bg-sky-100/70",
    },
  ];

  const visiblePosts = blogs.slice(0, visibleCount);

  return (
    <>
      {/* Hero Section */}
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
            alt="Hero Avatar"
            className="max-w-2xl pointer-events-none absolute hidden lg:block lg:h-94 lg:top-10 lg:right-8 xl-right-38"
          />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-8 sm:py-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 lg:gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 xl:px-12">
          {/* Left Column: Categories + Featured + Grid */}
          <div className="w-full">
            {/* Top Category Filter Chips */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {searchItems.map((item, key) => {
                const isActive = activeCategory === item;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(item);
                      setVisibleCount(6);
                    }}
                    className={`py-2 px-4 text-sm rounded-xl font-semibold cursor-pointer shadow-2xs transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-[#f1f5fb] text-[#071d55] hover:bg-blue-100 hover:text-blue-700"
                    }`}
                  >
                    <div>{item}</div>
                  </button>
                );
              })}
            </div>

            {/* Featured Post Card (Shows on 'All Posts' when not searching) */}
            {activeCategory === "All Posts" &&
              !searchQuery &&
              featuredBlog && (
                <div className="bg-sky-100 flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 lg:p-10 mt-6 rounded-3xl gap-8">
                  <div className="w-full flex-1">
                    <p className="bg-[#fef1c9] py-1.5 px-4 text-xs font-bold text-amber-800 w-fit flex justify-center rounded-full">
                      Featured
                    </p>
                    <h1 className="mt-4 text-2xl font-bold text-[#071d55] sm:text-3xl lg:text-4xl">
                      {featuredBlog.title}
                    </h1>
                    <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
                      {featuredBlog.description}
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full flex justify-center items-center text-lg font-bold bg-amber-200 text-amber-900 shrink-0">
                        {featuredBlog.author?.name
                          ? featuredBlog.author.name[0]
                          : "A"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">
                          By {featuredBlog.author?.name || "Admin"}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {featuredBlog.author?.publishedAt || "Aug 2024"} |{" "}
                          {featuredBlog.author?.readTime || 4} min read
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
                      src={featuredBlog.image || heroImg}
                      alt={featuredBlog.title}
                      className="max-h-64 sm:max-h-72 w-auto object-contain"
                    />
                  </div>
                </div>
              )}

            {/* Articles Grid & Pagination */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-3 text-sm text-slate-500 font-medium">
                  Loading articles...
                </p>
              </div>
            ) : blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                  {visiblePosts.map((item, key) => {
                    return (
                      <article
                        key={item._id || key}
                        className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                      >
                        {/* Card Image */}
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

                          {/* Author Footer */}
                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                                {item.author?.name ? item.author.name[0] : "A"}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                                  {item.author?.name || "Admin"}
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

                {/* Load More Button */}
                {visibleCount < blogs.length && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-6 py-3 bg-white border border-slate-200 text-[#071d55] font-bold text-sm rounded-2xl shadow-xs hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer flex gap-3 items-center justify-center"
                    >
                      <span>Load More Articles</span>
                      <ArrowDown className="w-4 h-4 text-[#071d55]" />
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
                  exploring other categories or searching another keyword!
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All Posts");
                    setSearchQuery("");
                    setVisibleCount(6);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  View All Posts
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Search + Categories + Popular Posts + Newsletter */}
          <div>
            {/* Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categories Widget */}
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
                          ? "bg-blue-50 text-blue-700 font-bold"
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
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 ${
                          isActive
                            ? "bg-blue-200 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Posts Widget */}
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
                {popularBlogs.length > 0 ? (
                  popularBlogs.map((item, key) => {
                    return (
                      <article
                        key={item._id || key}
                        className="group flex items-center gap-3.5 cursor-pointer"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                          <img
                            src={item.image || heroImg}
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
                            {item.author?.publishedAt || "Aug 2024"}
                          </span>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-2">
                    No popular articles yet.
                  </p>
                )}
              </div>
            </div>

            {/* Newsletter Subscription Widget */}
            <div className="mt-6 bg-[#f0f7ff] rounded-3xl p-5 sm:p-6 border border-blue-100 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 shrink-0">
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
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Get the latest articles, tips, and updates delivered to your
                    inbox.
                  </p>
                </div>
              </div>
              <form
                noValidate
                onSubmit={handleNewsletterSubmit}
                className="mt-5 flex flex-col gap-3"
              >
                <div className="w-full flex flex-col gap-1.5">
                  <div className="relative w-full">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="Your email address"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-2xl text-sm placeholder-slate-400 focus:outline-none transition-all shadow-2xs ${
                        emailError
                          ? "border-red-400 focus:ring-2 focus:ring-red-400/30 text-red-950"
                          : "border-slate-200 focus:ring-2 focus:ring-blue-500 text-slate-800"
                      }`}
                    />
                    <Mail
                      className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                        emailError ? "text-red-400" : "text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Custom CSS Styled Error Message */}
                  {emailError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium px-1 pt-0.5 animate-fadeIn">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={subscribing}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 cursor-pointer text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99]"
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Dialog / Modal Component (Replaces browser alerts) */}
      {dialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 transform transition-all scale-100 animate-in fade-in zoom-in-95">
            {/* Close Icon */}
            <button
              onClick={() => setDialog({ ...dialog, open: false })}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Content */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  dialog.type === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }`}
              >
                {dialog.type === "success" ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <AlertCircle className="w-8 h-8" />
                )}
              </div>

              <h3 className="text-xl font-bold text-[#071d55]">
                {dialog.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xs">
                {dialog.message}
              </p>

              <button
                onClick={() => setDialog({ ...dialog, open: false })}
                className={`mt-6 w-full py-3 px-5 text-white font-bold text-sm rounded-2xl shadow-sm transition-all duration-200 cursor-pointer ${
                  dialog.type === "success"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
