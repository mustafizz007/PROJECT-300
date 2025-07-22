import { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import StudentSignup from "./components/StudentSignUp/StudentSignUp";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboardPage from "./components/AdminDashboardPage";
import "./style.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "login":
        return <StudentLogin onNavigate={setCurrentPage} />;
      case "signup":
        return <StudentSignup onNavigate={setCurrentPage} />;
      case "dashboard":
        return <StudentDashboard onNavigate={setCurrentPage} />;
      case "admin-login":
        return <div>Admin Login Page (Coming Soon)</div>;
      case "admin-dashboard":
        return <AdminDashboardPage />;
      case "about":
        return <div>About Page (Coming Soon)</div>;
      case "contact":
        return <div>Contact Page (Coming Soon)</div>;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}
