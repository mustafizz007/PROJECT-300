import { LogOut, User, Menu, X, ShieldCheck } from "lucide-react";
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
            className="h-12 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            onClick={() => onNavigate && onNavigate("home")}
          />
          
          <div className="text-base sm:text-lg lg:text-xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 bg-clip-text text-transparent drop-shadow-md">
            <span className="hidden sm:inline ml-2 font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 bg-clip-text text-shadow-lg tracking-wide">
              Admin Panel
            </span>
            <span className="sm:hidden font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 bg-clip-text text-shadow-lg tracking-wide text-xs">
              Admin
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* User info - hidden on very small screens */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center border-2 border-blue-700 shadow-md">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <div className="text-xs lg:text-sm font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
                Admin User
              </div>
              <div className="inline-block mt-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] lg:text-xs font-semibold shadow-sm border border-blue-200">
                Administrator
              </div>
            </div>
          </div>

          {/* Logout button */}
          <button
            type="button"
            className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl hover:from-gray-700 hover:to-blue-900 text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-gray-700 transition-colors text-xs sm:text-sm lg:text-base"
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
