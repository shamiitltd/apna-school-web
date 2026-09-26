import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Eye,
  Send,
  Save,
  Bold,
  Italic,
  List,
  Heading2,
  Quote,
  Clock,
  User,
  Tag,
} from "lucide-react";
import heroAvatar from "../../assets/hero-avatar-blog.png";

export const CreateBlog = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const categories = [
    "For Students",
    "For Parents",
    "For Teachers",
    "Product Updates",
    "Tips & Guides",
    "Study Tips",
    "Productivity",
    "Exams",
    "Career",
  ];

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "For Students",
    image: "",
    status: "Published",
    isFeatured: false,
    isPopular: false,
    authorName: "Admin",
    readTime: 4,
    publishedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch blog data if editing
  useEffect(() => {
    if (!id) return;

    const fetchSingleBlog = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${API_URL}/blogs/${id}`);
        const data = await res.json();

        if (data.success && data.data) {
          const b = data.data;
          setFormData({
            title: b.title || "",
            description: b.description || "",
            content: b.content || "",
            category: b.category || "For Students",
            image: b.image || "",
            status: b.status || "Published",
            isFeatured: Boolean(b.isFeatured),
            isPopular: Boolean(b.isPopular),
            authorName: b.author?.name || "Admin",
            readTime: b.author?.readTime || 4,
            publishedAt:
              b.author?.publishedAt ||
              new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          });
        }
      } catch (err) {
        console.error("Error fetching blog for editing:", err);
        setError("Could not load blog details.");
      } finally {
        setFetching(false);
      }
    };

    fetchSingleBlog();
  }, [id, API_URL]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // Helper formatting for content editor
  const insertFormatting = (syntax) => {
    const textarea = document.getElementById("blog-content-area");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || "text";

    let replacement = "";
    if (syntax === "bold") replacement = `**${selected}**`;
    if (syntax === "italic") replacement = `*${selected}*`;
    if (syntax === "heading") replacement = `\n## ${selected}\n`;
    if (syntax === "quote") replacement = `\n> ${selected}\n`;
    if (syntax === "list") replacement = `\n- ${selected}\n`;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    handleChange("content", newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + replacement.length,
        start + replacement.length
      );
    }, 0);
  };

  // Submit Handler
  const handleSubmit = async (submitStatus) => {
    if (!formData.title.trim()) {
      setError("Please enter an article title.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please provide a short description or summary.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content,
        category: formData.category,
        image: formData.image.trim() || heroAvatar,
        status: submitStatus || formData.status,
        isFeatured: formData.isFeatured,
        isPopular: formData.isPopular,
        author: {
          name: formData.authorName.trim() || "Admin",
          readTime: Number(formData.readTime) || 4,
          publishedAt: formData.publishedAt,
        },
      };

      const endpoint = isEditing ? `${API_URL}/blogs/${id}` : `${API_URL}/blogs`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(
          isEditing
            ? "Article updated successfully!"
            : "Article published successfully!"
        );
        setTimeout(() => {
          navigate("/admin/blogs");
        }, 1200);
      } else {
        setError(data.message || "Failed to save blog post.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold text-slate-500">
          Loading article data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1300px] mx-auto pb-12">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <Link
            to="/admin/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blog Management</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071d55] tracking-tight">
            {isEditing ? "Edit Article" : "Create New Article"}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit("Draft")}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("Published")}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>{isEditing ? "Update Article" : "Publish Article"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-sm text-red-700 font-medium animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-sm text-emerald-700 font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ================= MAIN FORM GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
        {/* LEFT COLUMN: Main Article Details */}
        <div className="flex flex-col gap-6">
          {/* Title Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 10 Simple Habits for a More Organized School Life"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-base font-bold text-[#071d55] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Description / Summary Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Excerpt / Short Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Brief summary that appears on blog cards and search previews..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-2xs resize-none"
            />
          </div>

          {/* Article Content Editor Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Article Body Content
              </label>

              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => insertFormatting("bold")}
                  title="Bold"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("italic")}
                  title="Italic"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("heading")}
                  title="Heading 2"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("list")}
                  title="Bullet List"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("quote")}
                  title="Quote"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              id="blog-content-area"
              rows={12}
              placeholder="Write your article content here in detail..."
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-2xs font-normal"
            />
          </div>

          {/* Featured Image Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Cover Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-44 h-32 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] font-semibold">No Image Set</span>
                  </div>
                )}
              </div>

              <div className="flex-1 w-full flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Paste Image URL or Leave empty for default..."
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
                />
                <p className="text-[11px] text-slate-400">
                  Tip: Provide an image URL (PNG, JPG, WebP) for the blog card header.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Publishing & Metadata Settings */}
        <div className="flex flex-col gap-6">
          {/* Category & Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-5">
            <h3 className="text-sm font-extrabold text-[#071d55] flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Categorization & Status</span>
            </h3>

            {/* Category Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Publication Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          {/* Author Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-[#071d55] flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Author Info</span>
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Author Name</label>
              <input
                type="text"
                placeholder="Author Name"
                value={formData.authorName}
                onChange={(e) => handleChange("authorName", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Read Time (minutes)</span>
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={formData.readTime}
                onChange={(e) => handleChange("readTime", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
              />
            </div>
          </div>

          {/* Highlight Options Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-[#071d55] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Visibility & Badges</span>
            </h3>

            {/* Featured Switch */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer border border-slate-200/60">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Featured Article</span>
                <span className="text-[11px] text-slate-400">Display in Blog Hero</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => handleChange("isFeatured", e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            {/* Popular Switch */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer border border-slate-200/60">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Trending / Popular</span>
                <span className="text-[11px] text-slate-400">Show in Popular Sidebar</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => handleChange("isPopular", e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
