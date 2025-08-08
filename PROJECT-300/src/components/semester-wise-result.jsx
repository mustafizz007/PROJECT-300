import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function SemesterResultsTable({ onNavigate, studentId = "222-115-090" }) {
  const [semesterResults, setSemesterResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSemesterResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:3000/api/student/semester-results/${studentId}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched semester results:', data);
        
        setSemesterResults(data.semester_results || []);
      } catch (err) {
        console.error('Error fetching semester results:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchSemesterResults();
    }
  }, [studentId]);
  const handleViewDetails = (semester) => {
    // Navigate to detailed results page with semester data
    onNavigate("studentResults", { selectedSemester: semester });
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-gray-600 to-indigo-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">
                Semester Results Overview
              </h2>
              <p className="text-blue-100 mt-2">
                Loading academic performance data...
              </p>
            </div>
            <div className="p-8 flex justify-center items-center min-h-[400px]">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Loading semester results...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">
                Error Loading Results
              </h2>
              <p className="text-red-100 mt-2">
                Unable to fetch semester results
              </p>
            </div>
            <div className="p-8 flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Error: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!semesterResults || semesterResults.length === 0) {
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-gray-600 to-indigo-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">
                Semester Results Overview
              </h2>
              <p className="text-blue-100 mt-2">
                No academic data found
              </p>
            </div>
            <div className="p-8 flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600">No semester results found for this student.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">
              Semester Results Overview
            </h2>
            <p className="text-blue-100 mt-2">
              Academic performance across {semesterResults.length} semesters
            </p>
          </div>

          <div className="p-8">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-gray-200 bg-gray-50">
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4 text-center">
                    SL
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4 text-center">
                    Semester
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4 text-center">
                    CGPA
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4 text-center">
                    Credits
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4 text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4 text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semesterResults.map((result, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-md cursor-pointer group"
                  >
                    <TableCell className="py-4 text-gray-600 font-medium group-hover:text-blue-600 transition-colors duration-200">
                      {String(index + 1).padStart(2, "0")}
                    </TableCell>
                    <TableCell className="py-4 text-gray-800 font-semibold group-hover:text-blue-700 transition-colors duration-200">
                      {result.semester}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          result.cgpa === "InProgress" || result.status === "Current"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-green-100 text-green-800 border border-green-200"
                        }`}
                      >
                        {result.cgpa}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-gray-800 font-medium group-hover:text-blue-700 transition-colors duration-200">
                      {result.credits}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          result.status === "Completed"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {result.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <button
                        onClick={() => handleViewDetails(result.semester)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
