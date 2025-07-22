import { Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  ClipboardList,
  GraduationCap,
} from "lucide-react";

export function SidebarNav() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <img
          src="/muportal-logo.png"
          alt="MuPortal Logo"
          width={90}
          height={24}
        />
        <img src="/admin-logo.png" alt="Admin Logo" width={60} height={24} />
      </div>
      <nav className="space-y-2">
        <Link
          to="/admin/overview" // Example path for react-router-dom
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-all hover:bg-gray-800 bg-gray-700 text-white"
        >
          <Home className="h-5 w-5" />
          Overview
        </Link>
        <Link
          to="/admin/courses" // Example path
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-all hover:bg-gray-800"
        >
          <BookOpen className="h-5 w-5" />
          Course Management
        </Link>
        <Link
          to="/admin/students" // Example path
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-all hover:bg-gray-800"
        >
          <Users className="h-5 w-5" />
          Student Management
        </Link>
        <Link
          to="/admin/results" // Example path
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-all hover:bg-gray-800"
        >
          <ClipboardList className="h-5 w-5" />
          Results Management
        </Link>
        <Link
          to="/admin/credits" // Example path
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-all hover:bg-gray-800"
        >
          <GraduationCap className="h-5 w-5" />
          Credit Management
        </Link>
      </nav>
    </aside>
  );
}
