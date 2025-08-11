import { LogOut, User, Menu, X } from "lucide-react";
import logo from "../../assets/mu_portal_logo.png";

export default function AdminHeader({
  onNavigate,
  onLogout,
  onMenuToggle,
  sidebarOpen,
}) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b px-3 sm:px-4 lg:px-6 py-3 sm:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <img
            src={logo}
            alt="MuPortal Logo"
            className="h-6 sm:h-7 lg:h-8 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onNavigate && onNavigate("home")}
          />
          <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
            <span className="hidden sm:inline ml-2 text-gray-600 font-normal text-sm lg:text-base">
              Admin Panel
            </span>
            <span className="sm:hidden text-gray-600 font-normal text-xs">
              Admin
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* User info - hidden on very small screens */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
              <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" />
            </div>
            <div className="hidden md:block">
              <div className="text-xs lg:text-sm font-semibold text-gray-800">
                Admin User
              </div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>

          {/* Logout button */}
          <button
            type="button"
            className="bg-gray-800 text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-gray-700 transition-colors text-xs sm:text-sm lg:text-base"
            onClick={handleLogout}
          >
            <span className="hidden sm:inline">Log Out</span>
            <span className="sm:hidden">Out</span>
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
