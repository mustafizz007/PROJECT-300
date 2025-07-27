import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  LogOut,
  Award,
  CalendarDays,
  Book,
  ExternalLink,
  Upload,
  FileText,
} from "lucide-react";
import { Separator } from "../components/ui/separator";
import Sidebar from "../components/Sidebar";
import { SidebarNav } from "./SidebarNav";

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

export function StudentDashboard({ studentId, onNavigate, onLogout }) {
  const [studentName, setStudentName] = useState("Loading...");
  const [collapsed, setCollapsed] = useState(false); // ✅ Sidebar toggle state

  const academicYears = [
    { year: "Year 1 (2022-23)", credits: 48, status: "Complete" },
    { year: "Year 2 (2023-24)", credits: 32, status: "Complete" },
    { year: "Year 3 (2024-25)", credits: 45, status: "InProgress" },
  ];

  const graduationProgress = 88.75;

  useEffect(() => {
    if (!studentId) {
      setStudentName("Unknown Student (ID missing)");
      return;
    }

    async function fetchStudentName() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/student/${studentId}`
        );
        if (!res.ok) throw new Error("Failed to fetch student name");
        const data = await res.json();
        setStudentName(data.name || "Unknown Student");
      } catch (error) {
        console.error("Error fetching student name:", error);
        setStudentName("Unknown Student");
      }
    }

    fetchStudentName();
  }, [studentId]);

  const sidebarWidth = collapsed ? "ml-20" : "ml-64"; // ✅ Adjust margin dynamically

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header at the top */}
      <header className="flex items-center justify-between p-6 border-b border-white bg-white w-full">
        <div className="flex items-center gap-6">
          <img
            src="/public/mu_portal_logo_2.png"
            alt="MuPortal Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-semibold text-black-500">
            Student's Profile
          </span>
        </div>
        <div className="flex items-center gap-10">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/public/mu_portal_logo_2.png" alt={studentName} />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-black">{studentName}</span>
            <span className="text-sm text-black-400">CSE</span>
          </div>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
            onClick={onLogout}
          >
            Log Out <LogOut className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>
      {/* Main area: sidebar + content */}
      <div className="flex flex-1 min-h-0">
        <SidebarNav />
        <div className="flex-1 p-8 overflow-auto mb-5">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
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
              icon={CalendarDays}
              bgColor="bg-purple-600"
            />
            <InfoCard
              title="Total Credits"
              value="142"
              subtitle="Out of 160"
              icon={Book}
              bgColor="bg-pink-600"
            />
          </div>
          {/* Credits and Graduation Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="p-6 bg-gray-900 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">
                Credits by Academic Year
              </h2>
              {academicYears.map((item, index) => (
                <AcademicYearItem key={index} {...item} />
              ))}
            </Card>
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
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="bg-gray-800 text-white hover:bg-gray-700 py-6 text-base border-0 rounded-xl">
              View Courses <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <Button className="bg-gray-800 text-white hover:bg-gray-700 py-6 text-base border-0 rounded-xl">
              Study Resources <Upload className="ml-2 h-5 w-5" />
            </Button>
            <Button className="bg-gray-800 text-white hover:bg-gray-700 py-6 text-base border-0 rounded-xl">
              View results <FileText className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
