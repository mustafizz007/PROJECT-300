import { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
} from "react-icons/fa";

export function StudentResults({ studentId }) {
  const [resultsData, setResultsData] = useState({
    courses: [
      {
        sl: 1,
        courseId: "CSE 201",
        courseName: "Data Structure",
        cgpa: "3.50",
        credits: 3,
        status: "Completed",
      },
      {
        sl: 2,
        courseId: "CSE 201",
        courseName: "Data Structure Lab",
        cgpa: "3.60",
        credits: 1.5,
        status: "Completed",
      },
      {
        sl: 3,
        courseId: "CSE 201",
        courseName: "Algorithm",
        cgpa: "3.80",
        credits: 3,
        status: "Completed",
      },
      {
        sl: 4,
        courseId: "CSE 201",
        courseName: "Algorithm Lab",
        cgpa: "3.90",
        credits: 1.5,
        status: "Completed",
      },
    ],
    summary: {
      totalCredits: 9,
      remainingCredits: 117,
      totalCGPA: "3.80",
    },
  });

  useEffect(() => {
    // Fetch results data from API
    const fetchResultsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/${studentId}/results`
        );
        if (response.ok) {
          const data = await response.json();
          setResultsData(data);
        }
      } catch (error) {
        console.error("Error fetching results data:", error);
      }
    };

    if (studentId) {
      fetchResultsData();
    }
  }, [studentId]);

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 min-h-screen">
      <div className="bg-white rounded-3xl p-10 shadow-xl max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          Semester Result
        </h1>

        {/* Results Table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full rounded-xl overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="text-left py-4 px-2 font-semibold">SL</th>
                <th className="text-left py-4 px-2 font-semibold">Course ID</th>
                <th className="text-left py-4 px-2 font-semibold">
                  Course Name
                </th>
                <th className="text-left py-4 px-2 font-semibold">CGPA</th>
                <th className="text-left py-4 px-2 font-semibold">Credits</th>
                <th className="text-left py-4 px-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {resultsData.courses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 bg-white hover:bg-blue-50 transition"
                >
                  <td className="py-4 px-2">{course.sl}</td>
                  <td className="py-4 px-2">{course.courseId}</td>
                  <td className="py-4 px-2 flex items-center gap-2">
                    {course.courseName}
                  </td>
                  <td className="py-4 px-2 font-semibold">{course.cgpa}</td>
                  <td className="py-4 px-2">{course.credits}</td>
                  <td className="py-4 px-2">
                    {course.status === "Completed" ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <FaCheckCircle /> {course.status}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 font-medium">
                        <FaTimesCircle /> {course.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <FaChartBar className="text-white text-4xl mb-3" />
            <span className="text-white font-medium text-lg mb-1">
              Number of Credits
            </span>
            <span className="text-3xl font-bold text-white">
              {resultsData.summary.totalCredits}
            </span>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <FaBookOpen className="text-white text-4xl mb-3" />
            <span className="text-white font-medium text-lg mb-1">
              Remaining Credits
            </span>
            <span className="text-3xl font-bold text-white">
              {resultsData.summary.remainingCredits}
            </span>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <FaChartBar className="text-white text-4xl mb-3" />
            <span className="text-white font-medium text-lg mb-1">
              Total CGPA
            </span>
            <span className="text-3xl font-bold text-white">
              {resultsData.summary.totalCGPA}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
