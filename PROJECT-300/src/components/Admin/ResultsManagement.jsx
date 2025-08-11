import { useState } from "react";
import {
  FileText,
  Award,
  TrendingUp,
  Star,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

export default function ResultsManagement() {
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultSearchTerm, setResultSearchTerm] = useState("");
  const [resultFilterType, setResultFilterType] = useState("all");

  const [results, setResults] = useState([
    {
      id: 1,
      studentId: "2021-1-60-001",
      studentName: "Sabbir Ahmed",
      courseCode: "CSE 101",
      courseName: "Programming Fundamentals",
      semester: "Fall 2024",
      marks: 85,
      totalMarks: 100,
      grade: "A",
      gpa: 3.75,
      status: "published",
    },
    {
      id: 2,
      studentId: "2021-1-60-002",
      studentName: "Anindo Paul",
      courseCode: "MATH 201",
      courseName: "Calculus II",
      semester: "Fall 2024",
      marks: 92,
      totalMarks: 100,
      grade: "A+",
      gpa: 4.0,
      status: "published",
    },
    {
      id: 3,
      studentId: "2020-1-60-015",
      studentName: "Qudroti Hossain",
      courseCode: "PHY 101",
      courseName: "Physics I",
      semester: "Fall 2024",
      marks: 78,
      totalMarks: 100,
      grade: "B+",
      gpa: 3.5,
      status: "draft",
    },
  ]);

  const handleResultCreate = () => {
    setSelectedResult(null);
    setShowResultModal(true);
  };

  const handleResultEdit = (result) => {
    setSelectedResult(result);
    setShowResultModal(true);
  };

  const handleResultDelete = (resultId) => {
    setResults(results.filter((r) => r.id !== resultId));
  };

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName
        .toLowerCase()
        .includes(resultSearchTerm.toLowerCase()) ||
      result.studentId.toLowerCase().includes(resultSearchTerm.toLowerCase()) ||
      result.courseCode
        .toLowerCase()
        .includes(resultSearchTerm.toLowerCase()) ||
      result.courseName.toLowerCase().includes(resultSearchTerm.toLowerCase());

    const matchesFilter =
      resultFilterType === "all" ||
      result.status === resultFilterType ||
      result.grade === resultFilterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* Main scrollable content wrapper */}
      <div className="w-full h-full max-h-[80vh] custom-scrollbar overflow-y-auto space-y-6 lg:space-y-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-left">
                Results Management
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                Manage grades, transcripts, and academic performance
              </p>
            </div>
            <button
              onClick={handleResultCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Result</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
              {results.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
              Total Results
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
              {results.filter((r) => r.status === "published").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
              Published
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
              {(
                results.reduce((sum, r) => sum + r.gpa, 0) / results.length
              ).toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
              Average GPA
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-gray-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1 tracking-wide drop-shadow-sm">
              {Math.round(
                (results.reduce((sum, r) => sum + r.marks / r.totalMarks, 0) /
                  results.length) *
                  100
              )}
              %
            </div>
            <div className="text-xs sm:text-sm text-gray-300 tracking-wide">
              Pass Rate
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border border-gray-800 mb-6 shadow-md hover:shadow-xl transition-all duration-200">
          <div className="p-4 md:p-6 border-b border-gray-600/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search results by student, ID, course..."
                    value={resultSearchTerm}
                    onChange={(e) => setResultSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-600/80 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all duration-200 hover:bg-gray-600"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={resultFilterType}
                  onChange={(e) => setResultFilterType(e.target.value)}
                  className="px-4 py-3 bg-gray-600/80 border border-gray-500/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all duration-200 hover:bg-gray-600 min-w-[140px]"
                >
                  <option value="all">All Results</option>
                  <option value="published">Published</option>
                  <option value="A+">Grade A+</option>
                  <option value="A">Grade A</option>
                  <option value="B+">Grade B+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-600 to-gray-700">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 md:px-6 py-4 text-center text-xs font-extrabold text-white uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/50">
                {filteredResults.map((result) => (
                  <tr
                    key={result.id}
                    className="hover:bg-gradient-to-r hover:from-gray-600/30 hover:to-gray-700/30 transition-all duration-200"
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div>
                        <div className="text-sm font-extrabold text-white tracking-wide">
                          {result.studentName}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                          {result.studentId}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div>
                        <div className="text-sm font-extrabold text-white tracking-wide">
                          {result.courseName}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                          {result.courseCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                      {result.semester}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {result.marks}/{result.totalMarks}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-extrabold rounded-full hover:scale-105 transition-transform duration-200 ${
                          result.grade === "A+"
                            ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                            : result.grade === "A"
                            ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                            : result.grade === "B+"
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                            : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                        }`}
                      >
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                      <span className="font-extrabold tracking-wide">
                        {result.gpa}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-extrabold rounded-full hover:scale-105 transition-transform duration-200 ${
                          result.status === "published"
                            ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                            : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleResultEdit(result)}
                          className="p-2 text-blue-400 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResultDelete(result.id)}
                          className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110"
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
      </div>

      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedResult ? "Edit Result" : "Add Result"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student ID"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="text"
                placeholder="Course Code"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="number"
                placeholder="Marks"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="number"
                placeholder="Total Marks"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
              </select>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowResultModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowResultModal(false)}
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
