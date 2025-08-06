import { useState } from "react";
import logo from "../../assets/mu_portal_logo.png";

export default function AdminLogin({ onNavigate, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    admin_id: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: formData.admin_id,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(formData.admin_id);
      } else {
        alert(data.error || "Admin login failed.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
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
                className="h-12 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></div>
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <button className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                <span className="relative z-10">Admin Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              <button
                onClick={() => onNavigate("admin-signup")}
                className="relative px-6 py-2.5 bg-transparent border-2 border-blue-400/50 text-blue-200 font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Admin Sign Up
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-blue-500/20 transition-all duration-500 animate-fade-in-up">
            <div className="text-left">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                Admin Login
              </h2>
              <p className="text-white/80 mb-8">
                Sign in to access the administrative dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90 text-left">
                  Admin ID
                </label>
                <input
                  type="text"
                  name="admin_id"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  placeholder="e.g. ADMIN-001"
                  value={formData.admin_id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90 text-left">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  placeholder="Enter your admin password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-cyan-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  {isLoading ? "Signing In..." : "Admin Sign In"}
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </button>
            </form>

            <p className="text-center text-white/70 mt-6">
              Don't have an admin account?{" "}
              <button
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline"
                onClick={() => onNavigate("admin-signup")}
              >
                Create Admin Account
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
