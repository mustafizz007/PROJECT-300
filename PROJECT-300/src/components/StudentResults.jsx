import { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
  FaLightbulb,
  FaArrowUp,
  FaBullseye,
  FaCalculator,
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
  const [showAnalysis, setShowAnalysis] = useState(false);

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

  // Calculate CGPA improvement recommendations
  const calculateImprovementRecommendations = (courses) => {
    const validCourses = courses.filter(
      (course) => course.cgpa !== "InProgress"
    );
    if (validCourses.length === 0) return [];

    const currentCGPA = parseFloat(resultsData.summary.totalCGPA);
    const totalCredits = validCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    // Semester-specific analysis thresholds
    const getSemesterContext = (semester) => {
      const contexts = {
        "1st semester": {
          focus: "Foundation Building",
          description:
            "Focus on fundamental courses that build your programming and math foundation",
          criticalThreshold: 3.5,
          targetMessage: "Strong start is crucial for your academic journey",
        },
        "2nd semester": {
          focus: "Core Development",
          description: "Strengthen data structures and mathematical concepts",
          criticalThreshold: 3.6,
          targetMessage: "Building on fundamentals with advanced concepts",
        },
        "3rd semester": {
          focus: "Advanced Programming",
          description: "Master OOP, algorithms, and system architecture",
          criticalThreshold: 3.7,
          targetMessage: "Critical semester for programming expertise",
        },
        "4th semester": {
          focus: "Database & Competition",
          description: "Database systems and competitive programming skills",
          criticalThreshold: 3.7,
          targetMessage: "Practical application of theoretical knowledge",
        },
        "5th semester": {
          focus: "Systems & Software",
          description: "Operating systems, networks, and software engineering",
          criticalThreshold: 3.8,
          targetMessage: "Industry-relevant system knowledge",
        },
        "12th semester": {
          focus: "Final Project",
          description: "Capstone projects and thesis work",
          criticalThreshold: 3.9,
          targetMessage: "Showcase your complete learning journey",
        },
      };
      return contexts[semester] || contexts["1st semester"];
    };

    const semesterContext = getSemesterContext(selectedSemester);

    // Find courses below semester-specific threshold
    const improvementCourses = validCourses
      .map((course) => {
        const courseCGPA = parseFloat(course.cgpa);
        const impactWeight = course.credits / totalCredits;

        // Semester-specific improvement targets
        const getTargetScenarios = (currentCGPA, semester) => {
          if (semester === "12th semester") {
            // Final semester - focus on excellence
            return [
              { targetCGPA: 3.8, label: "Good (3.8)" },
              { targetCGPA: 3.9, label: "Very Good (3.9)" },
              { targetCGPA: 4.0, label: "Excellent (4.0)" },
            ];
          } else if (semester === "1st semester") {
            // First semester - build confidence
            return [
              { targetCGPA: 3.3, label: "Stable (3.3)" },
              { targetCGPA: 3.7, label: "Good (3.7)" },
              { targetCGPA: 4.0, label: "Excellent (4.0)" },
            ];
          } else {
            // Regular semesters
            return [
              { targetCGPA: 3.5, label: "Good (3.5)" },
              { targetCGPA: 3.75, label: "Very Good (3.75)" },
              { targetCGPA: 4.0, label: "Excellent (4.0)" },
            ];
          }
        };

        const scenarios = getTargetScenarios(courseCGPA, selectedSemester)
          .map((scenario) => {
            if (courseCGPA >= scenario.targetCGPA) return null;

            const improvement = scenario.targetCGPA - courseCGPA;
            const cgpaIncrease = improvement * impactWeight;
            const newOverallCGPA = currentCGPA + cgpaIncrease;

            return {
              ...scenario,
              currentCGPA: courseCGPA,
              improvement,
              cgpaIncrease,
              newOverallCGPA: Math.min(4.0, newOverallCGPA),
            };
          })
          .filter(Boolean);

        // Calculate priority based on semester context
        const isCritical = courseCGPA < semesterContext.criticalThreshold;
        const priorityBoost = isCritical ? 0.2 : 0;

        return {
          ...course,
          currentCGPA: courseCGPA,
          impactWeight,
          scenarios,
          semesterContext,
          isCritical,
          improvementPotential:
            scenarios.length > 0
              ? scenarios[scenarios.length - 1].cgpaIncrease + priorityBoost
              : 0,
        };
      })
      .filter((course) => course.scenarios.length > 0)
      .sort((a, b) => b.improvementPotential - a.improvementPotential)
      .slice(0, 5); // Top 5 courses for improvement

    return { courses: improvementCourses, context: semesterContext };
  };

  const improvementData = calculateImprovementRecommendations(
    resultsData.courses
  );
  const improvementRecommendations = improvementData.courses;
  const semesterAnalysisContext = improvementData.context;

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

        {/* Analyze CGPA Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 ease-out hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FaLightbulb className="text-2xl mr-3 animate-pulse" />
            <span className="relative z-10 tracking-wide">
              {showAnalysis ? "Hide CGPA Analysis" : "Analyze My CGPA"}
            </span>
            <FaArrowUp
              className={`text-xl ml-3 relative z-10 transform transition-transform duration-300 ${
                showAnalysis ? "rotate-180" : "rotate-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* CGPA Improvement Analysis */}
        {showAnalysis && improvementRecommendations.length > 0 && (
          <div className="mt-8 transition-all duration-500 ease-in-out opacity-100">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-8 transform transition-all duration-700 ease-out">
              <div className="flex items-center justify-center mb-4">
                <FaLightbulb className="text-white text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-white">
                  {selectedSemester} - CGPA Improvement Analysis
                </h2>
              </div>
              <p className="text-white text-center opacity-90 mb-2">
                {semesterAnalysisContext.description}
              </p>
              <div className="bg-white/20 rounded-lg p-3 mt-4">
                <p className="text-white text-center font-medium">
                  <strong>Focus Area:</strong> {semesterAnalysisContext.focus} |{" "}
                  {semesterAnalysisContext.targetMessage}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Status */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <FaCalculator className="text-blue-600 text-2xl mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Current Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Current Semester CGPA:
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      {resultsData.summary.totalCGPA}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Credits:</span>
                    <span className="font-semibold text-gray-800">
                      {resultsData.summary.totalCredits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Courses to Improve:</span>
                    <span className="font-semibold text-orange-600">
                      {improvementRecommendations.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Improvement Potential */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <FaArrowUp className="text-green-600 text-2xl mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Improvement Potential
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Maximum Possible CGPA:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      4.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Potential Increase:</span>
                    <span className="font-semibold text-green-600">
                      +
                      {(
                        4.0 - parseFloat(resultsData.summary.totalCGPA)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Focus Areas:</span>
                    <span className="font-semibold text-blue-600">
                      {improvementRecommendations
                        .slice(0, 2)
                        .map((course) => course.courseId)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Recommendations */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaBullseye className="text-red-500 mr-3" />
                Course Improvement Recommendations
              </h3>

              <div className="space-y-4">
                {improvementRecommendations.map((course, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
                      course.isCritical
                        ? "border-red-500 bg-red-50"
                        : "border-orange-500"
                    } transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-l-8`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="lg:flex-1">
                        <div className="flex items-center mb-2">
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full mr-3 ${
                              course.isCritical
                                ? "bg-red-100 text-red-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {course.isCritical
                              ? "🚨 Critical"
                              : `Priority #${index + 1}`}
                          </span>
                          <h4 className="text-lg font-semibold text-gray-800">
                            {course.courseName}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>Course: {course.courseId}</span>
                          <span>•</span>
                          <span>Credits: {course.credits}</span>
                          <span>•</span>
                          <span>Current CGPA: {course.currentCGPA}</span>
                          {course.isCritical && (
                            <>
                              <span>•</span>
                              <span className="text-red-600 font-medium">
                                Below {semesterAnalysisContext.focus} Threshold
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="lg:flex-1 lg:ml-6">
                        <h5 className="font-medium text-gray-700 mb-2">
                          Improvement Scenarios:
                        </h5>
                        <div className="space-y-2">
                          {course.scenarios.map((scenario, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-gray-600">
                                Improve to {scenario.label}:
                              </span>
                              <span className="font-semibold text-green-600">
                                +{scenario.cgpaIncrease.toFixed(3)} →{" "}
                                {scenario.newOverallCGPA.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`mt-4 p-3 rounded-lg ${
                        course.isCritical ? "bg-red-50" : "bg-blue-50"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          course.isCritical ? "text-red-800" : "text-blue-800"
                        }`}
                      >
                        <strong>
                          {course.isCritical ? "Critical Impact:" : "Impact:"}
                        </strong>{" "}
                        This course contributes{" "}
                        {(course.impactWeight * 100).toFixed(1)}% to your
                        {selectedSemester} CGPA.
                        {course.isCritical && (
                          <span className="font-bold">
                            {" "}
                            Improving this course is essential for{" "}
                            {semesterAnalysisContext.focus.toLowerCase()}{" "}
                            success.
                          </span>
                        )}{" "}
                        Improving to 4.0 could increase your semester CGPA by up
                        to +
                        {course.scenarios[
                          course.scenarios.length - 1
                        ]?.cgpaIncrease.toFixed(3) || "0.000"}{" "}
                        points.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Combined Improvement Strategy */}
            <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaArrowUp className="mr-3" />
                Combined Improvement Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {improvementRecommendations
                      .slice(0, 3)
                      .reduce(
                        (sum, course) =>
                          sum +
                          (course.scenarios[course.scenarios.length - 1]
                            ?.cgpaIncrease || 0),
                        0
                      )
                      .toFixed(3)}
                  </div>
                  <div className="text-sm opacity-90">
                    Potential CGPA Increase
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.min(
                      4.0,
                      parseFloat(resultsData.summary.totalCGPA) +
                        improvementRecommendations
                          .slice(0, 3)
                          .reduce(
                            (sum, course) =>
                              sum +
                              (course.scenarios[course.scenarios.length - 1]
                                ?.cgpaIncrease || 0),
                            0
                          )
                    ).toFixed(2)}
                  </div>
                  <div className="text-sm opacity-90">Target CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.min(3, improvementRecommendations.length)}
                  </div>
                  <div className="text-sm opacity-90">Courses to Focus On</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
