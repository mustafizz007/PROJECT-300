import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  ClipboardList,
  Award,
  BookOpen,
  FolderOpen,
} from "lucide-react";

export function SidebarNav() {
  const location = useLocation();

  // Helper to set active link style - matching your exact design
  const linkClass = (path) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 mx-4 mb-3 transition-all duration-200 ${
      location.pathname === path
        ? "bg-gray-200 text-gray-900 font-medium"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-80 bg-gray-900 min-h-screen flex flex-col py-8">
      {/* Logo placeholder - matching your design */}
      <div className="px-6 mb-12">
        <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
      </div>

      {/* Navigation items - exactly as shown in your design */}
      <nav className="flex flex-col">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <Home className="h-5 w-5" />
          Dashboard
        </Link>

        <Link to="/profile" className={linkClass("/profile")}>
          <User className="h-5 w-5" />
          Profile
        </Link>

        <Link to="/results" className={linkClass("/results")}>
          <ClipboardList className="h-5 w-5" />
          Results
        </Link>

        <Link to="/cgpa" className={linkClass("/cgpa")}>
          <Award className="h-5 w-5" />
          CGPA
        </Link>

        <Link to="/courses" className={linkClass("/courses")}>
          <BookOpen className="h-5 w-5" />
          Courses
        </Link>

        <Link to="/resources" className={linkClass("/resources")}>
          <FolderOpen className="h-5 w-5" />
          Resources
        </Link>
      </nav>
    </aside>
  );
}
