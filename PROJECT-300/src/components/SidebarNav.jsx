import React from "react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";

export function SidebarNav({ onNavigate }) {
  return (
    <div className="w-80 bg-black flex flex-col min-h-screen">
      {/* Top section: Avatar and Logout */}
      <div className="flex flex-col items-center mb-0">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage
            src="/placeholder.svg?height=64&width=64"
            alt="Student"
          />
        </Avatar>
      </div>
      {/* Navigation links */}
      <nav className="flex flex-col space-y-12 px-6">
        <div
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-4 px-6 py-4 bg-gray-200 text-black rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <div className="w-6 h-6">🏠</div>
          <span className="font-medium">Dashboard</span>
        </div>
        <div
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-4 px-6 py-4 bg-gray-200 text-black rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <div className="w-6 h-6">👤</div>
          <span className="font-medium">Profile</span>
        </div>
        <div
          onClick={() => onNavigate("results")}
          className="flex items-center gap-4 px-6 py-4 bg-gray-200 text-black rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <div className="w-6 h-6">📋</div>
          <span className="font-medium">Results</span>
        </div>
        <div
          onClick={() => onNavigate("cgpa")}
          className="flex items-center gap-4 px-6 py-4 bg-gray-200 text-black rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <div className="w-6 h-6">⚙️</div>
          <span className="font-medium">CGPA</span>
        </div>
        <div
          onClick={() => onNavigate("courses")}
          className="flex items-center gap-4 px-6 py-4 bg-gray-200 text-black rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <div className="w-6 h-6">📚</div>
          <span className="font-medium">Courses</span>
        </div>
        <div
          onClick={() => onNavigate("resources")}
          className="flex items-center gap-4 px-6 py-4 bg-gray-200 text-black rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <div className="w-6 h-6">📁</div>
          <span className="font-medium">Resources</span>
        </div>
      </nav>
    </div>
  );
}
