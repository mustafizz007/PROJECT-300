import { useState, useEffect } from "react";
import { FaStar, FaTrophy } from "react-icons/fa";

export function StudentCGPA({ studentId }) {
  const [cgpaData, setCgpaData] = useState({
    currentCGPA: "Loading...",
    scale: "4.0",
    highestCGPA: "Loading...",
    highestSemester: "Loading...",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCGPAData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:3000/api/student/${studentId}/cgpa`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched CGPA data:', data);
        setCgpaData(data);
      } catch (error) {
        console.error("Error fetching CGPA data:", error);
        setError(error.message);
        // Keep loading state for error cases
        setCgpaData({
          currentCGPA: "Error",
          scale: "4.0",
          highestCGPA: "Error",
          highestSemester: "Unable to load",
        });
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchCGPAData();
    }
  }, [studentId]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-full p-8 bg-gradient-to-br from-gray-200 via-blue-100 to-gray-100 overflow-auto">
        <br></br>
        <br></br>
        <br></br>
        <div className="bg-white rounded-3xl p-10 shadow-xl max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
            CGPA Progression
          </h1>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading CGPA data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-gray-200 via-blue-100 to-gray-100 overflow-auto">
      <br></br>
      <br></br>
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
