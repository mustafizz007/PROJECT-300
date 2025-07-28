import { useState, useEffect } from "react";

export function StudentCGPA({ studentId }) {
  const [cgpaData, setCgpaData] = useState({
    currentCGPA: "3.85",
    scale: "4.0",
    highestCGPA: "3.92",
    highestSemester: "Semester 4",
  });

  useEffect(() => {
    const fetchCGPAData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/${studentId}/cgpa`
        );
        if (response.ok) {
          const data = await response.json();
          setCgpaData(data);
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
    <div className="flex-1 p-8 bg-gray-100">
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          CGPA Progression
        </h1>
        <div className="space-y-6">
          <div className="bg-gray-300 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Current CGPA
            </h2>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {cgpaData.currentCGPA}
            </div>
            <p className="text-lg text-gray-700">
              Out of {cgpaData.scale} scale
            </p>
          </div>
          <div className="bg-gray-300 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Highest CGPA
            </h2>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {cgpaData.highestCGPA}
            </div>
            <p className="text-lg text-gray-700">{cgpaData.highestSemester}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
