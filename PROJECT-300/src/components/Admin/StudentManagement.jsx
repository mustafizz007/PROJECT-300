import React, { useState, useEffect } from "react";
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
import { adminDashboardAPI } from "../../services/api";

const StudentManagement = () => {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [studentFilterType, setStudentFilterType] = useState("all");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentFormData, setStudentFormData] = useState({
    name: "",
    student_id: "",
    department: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const studentsData = await adminDashboardAPI.getAllStudents();
      setStudents(studentsData);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentCreate = () => {
    setSelectedStudent(null);
    setStudentFormData({
      name: "",
      student_id: "",
      department: "",
      phone: "",
      password: "",
    });
    setShowStudentModal(true);
  };

  const handleStudentEdit = (student) => {
    setSelectedStudent(student);
    setStudentFormData({
      name: student.name,
      student_id: student.studentId,
      department: student.department,
      phone: student.phone || "",
      password: "",
    });
    setShowStudentModal(true);
  };

  const handleStudentDelete = async (studentId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this student? This action cannot be undone."
      )
    ) {
      try {
        await adminDashboardAPI.deleteStudent(studentId);
        await fetchStudents();
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent) {
        // Update existing student
        await adminDashboardAPI.updateStudent(selectedStudent.id, {
          name: studentFormData.name,
          department: studentFormData.department,
          phone: studentFormData.phone,
        });
      } else {
        // Create new student
        await adminDashboardAPI.createStudent(studentFormData);
      }

      setShowStudentModal(false);
      await fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
      alert(err.message || "Failed to save student. Please try again.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      student.studentId
        .toLowerCase()
        .includes(studentSearchTerm.toLowerCase()) ||
      (student.email &&
        student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()));

    const matchesFilter =
      studentFilterType === "all" ||
      student.status === studentFilterType ||
      student.department === studentFilterType;

    return matchesSearch && matchesFilter;
  });

  // Calculate stats from real data
  const activeStudents = students.filter((s) => s.status === "active").length;
  const graduatingStudents = students.filter(
    (s) => s.status === "graduating"
  ).length;
  const avgCgpa =
    students.length > 0
      ? (
          students.reduce((sum, s) => sum + s.cgpa, 0) / students.length
        ).toFixed(2)
      : "0.00";

  if (loading) {
    return (
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
          Student Management
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Loading students...
        </p>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-left">
          Student Management
        </h1>
        <p className="text-red-400 text-sm sm:text-base mb-4">{error}</p>
        <button
          onClick={fetchStudents}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-h-[80vh] custom-scrollbar overflow-y-auto space-y-6 lg:space-y-8">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-left">
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
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
            {students.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
            Total Students
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
            {activeStudents}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
            Active Students
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
            {graduatingStudents}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
            Graduating
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
            {avgCgpa}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
            Average CGPA
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 mb-6">
        <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base shadow-inner transition-all duration-200 hover:bg-gray-550"
                />
              </div>
            </div>
            <select
              value={studentFilterType}
              onChange={(e) => setStudentFilterType(e.target.value)}
              className="px-4 py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base min-w-0 sm:min-w-[180px] shadow-inner transition-all duration-200 hover:bg-gray-550"
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="graduating">Graduating</option>
              <option value="inactive">Inactive</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gradient-to-r from-gray-600 to-gray-700">
              <tr>
                <th className="px-3 sm:px-4 lg:px-6 py-4 text-center text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Department
                </th>
                <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  CGPA
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gradient-to-r hover:from-gray-650 hover:to-gray-700 transition-all duration-200 hover:shadow-md"
                >
                  <td className="px-3 sm:px-4 lg:px-6 py-4">
                    <div>
                      <div className="text-sm font-bold text-white tracking-wide">
                        {student.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium">
                        {student.email}
                      </div>
                      {/* Show department on mobile when hidden from table */}
                      <div className="sm:hidden text-xs text-gray-400 mt-1 font-medium">
                        {student.department}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-200 font-semibold">
                    {student.studentId}
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-200 font-medium">
                    {student.department}
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-200 font-medium">
                    {student.semester}
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                    <span className="font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      {student.cgpa.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full shadow-sm transition-all duration-200 hover:scale-105 ${
                        student.status === "active"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          : student.status === "graduating"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStudentEdit(student)}
                        className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900 hover:bg-opacity-20 transition-all duration-200 hover:scale-110"
                        title="Edit student"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStudentDelete(student.id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-all duration-200 hover:scale-110"
                        title="Delete student"
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

      {/* Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedStudent ? "Edit Student" : "Add Student"}
            </h3>
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                value={studentFormData.name}
                onChange={(e) =>
                  setStudentFormData({
                    ...studentFormData,
                    name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
                required
              />
              <input
                type="text"
                placeholder="Student ID"
                value={studentFormData.student_id}
                onChange={(e) =>
                  setStudentFormData({
                    ...studentFormData,
                    student_id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
                required
                disabled={selectedStudent}
              />
              <select
                value={studentFormData.department}
                onChange={(e) =>
                  setStudentFormData({
                    ...studentFormData,
                    department: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm sm:text-base"
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business Administration">
                  Business Administration
                </option>
                <option value="Mathematics">Mathematics</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={studentFormData.phone}
                onChange={(e) =>
                  setStudentFormData({
                    ...studentFormData,
                    phone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
              />
              {!selectedStudent && (
                <input
                  type="password"
                  placeholder="Password (leave empty for default)"
                  value={studentFormData.password}
                  onChange={(e) =>
                    setStudentFormData({
                      ...studentFormData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm sm:text-base"
                />
              )}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors order-1 sm:order-2"
                >
                  {selectedStudent ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
