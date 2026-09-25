import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import logo from "../../assets/logo.png";

export const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/blogs");
      } else {
        setError(data.message || "Invalid password. Please try again.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Unable to connect to authentication server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f8ff] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 border border-blue-50/80 backdrop-blur-xs">
          {/* Header Brand - Logo Only */}
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Apna School" className="h-24 sm:h-28 w-auto object-contain" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} noValidate className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter admin password"
                  autoFocus
                  className={`w-full pl-10 pr-11 py-3.5 bg-slate-50 border rounded-2xl text-sm transition-all focus:bg-white focus:outline-none ${
                    error
                      ? "border-red-400 focus:ring-2 focus:ring-red-400/30 text-red-950"
                      : "border-slate-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-800"
                  }`}
                />
                <Lock
                  className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                    error ? "text-red-400" : "text-slate-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Styled Error Feedback */}
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium px-1 pt-1 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 cursor-pointer text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
