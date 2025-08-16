import { useState, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import StudentSignup from "./components/StudentSignUp/StudentSignUp";
import { StudentDashboard } from "./components/StudentDashboard";
import AdminDashboardPage from "./components/AdminDashboardPage";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSignup from "./components/AdminSignUp/AdminSignUp";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import "./style.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [studentId, setStudentId] = useState(null);
  const [_adminId, setAdminId] = useState(null);

  // Function to get current page from URL
  const getPageFromUrl = () => {
    const path = window.location.pathname.slice(1); // Remove leading slash
    return path || "home";
  };

  // Function to update URL when page changes
  const updateUrl = (page) => {
    const url = page === "home" ? "/" : `/${page}`;
    window.history.pushState(null, "", url);
  };

  // Enhanced setCurrentPage that also updates URL
  const navigateToPage = (page) => {
    setCurrentPage(page);
    updateUrl(page);
  };

  useEffect(() => {
    // Get initial page from URL
    const urlPage = getPageFromUrl();

    const storedId = localStorage.getItem("studentId");
    const storedAdminId = localStorage.getItem("adminId");

    // Restore session state but do not auto-redirect from home
    if (storedId) setStudentId(storedId);
    if (storedAdminId) setAdminId(storedAdminId);

    // Guard protected routes when not authenticated
    if (urlPage === "dashboard" && !storedId) {
      setCurrentPage("login");
      updateUrl("login");
    } else if (urlPage === "admin-dashboard" && !storedAdminId) {
      setCurrentPage("admin-login");
      updateUrl("admin-login");
    } else {
      // Honor the URL (including home) without forcing a redirect
      setCurrentPage(urlPage);
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const page = getPageFromUrl();
      setCurrentPage(page);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("adminId");
    setStudentId(null);
    setAdminId(null);
    navigateToPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigateToPage} />;
      case "about":
        return <AboutPage onNavigate={navigateToPage} />;
      case "contact":
        return <ContactPage onNavigate={navigateToPage} />;
      case "login":
        return (
          <StudentLogin
            onNavigate={navigateToPage}
            onLoginSuccess={(id) => {
              localStorage.setItem("studentId", id);
              setStudentId(id);
              navigateToPage("dashboard");
            }}
          />
        );
      case "signup":
        return <StudentSignup onNavigate={navigateToPage} />;
      case "dashboard":
        return (
          <StudentDashboard
            studentId={studentId}
            onLogout={handleLogout}
            onNavigate={navigateToPage}
          />
        );
      case "admin-login":
        return (
          <AdminLogin
            onNavigate={navigateToPage}
            onLoginSuccess={(id) => {
              localStorage.setItem("adminId", id);
              setAdminId(id);
              navigateToPage("admin-dashboard");
            }}
          />
        );
      case "admin-signup":
        return <AdminSignup onNavigate={navigateToPage} />;
      case "admin-dashboard":
        return <AdminDashboardPage onNavigate={navigateToPage} />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}
