import { useState } from "react";
import logo from "../../assets/mu_portal_logo.png";

export default function StudentLogin({ onNavigate, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    student_id: "",
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
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: formData.student_id,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");

        onLoginSuccess(formData.student_id); // Pass student ID to App

        
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img
              src={logo || "/placeholder.svg"}
              alt="MuPortal Logo"
              className="logo-image"
              onClick={() => onNavigate("home")}
              style={{ cursor: "pointer" }}
            />
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
            <button className="login-btn active">Login</button>
            <button className="signup-btn" onClick={() => onNavigate("signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Student Login</h2>
            <p className="login-subtitle">
              Sign in to access your MuPortal account
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  name="student_id"
                  className="form-input"
                  placeholder="e.g. 222-115-090"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="login-submit-btn"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="login-footer">
              Don't have an account?{" "}
              <button className="link-btn" onClick={() => onNavigate("signup")}>
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}