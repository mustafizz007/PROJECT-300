"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CourseCard from "./course-card";
import AddResourceModal from "./AddResourceModal";
import { studentCoursesAPI } from "../services/api";

export default function StudentResource() {
  const [activeTab, setActiveTab] = useState("completed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Course data states
  const [completedCourses, setCompletedCourses] = useState([]);
  const [remainingCourses, setRemainingCourses] = useState([]);
  const [runningCourses, setRunningCourses] = useState([]);
  const [currentSemester, setCurrentSemester] = useState(null);
  // Hardcoded student ID - in a real app, this would come from authentication
  const studentId = "222-115-090";

  const handleAddResource = (resourceData) => {
    console.log("New resource:", resourceData);
    // TODO: Send to backend API
    alert(
      "Resource uploaded! Backend upload functionality will be implemented soon."
    );
  };

  // Fetch completed courses with resources
  const fetchCompletedCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentCoursesAPI.getCompletedCourses(studentId);

      // Transform the data to include sample resources based on course information
      const coursesWithResources = data.completed_courses.map((course) => {
        // Generate sample resources based on course data
        const pdfResources = [
          {
            name: `${course.code}_Syllabus.pdf`,
            url: `/resources/${course.code}_syllabus.pdf`,
            description: `Course syllabus for ${course.title}`,
          },
          {
            name: `${course.code}_Lecture_Notes.pdf`,
            url: `/resources/${course.code}_notes.pdf`,
            description: `Complete lecture notes for ${course.title}`,
          },
        ];

        const urlResources = [
          {
            name: `${course.title} - Course Overview`,
            url: `https://example.com/courses/${course.code}`,
            description: `Online course overview and materials`,
            type: "link",
          },
          {
            name: `${course.title} - Video Lectures`,
            url: `https://youtube.com/playlist?list=${course.code}`,
            description: `Video lecture series`,
            type: "video",
          },
        ];

        return {
          ...course,
          pdfResources,
          urlResources,
        };
      });

      setCompletedCourses(coursesWithResources);
    } catch (err) {
      console.error("Error fetching completed courses:", err);
      setError("Failed to load completed courses. Please try again.");
      setCompletedCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch remaining courses with resources
  const fetchRemainingCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentCoursesAPI.getRemainingCourses(studentId);

      // Transform the data to include sample resources
      const coursesWithResources = data.remaining_courses.map((course) => {
        // Generate sample resources for remaining courses
        const pdfResources = [
          {
            name: `${course.code}_Course_Information.pdf`,
            url: `/resources/${course.code}_info.pdf`,
            description: `Course information and prerequisites`,
          },
          {
            name: `${course.code}_Sample_Materials.pdf`,
            url: `/resources/${course.code}_samples.pdf`,
            description: `Sample course materials and assignments`,
          },
        ];

        const urlResources = [
          {
            name: `${course.title} - Prerequisites`,
            url: `https://example.com/prerequisites/${course.code}`,
            description: `Course prerequisites and requirements`,
            type: "link",
          },
          {
            name: `${course.title} - Course Demo`,
            url: `https://youtube.com/watch?v=${course.code}`,
            description: `Course introduction video`,
            type: "video",
          },
        ];

        return {
          ...course,
          title: `${course.code} - ${course.title}`,
          pdfResources,
          urlResources,
        };
      });

      setRemainingCourses(coursesWithResources);
    } catch (err) {
      console.error("Error fetching remaining courses:", err);
      setError("Failed to load remaining courses. Please try again.");
      setRemainingCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch running courses with resources
  const fetchRunningCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentCoursesAPI.getRunningCourses(studentId);
      
      // Transform the data to include sample resources based on course information
      const coursesWithResources = data.running_courses.map(course => {
        // Generate sample resources based on course data
        const pdfResources = [
          {
            name: `${course.code}_Current_Materials.pdf`,
            url: `/resources/${course.code}_current.pdf`,
            description: `Current semester materials for ${course.title}`
          },
          {
            name: `${course.code}_Assignments.pdf`, 
            url: `/resources/${course.code}_assignments.pdf`,
            description: `Current assignments and projects for ${course.title}`
          },
          {
            name: `${course.code}_Schedule.pdf`,
            url: `/resources/${course.code}_schedule.pdf`,
            description: `Class schedule and important dates`
          }
        ];

        const urlResources = [
          {
            name: `${course.title} - Online Classroom`,
            url: `https://classroom.google.com/c/${course.code}`,
            description: `Google Classroom for ${course.title}`,
            type: 'link'
          },
          {
            name: `${course.title} - Live Lectures`,
            url: `https://zoom.us/j/${course.code}`,
            description: `Join live lectures for ${course.title}`,
            type: 'video'
          },
          {
            name: `${course.title} - Discussion Forum`,
            url: `https://discord.gg/${course.code}`,
            description: `Student discussion forum`,
            type: 'link'
          }
        ];

        return {
          ...course,
          title: course.title || `${course.code} - Course`,
          pdfResources,
          urlResources
        };
      });

      setRunningCourses(coursesWithResources);
      
      // Store current semester info if available
      if (data.current_semester) {
        setCurrentSemester(data.current_semester);
      }
    } catch (err) {
      console.error('Error fetching running courses:', err);
      setError('Failed to load running courses. Please try again.');
      setRunningCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchCompletedCourses();
    fetchRemainingCourses();
    fetchRunningCourses();
  }, []);
  // Loading component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message, onRetry }) => (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">{message}</div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  // Empty state component
  const EmptyState = ({ message }) => (
    <div className="text-center py-12">
      <div className="text-gray-500 text-lg">{message}</div>
    </div>
  );

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-gray-200 p-4 md:p-8 flex justify-center items-start overflow-auto">
      <div className="w-full max-w-6xl bg-white/80 rounded-3xl shadow-2xl p-0 md:p-8 backdrop-blur-md border border-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 p-6 md:p-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-left">
              Resources
            </h1>
            <p className="text-gray-600 text-lg">
              Access and manage your course materials
            </p>
            {error && (
              <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">
                {error}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-slate-900 hover:from-purple-600 hover:to-slate-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Resource
          </button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full h-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-transparent rounded-none h-auto p-0">
            <TabsTrigger
              value="completed"
              className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
            >
              Completed Courses ({completedCourses.length})
            </TabsTrigger>
            <TabsTrigger
              value="running"
              className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
            >
              Running Courses ({runningCourses.length})
            </TabsTrigger>
            <TabsTrigger
              value="remaining"
              className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
            >
              Remaining Courses ({remainingCourses.length})
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="completed" className="mt-0">
              {loading && activeTab === "completed" ? (
                <LoadingSpinner />
              ) : error && activeTab === "completed" ? (
                <ErrorMessage message={error} onRetry={fetchCompletedCourses} />
              ) : completedCourses.length === 0 ? (
                <EmptyState message="No completed courses found. Complete some courses to see resources here." />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {completedCourses.map((course) => (
                    <div key={course.id} className="w-full">
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="running" className="mt-0">
              {currentSemester && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Current Semester: {currentSemester}
                  </h3>
                  <p className="text-green-600 text-sm mt-1">
                    Access materials and resources for your currently enrolled courses.
                  </p>
                </div>
              )}
              {loading && activeTab === "running" ? (
                <LoadingSpinner />
              ) : error && activeTab === "running" ? (
                <ErrorMessage 
                  message={error} 
                  onRetry={fetchRunningCourses} 
                />
              ) : runningCourses.length === 0 ? (
                <EmptyState message="No running courses found. Enroll in some courses to see resources here." />
              ) : (
                <div className="space-y-4">
                  {runningCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="remaining" className="mt-0">
              {loading && activeTab === "remaining" ? (
                <LoadingSpinner />
              ) : error && activeTab === "remaining" ? (
                <ErrorMessage message={error} onRetry={fetchRemainingCourses} />
              ) : remainingCourses.length === 0 ? (
                <EmptyState message="No remaining courses found. You have completed all available courses!" />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {remainingCourses.map((course) => (
                    <div key={course.id} className="w-full">
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* Add Resource Modal */}
        <AddResourceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddResource}
        />
      </div>
    </div>
  );
}
