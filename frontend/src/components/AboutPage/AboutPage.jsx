import { useState, useEffect } from "react";
import logo from "../../assets/mu_portal_logo.png";

export default function AboutPage({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🎓",
      title: "Academic Excellence",
      description:
        "Streamlining education with seamless access to course materials, assignments, and academic resources.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: "📚",
      title: "Department-Based Organization",
      description:
        "Smart content filtering ensures students access only relevant materials for their specific department.",
      gradient: "from-purple-500 to-violet-600",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Comprehensive result management system with CGPA calculation and semester-wise performance analysis.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: "⚡",
      title: "Real-time Updates",
      description:
        "Instant notifications for new materials, results, and important announcements from your department.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: "🔒",
      title: "Secure Access",
      description:
        "Role-based authentication ensuring secure access for both students and administrative personnel.",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      icon: "🌐",
      title: "Modern Interface",
      description:
        "Responsive, intuitive design that works seamlessly across all devices and screen sizes.",
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  const stats = [
    { number: "100+", label: "Courses Supported", icon: "📖" },
    { number: "5+", label: "Departments", icon: "🏛️" },
    { number: "1000+", label: "Students", icon: "👥" },
    { number: "24/7", label: "Availability", icon: "⏰" },
  ];

  const team = [
    {
      name: "Student Portal",
      role: "Comprehensive Learning Hub",
      description:
        "Access course materials, track results, manage your academic journey",
      icon: "👨‍🎓",
    },
    {
      name: "Admin Dashboard",
      role: "Complete Management System",
      description:
        "Manage students, courses, results, and administrative tasks",
      icon: "👨‍💼",
    },
    {
      name: "Resource Center",
      role: "Digital Library",
      description:
        "Centralized access to slides, sheets, and external resources",
      icon: "📚",
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-y-auto custom-scrollbar">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white border-b border-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
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

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section
          className={`py-20 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                About MuPortal
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing university education through intelligent material
              sharing, comprehensive result management, and seamless academic
              collaboration.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Our Mission
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                To bridge the gap between traditional education and modern
                technology, creating an ecosystem where learning resources are
                accessible, organized, and impactful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  Empowering Education
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  MuPortal transforms how universities manage and share
                  educational content. Our platform ensures that every student
                  has instant access to course materials, results, and
                  resources, while giving administrators powerful tools to
                  manage academic operations efficiently.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  With department-specific content filtering, real-time
                  notifications, and comprehensive progress tracking, we're
                  building the future of university education management.
                </p>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <span className="text-white font-semibold">
                        Smart Content Organization
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <span className="text-white font-semibold">
                        Real-time Progress Tracking
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <span className="text-white font-semibold">
                        Seamless User Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Key Features
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover the powerful features that make MuPortal the ultimate
                university portal solution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                  Platform Modules
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive modules designed to serve every aspect of
                university operations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 text-center"
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {member.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Built with Modern Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Leveraging cutting-edge technologies to deliver a robust,
              scalable, and secure platform.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: "React", icon: "⚛️" },
                { name: "Node.js", icon: "🟢" },
                { name: "MySQL", icon: "🗄️" },
                { name: "Tailwind", icon: "🎨" },
                { name: "Express", icon: "🚀" },
                { name: "Vite", icon: "⚡" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div className="text-white font-semibold">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students and educators who are already using
              MuPortal to streamline their academic journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onNavigate("signup")}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
              >
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => onNavigate("contact")}
                className="group relative px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:border-white/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
