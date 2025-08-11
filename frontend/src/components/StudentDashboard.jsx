import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { StudentProfile } from "./StudentProfile";
import { StudentResults } from "./StudentResults";
import { StudentCGPA } from "./StudentCGPA";
import { CoursesPage } from "./CoursesPage";
import { CourseDetailPage } from "./course-details-page";
import StudentResource from "./StudentResource";
import SemesterResultsTable from "./semester-wise-result";
import NotificationBell from "./ui/NotificationBell";
import { studentNotificationAPI, studentCoursesAPI } from "../services/api";
import {
  Award,
  CalendarDays,
  Book,
  ExternalLink,
  Upload,
  FileText,
  Menu,
  X,
  User,
  Home,
  ClipboardList,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import { SidebarNav } from "./SidebarNav";

function InfoCard({ title, value, subtitle, icon: Icon, bgColor }) {
  return (
    <Card
      className={`p-4 sm:p-5 lg:p-6 ${bgColor} text-white border-0 shadow-lg rounded-xl card-hover transition-transform duration-300 hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="text-xs sm:text-sm font-medium opacity-90">{title}</h3>
        {Icon && (
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 opacity-80 icon-rotate" />
        )}
      </div>
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
        {value}
      </div>
      <p className="text-xs sm:text-sm opacity-80">{subtitle}</p>
    </Card>
  );
}

function AcademicYearItem({ year, credits, status }) {
  let badgeColor = "bg-gray-500";
  let badgeText = status;

  if (status === "Completed") {
    badgeColor = "bg-green-500";
    badgeText = "Completed";
  } else if (status === "In Progress") {
    badgeColor = "bg-yellow-500";
    badgeText = "In Progress";
  } else if (status === "Not Started") {
    badgeColor = "bg-red-500";
    badgeText = "Not Started";
  } else if (status === "Complete") {
    badgeColor = "bg-green-500";
    badgeText = "Complete";
  } else if (status === "InProgress") {
    badgeColor = "bg-blue-500";
    badgeText = "InProgress";
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700 mb-3">
      <span className="text-white font-medium">{year}</span>
      <div className="flex items-center gap-3">
        <span className="text-gray-300 text-sm">{credits} credits</span>
        <Badge className={`${badgeColor} text-white px-3 py-1 rounded-full`}>
          {badgeText}
        </Badge>
      </div>
    </div>
  );
}

export function StudentDashboard({ studentId, onLogout, onNavigate }) {
  const [studentName, setStudentName] = useState("Loading...");
  const [studentDepartment] = useState("Computer Science");
  const [cgpa, setCgpa] = useState("Loading...");
  const [totalCredits, setTotalCredits] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [dashboardView, setDashboardView] = useState("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Calculate graduation progress based on actual data
  const T_credit = totalCredits !== null ? totalCredits : 0;
  const graduationProgress = ((T_credit / 160) * 100).toFixed(2);

  // Fetch academic years status from API
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/student/academic-years-status/${studentId}`
        );
        setAcademicYears(response.data);
        console.log("Academic Years:", response.data);
      } catch (error) {
        console.error("Failed to fetch academic years:", error);
        // Fallback to default data if API fails
        setAcademicYears([
          { year: "Year 1 (2022-23)", credits: 48, status: "Complete" },
          { year: "Year 2 (2023-24)", credits: 32, status: "Complete" },
          { year: "Year 3 (2024-25)", credits: 45, status: "InProgress" },
        ]);
      }
    };

    if (studentId) fetchAcademicYears();
  }, [studentId]);

  // Fetch student name from API
  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/student/${studentId}`
        );
        const data = await res.json();
        console.log("Student name response:", data);
        setStudentName(data.name || "Unknown Student");
      } catch (error) {
        console.error("Failed to fetch student name:", error);
        setStudentName("Unknown Student");
      }
    };

    if (studentId) fetchName();
  }, [studentId]);

  // Fetch CGPA and total credits from API
  useEffect(() => {
    const fetchCgpa = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/student/result/${studentId}`
        );
        const data = await res.json();
        console.log("CGPA response:", data);
        setCgpa(data.cgpa ? parseFloat(data.cgpa).toFixed(2) : "N/A");
        setTotalCredits(data.total_credits || 0);
        console.log("Total Credits:", data.total_credits);
      } catch (error) {
        console.error("Failed to fetch CGPA:", error);
        setCgpa("N/A");
      }
    };

    if (studentId) fetchCgpa();
  }, [studentId]);

  // Fetch semesters from API
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/student/semesters/${studentId}`
        );
        const semesterArray = response.data.semesters;

        if (Array.isArray(semesterArray)) {
          setSemesters(semesterArray);
        } else {
          console.warn("Unexpected semester data format:", response.data);
          setSemesters([]);
        }
      } catch (error) {
        console.error("Failed to fetch semesters:", error);
        setSemesters([]);
      }
    };

    if (studentId) fetchSemesters();
  }, [studentId]);

  // Fetch current semester from API
  useEffect(() => {
    const fetchCurrentSemester = async () => {
      try {
        const response = await studentCoursesAPI.getCurrentSemester(studentId);
        setCurrentSemester(response);
        console.log("Current semester response:", response);
      } catch (error) {
        console.error("Failed to fetch current semester:", error);
        setCurrentSemester(null);
      }
    };

    if (studentId) fetchCurrentSemester();
  }, [studentId]);

  // Fetch student notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await studentNotificationAPI.getNotifications();
        setNotifications(response.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
    // Set up polling to check for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handler to clear notifications
  const handleClearNotifications = async () => {
    try {
      await studentNotificationAPI.clearAll();
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  };

  // Handler to mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await studentNotificationAPI.markAsRead(notificationId);
      // Update local state to mark the notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Handler to open course detail
  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId);
    setDashboardView("courseDetail");
  };

  // Handler to go back to courses list
  const handleBackToCourses = () => {
    setSelectedCourseId(null);
    setDashboardView("courses");
  };

  // Custom navigation handler for semester results
  const handleSemesterNavigation = (view, data) => {
    if (view === "studentResults" && data?.selectedSemester) {
      setSelectedSemester(data.selectedSemester);
    }
    setDashboardView(view);
  };

  return (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 page-reload-animation relative overflow-hidden">
      {/* Animated background blobs matching homepage - Slower animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-slow"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-slow animation-delay-4000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-slow animation-delay-8000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob-slow animation-delay-6000"></div>
      </div>

      {/* Enhanced Header with glassmorphism matching homepage - Responsive */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white backdrop-blur-md border-b border-white/20 shadow-2xl w-full header-reload-animation">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Menu Button */}
          <Button
            className="lg:hidden bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-xl p-2 border-0 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          <div
            className="group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-3"
            onClick={() => onNavigate("home")}
            title="Go to Home Page"
          >
            <img
              src="/src/assets/mu_portal_logo.png"
              alt="MuPortal Logo"
              className="h-12 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            />
          </div>
          <span className="text-xl font-semibold text-white"></span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
          {/* Notification Bell */}
          <NotificationBell
            notifications={notifications}
            onClearNotifications={handleClearNotifications}
            onMarkAsRead={handleMarkAsRead}
          />

          {/* Animated Green Backlight User Icon - Slower animations */}
          <div className="relative group">
            {/* Animated green backlight container - slower pulse */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/30 via-emerald-400/30 to-green-500/30 blur-lg animate-pulse-slow group-hover:blur-xl transition-all duration-1000"></div>
            <div className="absolute inset-0 rounded-2xl bg-green-400/20 animate-ping-slow"></div>

            {/* Main icon container with slower animations */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-gray-400/40 via-gray-800/40 to-gray-500/40 p-0.5 animate-pulse-slow group-hover:scale-110 transition-all duration-1000 shadow-lg shadow-gray-500/30">
              <div className="w-full h-full rounded-2xl bg-gray-900/90 backdrop-blur-sm flex items-center justify-center border border-gray-900/30 group-hover:border-gray-900/60 transition-all duration-1000">
                <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white animate-float-slow group-hover:text-gray-200 group-hover:scale-110 transition-all duration-1000 drop-shadow-lg" />
              </div>
            </div>

            {/* Enhanced multi-layer status indicator - slower animations */}
            <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 flex items-center justify-center">
              <div className="relative">
                {/* Outer glow ring - slower ping */}
                <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full animate-ping-slow opacity-40"></div>
                <div className="absolute inset-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-300 rounded-full animate-ping-slow opacity-60 animation-delay-4000"></div>
                {/* Main indicator - slower pulse */}
                <div className="relative w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-1 sm:border-2 border-white shadow-lg animate-pulse-slow shadow-green-400/50">
                  <div className="absolute inset-0.5 sm:inset-1 bg-green-200 rounded-full animate-pulse-slow opacity-80"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-black hidden sm:block animate-slide-in-left">
            <p className="font-semibold text-sm sm:text-base lg:text-lg">
              {studentName}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {studentDepartment}
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 hover:from-gray-700 hover:to-purple-900 text-white hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 border-0 shadow-2xl transition-all duration-300"
            onClick={onLogout}
          >
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900 via-purple-900/50 to-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6 border-b border-white/10">
              <Button
                className="absolute top-4 right-4 bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-xl p-2 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="mt-8">
                <div className="relative group">
                  {/* Animated green backlight container - slower animations */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/30 via-emerald-400/30 to-green-500/30 blur-lg animate-pulse-slow group-hover:blur-xl transition-all duration-1000"></div>
                  <div className="absolute inset-0 rounded-2xl bg-green-400/20 animate-ping-slow"></div>

                  {/* Main icon container with slower animations */}
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400/40 via-emerald-400/40 to-green-500/40 p-0.5 animate-pulse-slow group-hover:scale-110 transition-all duration-1000 shadow-lg shadow-green-500/30">
                    <div className="w-full h-full rounded-2xl bg-slate-900/90 backdrop-blur-sm flex items-center justify-center border border-green-400/30 group-hover:border-green-400/60 transition-all duration-1000">
                      <User className="w-6 h-6 text-green-300 animate-float-slow group-hover:text-green-200 group-hover:scale-110 transition-all duration-1000 drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="p-6 space-y-4">
              {[
                { icon: Home, label: "Dashboard", view: "dashboard" },
                { icon: User, label: "Profile", view: "profile" },
                { icon: ClipboardList, label: "Results", view: "results" },
                { icon: Award, label: "CGPA", view: "cgpa" },
                { icon: BookOpen, label: "Courses", view: "courses" },
                { icon: FolderOpen, label: "Resources", view: "resources" },
              ].map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setDashboardView(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    dashboardView === item.view
                      ? "bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-white"
                      : "text-gray-300 hover:bg-purple-600/20 hover:text-white"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main area: sidebar + content - Full Screen */}
      <div className="relative z-10 flex w-full h-full">
        {/* Sidebar - Hidden on mobile, shown on tablet+ */}
        <div className="hidden lg:block">
          <SidebarNav
            studentId={studentId}
            onNavigate={setDashboardView}
            onLogout={onLogout}
            current={dashboardView}
          />
        </div>

        <main className="flex-1 bg-slate-900/20 backdrop-blur-lg w-full h-full overflow-y-auto custom-scrollbar dashboard-main">
          {dashboardView === "dashboard" && (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in-slow">
              {/* Welcome Section - Responsive with slower animations */}
              <div
                className="text-center mb-8 lg:mb-12 animate-slide-up-slow"
                style={{ animationDelay: "0.3s" }}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white-200 via-purple-300 to-white-400 bg-clip-text text-transparent mb-2 lg:mb-4">
                  Welcome back, {studentName}!
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 font-light">
                  Here's your academic overview
                </p>
              </div>

              {/* Info Cards with staggered animation - Responsive Grid with slower animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
                <div
                  className="animate-slide-up-slow stagger-item-1"
                  style={{ animationDelay: "0.6s" }}
                >
                  <InfoCard
                    title="Current CGPA"
                    value={cgpa}
                    subtitle="Out of 4.00"
                    icon={Award}
                    bgColor="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/30"
                  />
                </div>
                <div
                  className="animate-slide-up-slow stagger-item-2"
                  style={{ animationDelay: "0.9s" }}
                >
                  <InfoCard
                    title="Current Semester"
                    value={
                      currentSemester
                        ? `${currentSemester.year}-${currentSemester.term}`
                        : "Loading..."
                    }
                    subtitle={
                      currentSemester
                        ? `Year ${currentSemester.year}, Term ${currentSemester.term}`
                        : "Calculating current semester"
                    }
                    icon={CalendarDays}
                    bgColor="bg-gradient-to-br from-pink-600 via-pink-700 to-purple-600 hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-pink-500/30"
                  />
                </div>
                <div
                  className="animate-slide-up-slow stagger-item-3"
                  style={{ animationDelay: "1.2s" }}
                >
                  <InfoCard
                    title="Total Credits"
                    value={totalCredits !== null ? totalCredits : "N/A"}
                    subtitle="Out of 160"
                    icon={Book}
                    bgColor="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/30"
                  />
                </div>
              </div>

              {/* Credits and Graduation Section with slower animations - Responsive */}
              <div
                className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12 animate-fade-in-slow"
                style={{ animationDelay: "1.5s" }}
              >
                <Card className="p-4 sm:p-6 lg:p-8 bg-slate-800/60 backdrop-blur-xl border border-gray-500/20 hover:border-gray-400/40 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-[1.02] card-hover animate-slide-in-left-slow rounded-2xl lg:rounded-3xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 gradient-text flex items-center gap-2 lg:gap-3">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    Credits by Academic Year
                  </h2>
                  {academicYears.length === 0 ? (
                    <p className="text-gray-400 animate-pulse-slow text-center py-8">
                      Loading academic years...
                    </p>
                  ) : (
                    academicYears.map((item, index) => (
                      <AcademicYearItem key={index} {...item} />
                    ))
                  )}
                </Card>
                <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white border-0 rounded-2xl lg:rounded-3xl card-hover animate-slide-in-right-slow shadow-2xl">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 lg:mb-3 text-center animate-float-slow flex items-center justify-center gap-2 lg:gap-3">
                    <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8" />
                    May 2025
                  </h2>
                  <p className="text-lg mb-6 opacity-90 text-center">
                    Expected Graduation
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Current Year:</span>
                      <span className="font-bold">
                        {currentSemester
                          ? `Year ${currentSemester.year}, Term ${currentSemester.term}`
                          : semesters.length > 0
                          ? (() => {
                              const [year, sem] =
                                semesters[semesters.length - 1].split("-");
                              return `Year ${year}, Semester ${sem}`;
                            })()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Semester:</span>
                      <span className="font-bold">
                        {currentSemester ? `${currentSemester.current_semester} Semester` : "Loading..."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Semesters:</span>
                      <span className="font-bold">{semesters.length} semesters</span>
                    </div>
                  </div>
                  <div className="bg-teal-500 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Progress to Graduation</span>
                      <span className="font-bold">{graduationProgress}%</span>
                    </div>
                    <div className="w-full bg-teal-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${graduationProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs opacity-80 text-center">
                      {160 - T_credit} credits left
                    </p>
                  </div>
                </Card>
              </div>

              {/* Action Buttons - Responsive Grid with slower animations */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-slow content-reload-animation pb-8"
                style={{ animationDelay: "2s" }}
              >
                <Button
                  onClick={() => setDashboardView("courses")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 sm:py-8 text-base sm:text-lg font-semibold border-0 rounded-xl sm:rounded-2xl btn-pulse card-hover transform hover:scale-105 transition-all duration-700 shadow-xl hover:shadow-purple-500/30 stagger-item-4"
                >
                  <BookOpen className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 icon-rotate" />
                  View Courses
                </Button>
                <Button
                  onClick={() => setDashboardView("resources")}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-6 sm:py-8 text-base sm:text-lg font-semibold border-0 rounded-xl sm:rounded-2xl btn-pulse card-hover transform hover:scale-105 transition-all duration-700 shadow-xl hover:shadow-pink-500/30 stagger-item-5"
                >
                  <FolderOpen className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 icon-rotate" />
                  Study Resources
                </Button>
                <Button
                  onClick={() => setDashboardView("results")}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white py-6 sm:py-8 text-base sm:text-lg font-semibold border-0 rounded-xl sm:rounded-2xl btn-pulse card-hover transform hover:scale-105 transition-all duration-700 shadow-xl hover:shadow-cyan-500/30 sm:col-span-2 lg:col-span-1 stagger-item-6"
                >
                  <ClipboardList className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 icon-rotate" />
                  View Results
                </Button>
              </div>
            </div>
          )}
          {dashboardView === "profile" && (
            <StudentProfile
              studentId={studentId}
              onNavigate={setDashboardView}
              onLogout={onLogout}
            />
          )}
          {dashboardView === "results" && (
            <SemesterResultsTable
              studentId={studentId}
              onNavigate={handleSemesterNavigation}
            />
          )}
          {dashboardView === "studentResults" && (
            <StudentResults
              studentId={studentId}
              selectedSemester={selectedSemester}
              onNavigate={setDashboardView}
              onLogout={onLogout}
            />
          )}
          {dashboardView === "cgpa" && <StudentCGPA studentId={studentId} />}
          {dashboardView === "courses" && (
            <CoursesPage
              studentId={studentId}
              onNavigate={setDashboardView}
              onLogout={onLogout}
              onCourseSelect={handleCourseSelect}
            />
          )}
          {dashboardView === "resources" && <StudentResource />}
          {dashboardView === "courseDetail" && selectedCourseId && (
            <CourseDetailPage
              courseId={selectedCourseId}
              studentId={studentId}
              onBack={handleBackToCourses}
              onLogout={onLogout}
            />
          )}
        </main>
      </div>
    </div>
  );
}
