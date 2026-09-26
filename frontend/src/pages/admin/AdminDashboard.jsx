import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  PenSquare,
  Image as ImageIcon,
  Loader2,
  Send,
  Edit,
} from "lucide-react";
import heroAvatar from "../../assets/hero-avatar-blog.png";
import boyAvatar from "../../assets/boy_avatar.png";

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [categoryTimeRange, setCategoryTimeRange] = useState("All Time");

  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPosts: 0,
      postsThisMonth: 0,
      postsGrowthPct: 12,
      totalViews: 0,
      viewsThisMonth: 0,
      viewsGrowthPct: 28,
      totalLikes: 0,
      likesThisMonth: 0,
      likesGrowthPct: 18,
      totalSubscribers: 0,
      subscribersThisMonth: 0,
      subscribersGrowthPct: 24,
    },
    categories: [],
    viewsOverview: [],
    recentPosts: [],
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // 1. Fetch Dynamic Dashboard Stats from MongoDB
  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        timeRange,
        categoryTimeRange,
      });

      const res = await fetch(`${API_URL}/blogs/dashboard-stats?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setDashboardData(data.data);
      }
    } catch (err) {
      console.error("Error fetching dynamic dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL, timeRange, categoryTimeRange]);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const { stats, categories = [], viewsOverview = [], recentPosts = [] } = dashboardData;

  // Category sum for percentage calculation
  const totalCategorySum = categories.reduce((acc, c) => acc + (c.count || 0), 0) || 1;

  // Category Badge Colors helper
  const getCategoryBadgeColor = (category) => {
    switch (category?.toLowerCase()) {
      case "for students":
      case "students":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "for parents":
      case "parents":
        return "bg-pink-50 text-pink-700 border-pink-100";
      case "for teachers":
      case "teachers":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "product updates":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  // Build SVG Path dynamically from viewsOverview
  const rawMaxViews = Math.max(...viewsOverview.map((v) => v.views || 0), 10);
  const chartMaxViews = Math.ceil(rawMaxViews * 1.15); // Add headroom

  const chartPoints = viewsOverview.map((item, idx) => {
    const x = Math.round((idx / Math.max(viewsOverview.length - 1, 1)) * 600);
    const normalizedY = 175 - Math.round(((item.views || 0) / chartMaxViews) * 140);
    return { x, y: Math.max(25, normalizedY), ...item };
  });

  // Calculate SVG curve path using Catmull-Rom or cubic Bezier
  const svgPathD = chartPoints.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, "");

  const svgAreaD = `${svgPathD} L 600 190 L 0 190 Z`;

  // Determine active displayed point (hovered point or highest peak)
  const peakPoint = chartPoints.reduce(
    (max, pt) => (pt.views > (max?.views || 0) ? pt : max),
    chartPoints[0] || { x: 300, y: 45, views: 0, label: "Peak" }
  );

  const activePoint = hoveredPoint || peakPoint;

  return (
    <div className="flex flex-col gap-7 max-w-[1400px] mx-auto pb-8">
      {/* ================= 1. WELCOME BANNER & CTA ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Welcome Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-center max-w-md">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071d55] tracking-tight">
              Welcome back, <span className="text-blue-600">Admin!</span> 👋
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
              Here&apos;s real-time live performance across your school blog.
            </p>
          </div>

          {/* Mascot Illustration */}
          <div className="relative z-10 w-44 sm:w-52 shrink-0 flex items-center justify-center">
            <img
              src={boyAvatar || heroAvatar}
              alt="Welcome Mascot"
              className="w-full h-auto object-contain max-h-36 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Create New Blog Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-50 rounded-full blur-xl pointer-events-none" />

          <div>
            <Link
              to="/admin/create-blog"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-[0.99] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Blog</span>
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Manage and publish engaging content for students, parents and teachers.
            </p>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Send className="w-4 h-4 -rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. SUMMARY STATS CARDS (100% DYNAMIC FROM MONGODB) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Posts */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.postsGrowthPct}%</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Total Posts</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {loading ? "..." : stats.totalPosts}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {stats.postsThisMonth} new this month
              </span>
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.viewsGrowthPct}%</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Total Views</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {loading
                  ? "..."
                  : stats.totalViews > 1000
                  ? `${(stats.totalViews / 1000).toFixed(1)}K`
                  : stats.totalViews}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {stats.viewsThisMonth > 1000
                  ? `${(stats.viewsThisMonth / 1000).toFixed(1)}K`
                  : stats.viewsThisMonth}{" "}
                this month
              </span>
            </div>
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.likesGrowthPct}%</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Total Likes</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {loading
                  ? "..."
                  : stats.totalLikes > 1000
                  ? `${(stats.totalLikes / 1000).toFixed(1)}K`
                  : stats.totalLikes}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {stats.likesThisMonth} this month
              </span>
            </div>
          </div>
        </div>

        {/* Total Subscribers */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.subscribersGrowthPct}%</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Subscribers</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {loading ? "..." : stats.totalSubscribers}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {stats.subscribersThisMonth > 0 ? `${stats.subscribersThisMonth} new this month` : "Active readers"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. ANALYTICS ROW (VIEWS GRAPH + CATEGORY DONUT) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-stretch">
        {/* Left: Views Overview Line Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#071d55]">Views Overview</h2>
                <span className="text-[11px] text-slate-400 font-medium">Dynamic traffic timeline</span>
              </div>
            </div>

            {/* Time Filter Select */}
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200/80 pl-3.5 pr-8 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="This Year">This Year</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* SVG Dynamic Area Chart */}
          <div className="pt-6 pb-2 w-full">
            <div className="relative w-full h-56 sm:h-64">
              {/* Dynamic Interactive Tooltip */}
              {activePoint && (
                <div
                  className="absolute bg-white border border-blue-100 px-3.5 py-1.5 rounded-xl shadow-lg shadow-blue-500/15 text-center z-10 pointer-events-none -translate-x-1/2 transition-all duration-200"
                  style={{
                    left: `${Math.min(92, Math.max(8, (activePoint.x / 600) * 100))}%`,
                    top: `${Math.max(0, (activePoint.y / 200) * 100 - 24)}%`,
                  }}
                >
                  <span className="text-[10px] text-slate-400 block font-medium">{activePoint.label}</span>
                  <span className="text-xs font-extrabold text-blue-600">
                    {activePoint.views?.toLocaleString()} views
                  </span>
                </div>
              )}

              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="#e2e8f0" strokeWidth="1" />

                {/* Gradient Area Fill */}
                <path d={svgAreaD} fill="url(#viewsGradient)" />

                {/* Smooth Curve Line */}
                <path
                  d={svgPathD}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Interactive Data Nodes */}
                {chartPoints.map((point, idx) => {
                  const isActive = activePoint?.label === point.label;
                  return (
                    <g key={idx}>
                      {/* Invisible hover hotspot */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="16"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint(point)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      {/* Visible Node */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={isActive ? 6 : 4}
                        fill={isActive ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb"
                        strokeWidth={isActive ? 3 : 2}
                        className="transition-all duration-200 pointer-events-none"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-3 px-1">
              {viewsOverview.map((item, idx) => (
                <span
                  key={idx}
                  className={`cursor-pointer transition-colors ${
                    activePoint?.label === item.label ? "text-blue-600 font-bold" : "hover:text-slate-600"
                  }`}
                  onMouseEnter={() => setHoveredPoint(chartPoints[idx])}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Posts by Category Donut Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100/80">
            <div>
              <h2 className="text-lg font-bold text-[#071d55]">Posts by Category</h2>
              <span className="text-[11px] text-slate-400 font-medium">Distribution breakdown</span>
            </div>
            <div className="relative">
              <select
                value={categoryTimeRange}
                onChange={(e) => setCategoryTimeRange(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200/80 pl-3 pr-7 py-1.5 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="All Time">All Time</option>
                <option value="This Month">This Month</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Donut Graphic & Center Text */}
          <div className="flex items-center justify-center my-1 relative">
            <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="18" />
              {/* Dynamic SVG Donut Segments */}
              {(() => {
                const circumference = 2 * Math.PI * 46; // ~289
                let cumulativeOffset = 0;

                return categories.map((cat, index) => {
                  const fraction = (cat.count || 0) / totalCategorySum;
                  const strokeLength = Math.max(fraction * circumference, 2);
                  const dashArray = `${strokeLength} ${circumference}`;
                  const offset = -cumulativeOffset;
                  cumulativeOffset += strokeLength;

                  return (
                    <circle
                      key={index}
                      cx="60"
                      cy="60"
                      r="46"
                      fill="transparent"
                      stroke={cat.color || "#3b82f6"}
                      strokeWidth="18"
                      strokeDasharray={dashArray}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-[#071d55]">
                {loading ? "..." : categories.reduce((sum, c) => sum + (c.count || 0), 0)}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Posts</span>
            </div>
          </div>

          {/* Category Breakdown List */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100/80 max-h-48 overflow-y-auto">
            {categories.map((cat) => {
              const pct = Math.round(((cat.count || 0) / totalCategorySum) * 100);
              return (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="font-semibold text-slate-700">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {cat.count} <span className="text-slate-400 font-normal">({pct}%)</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 4. BOTTOM ROW: RECENT POSTS + QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Recent Blog Posts Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
            <h2 className="text-lg font-bold text-[#071d55]">Recent Blog Posts</h2>
            <Link
              to="/admin/blogs"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-xs text-slate-400">Loading live articles...</p>
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No blog posts found in database.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 px-3">Category</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-center">Views</th>
                    <th className="pb-3 px-3">Date</th>
                    <th className="pb-3 pl-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentPosts.map((blog) => {
                    const status = blog.status || "Published";
                    return (
                      <tr key={blog._id} className="hover:bg-blue-50/20 transition-colors">
                        {/* Title + Thumbnail */}
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={blog.image || heroAvatar}
                              alt={blog.title}
                              className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                            />
                            <span className="text-xs font-bold text-[#071d55] line-clamp-1 hover:text-blue-600 transition-colors max-w-[200px]">
                              {blog.title}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-3">
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeColor(
                              blog.category
                            )}`}
                          >
                            {blog.category || "General"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                status === "Published"
                                  ? "bg-emerald-500"
                                  : status === "Scheduled"
                                  ? "bg-amber-500"
                                  : "bg-slate-400"
                              }`}
                            />
                            <span className="text-xs font-semibold text-slate-700">{status}</span>
                          </div>
                        </td>

                        {/* Views */}
                        <td className="py-3.5 px-3 text-center text-xs font-bold text-slate-700">
                          {blog.views || 0}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-3 text-xs font-semibold text-slate-500">
                          {blog.author?.publishedAt || "Recently"}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 pl-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to={`/admin/edit-blog/${blog._id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Quick Actions Widget */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col gap-4">
          <div className="pb-3 border-b border-slate-100/80">
            <h2 className="text-lg font-bold text-[#071d55] flex items-center gap-2">
              <span>⚡ Quick Actions</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/create-blog"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100/90 flex flex-col gap-2 transition-all group shadow-2xs"
            >
              <PenSquare className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">
                Create New Blog
              </span>
            </Link>

            <Link
              to="/admin/blogs"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100/90 flex flex-col gap-2 transition-all group shadow-2xs"
            >
              <FileText className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600">
                Manage Content
              </span>
            </Link>

            <Link
              to="/admin/media"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100/90 flex flex-col gap-2 transition-all group shadow-2xs"
            >
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-600">
                Media Library
              </span>
            </Link>

            <Link
              to="/admin/subscribers"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100/90 flex flex-col gap-2 transition-all group shadow-2xs"
            >
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-bold text-slate-700 group-hover:text-purple-600">
                Subscribers
              </span>
            </Link>
          </div>

          {/* View Public Blog Site button */}
          <Link
            to="/blog"
            target="_blank"
            className="mt-2 w-full py-3 px-4 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <span>View Live Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
