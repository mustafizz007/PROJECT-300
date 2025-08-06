import { useState, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import StudentSignup from "./components/StudentSignUp/StudentSignUp";
import { StudentDashboard } from "./components/StudentDashboard";
import AdminDashboardPage from "./components/AdminDashboardPage";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSignup from "./components/AdminSignUp/AdminSignUp";
import "./style.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [studentId, setStudentId] = useState(null);
  const [_adminId, setAdminId] = useState(null);

  // On mount, check for existing studentId but do NOT auto-navigate to dashboard
  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    const storedAdminId = localStorage.getItem("adminId");
    if (storedId) {
      setStudentId(storedId);
      // Do not setCurrentPage("dashboard")
    }
    if (storedAdminId) {
      setAdminId(storedAdminId);
      // Do not setCurrentPage("admin-dashboard")
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("adminId");
    setStudentId(null);
    setAdminId(null);
    setCurrentPage("home");
  };

  // Page rendering logic
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "login":
        return (
          <StudentLogin
            onNavigate={setCurrentPage}
            onLoginSuccess={(id) => {
              localStorage.setItem("studentId", id);
              setStudentId(id);
              setCurrentPage("dashboard");
            }}
          />
        );
      case "signup":
        return <StudentSignup onNavigate={setCurrentPage} />;
      case "dashboard":
        return (
          <StudentDashboard
            studentId={studentId}
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
          />
        );
      case "admin-login":
        return (
          <AdminLogin
            onNavigate={setCurrentPage}
            onLoginSuccess={(id) => {
              localStorage.setItem("adminId", id);
              setAdminId(id);
              setCurrentPage("admin-dashboard");
            }}
          />
        );
      case "admin-signup":
        return <AdminSignup onNavigate={setCurrentPage} />;
      case "admin-dashboard":
        return <AdminDashboardPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}
