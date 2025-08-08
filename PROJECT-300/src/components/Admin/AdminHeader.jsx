import { LogOut, User } from "lucide-react";
import logo from "../../assets/mu_portal_logo.png";

export default function AdminHeader({ onNavigate, onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="MuPortal Logo"
            className="h-6 lg:h-8 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onNavigate && onNavigate("home")}
          />
          <div className="text-lg lg:text-xl font-bold text-gray-800">
            <span className="ml-2 text-gray-600 font-normal text-sm lg:text-base">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs lg:text-sm font-semibold text-gray-800">
                Admin User
              </div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
          <button
            type="button"
            className="bg-gray-800 text-white px-3 lg:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors text-sm lg:text-base"
            onClick={handleLogout}
          >
            <span className="hidden md:inline">Log Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
