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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Map frontend semester format to API format
  const mapSemesterToAPIFormat = (semester) => {
    const semesterMap = {
      "1st semester": "1-1",
      "2nd semester": "1-2",
      "3rd semester": "1-3",
      "4th semester": "2-1",
      "5th semester": "2-2",
      "6th semester": "2-3",
      "7th semester": "3-1",
      "8th semester": "3-2",
      "9th semester": "3-3",
      "10th semester": "4-1",
      "11th semester": "4-2",
      "12th semester": "4-3",
    };
    return semesterMap[semester] || "1-1";
  };

  // Fetch data from API when studentId or selectedSemester changes
  useEffect(() => {
    const fetchResultsData = async () => {
      if (!studentId || !selectedSemester) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiSemester = mapSemesterToAPIFormat(selectedSemester);
        console.log(`Fetching data for ${selectedSemester} (${apiSemester})`);

        const response = await fetch(
          `http://localhost:3000/api/student/${studentId}/results/${apiSemester}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            // If no data found, show empty state but don't error
            setResultsData({
              courses: [],
              summary: {
                totalCredits: 0,
                remainingCredits: 160,
                totalCGPA: "0.00",
              },
            });
            setLoading(false);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched results data:", data);

        setResultsData(data);
      } catch (err) {
        console.error("Error fetching results data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResultsData();
  }, [studentId, selectedSemester]);

  // Calculate CGPA improvement recommendations
  const calculateImprovementRecommendations = (courses) => {
    const validCourses = courses.filter(
      (course) => course.cgpa !== "InProgress"
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

    // Return early if no valid courses with proper structure
    if (validCourses.length === 0) {
      return { courses: [], context: semesterContext };
    }

    const currentCGPA = parseFloat(resultsData.summary.totalCGPA);
    const totalCredits = validCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

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
  const improvementRecommendations = improvementData?.courses || [];
  const semesterAnalysisContext = improvementData?.context || {
    focus: "Academic Progress",
    description:
      "Analyze your semester performance and identify improvement opportunities",
    criticalThreshold: 3.5,
    targetMessage: "Focus on consistent academic excellence",
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 custom-scrollbar overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 shadow-xl max-w-8xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading semester results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 custom-scrollbar overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 shadow-xl max-w-8xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                Error loading results: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 custom-scrollbar overflow-y-auto">
      <div className="bg-white rounded-3xl p-10 shadow-xl max-w-8xl mx-auto hover:shadow-2xl hover:shadow-blue-200/30 transition-shadow duration-500">
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
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-default">
          {selectedSemester
            ? `${selectedSemester} Results`
            : "Semester Results"}
        </h1>

        {/* Results Table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-300 to-rose-400 text-white hover:from-indigo-400 hover:to-rose-500 transition-all duration-300">
                <th className="text-center py-4 px-2 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  SL
                </th>
                <th className="text-center py-4 px-2 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Course ID
                </th>
                <th className="text-center py-4 px-2 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Course Name
                </th>
                <th className="text-center py-4 px-2 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  CGPA
                </th>
                <th className="text-center py-4 px-2 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Credits
                </th>
                <th className="text-center py-4 px-2 font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {resultsData.courses.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer"
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
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl hover:shadow-teal-500/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <FaChartBar className="text-white text-4xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
            <span className="text-white font-medium text-lg mb-1 group-hover:text-teal-100 transition-colors duration-300">
              Number of Credits
            </span>
            <span className="text-3xl font-bold text-white group-hover:text-4xl transition-all duration-300">
              {resultsData.summary.totalCredits}
            </span>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <FaBookOpen className="text-white text-4xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
            <span className="text-white font-medium text-lg mb-1 group-hover:text-blue-100 transition-colors duration-300">
              Remaining Credits
            </span>
            <span className="text-3xl font-bold text-white group-hover:text-4xl transition-all duration-300">
              {resultsData.summary.remainingCredits}
            </span>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group">
            <FaChartBar className="text-white text-4xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
            <span className="text-white font-medium text-lg mb-1 group-hover:text-purple-100 transition-colors duration-300">
              Total CGPA
            </span>
            <span className="text-3xl font-bold text-white group-hover:text-4xl transition-all duration-300">
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
        {showAnalysis && (
          <div className="mt-8 transition-all duration-500 ease-in-out opacity-100">
            {improvementRecommendations.length > 0 ? (
              // Regular Analysis for completed courses
              <>
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
                      <strong>Focus Area:</strong>{" "}
                      {semesterAnalysisContext.focus} |{" "}
                      {semesterAnalysisContext.targetMessage}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Special case for semesters with no completed courses (like 12th semester)
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 transform transition-all duration-700 ease-out">
                <div className="flex items-center justify-center mb-6">
                  <FaLightbulb className="text-white text-4xl mr-4" />
                  <h2 className="text-3xl font-bold text-white">
                    {selectedSemester} - Future Projection Analysis
                  </h2>
                </div>
                <div className="bg-white/20 rounded-xl p-6 mb-6">
                  <p className="text-white text-center text-lg mb-4">
                    <strong>🎓 Final Semester Journey</strong>
                  </p>
                  <p className="text-white text-center opacity-90 mb-4">
                    Your courses are currently in progress. Here's how to
                    maximize your final semester impact!
                  </p>
                </div>

                {/* Current Courses Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {resultsData.courses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                    >
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-100 transition-colors duration-300">
                        {course.courseName}
                      </h4>
                      <p className="text-white/80 text-sm mb-2 group-hover:text-white/90 transition-colors duration-300">
                        Course: {course.courseId}
                      </p>
                      <p className="text-white/80 text-sm mb-2 group-hover:text-white/90 transition-colors duration-300">
                        Credits: {course.credits}
                      </p>
                      <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium group-hover:bg-yellow-300 group-hover:scale-110 transition-all duration-300">
                        {course.status} - In Progress
                      </div>
                    </div>
                  ))}
                </div>

                {/* Projection Scenarios */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBullseye className="text-purple-600 mr-3" />
                    Final Semester Target Planning
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Scenario Cards */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 border-2 border-green-200 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2 group-hover:text-4xl group-hover:text-green-700 transition-all duration-300">
                          4.0
                        </div>
                        <div className="text-green-800 font-semibold mb-2 group-hover:text-green-900 transition-colors duration-300">
                          Excellence Target
                        </div>
                        <div className="text-sm text-green-700 group-hover:text-green-800 transition-colors duration-300">
                          Achieve perfect scores in all final courses to
                          showcase mastery
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg p-4 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-4xl group-hover:text-blue-700 transition-all duration-300">
                          3.8+
                        </div>
                        <div className="text-blue-800 font-semibold mb-2 group-hover:text-blue-900 transition-colors duration-300">
                          Strong Finish
                        </div>
                        <div className="text-sm text-blue-700 group-hover:text-blue-800 transition-colors duration-300">
                          Maintain high performance to end your academic journey
                          successfully
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-lg p-4 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:text-4xl group-hover:text-purple-700 transition-all duration-300">
                          3.5+
                        </div>
                        <div className="text-purple-800 font-semibold mb-2 group-hover:text-purple-900 transition-colors duration-300">
                          Graduation Ready
                        </div>
                        <div className="text-sm text-purple-700 group-hover:text-purple-800 transition-colors duration-300">
                          Secure your graduation with consistent good
                          performance
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                    <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                      <FaCalculator className="mr-3" />
                      Your Final Semester Action Plan
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-orange-800">
                            Project 300 Excellence
                          </p>
                          <p className="text-orange-700 text-sm">
                            Focus on creating an outstanding capstone project
                            that demonstrates your technical skills
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-orange-800">
                            Thesis Research Impact
                          </p>
                          <p className="text-orange-700 text-sm">
                            Conduct thorough research and present original
                            findings in your thesis work
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-orange-800">
                            Internship Excellence
                          </p>
                          <p className="text-orange-700 text-sm">
                            Leverage your internship experience to gain
                            practical industry knowledge
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivation Section */}
                  <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
                    <h4 className="text-xl font-bold mb-3">
                      🎯 You're Almost There!
                    </h4>
                    <p className="text-white/90 mb-4">
                      This is your final semester - the culmination of your
                      entire academic journey. Every project, every line of
                      code, every research insight matters.
                    </p>
                    <p className="text-white font-semibold">
                      Make it count. Show the world what you've learned.
                      Graduate with pride! 🚀
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Only show these sections if we have completed courses */}
            {improvementRecommendations.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Status */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-300 cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <FaCalculator className="text-blue-600 text-2xl mr-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                        Current Status
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center group-hover:bg-blue-50 rounded-lg px-2 py-1 transition-all duration-300">
                        <span className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">
                          Current Semester CGPA:
                        </span>
                        <span className="font-bold text-lg text-blue-600 group-hover:text-blue-800 group-hover:scale-110 transition-all duration-300">
                          {resultsData.summary.totalCGPA}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group-hover:bg-blue-50 rounded-lg px-2 py-1 transition-all duration-300">
                        <span className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">
                          Total Credits:
                        </span>
                        <span className="font-semibold text-gray-800 group-hover:text-blue-800 group-hover:scale-110 transition-all duration-300">
                          {resultsData.summary.totalCredits}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group-hover:bg-blue-50 rounded-lg px-2 py-1 transition-all duration-300">
                        <span className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300">
                          Courses to Improve:
                        </span>
                        <span className="font-semibold text-orange-600 group-hover:text-orange-700 group-hover:scale-110 transition-all duration-300">
                          {improvementRecommendations.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Potential */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-300 cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <FaArrowUp className="text-green-600 text-2xl mr-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                        Improvement Potential
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center group-hover:bg-green-50 rounded-lg px-2 py-1 transition-all duration-300">
                        <span className="text-gray-600 group-hover:text-green-700 transition-colors duration-300">
                          Maximum Possible CGPA:
                        </span>
                        <span className="font-bold text-lg text-green-600 group-hover:text-green-800 group-hover:scale-110 transition-all duration-300">
                          4.00
                        </span>
                      </div>
                      <div className="flex justify-between items-center group-hover:bg-green-50 rounded-lg px-2 py-1 transition-all duration-300">
                        <span className="text-gray-600 group-hover:text-green-700 transition-colors duration-300">
                          Potential Increase:
                        </span>
                        <span className="font-semibold text-green-600 group-hover:text-green-800 group-hover:scale-110 transition-all duration-300">
                          +
                          {(
                            4.0 - parseFloat(resultsData.summary.totalCGPA)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group-hover:bg-green-50 rounded-lg px-2 py-1 transition-all duration-300">
                        <span className="text-gray-600 group-hover:text-green-700 transition-colors duration-300">
                          Focus Areas:
                        </span>
                        <span className="font-semibold text-blue-600 group-hover:text-blue-800 group-hover:scale-110 transition-all duration-300">
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
                                    Below {semesterAnalysisContext.focus}{" "}
                                    Threshold
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
                              course.isCritical
                                ? "text-red-800"
                                : "text-blue-800"
                            }`}
                          >
                            <strong>
                              {course.isCritical
                                ? "Critical Impact:"
                                : "Impact:"}
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
                            Improving to 4.0 could increase your semester CGPA
                            by up to +
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
                      <div className="text-sm opacity-90">
                        Courses to Focus On
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
