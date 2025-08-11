import React, { useState, useEffect } from "react";
import {
  FileText,
  Award,
  TrendingUp,
  Star,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import { adminDashboardAPI } from "../../services/api";

export default function ResultsManagement() {
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultSearchTerm, setResultSearchTerm] = useState("");
  const [resultFilterType, setResultFilterType] = useState("all");
  const [results, setResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultFormData, setResultFormData] = useState({
    student_id: "",
    course_id: "",
    semester: "",
    credit: "",
    gpa: "",
  });

  useEffect(() => {
    fetchResults();
    fetchCoursesAndStudents();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultsData = await adminDashboardAPI.getAllResults();
      setResults(resultsData);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesAndStudents = async () => {
    try {
      const [coursesData, studentsData] = await Promise.all([
        adminDashboardAPI.getCoursesForResults(),
        adminDashboardAPI.getAllStudents()
      ]);
      setCourses(coursesData);
      setStudents(studentsData);
    } catch (err) {
      console.error("Error fetching courses and students:", err);
    }
  };

  const handleResultCreate = () => {
    setSelectedResult(null);
    setResultFormData({
      student_id: "",
      course_id: "",
      semester: "",
      credit: "",
      gpa: "",
    });
    setShowResultModal(true);
  };

  const handleResultEdit = (result) => {
    setSelectedResult(result);
    setResultFormData({
      student_id: result.studentId,
      course_id: result.courseCode,
      semester: result.semester,
      credit: result.credit.toString(),
      gpa: result.gpa.toString(),
    });
    setShowResultModal(true);
  };

  const handleResultDelete = async (resultId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this result? This action cannot be undone."
      )
    ) {
      try {
        await adminDashboardAPI.deleteResult(resultId);
        await fetchResults();
      } catch (err) {
        console.error("Error deleting result:", err);
        alert("Failed to delete result. Please try again.");
      }
    }
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...resultFormData,
        credit: parseFloat(resultFormData.credit),
        gpa: parseFloat(resultFormData.gpa),
      };

      if (selectedResult) {
        // Update existing result
        await adminDashboardAPI.updateResult(selectedResult.id, {
          semester: submitData.semester,
          credit: submitData.credit,
          gpa: submitData.gpa,
        });
      } else {
        // Create new result
        await adminDashboardAPI.createResult(submitData);
      }

      await fetchResults();
      setShowResultModal(false);
    } catch (err) {
      console.error("Error saving result:", err);
      alert(`Failed to ${selectedResult ? "update" : "create"} result: ${err.message}`);
    }
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

  const getGradeColor = (grade) => {
    if (grade === "A+" || grade === "A") return "text-green-500";
    if (grade === "A-" || grade === "B+") return "text-blue-500";
    if (grade === "B" || grade === "B-") return "text-yellow-500";
    if (grade === "C+" || grade === "C") return "text-orange-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main scrollable content wrapper */}
      <div className="w-full h-full max-h-[80vh] custom-scrollbar overflow-y-auto space-y-6 lg:space-y-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                Results Management
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Manage student academic results and grades
              </p>
            </div>
            <button
              onClick={handleResultCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base transition-colors"
            >
              <Plus size={16} />
              Add Result
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by student, course..."
                value={resultSearchTerm}
                onChange={(e) => setResultSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm sm:text-base"
              />
            </div>
            <select
              value={resultFilterType}
              onChange={(e) => setResultFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base"
            >
              <option value="all">All Results</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="A+">Grade A+</option>
              <option value="A">Grade A</option>
              <option value="B+">Grade B+</option>
              <option value="B">Grade B</option>
              <option value="C+">Grade C+</option>
            </select>
          </div>
        </div>

        {/* Results Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-400">
                <FileText size={20} />
              </div>
              <span className="text-xs text-green-400">+12%</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{results.length}</h3>
            <p className="text-gray-400 text-sm">Total Results</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-green-400">
                <Award size={20} />
              </div>
              <span className="text-xs text-green-400">+8%</span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {results.filter(r => r.grade === "A+" || r.grade === "A").length}
            </h3>
            <p className="text-gray-400 text-sm">A Grades</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-yellow-400">
                <TrendingUp size={20} />
              </div>
              <span className="text-xs text-green-400">+5%</span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {results.length > 0 ? (results.reduce((sum, r) => sum + r.gpa, 0) / results.length).toFixed(2) : "0.00"}
            </h3>
            <p className="text-gray-400 text-sm">Avg GPA</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-purple-400">
                <Star size={20} />
              </div>
              <span className="text-xs text-green-400">+15%</span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {results.filter(r => r.status === "published").length}
            </h3>
            <p className="text-gray-400 text-sm">Published</p>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-750">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{result.studentName}</div>
                        <div className="text-sm text-gray-400">{result.studentId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{result.courseCode}</div>
                        <div className="text-sm text-gray-400">{result.courseName}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      {result.semester}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      {result.gpa.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      {result.credit}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleResultEdit(result)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleResultDelete(result.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResults.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-400">
              No results found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedResult ? "Edit Result" : "Add Result"}
            </h3>
            <form onSubmit={handleResultSubmit} className="space-y-4">
              <select
                value={resultFormData.student_id}
                onChange={(e) =>
                  setResultFormData({
                    ...resultFormData,
                    student_id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                required
                disabled={selectedResult}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.studentId} - {student.name}
                  </option>
                ))}
              </select>

              <select
                value={resultFormData.course_id}
                onChange={(e) =>
                  setResultFormData({
                    ...resultFormData,
                    course_id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                required
                disabled={selectedResult}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.course_code} value={course.course_code}>
                    {course.course_code} - {course.title}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Semester (e.g., 1-1, 2-1)"
                value={resultFormData.semester}
                onChange={(e) =>
                  setResultFormData({
                    ...resultFormData,
                    semester: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                required
              />

              <input
                type="number"
                step="0.5"
                min="0"
                max="6"
                placeholder="Credit Hours"
                value={resultFormData.credit}
                onChange={(e) =>
                  setResultFormData({
                    ...resultFormData,
                    credit: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                required
              />

              <input
                type="number"
                step="0.25"
                min="0"
                max="4"
                placeholder="GPA (0.0 - 4.0)"
                value={resultFormData.gpa}
                onChange={(e) =>
                  setResultFormData({
                    ...resultFormData,
                    gpa: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                required
              />

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowResultModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                >
                  {selectedResult ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
