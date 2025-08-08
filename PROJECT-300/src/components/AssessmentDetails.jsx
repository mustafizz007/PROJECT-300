import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  FileText,
  Award,
  Download,
  Upload,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";

export default function AssessmentDetails({
  assessment,
  onBack,
  onEdit,
  onDelete,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock student submissions data
  const submissions = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "ST001",
      submittedAt: "2024-10-18 14:30",
      status: "submitted",
      score: 85,
      feedback: "Good work overall, minor improvements needed in question 3.",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "ST002",
      submittedAt: "2024-10-18 16:45",
      status: "submitted",
      score: 92,
      feedback: "Excellent work! Well-structured answers.",
    },
    {
      id: 3,
      studentName: "Bob Johnson",
      studentId: "ST003",
      submittedAt: null,
      status: "pending",
      score: null,
      feedback: null,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "text-blue-400 bg-blue-900/20";
      case "active":
        return "text-green-400 bg-green-900/20";
      case "completed":
        return "text-gray-400 bg-gray-900/20";
      default:
        return "text-gray-400 bg-gray-900/20";
    }
  };

  const getSubmissionStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "late":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const completionRate = (
    (submissions.filter((s) => s.status === "submitted").length /
      submissions.length) *
    100
  ).toFixed(1);
  const averageScore =
    submissions
      .filter((s) => s.score !== null)
      .reduce((acc, s) => acc + s.score, 0) /
      submissions.filter((s) => s.score !== null).length || 0;

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="bg-gray-700 border-b border-gray-600 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">
                {assessment.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <span>{assessment.course}</span>
                <span>•</span>
                <span className="capitalize">{assessment.type}</span>
                <span>•</span>
                <span>{assessment.totalMarks} marks</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                assessment.status
              )}`}
            >
              {assessment.status}
            </span>
            <button
              onClick={() => onEdit(assessment)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden md:inline">Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-700 border-b border-gray-600">
        <div className="flex space-x-8 px-4 lg:px-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "submissions", label: "Submissions" },
            { id: "analytics", label: "Analytics" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Assessment Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Due Date</p>
                    <p className="font-semibold">
                      {new Date(assessment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="font-semibold">{assessment.duration}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Enrolled</p>
                    <p className="font-semibold">
                      {assessment.studentsEnrolled}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Submissions</p>
                    <p className="font-semibold">
                      {assessment.submissionsReceived}/
                      {assessment.studentsEnrolled}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4">Completion Rate</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="bg-gray-600 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-green-400">
                    {completionRate}%
                  </span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4">Average Score</h3>
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold">
                    {averageScore.toFixed(1)}
                  </span>
                  <span className="text-gray-400">
                    / {assessment.totalMarks}
                  </span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Results</span>
                  </button>
                  <button className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Import Grades</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Student Submissions</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export All</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Submitted At
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {submissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="hover:bg-gray-600 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {submission.studentName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {submission.studentId}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-medium capitalize ${getSubmissionStatusColor(
                              submission.status
                            )}`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">
                          {submission.submittedAt || "Not submitted"}
                        </td>
                        <td className="px-4 py-4">
                          {submission.score !== null ? (
                            <span className="text-sm font-medium">
                              {submission.score}/{assessment.totalMarks}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Assessment Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Score Distribution</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">90-100</span>
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      <div className="bg-gray-600 rounded-full h-2 flex-1">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 w-8">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">80-89</span>
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      <div className="bg-gray-600 rounded-full h-2 flex-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 w-8">40%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">70-79</span>
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      <div className="bg-gray-600 rounded-full h-2 flex-1">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 w-8">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">60-69</span>
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      <div className="bg-gray-600 rounded-full h-2 flex-1">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 w-8">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold mb-4">
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Highest Score</span>
                    <span className="font-semibold">
                      92/{assessment.totalMarks}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Lowest Score</span>
                    <span className="font-semibold">
                      85/{assessment.totalMarks}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Median Score</span>
                    <span className="font-semibold">
                      88.5/{assessment.totalMarks}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Standard Deviation</span>
                    <span className="font-semibold">4.95</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Assessment Settings</h2>

            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <h3 className="text-lg font-semibold mb-4 text-red-400 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Danger Zone</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-400">
                      Delete Assessment
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      This action cannot be undone. All submission data will be
                      permanently removed.
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(assessment.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
