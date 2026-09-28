import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Features } from "./pages/Features";
import { HowItWorks } from "./pages/HowItWorks";
import { Blog } from "./pages/Blog";
import { BlogPostDetail } from "./pages/BlogPostDetail";
import { FAQ } from "./pages/FAQ";
import { Pricing } from "./pages/Pricing";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Mission } from "./pages/Mission";
import { HelpCenter } from "./pages/HelpCenter";
import { Careers } from "./pages/Careers";
import { VideoTutorials } from "./pages/VideoTutorials";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { Updates } from "./pages/Updates";
import { NotFound } from "./pages/NotFound";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { BlogManagement } from "./pages/admin/BlogManagement";
import { CreateBlog } from "./pages/admin/CreateBlog";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { MediaLibrary } from "./pages/admin/MediaLibrary";
import { Analytics } from "./pages/admin/Analytics";

function PublicLayout() {
  useEffect(() => {
    // High-security cleanup: Delete admin session whenever navigating to public pages
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes with Main Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/user-guides" element={<HelpCenter />} />
          <Route path="/video-tutorials" element={<VideoTutorials />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Authentication Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes (Protected by Master Password / Token) */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="edit-blog/:id" element={<CreateBlog />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="subscribers" element={<BlogManagement />} />
            <Route path="settings" element={<BlogManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

