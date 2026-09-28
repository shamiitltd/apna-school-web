import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getArticleSchema, getBreadcrumbsSchema } from "../utils/seoSchemas";
import heroImg from "../assets/hero-avatar-blog.png";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Heart,
  Eye,
  ChevronRight,
  Bookmark,
  Check,
  Sparkles,
} from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        // Scroll to top on navigation
        window.scrollTo({ top: 0, behavior: "smooth" });

        const res = await fetch(`${API_URL}/blogs/${id}`);
        const data = await res.json();

        if (data.success && data.data) {
          setBlog(data.data);
          setLikeCount(data.data.likes || 0);

          // Fetch related blogs in same category
          const relatedRes = await fetch(
            `${API_URL}/blogs?category=${encodeURIComponent(
              data.data.category || ""
            )}&limit=3`
          );
          const relatedData = await relatedRes.json();
          if (relatedData.success) {
            setRelatedBlogs(
              relatedData.data.filter((b) => b._id !== data.data._id).slice(0, 3)
            );
          }
        }
      } catch (err) {
        console.error("Error fetching blog detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id, API_URL]);

  const handleLike = async () => {
    if (liked) return;
    try {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      await fetch(`${API_URL}/blogs/${id}/like`, { method: "POST" });
    } catch (e) {
      console.error("Failed to like:", e);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fbff] flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500">
              Loading article...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f8fbff] flex flex-col justify-between">
        <SEOHead
          title="Article Not Found"
          description="The requested blog post could not be found on Apna School."
          noIndex={true}
        />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold text-[#071d55]">
            Article Not Found
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-md">
            The article you are looking for may have been moved, updated, or is
            temporarily unavailable.
          </p>
          <Link
            to="/blog"
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
          >
            ← Back to Blog Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://apnaschool.in/blog/${blog._id}`;
  const publishedDate = blog.createdAt
    ? new Date(blog.createdAt).toISOString()
    : "2026-09-01T00:00:00+05:30";
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : blog.author?.publishedAt || "Sep 2026";

  const breadcrumbsData = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: blog.category || "Articles", url: `/blog?category=${encodeURIComponent(blog.category || "All Posts")}` },
    { name: blog.title, url: `/blog/${blog._id}` },
  ];

  const structuredData = [
    getArticleSchema({
      title: blog.title,
      description: blog.description,
      url: currentUrl,
      image: blog.image || "https://apnaschool.in/og-image.png",
      datePublished: publishedDate,
      dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishedDate,
      authorName: blog.author?.name || "Apna School Editorial Team",
      category: blog.category || "Education",
    }),
    getBreadcrumbsSchema(breadcrumbsData),
  ];

  return (
    <>
      <SEOHead
        title={blog.title}
        description={blog.description}
        canonicalUrl={currentUrl}
        ogType="article"
        ogImage={blog.image || "https://apnaschool.in/og-image.png"}
        structuredData={structuredData}
        articleData={{
          publishedTime: publishedDate,
          modifiedTime: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishedDate,
          author: blog.author?.name || "Apna School Editorial Team",
          section: blog.category,
        }}
      />

      <main className="min-h-screen bg-[#f8fbff] text-slate-800 antialiased">
        {/* Top Header / Breadcrumb Hero */}
        <section className="bg-gradient-to-b from-[#eef7ff] to-[#f8fbff] border-b border-blue-50/80 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
              <Link to="/" className="hover:text-blue-600 transition flex items-center gap-1 font-medium">
                Home
              </Link>
              <ChevronRight size={13} className="text-slate-400" />
              <Link to="/blog" className="hover:text-blue-600 transition font-medium">
                Blog
              </Link>
              <ChevronRight size={13} className="text-slate-400" />
              <Link
                to={`/blog?category=${encodeURIComponent(blog.category || "All Posts")}`}
                className="hover:text-blue-600 transition font-medium text-blue-600"
              >
                {blog.category}
              </Link>
            </nav>

            {/* Category Badge & Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded-full uppercase tracking-wider">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock size={14} className="text-slate-400" />
                {blog.author?.readTime || 4} min read
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Eye size={14} className="text-slate-400" />
                {blog.views || 0} views
              </span>
            </div>

            {/* Primary H1 Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071d55] tracking-tight leading-[1.2] mb-6">
              {blog.title}
            </h1>

            {/* Excerpt / Summary */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
              {blog.description}
            </p>

            {/* Author Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                  {blog.author?.name ? blog.author.name[0].toUpperCase() : "A"}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071d55]">
                    {blog.author?.name || "Apna School Team"}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={12} /> {formattedDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Like, Share */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                    liked
                      ? "bg-pink-50 border-pink-200 text-pink-600"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Heart size={14} className={liked ? "fill-pink-600" : ""} />
                  <span>{likeCount}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  title="Copy link to clipboard"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image & Main Content Container */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Featured Image */}
          <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
            <img
              src={blog.image || heroImg}
              alt={blog.title}
              className="w-full max-h-[460px] object-cover object-center"
            />
          </figure>

          {/* Article Main Text Content */}
          <article className="prose prose-lg prose-blue max-w-none text-slate-700 leading-relaxed space-y-6">
            {blog.content ? (
              <div
                className="space-y-4 article-body"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                  {blog.description}
                </p>
                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 my-6">
                  <h3 className="text-lg font-bold text-[#071d55] mb-2 flex items-center gap-2">
                    <Sparkles className="text-blue-600" size={18} />
                    Key Takeaways for School Leaders
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Modernizing school operations through intuitive cloud tools reduces administrative friction, gives parents transparent updates in real-time, and frees teachers to focus on student growth and excellence.
                  </p>
                </div>
              </div>
            )}
          </article>

          {/* Social Share & Author Signoff */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Share this knowledge
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition"
                  aria-label="Share on X"
                >
                  <FaXTwitter size={14} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn size={14} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog.title} - ${currentUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp size={15} />
                </a>
              </div>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#071d55] hover:bg-blue-50 transition shadow-2xs"
            >
              <ArrowLeft size={16} /> All Blog Articles
            </Link>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-[#071d55] mb-6">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((item) => (
                  <Link
                    key={item._id}
                    to={`/blog/${item._id}`}
                    className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition duration-200"
                  >
                    <div className="h-40 bg-blue-50 overflow-hidden">
                      <img
                        src={item.image || heroImg}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-[#071d55] group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};
