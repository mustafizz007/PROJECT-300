import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const semesterResults = [
  { semester: "1st semester", cgpa: "3.50", credits: 28, status: "Completed" },
  { semester: "2nd semester", cgpa: "3.60", credits: 28, status: "Completed" },
  { semester: "3rd semester", cgpa: "3.80", credits: 28, status: "Completed" },
  { semester: "4th semester", cgpa: "3.90", credits: 28, status: "Completed" },
  { semester: "5th semester", cgpa: "3.75", credits: 28, status: "Completed" },
  { semester: "6th semester", cgpa: "3.85", credits: 28, status: "Completed" },
  { semester: "7th semester", cgpa: "3.65", credits: 28, status: "Completed" },
  { semester: "8th semester", cgpa: "3.95", credits: 28, status: "Completed" },
  { semester: "9th semester", cgpa: "3.70", credits: 16, status: "Completed" },
  { semester: "10th semester", cgpa: "3.88", credits: 16, status: "Completed" },
  { semester: "11th semester", cgpa: "3.92", credits: 16, status: "Completed" },
  {
    semester: "12th semester",
    cgpa: "InProgress",
    credits: 16,
    status: "Current",
  },
];

export default function SemesterResultsTable({ onNavigate }) {
  const handleViewDetails = (semester) => {
    // Navigate to detailed results page with semester data
    onNavigate("studentResults", { selectedSemester: semester });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">
              Semester Results Overview
            </h2>
            <p className="text-blue-100 mt-2">
              Academic performance across all semesters
            </p>
          </div>

          <div className="p-8">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-gray-200 bg-gray-50">
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4">
                    SL
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4">
                    Semester
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4">
                    CGPA
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4">
                    Credits
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-700 font-bold text-sm uppercase tracking-wide py-4">
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
                          result.cgpa === "InProgress"
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
