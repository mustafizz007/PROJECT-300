import { useState, useEffect } from "react";
import AdminHeader from "./Admin/AdminHeader";
import AdminSidebar from "./Admin/AdminSidebar";
import OverviewDashboard from "./Admin/OverviewDashboard";
import StudentManagement from "./Admin/StudentManagement";
import CourseManagement from "./Admin/CourseManagement";
import ResultsManagement from "./Admin/ResultsManagement";
import CreditManagement from "./Admin/CreditManagement";
import AssessmentManagement from "./Admin/AssessmentManagement";
import "./Admin/admin-responsive.css";

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false); // Close mobile sidebar when switching to desktop
      }
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate("home");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setSidebarOpen(false); // Close sidebar after selection on mobile
    }
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewDashboard />;
      case "Student Management":
        return <StudentManagement />;
      case "Course Management":
        return <CourseManagement />;
      case "Results Management":
        return <ResultsManagement />;
      case "Credit Management":
        return <CreditManagement />;
      case "Assessment Management":
        return <AssessmentManagement />;
      default:
        return (
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
              {activeTab}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
              Content for {activeTab} will be implemented here
            </p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans w-full h-full bg-gray-100 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <AdminHeader
          onNavigate={onNavigate}
          onLogout={handleLogout}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex relative flex-1 h-full">
          {/* Mobile backdrop */}
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            isOpen={sidebarOpen}
            isMobile={isMobile}
          />

          <main
            className={`flex-1 bg-gray-800 text-white transition-all duration-300 h-full admin-main-content custom-scrollbar overflow-y-auto ${
              isMobile ? "w-full" : "ml-0"
            }`}
          >
            <div className="p-3 sm:p-4 lg:p-8 admin-scroll-container h-full">
              <div className="admin-fade-in">{renderActiveComponent()}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
