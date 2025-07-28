import { useState, useEffect } from "react";

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
    <div className="flex-1 p-8 bg-gray-100">
      <div className="bg-white rounded-2xl p-8 shadow-sm w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Semester Result
        </h1>

        {/* Results Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-2 font-semibold text-gray-900">
                  SL
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">
                  Course ID
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">
                  Course Name
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">
                  CGPA
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">
                  Credits
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {resultsData.courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-2 text-gray-900">{course.sl}</td>
                  <td className="py-4 px-2 text-gray-900">{course.courseId}</td>
                  <td className="py-4 px-2 text-gray-900">
                    {course.courseName}
                  </td>
                  <td className="py-4 px-2 text-gray-900 font-semibold">
                    {course.cgpa}
                  </td>
                  <td className="py-4 px-2 text-gray-900">{course.credits}</td>
                  <td className="py-4 px-2 text-gray-900">{course.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Box */}
        <div className="bg-teal-100 rounded-2xl p-6 border border-teal-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">
                Number of Credits :
              </span>
              <span className="text-gray-900 font-bold text-lg">
                {resultsData.summary.totalCredits}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">
                Remaining Credits :
              </span>
              <span className="text-gray-900 font-bold text-lg">
                {resultsData.summary.remainingCredits}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">Total CGPA :</span>
              <span className="text-gray-900 font-bold text-lg">
                {resultsData.summary.totalCGPA}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
