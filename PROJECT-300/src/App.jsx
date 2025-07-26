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

  // Load studentId from localStorage when the app first loads
  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    if (storedId) {
      setStudentId(storedId);
      setCurrentPage("dashboard");
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("studentId"); // Clear from localStorage
    setStudentId(null);                   // Clear from state
    setCurrentPage("home");               // Navigate to home page
  };

  
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "login":
        return (
          <StudentLogin
            onNavigate={setCurrentPage}
            // Called when login is successful
            onLoginSuccess={(id) => {
              localStorage.setItem("studentId", id); // Save to localStorage
setStudentId(id);                      // Save to state
setCurrentPage("dashboard");           // Navigate
            }}
          />
        );
      case "signup":
        return (
          <StudentSignup
            onNavigate={setCurrentPage}
          />
        );
      case "dashboard":
        return (
          <StudentDashboard
            studentId={studentId}
            onLogout={handleLogout}
          />
        );
      case "admin-dashboard":
        return (
          <AdminDashboardPage
            onNavigate={setCurrentPage}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}
