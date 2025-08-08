import {
  Home,
  BookOpen,
  Users,
  FileText,
  GraduationCap,
  FileCheck,
  ClipboardList,
} from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const sidebarItems = [
    { id: "Overview", label: "Overview", icon: Home },
    { id: "Student Management", label: "Student Management", icon: Users },
    { id: "Course Management", label: "Course Management", icon: BookOpen },
    { id: "Results Management", label: "Results Management", icon: FileText },
    {
      id: "Credit Management",
      label: "Credit Management",
      icon: GraduationCap,
    },
    {
      id: "Assessment Management",
      label: "Assessment Management",
      icon: ClipboardList,
    },
  ];

  return (
    <aside className="w-64 lg:w-80 bg-gray-800 min-h-screen p-4 lg:p-6">
      <nav className="space-y-2 lg:space-y-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
