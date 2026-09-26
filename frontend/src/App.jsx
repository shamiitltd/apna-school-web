import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Features } from "./pages/Features";
import { HowItWorks } from "./pages/HowItWorks";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { BlogManagement } from "./pages/admin/BlogManagement";
import { CreateBlog } from "./pages/admin/CreateBlog";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

function PublicLayout() {
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
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
            <Route path="media" element={<BlogManagement />} />
            <Route path="analytics" element={<BlogManagement />} />
            <Route path="subscribers" element={<BlogManagement />} />
            <Route path="settings" element={<BlogManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
