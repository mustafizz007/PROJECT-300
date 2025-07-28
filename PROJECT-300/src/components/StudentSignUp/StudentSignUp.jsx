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

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
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
  }
};


  return (
 <div className="min-h-screen bg-gradient-to-br from-violet-100 to-blue-100 flex flex-col">      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="MuPortal Logo" className="logo-image" />
          </div>
          <nav className="nav">
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
            >
              Home
            </a>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              About
            </a>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Contact
            </a>
          </nav>
          <div className="auth-buttons">
            <button
              className="px-4 py-1 rounded-lg font-semibold text-gray-600 border border-gray-500 hover:bg-gray-50 transition"
              onClick={() => onNavigate("login")}
            >
              Login
            </button>
            <button
              className="px-4 py-1 rounded-lg font-semibold bg-gray-900 text-white hover:bg-gray-700 transition"
              disabled
            >Sign Up</button>
          </div>
        </div>
      </header>
        <br></br>
      {/* Signup Form */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-left">
          <h2 className="text-2xl font-bold mb-1 text-gray-800 ">
            Student Signup
          </h2>
          <p className="text-gray-500 mb-6">
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

              <button type="submit" className="w-full py-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-lg transition">
                Create Account
              </button>
            </form>

            <p className="signup-footer">
              Already have an account?{" "}
              <button className="text-gray-700 hover:underline font-medium" onClick={() => onNavigate("login")}>
                Login
              </button>
            </p>
          </div>
        
      </main>
      <br></br>
    </div>
  );
}