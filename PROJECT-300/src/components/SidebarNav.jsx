import React from "react";
import {
  Award,
  Home,
  User,
  ClipboardList,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

function linkClass(path, current) {
  return [
    "group flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer",
    "hover:bg-white/10",
    current === path ? "bg-white/10 text-white" : "text-gray-300",
  ].join(" ");
}
function iconClass(path, current) {
  return ["w-5 h-5", current === path ? "text-white" : "text-gray-400"].join(
    " "
  );
}

export function SidebarNav({ onNavigate, studentId, onLogout, current }) {
  // current = dashboardView from parent
  return (
    <aside className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 min-h-full flex flex-col py-0 shadow-2xl">
      <nav className="flex flex-col space-y-2 px-4 mt-6">
        <div
          onClick={() => onNavigate("dashboard")}
          className={linkClass("dashboard", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <Home className={iconClass("dashboard", current)} />
          </div>
          <span className="font-medium text-sm tracking-wide">Dashboard</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("profile")}
          className={linkClass("profile", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <User className={iconClass("profile", current)} />
          </div>
          <span className="font-medium text-sm tracking-wide">Profile</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("results")}
          className={linkClass("results", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <ClipboardList className={iconClass("results", current)} />
          </div>
          <span className="font-medium text-sm tracking-wide">Results</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("cgpa")}
          className={linkClass("cgpa", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <Award className={iconClass("cgpa", current)} />
          </div>
          <span className="font-medium text-sm tracking-wide">CGPA</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("courses")}
          className={linkClass("courses", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <BookOpen className={iconClass("courses", current)} />
          </div>
          <span className="font-medium text-sm tracking-wide">Courses</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("resources")}
          className={linkClass("resources", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <FolderOpen className={iconClass("resources", current)} />
          </div>
          <span className="font-medium text-sm tracking-wide">Resources</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
