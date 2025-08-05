import logo from "../../assets/mu_portal_logo.png";
import "../dashboard-animations.css";

export default function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden homepage-reload-animation">
      <div className="absolute inset-0 overflow-hidden homepage-bg-animation">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob homepage-blob-1"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 homepage-blob-2"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 homepage-blob-3"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse homepage-blob-4"></div>

        {/* Additional floating particles for extra magic */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float homepage-particle-1"></div>
        <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float homepage-particle-2"></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-pulse homepage-particle-3"></div>
      </div>

      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl homepage-header-animation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div
              className="group cursor-pointer homepage-logo"
              onClick={() => onNavigate("home")}
            >
              <img
                src={logo}
                alt="MuPortal Logo"
                className="h-12 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              />
            </div>

            <nav className="hidden md:flex space-x-8 homepage-nav-animation">
              {[
                { name: "Home", action: () => onNavigate("home") },
                { name: "About", action: () => onNavigate("about") },
                { name: "Contact", action: () => onNavigate("contact") },
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`relative text-white/90 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 group overflow-hidden homepage-nav-item-${
                    index + 1
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></div>
                </button>
              ))}
            </nav>

            <div className="flex space-x-4 homepage-auth-buttons">
              <button
                onClick={() => onNavigate("login")}
                className="relative px-6 py-2.5 bg-transparent border-2 border-purple-400/50 text-purple-200 font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/25 homepage-login-btn"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <button
                onClick={() => onNavigate("signup")}
                className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 homepage-signup-btn"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 homepage-hero-animation">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-fade-in-up homepage-title">
              <span className="block homepage-title-main">MuPortal</span>
              <span className="block text-3xl md:text-5xl mt-2 text-white/90 homepage-title-sub">
                University Material Sharing Portal
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300 homepage-subtitle">
              Access slides, sheets, resources, and results from your department
              with seamless integration
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600 homepage-action-buttons">
              <button
                onClick={() => onNavigate("login")}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden min-w-[200px] homepage-btn-1"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Student Login
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </button>

              <button
                onClick={() => onNavigate("admin-login")}
                className="group relative px-8 py-4 bg-transparent border-2 border-purple-400/50 text-purple-200 font-bold text-lg rounded-2xl hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 overflow-hidden min-w-[200px] homepage-btn-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
                <span className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-300">
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
                  Admin Login
                </span>
              </button>

              <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-gray-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden min-w-[200px] homepage-btn-3">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Guest Access
                </span>
              </button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-900 homepage-features">
            {[
              {
                icon: "📚",
                title: "Department-Based Access",
                description:
                  "Automatically filtered content based on your department",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: "📄",
                title: "Course Materials",
                description:
                  "Download slides, sheets, and access external resources",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: "📊",
                title: "Results & Progress",
                description: "Track your academic performance and results",
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 cursor-pointer overflow-hidden homepage-feature-${
                  index + 1
                }`}
                style={{ animationDelay: `${900 + index * 200}ms` }}
              >
                {/* Animated background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
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
