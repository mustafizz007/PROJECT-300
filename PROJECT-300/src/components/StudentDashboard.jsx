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
import { SidebarNav } from "./SidebarNav";

/**
 * @param {{ title: string, value: string, subtitle: string, icon: React.ElementType, bgColor: string }} props
 */
function InfoCard({ title, value, subtitle, icon: Icon, bgColor }) {
  return (
    <Card
      className={`flex flex-col items-start p-4 rounded-lg shadow-lg ${bgColor} text-white`}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs opacity-80">{subtitle}</p>
    </Card>
  );
}

/**
 * @param {{ year: string, credits: number, status: "Complete" | "InProgress" }} props
 */
function AcademicYearItem({ year, credits, status }) {
  const badgeColor = status === "Complete" ? "bg-green-500" : "bg-yellow-500";
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800 mb-2">
      <span className="text-sm font-medium">{year}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">{credits} credits</span>
        <Badge className={`${badgeColor} text-white`}>{status}</Badge>
      </div>
    </div>
  );
}

export function StudentDashboard() {
  const academicYears = [
    { year: "Year 1 (2022-23)", credits: 48, status: "Complete" },
    { year: "Year 2 (2023-24)", credits: 32, status: "Complete" },
    { year: "Year 3 (2024-25)", credits: 45, status: "InProgress" },
  ];
  const graduationProgress = 88.75;

  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-white shadow-md">
          <div className="flex items-center gap-5">
            <img
              src="/public/mu_portal_logo_2.png"
              alt="MuPortal Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Student's Profile</span>
          </div>
          <div className="flex items-center justify-space-between gap-10">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/public/mu_portal_logo_2.png" alt="Joy Shib" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <span className="font-medium">Joy Shib</span>
              <span className="text-sm text-gray-400">CSE</span>
            </div>
            <Button
              variant="outline"
              className="bg-blue-700 text-white hover:bg-gray-700"
            >
              Log Out <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto mb-5 bg-gray-900">
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
            {/* Credits by Academic Year */}
            <Card className="p-6 bg-gray-800 border border-gray-700 text-white">
              <h2 className="text-lg font-semibold mb-4">
                Credits by Academic Year
              </h2>
              {academicYears.map((item, index) => (
                <AcademicYearItem key={index} {...item} />
              ))}
            </Card>

            {/* Expected Graduation */}
            <Card className="p-6 bg-emerald-700 text-white rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">May 2025</h2>
              <p className="text-sm mb-4">Expected Graduation</p>
              <Separator className="bg-emerald-600 mb-4" />
              <div className="text-sm mb-4">
                <p>
                  Current Semester: <span className="font-bold">Fall 2024</span>
                </p>
                <p>
                  Credits This Semester:{" "}
                  <span className="font-bold">10 credits</span>
                </p>
                <p>
                  Credits Next Semester:{" "}
                  <span className="font-bold">8 credits</span>
                </p>
              </div>
              <Separator className="bg-emerald-600 mb-4" />
              <div className="text-sm mb-2">
                <p>Progress to Graduation</p>
                <p className="font-bold">{graduationProgress}%</p>
              </div>
              <Progress
                value={graduationProgress}
                className="w-full h-2 bg-emerald-600 [&::-webkit-progress-bar]:bg-emerald-600 [&::-webkit-progress-value]:bg-white"
              />
              <p className="text-xs mt-1 opacity-80">
                {160 - 142} credits left
              </p>
            </Card>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-2xl py-6 px-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <span>View Courses</span>
              </div>
            </Button>

            <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 rounded-2xl py-6 px-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Upload className="h-5 w-5" />
                </div>
                <span>Study Resources</span>
              </div>
            </Button>

            <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-2xl py-6 px-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <span>View Results</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
