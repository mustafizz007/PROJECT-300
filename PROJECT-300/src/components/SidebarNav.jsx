import { Link, useLocation } from "react-router-dom"
import { Home, User, ClipboardList, Award, BookOpen, FolderOpen } from "lucide-react"

export function SidebarNav() {
  const location = useLocation()

  // Enhanced link styling with beautiful gradients and animations
  const linkClass = (path) =>
    `group flex items-center gap-4 rounded-xl px-5 py-4 mx-4 mb-3 transition-all duration-300 transform hover:scale-105 ${
      location.pathname === path
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
        : "text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white hover:shadow-md"
    }`

  const iconClass = (path) =>
    `h-5 w-5 transition-all duration-300 ${
      location.pathname === path
        ? "text-white drop-shadow-sm"
        : "text-gray-400 group-hover:text-white group-hover:drop-shadow-sm"
    }`

  return (
    <aside className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 min-h-full flex flex-col py-8 shadow-2xl">
      {/* Navigation items with beautiful design */}
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

      
      
    </aside>
  )
}
