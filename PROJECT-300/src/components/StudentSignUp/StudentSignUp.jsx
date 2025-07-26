import { useState } from "react";
import logo from "../../assets/mu_portal_logo.png";

export default function StudentSignup({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    student_id: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Business Administration",
    "Economics",
    "Law and Justice",
    "English",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your signup logic here
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/80 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="MuPortal Logo"
              className="h-10 cursor-pointer"
              onClick={() => onNavigate("home")}
            />
            <span className="font-bold text-xl text-pink-600">MuPortal</span>
          </div>
          <nav className="flex gap-6">
            <a
              href="#"
              className="text-gray-700 hover:text-pink-600 font-medium"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-pink-600 font-medium"
              onClick={(e) => e.preventDefault()}
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-pink-600 font-medium"
              onClick={(e) => e.preventDefault()}
            >
              Contact
            </a>
          </nav>
          <div className="flex gap-2">
            <button
              className="px-4 py-1 rounded-lg font-semibold text-pink-600 border border-pink-500 hover:bg-pink-50 transition"
              onClick={() => onNavigate("login")}
            >
              Login
            </button>
            <button
              className="px-4 py-1 rounded-lg font-semibold bg-pink-500 text-white hover:bg-pink-600 transition"
              disabled
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-1 text-gray-800 text-center">
            Student Signup
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Create your account to access MuPortal resources
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Student ID
              </label>
              <input
                type="text"
                name="student_id"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="e.g. 222-115-090"
                value={formData.student_id}
                onChange={handleInputChange}
                pattern="\d{3}-\d{3}-\d{3}"
                title="Format: 222-115-090"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Department
              </label>
              <select
                name="department"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <button
              className="text-pink-600 hover:underline font-medium"
              onClick={() => onNavigate("login")}
              type="button"
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
