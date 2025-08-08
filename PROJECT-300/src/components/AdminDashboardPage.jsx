import { useState } from "react";
import AdminHeader from "./Admin/AdminHeader";
import AdminSidebar from "./Admin/AdminSidebar";
import OverviewDashboard from "./Admin/OverviewDashboard";
import StudentManagement from "./Admin/StudentManagement";
import CourseManagement from "./Admin/CourseManagement";
import ResultsManagement from "./Admin/ResultsManagement";
import CreditManagement from "./Admin/CreditManagement";
import AssessmentManagement from "./Admin/AssessmentManagement";

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate("home");
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
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{activeTab}</h1>
            <p className="text-gray-300 text-sm md:text-lg">
              Content for {activeTab} will be implemented here
            </p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans">
      <div className="min-h-screen bg-gray-100">
        <AdminHeader onNavigate={onNavigate} onLogout={handleLogout} />

        <div className="flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 bg-gray-800 text-white p-4 md:p-8">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    </div>
  );
}
