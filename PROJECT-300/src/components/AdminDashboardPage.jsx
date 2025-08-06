import { useState } from "react";
import {
  Home,
  BookOpen,
  Users,
  FileText,
  GraduationCap,
  LogOut,
  User,
  Plus,
  Search,
  FileCheck,
} from "lucide-react";
import logo from "../assets/mu_portal_logo.png";

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const sidebarItems = [
    { name: "Overview", icon: Home },
    { name: "Course Management", icon: BookOpen },
    { name: "Student Management", icon: Users },
    { name: "Results Management", icon: FileText },
    { name: "Credit Management", icon: GraduationCap },
  ];

  const statsCards = [
    {
      title: "Total Students",
      value: "1247",
      change: "+12% from last semester",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "64",
      change: "+2% new courses added",
      changeType: "positive",
      icon: BookOpen,
    },
    {
      title: "Average CGPA",
      value: "3.52",
      change: "+0.1% improved",
      changeType: "positive",
      icon: GraduationCap,
    },
  ];

  // const quickActions = [
  //   { title: "Add New Student", icon: Plus },
  //   { title: "Search Records", icon: Search },
  //   { title: "Generate Report", icon: FileCheck },
  // ];

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate("home"); // Navigate back to home page on logout
    }
  };

  return (
    <div className="font-sans">
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="MuPortal Logo"
                className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => onNavigate && onNavigate("home")}
              />
              <div className="text-xl font-bold text-gray-800">
                <span className="ml-2 text-gray-600 font-normal">
                  Admin Panel
                </span>
              </div>
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Admin User
                  </div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
              </div>
              <button
                type="button"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
                onClick={handleLogout}
              >
                <span>Log Out</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-80 bg-gray-800 min-h-screen p-6">
            <nav className="space-y-4">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.name
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-gray-800 text-white p-8">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-300 text-lg">
                Manage courses, students, and academic data
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statsCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-6 border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">
                        {card.title}
                      </h3>
                      <span className="text-2xl flex items-center">
                        <Icon className="w-7 h-7 text-gray-300" />
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-white">
                        {card.value}
                      </span>
                    </div>
                    <div className="text-sm text-green-400">{card.change}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <h2 className="text-xl font-semibold mb-6 text-white">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      className="bg-gray-600 hover:bg-gray-500 rounded-lg p-6 text-center transition-colors border border-gray-500"
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                      <span className="text-white font-medium block text-sm truncate">
                        {action.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div> */}
          </main>
        </div>
      </div>
    </div>
  );
}
