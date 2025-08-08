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
import "./dashboard-animations.css";

function linkClass(path, current) {
  return [
    "group flex items-center gap-3 lg:gap-4 px-3 lg:px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-700 cursor-pointer relative overflow-hidden",
    "hover:bg-gradient-to-r hover:from-gray-700/40 hover:to-gray-800/40 hover:shadow-xl hover:shadow-gray-500/30",
    "hover:transform hover:translate-x-2 lg:hover:translate-x-3 hover:scale-105 hover:backdrop-blur-md",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-500/0 before:to-gray-700/0",
    "hover:before:from-gray-500/20 hover:before:to-gray-700/20 before:transition-all before:duration-700",
    "after:absolute after:top-0 after:left-0 after:w-1 after:h-full after:bg-gradient-to-b after:from-gray-400 after:to-gray-500",
    "after:transform after:scale-y-0 hover:after:scale-y-100 after:transition-transform after:duration-500 after:rounded-r-full",
    current === path
      ? "bg-gradient-to-r from-gray-700/60 to-gray-800/60 text-white shadow-xl shadow-gray-500/25 border-l-4 border-gray-400 scale-105 translate-x-1 lg:translate-x-2"
      : "text-gray-300 hover:text-white",
  ].join(" ");
}

function iconClass(path, current) {
  return [
    "w-5 h-5 lg:w-6 lg:h-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg",
    current === path
      ? "text-white drop-shadow-lg animate-pulse"
      : "text-gray-400 group-hover:text-purple-300 group-hover:animate-bounce",
  ].join(" ");
}

export function SidebarNav({ onNavigate, current }) {
  // current = dashboardView from parent
  return (
    <aside className="w-64 lg:w-80 bg-gradient-to-b from-slate-900 via-slate-900/50 to-slate-900 h-screen sticky top-0 flex flex-col py-0 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Enhanced animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-40 h-40 bg-gray-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-slate-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/5 w-32 h-32 bg-ivory-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
      </div>
      {/* Simple Header without user icon */}

      <nav
        className="relative z-10 flex flex-col space-y-2 lg:space-y-3 px-3 lg:px-5 mt-6 lg:mt-8 animate-slide-in-left"
        style={{ animationDelay: "0.5s" }}
      >
        <div
          onClick={() => onNavigate("dashboard")}
          className={linkClass("dashboard", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-500/30 group-hover:scale-110">
            <Home className={iconClass("dashboard", current)} />
          </div>
          <span className="font-semibold text-sm lg:text-base tracking-wide relative z-10 group-hover:text-white transition-colors duration-500">
            Dashboard
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-125">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 animate-pulse shadow-lg"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("profile")}
          className={linkClass("profile", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-500/30 group-hover:scale-110">
            <User className={iconClass("profile", current)} />
          </div>
          <span className="font-semibold text-sm lg:text-base tracking-wide relative z-10 group-hover:text-white transition-colors duration-500">
            Profile
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-125">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 animate-pulse shadow-lg"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("results")}
          className={linkClass("results", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-500/30 group-hover:scale-110">
            <ClipboardList className={iconClass("results", current)} />
          </div>
          <span className="font-semibold text-sm lg:text-base tracking-wide relative z-10 group-hover:text-white transition-colors duration-500">
            Results
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-125">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 animate-pulse shadow-lg"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("cgpa")}
          className={linkClass("cgpa", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-500/30 group-hover:scale-110">
            <Award className={iconClass("cgpa", current)} />
          </div>
          <span className="font-semibold text-sm lg:text-base tracking-wide relative z-10 group-hover:text-white transition-colors duration-500">
            CGPA
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-125">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 animate-pulse shadow-lg"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("courses")}
          className={linkClass("courses", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-500/30 group-hover:scale-110">
            <BookOpen className={iconClass("courses", current)} />
          </div>
          <span className="font-semibold text-sm lg:text-base tracking-wide relative z-10 group-hover:text-white transition-colors duration-500">
            Courses
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-125">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 animate-pulse shadow-lg"></div>
          </div>
        </div>
        <div
          onClick={() => onNavigate("resources")}
          className={linkClass("resources", current)}
        >
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-500/30 group-hover:scale-110">
            <FolderOpen className={iconClass("resources", current)} />
          </div>
          <span className="font-semibold text-sm lg:text-base tracking-wide relative z-10 group-hover:text-white transition-colors duration-500">
            Resources
          </span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-125">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 animate-pulse shadow-lg"></div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
