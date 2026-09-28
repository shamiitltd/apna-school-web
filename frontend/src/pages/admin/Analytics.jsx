import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Users,
  Heart,
  Mail,
  TrendingUp,
  ChevronDown,
  Calendar,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Search,
  Loader2,
  FileText,
} from "lucide-react";
import boyAvatar from "../../assets/boy_avatar.png";
import heroAvatar from "../../assets/hero-avatar-blog.png";

export const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [demographicTab, setDemographicTab] = useState("age"); // "age" | "gender"
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const [analyticsData, setAnalyticsData] = useState({
    metrics: {
      totalViews: 0,
      viewsGrowthPct: 0,
      viewsGrowthCount: 0,
      uniqueVisitors: 0,
      visitorsGrowthPct: 0,
      visitorsGrowthCount: 0,
      totalLikes: 0,
      likesGrowthPct: 0,
      likesGrowthCount: 0,
      totalSubscribers: 0,
      subscribersGrowthPct: 0,
      subscribersGrowthCount: 0,
    },
    timeline: [],
    trafficSources: [],
    topPosts: [],
    ageDemographics: [],
    genderDemographics: [],
    devices: [],
    topCountries: [],
    topSearchQueries: [],
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/analytics?timeRange=${encodeURIComponent(timeRange)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setAnalyticsData(data.data);
      }
    } catch (err) {
      console.error("Error fetching analytics data:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL, timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const {
    metrics,
    timeline = [],
    trafficSources = [],
    topPosts = [],
    ageDemographics = [],
    genderDemographics = [],
    devices = [],
    topCountries = [],
    topSearchQueries = [],
  } = analyticsData;

  // Build Dual Area SVG chart math
  const rawMax = Math.max(...timeline.map((t) => Math.max(t.pageViews || 0, t.visitors || 0)), 10);
  const chartMax = Math.ceil(rawMax * 1.25);

  const pageViewPoints = timeline.map((item, idx) => {
    const x = Math.round((idx / Math.max(timeline.length - 1, 1)) * 600);
    const normalizedY = 175 - Math.round(((item.pageViews || 0) / chartMax) * 140);
    return { x, y: Math.max(25, normalizedY), ...item };
  });

  const visitorPoints = timeline.map((item, idx) => {
    const x = Math.round((idx / Math.max(timeline.length - 1, 1)) * 600);
    const normalizedY = 175 - Math.round(((item.visitors || 0) / chartMax) * 140);
    return { x, y: Math.max(35, normalizedY), ...item };
  });

  const buildPathD = (points) => {
    return points.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (pt.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (pt.x - prev.x) / 2;
      const cp2y = pt.y;
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
    }, "");
  };

  const pageViewsPathD = buildPathD(pageViewPoints);
  const pageViewsAreaD = `${pageViewsPathD} L 600 190 L 0 190 Z`;

  const visitorsPathD = buildPathD(visitorPoints);
  const visitorsAreaD = `${visitorsPathD} L 600 190 L 0 190 Z`;

  const activePoint = hoveredPoint || pageViewPoints[Math.floor(pageViewPoints.length / 2)];

  // Donut chart math
  const totalTrafficSum = trafficSources.reduce((acc, t) => acc + (t.percentage || 0), 0) || 100;

  return (
    <div className="flex flex-col gap-7 max-w-[1440px] mx-auto pb-12">
      {/* ================= 1. HEADER WITH MASCOT BANNER ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-300">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

        {/* Title & Subtitle */}
        <div className="relative z-10 max-w-xl">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
            Analytics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071d55] mt-1 tracking-tight">
            Track Your Blog <span className="text-blue-600">Performance</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed font-normal">
            Get comprehensive real-time insights into your content reach, audience engagement and growth.
          </p>

          {/* Dynamic Date Picker Dropdown */}
          <div className="mt-4 relative inline-block">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100/90 border border-slate-200/80 pl-9 pr-9 py-2 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Last 30 Days">
                {(() => {
                  const now = new Date();
                  const start = new Date(now);
                  start.setDate(start.getDate() - 29);
                  return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                })()} (Last 30 Days)
              </option>
              <option value="Last 7 Days">
                {(() => {
                  const now = new Date();
                  const start = new Date(now);
                  start.setDate(start.getDate() - 6);
                  return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                })()} (Last 7 Days)
              </option>
              <option value="This Year">
                {(() => {
                  const now = new Date();
                  const start = new Date(now.getFullYear(), 0, 1);
                  return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                })()} (This Year)
              </option>
            </select>
            <Calendar className="w-3.5 h-3.5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Mascot & Growth Illustration */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Floating Sticky Note */}
          <div className="hidden sm:flex flex-col bg-amber-50 border border-amber-200/80 p-3 rounded-2xl shadow-sm -rotate-3 text-amber-900 transition-transform duration-300 hover:rotate-0 hover:scale-105">
            <span className="text-xs font-extrabold">Insights lead to</span>
            <span className="text-xs font-bold text-amber-700">better content! 📈</span>
          </div>

          <div className="w-40 sm:w-48 shrink-0 flex items-center justify-center">
            <img
              src={boyAvatar || heroAvatar}
              alt="Analytics Mascot"
              className="w-full h-auto object-contain max-h-36 drop-shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ================= 2. TOP 4 SUMMARY STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Views */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{metrics.viewsGrowthPct}%</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {metrics.totalViews > 1000 ? `${(metrics.totalViews / 1000).toFixed(1)}K` : metrics.totalViews}
              </h3>
              <span className="text-xs font-semibold text-slate-400">Total Views</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              +{metrics.viewsGrowthCount > 1000 ? `${(metrics.viewsGrowthCount / 1000).toFixed(1)}K` : metrics.viewsGrowthCount} from last month
            </p>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{metrics.visitorsGrowthPct}%</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {metrics.uniqueVisitors > 1000 ? `${(metrics.uniqueVisitors / 1000).toFixed(1)}K` : metrics.uniqueVisitors}
              </h3>
              <span className="text-xs font-semibold text-slate-400">Unique Visitors</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              +{metrics.visitorsGrowthCount} from last month
            </p>
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{metrics.likesGrowthPct}%</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {metrics.totalLikes > 1000 ? `${(metrics.totalLikes / 1000).toFixed(1)}K` : metrics.totalLikes}
              </h3>
              <span className="text-xs font-semibold text-slate-400">Total Likes</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              +{metrics.likesGrowthCount} from last month
            </p>
          </div>
        </div>

        {/* Total Subscribers */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>+{metrics.subscribersGrowthPct}%</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071d55]">
                {metrics.totalSubscribers}
              </h3>
              <span className="text-xs font-semibold text-slate-400">Subscribers</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              +{metrics.subscribersGrowthCount} from last month
            </p>
          </div>
        </div>
      </div>

      {/* ================= 3. VIEWS & VISITORS DUAL GRAPH + TRAFFIC SOURCES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-stretch">
        {/* Left: Dual Line & Area Graph */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col justify-between transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#071d55]">
                Views & Visitors
              </h2>
            </div>

            {/* Legend & Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-slate-600">Page Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-slate-600">Unique Visitors</span>
                </div>
              </div>

              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 pl-3 pr-7 py-1.5 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="This Year">This Year</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* SVG Dual Area Graph */}
          <div className="pt-6 pb-2 w-full">
            <div className="relative w-full h-64">
              {/* Tooltip Card */}
              {activePoint && (
                <div
                  className="absolute bg-white border border-slate-200/80 px-3.5 py-2 rounded-2xl shadow-xl text-left z-20 pointer-events-none -translate-x-1/2 transition-all duration-200"
                  style={{
                    left: `${Math.min(88, Math.max(12, (activePoint.x / 600) * 100))}%`,
                    top: `${Math.max(5, (activePoint.y / 200) * 100 - 30)}%`,
                  }}
                >
                  <span className="text-[10px] text-slate-400 block font-bold mb-1">
                    {activePoint.label}, {new Date().getFullYear()}
                  </span>
                  <div className="flex flex-col gap-0.5 text-xs">
                    <div className="flex items-center gap-1.5 font-extrabold text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>{activePoint.pageViews?.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-purple-600">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>{activePoint.visitors?.toLocaleString()} visitors</span>
                    </div>
                  </div>
                </div>
              )}

              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="#e2e8f0" strokeWidth="1" />

                {/* Page Views Area & Line */}
                <path d={pageViewsAreaD} fill="url(#pageViewsGrad)" className="transition-all duration-500" />
                <path d={pageViewsPathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" className="transition-all duration-500" />

                {/* Visitors Area & Line */}
                <path d={visitorsAreaD} fill="url(#visitorsGrad)" className="transition-all duration-500" />
                <path d={visitorsPathD} fill="none" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" className="transition-all duration-500" />

                {/* Hotspot Circles */}
                {pageViewPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r="16"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-3 px-1">
              {timeline.map((item, idx) => (
                <span
                  key={idx}
                  className={`cursor-pointer transition-colors duration-200 ${
                    activePoint?.label === item.label ? "text-blue-600 font-bold" : "hover:text-slate-600"
                  }`}
                  onMouseEnter={() => setHoveredPoint(pageViewPoints[idx])}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top Traffic Sources Donut Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col justify-between gap-4 transition-all duration-300">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-[#071d55]">Top Traffic Sources</h2>
            <span className="text-xs font-semibold text-slate-400">Last 30 Days</span>
          </div>

          {/* Donut Graphic with center text */}
          <div className="flex items-center justify-center my-2 relative">
            <svg className="w-40 h-40 -rotate-90 transform" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="18" />
              {(() => {
                const circumference = 2 * Math.PI * 46;
                let cumulativeOffset = 0;

                return trafficSources.map((item, index) => {
                  const fraction = (item.percentage || 0) / totalTrafficSum;
                  const strokeLength = fraction * circumference;
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
                      stroke={item.color}
                      strokeWidth="18"
                      strokeDasharray={dashArray}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-[#071d55]">
                {metrics.totalViews > 1000 ? `${(metrics.totalViews / 1000).toFixed(1)}K` : metrics.totalViews}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Views</span>
            </div>
          </div>

          {/* Traffic Legend Breakdown */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            {trafficSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-xs hover:bg-slate-50 p-1 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                  <span className="font-semibold text-slate-700">{source.name}</span>
                </div>
                <span className="font-bold text-slate-800">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 4. ROW 3: EQUAL-HEIGHT STRETCHED 3-COLUMN ANALYTICS GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* ================= COLUMN 1: TOP PERFORMING POSTS ================= */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#071d55] flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Top Performing Posts</span>
              </h3>
              <Link
                to="/admin/blogs"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {topPosts.length === 0 ? (
              <p className="text-xs text-slate-400 py-12 text-center">No posts available</p>
            ) : (
              <div className="flex flex-col divide-y divide-slate-100 mt-1">
                {topPosts.map((post, idx) => (
                  <div
                    key={post._id}
                    className="py-3.5 flex items-center justify-between gap-3 hover:bg-blue-50/40 hover:scale-[1.01] transition-all duration-200 rounded-2xl px-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-extrabold text-slate-400 w-4 text-center">
                        {idx + 1}
                      </span>
                      <img
                        src={post.image || heroAvatar}
                        alt={post.title}
                        className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#071d55] truncate hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {post.category || "General"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right shrink-0">
                      <div>
                        <span className="text-xs font-extrabold text-[#071d55] block">
                          {post.views > 1000 ? `${(post.views / 1000).toFixed(1)}K` : post.views || 0}
                        </span>
                        <span className="text-[10px] text-slate-400">Views</span>
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-purple-600 block">
                          {post.likes || 0}
                        </span>
                        <span className="text-[10px] text-slate-400">Likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: DEMOGRAPHICS & DEVICE BREAKDOWN ================= */}
        <div className="flex flex-col gap-6 h-full justify-between">
          {/* Audience Demographics */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex-1 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#071d55]">Audience Demographics</h3>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-[11px] font-bold">
                  <button
                    onClick={() => setDemographicTab("age")}
                    className={`px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                      demographicTab === "age" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Age Group
                  </button>
                  <button
                    onClick={() => setDemographicTab("gender")}
                    className={`px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                      demographicTab === "gender" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Gender
                  </button>
                </div>
              </div>

              {/* Bar Chart Visualizer */}
              {demographicTab === "age" ? (
                <div className="pt-3 animate-in fade-in duration-200">
                  <div className="h-32 flex items-end justify-between gap-3 px-2 pb-2 border-b border-slate-100">
                    {ageDemographics.map((item) => (
                      <div key={item.age} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[10px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                          {item.percentage}%
                        </span>
                        <div
                          className="w-full rounded-t-xl transition-all duration-500 shadow-xs group-hover:brightness-110"
                          style={{
                            height: `${item.percentage * 2.4}px`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-2 px-1">
                    {ageDemographics.map((item) => (
                      <span key={item.age}>{item.age}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 py-3 animate-in fade-in duration-200">
                  {genderDemographics.map((item) => (
                    <div key={item.gender} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700">{item.gender}</span>
                        <span className="text-slate-800">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex-1 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#071d55]">Device Breakdown</h3>
                <span className="text-xs font-semibold text-slate-400">Last 30 Days</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {devices.map((dev) => (
                  <div
                    key={dev.name}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 flex flex-col items-center text-center gap-1.5 transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white text-blue-600 shadow-2xs flex items-center justify-center">
                      {dev.name === "Desktop" ? (
                        <Monitor className="w-4 h-4" />
                      ) : dev.name === "Mobile" ? (
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Tablet className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <span className="text-base font-extrabold text-[#071d55]">{dev.percentage}%</span>
                    <span className="text-[11px] font-semibold text-slate-400">{dev.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3: TOP COUNTRIES & TOP SEARCH QUERIES ================= */}
        <div className="flex flex-col gap-6 h-full justify-between">
          {/* Top Countries */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex-1 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#071d55] flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Top Countries</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400">Last 30 Days</span>
              </div>

              <div className="flex flex-col gap-2.5 mt-2.5">
                {topCountries.map((country) => (
                  <div
                    key={country.name}
                    className="flex items-center justify-between gap-3 text-xs hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base">{country.flag}</span>
                      <span className="font-bold text-slate-700 truncate">{country.name}</span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="w-20 sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-700"
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-slate-800 text-[11px] w-8 text-right">
                        {country.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Search Queries */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex-1 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#071d55] flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>Top Search Queries</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400">Organic</span>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 mt-1">
                {topSearchQueries.map((q, idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-lg bg-slate-100 text-slate-500 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-700 truncate">{q.query}</span>
                    </div>
                    <span className="font-extrabold text-slate-800 text-xs shrink-0 ml-2">
                      {q.searches > 1000 ? `${(q.searches / 1000).toFixed(1)}K` : q.searches}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
