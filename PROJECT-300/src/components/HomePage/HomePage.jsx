import logo from "../../assets/mu_portal_logo.png";

export default function HomePage({ onNavigate }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-y-auto custom-scrollbar">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <header className="relative z-10 bg-white border-b border-white shadow-2xl">
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
                className="h-12 w-auto transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              />
            </div>

            <nav className="hidden md:flex space-x-8">
              {[
                { name: "Home", action: () => onNavigate("home") },
                { name: "About", action: () => onNavigate("about") },
                { name: "Contact", action: () => onNavigate("contact") },
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="relative text-black/90 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 group overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></div>
                </button>
              ))}
            </nav>

            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate("login")}
                className="relative px-6 py-2.5 bg-transparent border-2 border-gray-900/50 text-gray-900 font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/25"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <button
                onClick={() => onNavigate("signup")}
                className="relative px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-800 text-white font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 hover:scale-105"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-black via-zinc-900 to-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-royal-400 to-white-900 mb-6 animate-fade-in-up">
              <span className="block">MuPortal</span>
              <span className="block text-3xl md:text-5xl mt-2 text-white/90">
                University Material Sharing Portal
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
              Access slides, sheets, resources, and results from your department
              with seamless integration
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
              <button
                onClick={() => onNavigate("login")}
                className="group relative px-8 py-4 bg-gradient-to-r from-slate-900 via-white-700 to-gray-800 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-gray-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                  <span className="transition-colors duration-300 group-hover:text-zinc-200">
                    Student Login
                  </span>
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white-400/20 to-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </button>

              <button
                onClick={() => onNavigate("admin-login")}
                className="group relative px-8 py-4 bg-transparent border-2 border-white-400/50 text-purple-100 font-bold text-lg rounded-2xl hover:border-white-300 transition-all duration-300 hover:shadow-lg hover:shadow-white-400/25 overflow-hidden min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white-600/20 to-white-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
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

              <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-gray-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden min-w-[200px]">
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

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-900">
            {[
              {
                icon: "📚",
                title: "Department-Based Access",
                description:
                  "Automatically filtered content based on your department",
                gradient: "from-gray-500 to-gray-400",
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
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-400/20 hover:scale-105 cursor-pointer overflow-hidden"
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
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-400 group-hover:to-gray-400 transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
