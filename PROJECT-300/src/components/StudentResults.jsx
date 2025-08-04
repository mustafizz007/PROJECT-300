import { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
} from "react-icons/fa";

export function StudentResults({ studentId, selectedSemester, onNavigate }) {
  const [resultsData, setResultsData] = useState({
    courses: [],
    summary: {
      totalCredits: 0,
      remainingCredits: 160,
      totalCGPA: "0.00",
    },
  });

  // Calculate summary based on selected semester courses
  useEffect(() => {
    const semesterCourses = {
      "1st semester": [
        {
          sl: 1,
          courseId: "CSE 101",
          courseName: "Structured Programming",
          cgpa: "4.00",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 2,
          courseId: "CSE 101L",
          courseName: " Structured Programming Lab",
          cgpa: "3.60",
          credits: 1.5,
          status: "Regular",
        },
        {
          sl: 3,
          courseId: "MAT 101",
          courseName: "Basic Electrical Engineering",
          cgpa: "3.40",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 4,
          courseId: "PHY 101",
          courseName: "Physics I",
          cgpa: "3.30",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 5,
          courseId: "ENG 101",
          courseName: "English I",
          cgpa: "3.70",
          credits: 2,
          status: "Regular",
        },
        {
          sl: 6,
          courseId: "CSE 101",
          courseName: "Discrete Mathematics",
          cgpa: "4.00",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 7,
          courseId: "CSE 101",
          courseName: "Differential and Integral Calculus",
          cgpa: "3.80",
          credits: 3,
          status: "Regular",
        },
      ],
      "2nd semester": [
        {
          sl: 1,
          courseId: "CSE 102",
          courseName: "Data Structures",
          cgpa: "3.60",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 2,
          courseId: "CSE 102L",
          courseName: "Data Structures Lab",
          cgpa: "3.70",
          credits: 1.5,
          status: "Regular",
        },
        {
          sl: 3,
          courseId: "MAT 102",
          courseName: "Differential Equations and Laplace Transforms",
          cgpa: "3.50",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 4,
          courseId: "PHY 102",
          courseName: "Physics II",
          cgpa: "3.40",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 5,
          courseId: "STAT 101",
          courseName: "English II",
          cgpa: "3.80",
          credits: 2,
          status: "Regular",
        },
        {
          sl: 6,
          courseId: "CSE 102",
          courseName: "Engineering ethics and cyber law",
          cgpa: "4.00",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 7,
          courseId: "CSE 102",
          courseName: "Basic Electrical Engineering",
          cgpa: "3.80",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 8,
          courseId: "CSE 102",
          courseName: "Communication Engineering",
          cgpa: "3.90",
          credits: 3,
          status: "Regular",
        },
      ],
      "3rd semester": [
        {
          sl: 1,
          courseId: "CSE 201",
          courseName: "Communication Engineering",
          cgpa: "3.80",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 2,
          courseId: "CSE 201L",
          courseName: "Object Oriented Programming ",
          cgpa: "3.90",
          credits: 1.5,
          status: "Regular",
        },
        {
          sl: 3,
          courseId: "CSE 203",
          courseName: "Object Oriented Programming Lab",
          cgpa: "3.70",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 4,
          courseId: "MAT 201",
          courseName: "Algorithm Design and Analysis",
          cgpa: "3.60",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 5,
          courseId: "ECO 101",
          courseName: "Algorithm Design and Analysis Lab",
          cgpa: "3.85",
          credits: 2,
          status: "Regular",
        },
        {
          sl: 6,
          courseId: "CSE 205",
          courseName: "Bangladesh Studies",
          cgpa: "3.75",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 7,
          courseId: "CSE 207",
          courseName: "Computer Organization and Architecture",
          cgpa: "3.90",
          credits: 3,
          status: "Regular",
        },
      ],
      "4th semester": [
        {
          sl: 1,
          courseId: "CSE 202",
          courseName: "Principles of Economics and Entrepreneurship",
          cgpa: "3.90",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 2,
          courseId: "CSE 202L",
          courseName: "Matric,complex variables and Fourier Analysis",
          cgpa: "4.00",
          credits: 1.5,
          status: "Regular",
        },
        {
          sl: 3,
          courseId: "CSE 204",
          courseName: "Competitive Programming",
          cgpa: "3.80",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 4,
          courseId: "CSE 206",
          courseName: "Database Management Systems",
          cgpa: "3.85",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 5,
          courseId: "HUM 101",
          courseName: "Business Studies",
          cgpa: "3.75",
          credits: 2,
          status: "Regular",
        },
      ],
      "5th semester": [
        {
          sl: 1,
          courseId: "CSE 301",
          courseName: "Operating Systems",
          cgpa: "3.75",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 2,
          courseId: "CSE 301L",
          courseName: "OS Lab",
          cgpa: "3.80",
          credits: 1.5,
          status: "Regular",
        },
        {
          sl: 3,
          courseId: "CSE 303",
          courseName: "Software Engineering",
          cgpa: "3.70",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 4,
          courseId: "CSE 305",
          courseName: "Computer Networks",
          cgpa: "3.65",
          credits: 3,
          status: "Regular",
        },
        {
          sl: 5,
          courseId: "MAT 301",
          courseName: "Theory of Computations",
          cgpa: "3.90",
          credits: 3,
          status: "Regular",
        },
      ],
      "12th semester": [
        {
          sl: 1,
          courseId: "CSE 498",
          courseName: "Project 300",
          cgpa: "InProgress",
          credits: 3,
          status: "Current",
        },
        {
          sl: 2,
          courseId: "CSE 499",
          courseName: "Thesis",
          cgpa: "InProgress",
          credits: 3,
          status: "Current",
        },
        {
          sl: 3,
          courseId: "CSE 495",
          courseName: "Internship",
          cgpa: "InProgress",
          credits: 2,
          status: "Current",
        },
      ],
    };

    const courses =
      semesterCourses[selectedSemester] || semesterCourses["1st semester"];
    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const validCgpaCourses = courses.filter(
      (course) => course.cgpa !== "InProgress"
    );
    const averageCgpa =
      validCgpaCourses.length > 0
        ? (
            validCgpaCourses.reduce(
              (sum, course) => sum + parseFloat(course.cgpa),
              0
            ) / validCgpaCourses.length
          ).toFixed(2)
        : "0.00";

    setResultsData({
      courses,
      summary: {
        totalCredits,
        remainingCredits: 160 - totalCredits,
        totalCGPA: averageCgpa,
      },
    });
  }, [selectedSemester]);

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
    <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 overflow-auto">
      <div className="bg-white rounded-3xl p-10 shadow-xl max-w-8xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate("results")}
            className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
          >
            <svg
              className="w-5 h-5 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-semibold tracking-wide">
              Back to Semesters
            </span>
            <div className="ml-2 w-0 group-hover:w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          {selectedSemester
            ? `${selectedSemester} Results`
            : "Semester Results"}
        </h1>

        {/* Results Table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full rounded-xl overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-300 to-rose-400 text-white">
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
                    {course.status === "Regular" ? (
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
