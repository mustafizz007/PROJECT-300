import {
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  TrendingUp,
  Award,
  UserPlus,
  Star,
} from "lucide-react";

export default function OverviewDashboard() {
  const statsCards = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Courses",
      value: "56",
      change: "+5%",
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Published Results",
      value: "342",
      change: "+8%",
      icon: FileText,
      color: "purple",
    },
    {
      title: "Graduates",
      value: "89",
      change: "+15%",
      icon: GraduationCap,
      color: "yellow",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-500 bg-opacity-20 text-blue-400",
      green: "bg-green-500 bg-opacity-20 text-green-400",
      purple: "bg-purple-500 bg-opacity-20 text-purple-400",
      yellow: "bg-yellow-500 bg-opacity-20 text-yellow-400",
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-300 text-sm md:text-lg">
          Manage courses, students, and academic data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-2 rounded-lg ${getColorClasses(card.color)}`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-green-400 text-xs md:text-sm font-medium">
                  {card.change}
                </span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-1">
                {card.value}
              </div>
              <div className="text-sm text-gray-400">{card.title}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg mr-3">
              <UserPlus className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Add</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Quickly add new students, courses, or assessments
          </p>
          <div className="space-y-2">
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm">
              + Add Student
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm">
              + Add Course
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 text-sm">
              + Add Assessment
            </button>
          </div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg mr-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Performance</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Monitor academic performance and trends
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Average CGPA</span>
              <span className="text-white font-semibold">3.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Pass Rate</span>
              <span className="text-white font-semibold">94%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg mr-3">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Recent Activity
            </h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Latest updates and changes
          </p>
          <div className="space-y-2 text-sm">
            <div className="text-gray-400">
              <span className="text-blue-400">CSE 101</span> results published
            </div>
            <div className="text-gray-400">
              New student <span className="text-green-400">John Doe</span>{" "}
              enrolled
            </div>
            <div className="text-gray-400">
              <span className="text-purple-400">MATH 201</span> schedule updated
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
