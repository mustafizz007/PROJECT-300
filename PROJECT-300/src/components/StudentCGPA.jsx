import { useState, useEffect } from "react";
import { FaStar, FaTrophy } from "react-icons/fa";

export function StudentCGPA({ studentId }) {
  const [cgpaData, setCgpaData] = useState({
    currentCGPA: "Loading...",
    scale: "4.0",
    highestCGPA: "Loading...",
    highestSemester: "Loading...",
  });

  useEffect(() => {
    const fetchCGPAData = async () => {
      try {
        // Fetch current overall CGPA
        const currentResponse = await fetch(
          `http://localhost:3000/api/student/result/${studentId}`
        );
        
        // Fetch highest semester CGPA
        const highestResponse = await fetch(
          `http://localhost:3000/api/student/highest-cgpa/${studentId}`
        );

        if (currentResponse.ok && highestResponse.ok) {
          const currentData = await currentResponse.json();
          const highestData = await highestResponse.json();
          
          setCgpaData({
            currentCGPA: currentData.cgpa || "N/A",
            scale: "4.0",
            highestCGPA: highestData.highest_cgpa || "N/A",
            highestSemester: highestData.semester ? `Semester ${highestData.semester}` : "N/A",
          });
        } else {
          // Handle partial failures
          if (currentResponse.ok) {
            const currentData = await currentResponse.json();
            setCgpaData(prev => ({
              ...prev,
              currentCGPA: currentData.cgpa || "N/A"
            }));
          }
          if (highestResponse.ok) {
            const highestData = await highestResponse.json();
            setCgpaData(prev => ({
              ...prev,
              highestCGPA: highestData.highest_cgpa || "N/A",
              highestSemester: highestData.semester ? `Semester ${highestData.semester}` : "N/A"
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching CGPA data:", error);
      }
    };

    if (studentId) {
      fetchCGPAData();
    }
  }, [studentId]);

  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 overflow-auto">
      <br></br>

      <div className="bg-white rounded-3xl p-10 shadow-xl max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          CGPA Progression
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current CGPA Card */}
          <div className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <FaStar className="text-yellow-300 text-5xl mb-4 drop-shadow" />
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">
              Current CGPA
            </h2>
            <div className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
              {cgpaData.currentCGPA}
            </div>
            <p className="text-lg text-blue-100">
              Out of {cgpaData.scale} scale
            </p>
          </div>
          {/* Highest CGPA Card */}
          <div className="bg-gradient-to-br from-green-300 to-green-500 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <FaTrophy className="text-yellow-200 text-5xl mb-4 drop-shadow" />
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">
              Highest CGPA
            </h2>
            <div className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
              {cgpaData.highestCGPA}
            </div>
            <p className="text-lg text-pink-100">{cgpaData.highestSemester}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
