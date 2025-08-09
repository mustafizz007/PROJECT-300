import { useState } from "react";
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

export default function StudentManagement() {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [studentFilterType, setStudentFilterType] = useState("all");

  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: "2021-1-60-001",
      name: "Nubha",
      email: "nubha@example.com",
      department: "Computer Science",
      semester: "8th",
      cgpa: 3.75,
      status: "active",
    },
    {
      id: 2,
      studentId: "2021-1-60-002",
      name: "Junak",
      email: "junak@example.com",
      department: "Computer Science",
      semester: "6th",
      cgpa: 3.92,
      status: "active",
    },
    {
      id: 3,
      studentId: "2020-1-60-015",
      name: "abdullah",
      email: "abdullah@example.com",
      department: "Engineering",
      semester: "8th",
      cgpa: 3.68,
      status: "graduating",
    },
  ]);

  const handleStudentCreate = () => {
    setSelectedStudent(null);
    setShowStudentModal(true);
  };

  const handleStudentEdit = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleStudentDelete = (studentId) => {
    setStudents(students.filter((s) => s.id !== studentId));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      student.studentId
        .toLowerCase()
        .includes(studentSearchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearchTerm.toLowerCase());

    const matchesFilter =
      studentFilterType === "all" ||
      student.status === studentFilterType ||
      student.department === studentFilterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Student Management
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Manage student records, enrollment, and academic information
            </p>
          </div>
          <button
            onClick={handleStudentCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">
        <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-blue-500 bg-opacity-20 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
            {students.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">Total Students</div>
        </div>

        <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-green-500 bg-opacity-20 rounded-lg">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
            {students.filter((s) => s.status === "active").length}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">
            Active Students
          </div>
        </div>

        <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-purple-500 bg-opacity-20 rounded-lg">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
            {students.filter((s) => s.status === "graduating").length}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">Graduating</div>
        </div>

        <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-yellow-500 bg-opacity-20 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
            {(
              students.reduce((sum, s) => sum + s.cgpa, 0) / students.length
            ).toFixed(2)}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">Average CGPA</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-700 rounded-lg border border-gray-600 mb-6">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-600">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <select
              value={studentFilterType}
              onChange={(e) => setStudentFilterType(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base min-w-0 sm:min-w-[180px]"
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="graduating">Graduating</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  CGPA
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-600 transition-colors"
                >
                  <td className="px-3 sm:px-4 lg:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {student.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {student.email}
                      </div>
                      {/* Show department on mobile when hidden from table */}
                      <div className="sm:hidden text-xs text-gray-500 mt-1">
                        {student.department}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                    {student.studentId}
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                    {student.department}
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                    {student.semester}
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                    <span className="font-semibold">{student.cgpa}</span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : student.status === "graduating"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleStudentEdit(student)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="Edit student"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleStudentDelete(student.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete student"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedStudent ? "Edit Student" : "Add Student"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Student ID"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm sm:text-base">
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
              </select>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors order-1 sm:order-2"
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
