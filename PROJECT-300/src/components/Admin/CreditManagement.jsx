import { useState } from "react";
import {
  GraduationCap,
  Award,
  TrendingUp,
  Star,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";

export default function CreditManagement() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [creditSearchTerm, setCreditSearchTerm] = useState("");
  const [creditFilterType, setCreditFilterType] = useState("all");

  const [creditRules, setCreditRules] = useState([
    {
      id: 1,
      title: "Computer Science Graduation Requirements",
      description: "Credit requirements for CS degree completion",
      department: "Computer Science",
      totalCreditsRequired: 144,
      coreCredits: 96,
      electiveCredits: 48,
      minimumCGPA: 2.5,
      status: "active",
    },
    {
      id: 2,
      title: "Engineering Graduation Requirements",
      description: "Credit requirements for Engineering degree completion",
      department: "Engineering",
      totalCreditsRequired: 160,
      coreCredits: 120,
      electiveCredits: 40,
      minimumCGPA: 2.75,
      status: "active",
    },
    {
      id: 3,
      title: "Mathematics Graduation Requirements",
      description: "Credit requirements for Mathematics degree completion",
      department: "Mathematics",
      totalCreditsRequired: 128,
      coreCredits: 88,
      electiveCredits: 40,
      minimumCGPA: 2.5,
      status: "active",
    },
  ]);

  const handleCreditCreate = () => {
    setSelectedCredit(null);
    setShowCreditModal(true);
  };

  const handleCreditEdit = (credit) => {
    setSelectedCredit(credit);
    setShowCreditModal(true);
  };

  const handleCreditDelete = (creditId) => {
    setCreditRules(creditRules.filter((r) => r.id !== creditId));
  };

  const filteredCreditRules = creditRules.filter((rule) => {
    const matchesSearch =
      rule.title.toLowerCase().includes(creditSearchTerm.toLowerCase()) ||
      rule.department.toLowerCase().includes(creditSearchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(creditSearchTerm.toLowerCase());

    const matchesFilter =
      creditFilterType === "all" ||
      rule.status === creditFilterType ||
      rule.department === creditFilterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Credit Management
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Manage credit requirements, transfers, and graduation tracking
            </p>
          </div>
          <button
            onClick={handleCreditCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Credit Rule</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {creditRules.length}
          </div>
          <div className="text-sm text-gray-400">Credit Rules</div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg">
              <Award className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {creditRules.filter((r) => r.status === "active").length}
          </div>
          <div className="text-sm text-gray-400">Active Rules</div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {Math.round(
              creditRules.reduce((sum, r) => sum + r.totalCreditsRequired, 0) /
                creditRules.length
            )}
          </div>
          <div className="text-sm text-gray-400">Avg Credits</div>
        </div>

        <div className="bg-gray-700 p-4 md:p-6 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mb-1">
            {(
              creditRules.reduce((sum, r) => sum + r.minimumCGPA, 0) /
              creditRules.length
            ).toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">Min CGPA</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-700 rounded-lg border border-gray-600 mb-6">
        <div className="p-4 md:p-6 border-b border-gray-600">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search credit rules..."
                  value={creditSearchTerm}
                  onChange={(e) => setCreditSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={creditFilterType}
              onChange={(e) => setCreditFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Rules</option>
              <option value="active">Active</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
        </div>

        {/* Credit Rules Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Rule
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Credits
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Core Credits
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Min CGPA
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredCreditRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-600">
                  <td className="px-4 md:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {rule.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {rule.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {rule.department}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className="font-semibold">
                      {rule.totalCreditsRequired}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {rule.coreCredits}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className="font-semibold">{rule.minimumCGPA}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rule.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCreditEdit(rule)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCreditDelete(rule.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedCredit ? "Edit Credit Rule" : "Add Credit Rule"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Rule Title"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                rows="3"
              />
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Mathematics">Mathematics</option>
              </select>
              <input
                type="number"
                placeholder="Total Credits Required"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="number"
                placeholder="Core Credits"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Minimum CGPA"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreditModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreditModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
