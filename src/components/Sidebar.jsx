/* eslint-disable no-unused-vars */// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  User,
  FileText,
  Award,
  Book,
  Upload,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { Button } from "../components/ui/button";
import clsx from "clsx"; // install with: npm install clsx

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: User, label: "Profile" },
  { icon: FileText, label: "Results" },
  { icon: Award, label: "CGPA" },
  { icon: Book, label: "Courses" },
  { icon: Upload, label: "Resources" },
];

export default function Sidebar({ onNavigate, collapsed, setCollapsed }) {

  return (
    <aside
      className={clsx(
        "bg-black text-white h-screen fixed top-0 left-0 flex flex-col justify-between transition-all duration-300 shadow-lg z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div>
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-4 py-4">
          
          <Button
            variant="ghost"
            className="text-white p-1"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 mt-4 px-2">
          // eslint-disable-next-line no-unused-vars
          {menuItems.map(({ icon: Icon, label }) => (
            <Button
              key={label}
              variant="ghost"
              className="text-white justify-start px-3 py-3 hover:bg-gray-800 transition-all"
              onClick={() => onNavigate?.(label.toLowerCase())}
            >
              <Icon className="mr-2 w-5 h-5" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Button>
          ))}
        </nav>
      </div>

      <div className="px-4 mb-4 text-xs text-center text-gray-500">
        {!collapsed && "© MuPortal 2025"}
      </div>
    </aside>
  );
}
