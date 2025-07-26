import { useState, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import StudentSignup from "./components/StudentSignUp/StudentSignUp";
import { StudentDashboard } from "./components/StudentDashboard";
import AdminDashboardPage from "./components/AdminDashboardPage";
import "./style.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [studentId, setStudentId] = useState(null);

  // On mount, check for existing studentId but do NOT auto-navigate to dashboard
  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    if (storedId) {
      setStudentId(storedId);
      // Do not setCurrentPage("dashboard")
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("studentId");
    setStudentId(null);
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
          <StudentDashboard studentId={studentId} onLogout={handleLogout} />
        );
      case "admin-dashboard":
        return <AdminDashboardPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}
