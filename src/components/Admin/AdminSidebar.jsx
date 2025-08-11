import { Home, BookOpen, Users, FileText } from "lucide-react";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isOpen,
  isMobile,
}) {
  const sidebarItems = [
    { id: "Overview", label: "Overview", icon: Home },
    { id: "Student Management", label: "Student Management", icon: Users },
    { id: "Course Management", label: "Course Management", icon: BookOpen },
    { id: "Results Management", label: "Results Management", icon: FileText },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
        hidden md:block
        w-64 lg:w-80 bg-gray-800 min-h-screen 
        transition-all duration-300 ease-in-out
        ${isMobile ? "hidden" : "block"}
      `}
      >
        <div className="p-4 lg:p-6">
          <nav className="space-y-2 lg:space-y-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-left transition-all duration-200 group ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-200 ${
                      activeTab === item.id
                        ? "scale-110"
                        : "group-hover:scale-105"
                    }`}
                  />
                  <span className="text-sm lg:text-base font-medium truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
        md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-4 pt-20">
          {" "}
          {/* Add top padding to account for fixed header */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
