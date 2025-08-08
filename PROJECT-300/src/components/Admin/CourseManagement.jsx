import { useState } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

export default function CourseManagement() {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [courseFilterType, setCourseFilterType] = useState("all");

  const [courses, setCourses] = useState([
    {
      id: 1,
      courseCode: "CSE 101",
      title: "Programming Fundamentals",
      department: "Computer Science",
      credits: 3,
      instructor: "Khudeja Khanom Anwara",
      enrolledStudents: 45,
      maxCapacity: 50,
      status: "active",
      semester: "Fall 2024",
    },
    {
      id: 2,
      courseCode: "MATH 201",
      title: "Calculus II",
      department: "Mathematics",
      credits: 4,
      instructor: "Dr. Sarah Johnson",
      enrolledStudents: 35,
      maxCapacity: 40,
      status: "active",
      semester: "Fall 2024",
    },
    {
      id: 3,
      courseCode: "PHY 101",
      title: "Physics I",
      department: "Physics",
      credits: 3,
      instructor: "Prof. Michael Brown",
      enrolledStudents: 28,
      maxCapacity: 35,
      status: "active",
      semester: "Fall 2024",
    },
    {
      id: 4,
      courseCode: "CSE 201",
      title: "Data Structures",
      department: "Computer Science",
      credits: 3,
      instructor: "Md. Rakib Hassan",
      enrolledStudents: 42,
      maxCapacity: 45,
      status: "active",
      semester: "Fall 2024",
    },
  ]);

  const handleCourseCreate = () => {
    setSelectedCourse(null);
    setShowCourseModal(true);
  };

  const handleCourseEdit = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleCourseDelete = (courseId) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.courseCode
        .toLowerCase()
        .includes(courseSearchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase());

    const matchesFilter =
      courseFilterType === "all" ||
      course.status === courseFilterType ||
      course.department === courseFilterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Course Management
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Manage courses, curricula, and academic programs
            </p>
          </div>
          <button
            onClick={handleCourseCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {courses.length}
          </div>
          <div className="text-sm text-gray-400">Total Courses</div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg">
              <Users className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Enrollment</div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {Math.round(
              (courses.reduce(
                (sum, c) => sum + c.enrolledStudents / c.maxCapacity,
                0
              ) /
                courses.length) *
                100
            )}
            %
          </div>
          <div className="text-sm text-gray-400">Avg Capacity</div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-lg">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {courses.filter((c) => c.status === "active").length}
          </div>
          <div className="text-sm text-gray-400">Active Courses</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-700 rounded-lg border border-gray-600 mb-6">
        <div className="p-4 md:p-6 border-b border-gray-600">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={courseSearchTerm}
                  onChange={(e) => setCourseSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={courseFilterType}
              onChange={(e) => setCourseFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Courses</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
            </select>
          </div>
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-600">
                  <td className="px-4 md:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {course.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {course.department}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.courseCode}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.credits}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.instructor}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center">
                      <span>
                        {course.enrolledStudents}/{course.maxCapacity}
                      </span>
                      <div className="ml-2 w-16 bg-gray-500 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{
                            width: `${
                              (course.enrolledStudents / course.maxCapacity) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        course.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCourseEdit(course)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCourseDelete(course.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedCourse ? "Edit Course" : "Add Course"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="text"
                placeholder="Course Code"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="text"
                placeholder="Instructor"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="number"
                placeholder="Credits"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
