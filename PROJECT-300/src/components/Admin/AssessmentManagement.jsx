import { useState } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import AssessmentDetails from "../AssessmentDetails";

export default function AssessmentManagement() {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [viewingAssessment, setViewingAssessment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: "Midterm Exam",
      course: "CSE 101",
      courseName: "Programming Fundamentals",
      type: "exam",
      date: "2024-12-15",
      time: "10:00 AM",
      duration: "120 minutes",
      totalMarks: 100,
      status: "scheduled",
      instructor: "Khudeja Khanom Anwara",
      room: "Room 201",
    },
    {
      id: 2,
      title: "Assignment 3",
      course: "MATH 201",
      courseName: "Calculus II",
      type: "assignment",
      date: "2024-12-20",
      time: "11:59 PM",
      duration: "1 week",
      totalMarks: 50,
      status: "active",
      instructor: "Dr. Sarah Johnson",
      room: "Online",
    },
    {
      id: 3,
      title: "Lab Quiz 2",
      course: "PHY 101",
      courseName: "Physics I",
      type: "quiz",
      date: "2024-12-18",
      time: "2:00 PM",
      duration: "30 minutes",
      totalMarks: 25,
      status: "completed",
      instructor: "Prof. Michael Brown",
      room: "Lab 103",
    },
  ]);

  const handleAddAssessment = () => {
    setSelectedAssessment(null);
    setShowAssessmentModal(true);
  };

  const handleAssessmentEdit = (assessment) => {
    setSelectedAssessment(assessment);
    setShowAssessmentModal(true);
  };

  const handleAssessmentDelete = (assessmentId) => {
    setAssessments(assessments.filter((a) => a.id !== assessmentId));
  };

  const handleViewAssessment = (assessment) => {
    setViewingAssessment(assessment);
  };

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || assessment.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "active":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "scheduled":
        return <Calendar className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (viewingAssessment) {
    return (
      <AssessmentDetails
        assessment={viewingAssessment}
        onBack={() => setViewingAssessment(null)}
        onEdit={(assessment) => {
          setViewingAssessment(null);
          handleAssessmentEdit(assessment);
        }}
        onDelete={(assessmentId) => {
          setViewingAssessment(null);
          handleAssessmentDelete(assessmentId);
        }}
      />
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Assessment Management
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Create and manage course assessments, exams, and assignments
            </p>
          </div>
          <button
            onClick={handleAddAssessment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Add Assessment</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="assignment">Assignments</option>
              <option value="exam">Exams</option>
              <option value="quiz">Quizzes</option>
              <option value="lab">Labs</option>
              <option value="project">Projects</option>
            </select>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assessments Table */}
      <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-gray-600">
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {assessment.title}
                      </div>
                      <div className="text-sm text-gray-400 md:hidden">
                        {assessment.course} • {assessment.type}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {assessment.course}
                      </div>
                      <div className="text-sm text-gray-400">
                        {assessment.courseName}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                    <span className="capitalize">{assessment.type}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                    <div>
                      <div>{assessment.date}</div>
                      <div className="text-xs text-gray-400">
                        {assessment.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        assessment.status
                      )}`}
                    >
                      {getStatusIcon(assessment.status)}
                      <span className="ml-1 capitalize">
                        {assessment.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewAssessment(assessment)}
                        className="text-green-400 hover:text-green-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAssessmentEdit(assessment)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAssessmentDelete(assessment.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete"
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

        {filteredAssessments.length === 0 && (
          <div className="text-center py-8">
            <ClipboardList className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No assessments found</p>
            <p className="text-gray-500 text-sm">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first assessment to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedAssessment ? "Edit Assessment" : "Add Assessment"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Assessment Title"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option value="">Select Course</option>
                <option value="CSE 101">
                  CSE 101 - Programming Fundamentals
                </option>
                <option value="MATH 201">MATH 201 - Calculus II</option>
                <option value="PHY 101">PHY 101 - Physics I</option>
              </select>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option value="">Select Type</option>
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="quiz">Quiz</option>
                <option value="lab">Lab</option>
                <option value="project">Project</option>
              </select>
              <input
                type="date"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="time"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="number"
                placeholder="Total Marks"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAssessmentModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAssessmentModal(false)}
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
