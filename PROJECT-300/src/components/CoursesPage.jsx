"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { studentCoursesAPI } from "../services/api";

export function CoursesPage({ onCourseSelect, studentId = "222-115-090" }) {
  const [activeTab, setActiveTab] = useState("completed");
  const [coursesData, setCoursesData] = useState({
    completed: [],
    running: [],
    remaining: [],
  });
  const [loading, setLoading] = useState({
    completed: false,
    running: false,
    remaining: false,
  });
  const [error, setError] = useState({
    completed: null,
    running: null,
    remaining: null,
  });

  // Fetch completed courses
  const fetchCompletedCourses = async () => {
    setLoading(prev => ({ ...prev, completed: true }));
    setError(prev => ({ ...prev, completed: null }));
    
    try {
      const response = await studentCoursesAPI.getCompletedCourses(studentId);
      setCoursesData(prev => ({ 
        ...prev, 
        completed: response.completed_courses || [] 
      }));
    } catch (err) {
      console.error('Error fetching completed courses:', err);
      setError(prev => ({ 
        ...prev, 
        completed: 'Failed to load completed courses. Please try again.' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, completed: false }));
    }
  };

  // Fetch running courses
  const fetchRunningCourses = async () => {
    setLoading(prev => ({ ...prev, running: true }));
    setError(prev => ({ ...prev, running: null }));
    
    try {
      const response = await studentCoursesAPI.getRunningCourses(studentId);
      setCoursesData(prev => ({ 
        ...prev, 
        running: response.running_courses || [] 
      }));
    } catch (err) {
      console.error('Error fetching running courses:', err);
      setError(prev => ({ 
        ...prev, 
        running: 'Failed to load running courses. Please try again.' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, running: false }));
    }
  };

  // Fetch remaining courses
  const fetchRemainingCourses = async () => {
    setLoading(prev => ({ ...prev, remaining: true }));
    setError(prev => ({ ...prev, remaining: null }));
    
    try {
      const response = await studentCoursesAPI.getRemainingCourses(studentId);
      setCoursesData(prev => ({ 
        ...prev, 
        remaining: response.remaining_courses || [] 
      }));
    } catch (err) {
      console.error('Error fetching remaining courses:', err);
      setError(prev => ({ 
        ...prev, 
        remaining: 'Failed to load remaining courses. Please try again.' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, remaining: false }));
    }
  };

  // Load data based on active tab
  useEffect(() => {
    switch (activeTab) {
      case 'completed':
        if (coursesData.completed.length === 0) {
          fetchCompletedCourses();
        }
        break;
      case 'running':
        if (coursesData.running.length === 0) {
          fetchRunningCourses();
        }
        break;
      case 'remaining':
        if (coursesData.remaining.length === 0) {
          fetchRemainingCourses();
        }
        break;
    }
  }, [activeTab, studentId]);

  const CourseCard = ({ course }) => (
    <Card
      className="bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl hover:scale-[1.025] transition-all duration-200 cursor-pointer rounded-2xl"
      onClick={() => onCourseSelect && onCourseSelect(course.id)}
    >
      <CardContent className="p-6 md:p-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {course.title}
            </h3>
            <p className="text-gray-700 mb-1">{course.instructor}</p>
            {course.grade && (
              <p className="text-violet-700 font-semibold">
                Grade: {course.grade} {course.gpa && `(${course.gpa})`}
              </p>
            )}
            {course.semester && (
              <p className="text-blue-600 text-sm">
                Semester: {course.semester}
              </p>
            )}
            {course.department && (
              <p className="text-gray-600 text-sm">
                Department: {course.department}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-700 mb-1">
              {course.code}
            </div>
            <div className="text-gray-700 font-medium">
              {course.credits} Credits
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2 text-gray-600">Loading courses...</span>
    </div>
  );

  const ErrorMessage = ({ message, onRetry }) => (
    <div className="text-center p-8">
      <p className="text-red-600 mb-4">{message}</p>
      <button 
        onClick={onRetry}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  const EmptyState = ({ tabName }) => (
    <div className="text-center p-8">
      <p className="text-gray-600">No {tabName.toLowerCase()} courses found.</p>
    </div>
  );

  const renderTabContent = (tabType, courses, isLoading, errorMessage) => {
    if (isLoading) return <LoadingSpinner />;
    
    if (errorMessage) {
      const retryFunctions = {
        completed: fetchCompletedCourses,
        running: fetchRunningCourses,
        remaining: fetchRemainingCourses,
      };
      return <ErrorMessage message={errorMessage} onRetry={retryFunctions[tabType]} />;
    }
    
    if (courses.length === 0) {
      return <EmptyState tabName={tabType} />;
    }

    return (
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-200 via-blue-200 to-gray-200 p-4 md:p-8 flex justify-center items-start custom-scrollbar overflow-y-auto">
      <div className="w-full max-w-6xl bg-white/80 rounded-3xl shadow-2xl p-0 md:p-8 backdrop-blur-md border border-gray-200">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Management</h1>
          <p className="text-gray-600">Student ID: {studentId}</p>
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
              Completed Courses ({coursesData.completed.length})
            </TabsTrigger>
            <TabsTrigger
              value="running"
              className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
            >
              Running Courses ({coursesData.running.length})
            </TabsTrigger>
            <TabsTrigger
              value="remaining"
              className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
            >
              Remaining Courses ({coursesData.remaining.length})
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="completed" className="mt-0">
              {renderTabContent(
                'completed', 
                coursesData.completed, 
                loading.completed, 
                error.completed
              )}
            </TabsContent>

            <TabsContent value="running" className="mt-0">
              {renderTabContent(
                'running', 
                coursesData.running, 
                loading.running, 
                error.running
              )}
            </TabsContent>

            <TabsContent value="remaining" className="mt-0">
              {renderTabContent(
                'remaining', 
                coursesData.remaining, 
                loading.remaining, 
                error.remaining
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
