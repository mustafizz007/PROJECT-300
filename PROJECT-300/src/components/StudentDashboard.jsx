import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Award,
  Calendar,
  BookOpen,
  ExternalLink,
  Download,
  FileText,
  Home,
  User,
  ClipboardList,
  FolderOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function LeftSidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 mx-4 mb-3 transition-all duration-200 ${
      location.pathname === path
        ? "bg-gray-200 text-gray-900 font-medium"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const iconClass = (path) =>
    location.pathname === path
      ? "text-blue-600"
      : "text-gray-400 group-hover:text-white transition-colors duration-200";

  return (
    <div className="w-80 bg-gray-900 min-h-screen flex flex-col py-8">
      {/* Navigation items - starts directly without logo */}
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <Home className={iconClass("/dashboard")} />
          </div>
          <span className="font-medium text-sm tracking-wide">Dashboard</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </Link>

        <Link to="/profile" className={linkClass("/profile")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <User className={iconClass("/profile")} />
          </div>
          <span className="font-medium text-sm tracking-wide">Profile</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </Link>

        <Link to="/results" className={linkClass("/results")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <ClipboardList className={iconClass("/results")} />
          </div>
          <span className="font-medium text-sm tracking-wide">Results</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </Link>

        <Link to="/cgpa" className={linkClass("/cgpa")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <Award className={iconClass("/cgpa")} />
          </div>
          <span className="font-medium text-sm tracking-wide">CGPA</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </Link>

        <Link to="/courses" className={linkClass("/courses")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <BookOpen className={iconClass("/courses")} />
          </div>
          <span className="font-medium text-sm tracking-wide">Courses</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </Link>

        <Link to="/resources" className={linkClass("/resources")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <FolderOpen className={iconClass("/resources")} />
          </div>
          <span className="font-medium text-sm tracking-wide">Resources</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </Link>
      </nav>
    </div>
  );
}

function InfoCard({ title, value, subtitle, icon: Icon, bgColor }) {
  return (
    <Card className={`p-6 ${bgColor} text-white border-0 shadow-lg rounded-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
        {Icon && <Icon className="w-6 h-6 opacity-80" />}
      </div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <p className="text-sm opacity-80">{subtitle}</p>
    </Card>
  );
}

function AcademicYearItem({ year, credits, status }) {
  const badgeColor = status === "Complete" ? "bg-green-500" : "bg-blue-500";
  const badgeText = status === "Complete" ? "Complete" : "InProgress";

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

function CenterContent() {
  const academicYears = [
    { year: "Year 1 (2022-23)", credits: 48, status: "Complete" },
    { year: "Year 2 (2023-24)", credits: 32, status: "Complete" },
    { year: "Year 3 (2024-25)", credits: 45, status: "InProgress" },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-900">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          title="Current CGPA"
          value="3.85"
          subtitle="Out of 4.00"
          icon={Award}
          bgColor="bg-blue-600"
        />
        <InfoCard
          title="Current Semester"
          value="6th"
          subtitle="Summer 2025"
          icon={Calendar}
          bgColor="bg-purple-600"
        />
        <InfoCard
          title="Total Credits"
          value="142"
          subtitle="Out of 160"
          icon={BookOpen}
          bgColor="bg-pink-600"
        />
      </div>

      {/* Credits by Academic Year */}
      <Card className="p-6 bg-gray-800 border-gray-700 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-6 text-white text-center">
          Credits by Academic Year
        </h2>
        {academicYears.map((item, index) => (
          <AcademicYearItem key={index} {...item} />
        ))}
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="bg-gray-700 text-white hover:bg-gray-600 py-6 text-base border-0 rounded-xl">
          View Courses <ExternalLink className="ml-2 h-5 w-5" />
        </Button>
        <Button className="bg-gray-700 text-white hover:bg-gray-600 py-6 text-base border-0 rounded-xl">
          Study Resources <Download className="ml-2 h-5 w-5" />
        </Button>
        <Button className="bg-gray-700 text-white hover:bg-gray-600 py-6 text-base border-0 rounded-xl">
          View results <FileText className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function RightSidebar() {
  const graduationProgress = 88.75;

  return (
    <div className="w-80 p-8 bg-gray-900">
      {/* Expected Graduation Card */}
      <Card className="p-6 bg-teal-600 text-white border-0 rounded-xl">
        <h2 className="text-2xl font-bold mb-2 text-center">May 2025</h2>
        <p className="text-lg mb-6 opacity-90 text-center">
          Expected Graduation
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Current Semester:</span>
            <span className="font-bold">Fall 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Credits This Semester:</span>
            <span className="font-bold">10 credits</span>
          </div>
          <div className="flex justify-between">
            <span>Credits Next Semester:</span>
            <span className="font-bold">8 credits</span>
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
            {160 - 142} credits left
          </p>
        </div>
      </Card>
    </div>
  );
}

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src="/public/mu_portal_logo_2.png"
              alt="MuPortal Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-semibold text-gray-700">
              Student's Profile
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10  rounded-lg flex items-center justify-center">
              <img
                src="/public/mu_portal_logo_2.png"
                alt="User Logo"
                className="h-6 w-6"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">Joy Shib</span>
              <span className="text-sm text-gray-500">CSE</span>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">
              Log Out <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Three Column Layout */}
      <div className="flex">
        <LeftSidebar />
        <CenterContent />
        <RightSidebar />
      </div>
    </div>
  );
}
