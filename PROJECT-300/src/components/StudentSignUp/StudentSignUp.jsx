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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          student_id: formData.student_id,
          password: formData.password,
          department: formData.department,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        onNavigate("login");
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 overflow-hidden scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-900"
      style={{ overflowY: "auto" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div
              className="group cursor-pointer"
              onClick={() => onNavigate("home")}
            >
              <img
                src={logo}
                alt="MuPortal Logo"
                className="h-12 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {[
                { name: "Home", action: () => onNavigate("home") },
                { name: "About", action: () => {} },
                { name: "Contact", action: () => {} },
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="relative text-white/90 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 group overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></div>
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate("login")}
                className="relative px-6 py-2.5 bg-transparent border-2 border-purple-400/50 text-purple-200 font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <button className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-lg w-full space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-purple-500/20 transition-all duration-500 animate-fade-in-up">
            <div className="text-left">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                Student Sign Up
              </h2>
              <p className="text-white/80 mb-8">
                Create your account to access MuPortal resources
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Student ID
                </label>
                <input
                  type="text"
                  name="student_id"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  placeholder="e.g. 222-115-090"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  pattern="\d{3}-\d{3}-\d{3}"
                  title="Format: 222-115-090"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">
                  Department
                </label>
                <select
                  name="department"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" className="bg-slate-800 text-white">
                    Select your department
                  </option>
                  {departments.map((dept) => (
                    <option
                      key={dept}
                      value={dept}
                      className="bg-slate-800 text-white"
                    >
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </button>
            </form>

            <p className="text-center text-white/70 mt-6">
              Already have an account?{" "}
              <button
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </main>
      {/* Custom CSS for scrollbar */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-purple-600::-webkit-scrollbar-thumb {
          background: #9333ea;
          border-radius: 8px;
        }
        .scrollbar-track-slate-900::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
      `}</style>
    </div>
  );
}
