import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth verify failed:", err);
        // If server is temporarily unreachable, fallback to checking token presence or false
        setIsAuthenticated(Boolean(token));
      }
    };

    checkAuth();
  }, [API_URL]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fbff]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
