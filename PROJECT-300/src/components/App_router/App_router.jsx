import { useState } from "react";
import HomePage from "../HomePage/HomePage";
import StudentSignup from "../StudentSignUp/StudentSignUp";
import StudentDashboard from "../StudentDashboard";
import StudentLogin from "../StudentLogin/StudentLogin";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminSignup from "../AdminSignUp/AdminSignUp";

export default function AppRouter() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "signup":
        return <StudentSignup onNavigate={handleNavigate} />;
      case "login":
        return (
          <StudentLogin
            onNavigate={handleNavigate}
            onLoginSuccess={() => handleNavigate("dashboard")}
          />
        );
      case "dashboard":
        return <StudentDashboard onNavigate={handleNavigate} />;
      case "admin-login":
        return (
          <AdminLogin
            onNavigate={handleNavigate}
            onLoginSuccess={() => handleNavigate("admin-dashboard")}
          />
        );
      case "admin-signup":
        return <AdminSignup onNavigate={handleNavigate} />;
      case "admin-dashboard":
        return <div>Admin Dashboard (to be implemented)</div>;
      case "about":
        return <div>About Page (to be implemented)</div>;
      case "contact":
        return <div>Contact Page (to be implemented)</div>;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return <div className="app">{renderCurrentPage()}</div>;
}
