import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  Video,
  Link,
  Upload,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { courseAPI } from "../../services/api";

export default function CourseManagement() {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [courseFilterType, setCourseFilterType] = useState("all");
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [selectedCourseForMaterials, setSelectedCourseForMaterials] =
    useState(null);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    total_courses: 0,
    active_courses: 0,
    avg_capacity_percentage: 0,
    total_materials: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form state for course modal
  const [courseForm, setCourseForm] = useState({
    title: "",
    course_code: "",
    instructor: "",
    credits: "",
    department: "",
    max_capacity: "",
    description: "",
    semester: "Fall 2024",
    materials: [],
  });

  // Form state for materials
  const [materialForm, setMaterialForm] = useState({
    title: "",
    type: "document",
    url: "",
    description: "",
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Handle scroll detection for floating scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll control functions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const container = document.querySelector(".overflow-x-auto");
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector(".overflow-x-auto");
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [coursesData, statsData] = await Promise.all([
        courseAPI.getAllCourses(),
        courseAPI.getStats(),
      ]);

      setCourses(coursesData.courses);
      setStats(statsData.stats);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseCreate = () => {
    setSelectedCourse(null);
    setCourseForm({
      title: "",
      course_code: "",
      instructor: "",
      credits: "",
      department: "",
      max_capacity: "",
      description: "",
      semester: "Fall 2024",
      materials: [],
    });
    setShowCourseModal(true);
  };

  const handleCourseEdit = (course) => {
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      course_code: course.course_code,
      instructor: course.instructor,
      credits: course.credits.toString(),
      department: course.department,
      max_capacity: course.max_capacity.toString(),
      description: course.description,
      semester: course.semester,
      materials: course.materials || [],
    });
    setShowCourseModal(true);
  };

  const handleCourseDelete = async (courseId) => {
    try {
      await courseAPI.deleteCourse(courseId);
      await loadData(); // Reload data to get updated list and notifications
    } catch (err) {
      console.error("Error deleting course:", err);
      setError(err.message);
    }
  };

  const handleCourseSave = async () => {
    try {
      const courseData = {
        title: courseForm.title,
        course_code: courseForm.course_code,
        instructor: courseForm.instructor,
        credits: parseInt(courseForm.credits),
        department: courseForm.department,
        max_capacity: parseInt(courseForm.max_capacity),
        description: courseForm.description,
        semester: courseForm.semester,
      };

      console.log("Sending course data:", courseData); // Debug log

      if (selectedCourse) {
        await courseAPI.updateCourse(selectedCourse.id, courseData);
      } else {
        await courseAPI.createCourse(courseData);
      }

      setShowCourseModal(false);
      await loadData(); // Reload data to get updated list and notifications
    } catch (err) {
      console.error("Error saving course:", err);
      setError(err.message);
    }
  };

  const handleManageMaterials = (course) => {
    setSelectedCourseForMaterials(course);
    setShowMaterialsModal(true);
  };

  const handleAddMaterial = async () => {
    if (!materialForm.title || !materialForm.url) return;

    try {
      await courseAPI.addMaterial(selectedCourseForMaterials.id, materialForm);
      setMaterialForm({
        title: "",
        type: "document",
        url: "",
        description: "",
      });
      await loadData(); // Reload data to get updated materials and notifications

      // Update the selected course for materials to show new material immediately
      const updatedCourse = await courseAPI.getCourse(
        selectedCourseForMaterials.id
      );
      setSelectedCourseForMaterials(updatedCourse.course);
    } catch (err) {
      console.error("Error adding material:", err);
      setError(err.message);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      await courseAPI.deleteMaterial(materialId);
      await loadData(); // Reload data to get updated materials and notifications

      // Update the selected course for materials to show changes immediately
      const updatedCourse = await courseAPI.getCourse(
        selectedCourseForMaterials.id
      );
      setSelectedCourseForMaterials(updatedCourse.course);
    } catch (err) {
      console.error("Error deleting material:", err);
      setError(err.message);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.course_code
        .toLowerCase()
        .includes(courseSearchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase());

    const matchesFilter =
      courseFilterType === "all" ||
      course.status === courseFilterType ||
      course.department === courseFilterType;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scroll-smooth">
      <div className="min-w-full p-4">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                Course Management
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                Manage courses, curricula, and academic programs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Scroll Control Buttons */}
              <div className="flex items-center justify-center space-x-1 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={scrollToTop}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                  title="Scroll to top"
                >
                  <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={scrollToBottom}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                  title="Scroll to bottom"
                >
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={scrollLeft}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                  title="Scroll left"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                  title="Scroll right"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              <button
                onClick={handleCourseCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-blue-500 bg-opacity-20 rounded-lg">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
              {stats.total_courses}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Total Courses
            </div>
          </div>

          <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-green-500 bg-opacity-20 rounded-lg">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
              {stats.total_courses}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Number of Courses
            </div>
          </div>

          <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
              {Math.round(stats.avg_capacity_percentage)}%
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Avg Capacity</div>
          </div>

          <div className="bg-gray-700 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 lg:p-3 bg-yellow-500 bg-opacity-20 rounded-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              </div>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
              {stats.active_courses}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Active Courses
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-700 rounded-lg border border-gray-600 mb-6">
          <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-600">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={courseSearchTerm}
                    onChange={(e) => setCourseSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <select
                value={courseFilterType}
                onChange={(e) => setCourseFilterType(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base min-w-0 sm:min-w-[180px]"
              >
                <option value="all">All Courses</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-600 sticky top-0">
                <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Materials
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-600 transition-colors"
                  >
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {course.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          {course.department}
                        </div>
                        {/* Show credits and instructor on mobile when hidden from table */}
                        <div className="sm:hidden text-xs text-gray-500 mt-1">
                          {course.credits} credits
                        </div>
                        <div className="md:hidden text-xs text-gray-500">
                          {course.instructor}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {course.course_code}
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {course.credits}
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {course.instructor}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                        <span>{course.materials?.length || 0}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          course.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handleManageMaterials(course)}
                          className="text-green-400 hover:text-green-300 p-1"
                          title="Manage Materials"
                        >
                          <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleCourseEdit(course)}
                          className="text-blue-400 hover:text-blue-300 p-1"
                          title="Edit course"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleCourseDelete(course.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete course"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Modal */}
        {showCourseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                {selectedCourse ? "Edit Course" : "Add Course"}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Course Code"
                    value={courseForm.course_code}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        course_code: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Instructor"
                    value={courseForm.instructor}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        instructor: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Credits"
                    value={courseForm.credits}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, credits: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={courseForm.department}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Max Capacity"
                    value={courseForm.max_capacity}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        max_capacity: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                </div>
                <textarea
                  placeholder="Course Description"
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm({
                      ...courseForm,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                />
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowCourseModal(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCourseSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                  >
                    Save Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Materials Management Modal */}
        {showMaterialsModal && selectedCourseForMaterials && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Manage Materials - {selectedCourseForMaterials.title}
                </h3>
                <button
                  onClick={() => setShowMaterialsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Add New Material Form */}
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-4">
                  Add New Material
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Material Title"
                    value={materialForm.title}
                    onChange={(e) =>
                      setMaterialForm({
                        ...materialForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                  />
                  <select
                    value={materialForm.type}
                    onChange={(e) =>
                      setMaterialForm({ ...materialForm, type: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                  >
                    <option value="document">Document</option>
                    <option value="video">Video</option>
                    <option value="link">Link</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="URL or File Path"
                      value={materialForm.url}
                      onChange={(e) =>
                        setMaterialForm({
                          ...materialForm,
                          url: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                    />
                    <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded flex items-center space-x-1">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                    </button>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={materialForm.description}
                    onChange={(e) =>
                      setMaterialForm({
                        ...materialForm,
                        description: e.target.value,
                      })
                    }
                    rows="2"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleAddMaterial}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Material</span>
                </button>
              </div>

              {/* Existing Materials */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">
                  Existing Materials
                </h4>
                {selectedCourseForMaterials.materials?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCourseForMaterials.materials.map((material) => (
                      <div
                        key={material.id}
                        className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-600 rounded">
                            {material.type === "document" && (
                              <FileText className="w-5 h-5 text-blue-400" />
                            )}
                            {material.type === "video" && (
                              <Video className="w-5 h-5 text-red-400" />
                            )}
                            {material.type === "link" && (
                              <Link className="w-5 h-5 text-green-400" />
                            )}
                            {material.type === "assignment" && (
                              <Award className="w-5 h-5 text-purple-400" />
                            )}
                          </div>
                          <div>
                            <h5 className="text-white font-medium">
                              {material.title}
                            </h5>
                            <p className="text-gray-400 text-sm">
                              {material.description}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {material.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-400 hover:text-red-300"
                            onClick={() => handleDeleteMaterial(material.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No materials added yet</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowMaterialsModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 hover:scale-110"
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
