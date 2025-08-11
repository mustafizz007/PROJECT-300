"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users,
  Award,
  Bell,
  GraduationCap,
  Star,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function CourseDetailPage({ courseId, courseData, onBack }) {
  // Course data based on courseId
  const allCoursesData = {
    1: {
      code: "CSE 101",
      title: "Introduction to Programming",
      instructor: "Lecturer: Khudeja Khanom Anwara",
      credits: 3,
      semester: "Fall 2022",
      description:
        "This course introduces students to the fundamentals of programming using modern programming languages. Students will learn problem-solving techniques, algorithm design, and basic data structures.",
      objectives: [
        "Understand basic programming concepts and syntax",
        "Develop problem-solving and algorithmic thinking skills",
        "Learn to write, debug, and test programs",
        "Understand basic data structures and their applications",
      ],
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "9:00 AM - 10:30 AM",
        room: "Room 101, 1st Floor",
      },
      progress: 100,
      currentGrade: "A+",
      attendance: 95,
    },
    2: {
      code: "MATH 201",
      title: "Discrete Mathematics",
      instructor: "Lecturer: Limon Ahmed",
      credits: 3,
      semester: "Spring 2023",
      description:
        "This course covers the mathematical foundations of computer science including logic, set theory, combinatorics, graph theory, and discrete probability.",
      objectives: [
        "Understand mathematical logic and proof techniques",
        "Apply set theory and combinatorics to solve problems",
        "Analyze graphs and trees in computer science contexts",
        "Use discrete probability in algorithmic analysis",
      ],
      schedule: {
        days: ["Tuesday", "Thursday"],
        time: "11:00 AM - 12:30 PM",
        room: "Room 203, 2nd Floor",
      },
      progress: 100,
      currentGrade: "A",
      attendance: 88,
    },
    3: {
      code: "CSE 301",
      title: "Artificial Intelligence",
      instructor: "Lecturer: Limon Ahmed",
      credits: 3,
      semester: "Fall 2024",
      description:
        "This course introduces fundamental concepts of artificial intelligence, including machine learning, natural language processing, and robotics. Students will learn to design intelligent systems and understand the ethical implications of AI.",
      objectives: [
        "Understand and implement fundamental AI concepts",
        "Analyze and evaluate AI algorithms",
        "Apply AI techniques to solve real-world problems",
        "Design and develop intelligent systems",
      ],
      schedule: {
        days: ["Monday", "Wednesday"],
        time: "12:00 PM - 3:00 PM",
        room: "Room 311, 3rd Floor",
      },
      progress: 75,
      currentGrade: "A",
      attendance: 92,
    },
    4: {
      code: "CSE 401",
      title: "Compiler Construction",
      instructor: "Lecturer: Srabanti Choudhury",
      credits: 3,
      semester: "Fall 2024",
      description:
        "This course covers the design and implementation of compilers for programming languages. Students will learn about lexical analysis, syntax analysis, semantic analysis, and code generation.",
      objectives: [
        "Understand compiler design principles",
        "Implement lexical and syntax analyzers",
        "Learn code optimization techniques",
        "Build a complete compiler for a simple language",
      ],
      schedule: {
        days: ["Tuesday", "Thursday"],
        time: "2:00 PM - 3:30 PM",
        room: "Room 205, 2nd Floor",
      },
      progress: 68,
      currentGrade: "A",
      attendance: 85,
    },
    5: {
      code: "CSE 300",
      title: "Project 300",
      instructor: "Lecturer: Dewan Ahmed Muhtasim",
      credits: 3,
      semester: "Fall 2024",
      description:
        "A capstone project course where students work on real-world software development projects. Students will apply their knowledge of software engineering principles to develop complete applications.",
      objectives: [
        "Apply software development methodologies",
        "Work effectively in teams",
        "Develop project management skills",
        "Create a complete software solution",
      ],
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "9:00 AM - 10:30 AM",
        room: "Room 401, 4th Floor",
      },
      progress: 82,
      currentGrade: "A",
      attendance: 95,
    },
    6: {
      code: "CSE 501",
      title: "Bioinformatics",
      instructor: "Lecturer: Limon Ahmed",
      credits: 3,
      semester: "Spring 2025",
      description:
        "This course introduces the application of computational methods to biological problems. Students will learn about sequence analysis, phylogenetics, protein structure prediction, and genomics data analysis.",
      objectives: [
        "Understand computational biology concepts",
        "Analyze biological sequences and structures",
        "Apply machine learning to biological data",
        "Work with genomics and proteomics databases",
      ],
      schedule: null, // Not scheduled yet
      progress: 0,
      currentGrade: null,
      attendance: null,
    },
    7: {
      code: "CSE 421",
      title: "Computer Networks",
      instructor: "Lecturer: Rafi Islam",
      credits: 4,
      semester: "Spring 2025",
      description:
        "This course covers the fundamental concepts of computer networks including network protocols, network architecture, and network security. Students will learn about TCP/IP, routing algorithms, and network performance analysis.",
      objectives: [
        "Understand network protocols and architectures",
        "Analyze network performance and security",
        "Implement network applications",
        "Design and configure network systems",
      ],
      schedule: null, // Not scheduled yet
      progress: 0,
      currentGrade: null,
      attendance: null,
    },
  };

  // Use passed courseData prop or fallback to allCoursesData based on courseId
  const selectedCourseData =
    courseData || allCoursesData[courseId] || allCoursesData[3];
  const [currentCourseData] = useState(selectedCourseData);

  // Assignments data based on courseId
  const allAssignmentsData = {
    1: [
      {
        id: "1",
        title: "Basic Programming Exercises",
        dueDate: "2022-10-15",
        status: "completed",
        grade: "A+",
        totalMarks: 20,
      },
      {
        id: "2",
        title: "Data Structures Implementation",
        dueDate: "2022-11-20",
        status: "completed",
        grade: "A",
        totalMarks: 30,
      },
      {
        id: "3",
        title: "Final Programming Project",
        dueDate: "2022-12-15",
        status: "completed",
        grade: "A+",
        totalMarks: 50,
      },
    ],
    2: [
      {
        id: "1",
        title: "Logic and Proof Techniques",
        dueDate: "2023-03-10",
        status: "completed",
        grade: "A",
        totalMarks: 25,
      },
      {
        id: "2",
        title: "Combinatorics Problem Set",
        dueDate: "2023-04-15",
        status: "completed",
        grade: "A",
        totalMarks: 25,
      },
      {
        id: "3",
        title: "Graph Theory Analysis",
        dueDate: "2023-05-20",
        status: "completed",
        grade: "A-",
        totalMarks: 30,
      },
    ],
    3: [
      {
        id: "1",
        title: "Machine Learning Algorithm Implementation",
        dueDate: "2024-12-15",
        status: "completed",
        grade: "A",
        totalMarks: 40,
      },
      {
        id: "2",
        title: "Natural Language Processing Project",
        dueDate: "2024-12-22",
        status: "pending",
        totalMarks: 50,
      },
    ],
    4: [
      {
        id: "1",
        title: "Lexical Analyzer Implementation",
        dueDate: "2024-12-10",
        status: "completed",
        grade: "A",
        totalMarks: 30,
      },
      {
        id: "2",
        title: "Parser Development",
        dueDate: "2024-12-20",
        status: "pending",
        totalMarks: 40,
      },
    ],
    5: [
      {
        id: "1",
        title: "Project Proposal and Planning",
        dueDate: "2024-11-30",
        status: "completed",
        grade: "A+",
        totalMarks: 20,
      },
      {
        id: "2",
        title: "Mid-term Project Presentation",
        dueDate: "2024-12-15",
        status: "pending",
        totalMarks: 30,
      },
    ],
  };

  const [assignments] = useState(
    allAssignmentsData[courseId] || allAssignmentsData[3]
  );

  // Announcements data based on courseId
  const allAnnouncementsData = {
    1: [
      {
        id: "1",
        title: "Course Completion Certificate",
        content:
          "Congratulations! You have successfully completed Introduction to Programming. Your course completion certificate is now available for download.",
        date: "2022-12-20",
        priority: "high",
      },
    ],
    2: [
      {
        id: "1",
        title: "Final Grades Published",
        content:
          "Final grades for Discrete Mathematics have been published. Great job on completing this challenging course!",
        date: "2023-05-25",
        priority: "medium",
      },
    ],
    3: [
      {
        id: "1",
        title: "AI Project Guidelines Updated",
        content:
          "The guidelines for the AI project have been updated. Please check the course materials section for the latest requirements.",
        date: "2024-12-01",
        priority: "high",
      },
    ],
    4: [
      {
        id: "1",
        title: "Compiler Lab Schedule Change",
        content:
          "The compiler lab session scheduled for Friday has been moved to Saturday 2:00 PM due to facility maintenance.",
        date: "2024-11-28",
        priority: "medium",
      },
    ],
    5: [
      {
        id: "1",
        title: "Project Demo Day",
        content:
          "Final project demonstrations will be held on January 20, 2025. Each team will have 15 minutes to present their project.",
        date: "2024-12-05",
        priority: "high",
      },
    ],
  };

  const [announcements] = useState(
    allAnnouncementsData[courseId] || allAnnouncementsData[3]
  );

  // Helper function to check if course is remaining (not started yet)
  const isRemainingCourse = (courseId) => {
    return courseId === 6 || courseId === 7; // Bioinformatics and Computer Networks
  };

  // Helper function to check if course is completed
  const isCompletedCourse = (courseId) => {
    return courseId === 1 || courseId === 2; // Introduction to Programming and Discrete Mathematics
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-blue-500";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-200 via-blue-200 to-gray-200 p-4 md:p-8 flex justify-center items-start overflow-auto">
      <div className="w-full max-w-8xl bg-gray-300/90 to-gray-300/90 rounded-3xl shadow-2xl p-0 md:p-8 backdrop-blur-lg border border-gray-600">
        {/* Enhanced Sticky Header */}
        <div className="top-0 z-10 bg-gradient-to-r from-slate-800/80 to-violet-800/80 rounded-t-3xl px-4 md:px-8 pt-6 pb-4 border-b border-gray-600 mb-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-6 backdrop-blur-sm border border-white/20 transition-all duration-300"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>

          {/* Enhanced Course Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                  {currentCourseData.code}: {currentCourseData.title}
                </h1>
                <p className="text-gray-300 text-lg font-medium text-left">
                  {currentCourseData.instructor}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {currentCourseData.department || "Computer Science"}
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {currentCourseData.credits} Credits
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {currentCourseData.semester}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">
                  {currentCourseData.currentGrade ||
                    currentCourseData.grade ||
                    "A"}
                </div>
                <p className="text-green-100 text-sm">
                  {isCompletedCourse(courseId)
                    ? "Final Grade"
                    : "Current Grade"}
                </p>
              </div>
              {currentCourseData.gpa && (
                <div className="mt-2 text-white/80">
                  <div className="text-lg font-semibold">
                    GPA: {currentCourseData.gpa}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Enhanced Course Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-blue-100 mr-4" />
                <div>
                  <p className="text-blue-100 text-sm font-medium">Credits</p>
                  <p className="text-2xl font-bold">
                    {currentCourseData.credits}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {isRemainingCourse(courseId) ? (
            <>
              <Card className="bg-gray-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-6 h-6" />
                    <span className="text-lg font-bold">
                      {currentCourseData.semester}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">Semester</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-6 h-6" />
                    <span className="text-lg font-bold">Not Started</span>
                  </div>
                  <p className="text-sm opacity-90">Status</p>
                </CardContent>
              </Card>
              <Card className="bg-indigo-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-6 h-6" />
                    <span className="text-lg font-bold">Prerequisites</span>
                  </div>
                  <p className="text-sm opacity-90">Required</p>
                </CardContent>
              </Card>
            </>
          ) : isCompletedCourse(courseId) ? (
            <>
              <Card className="bg-green-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-2xl font-bold">100%</span>
                  </div>
                  <p className="text-sm opacity-90">Completed</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      {currentCourseData.attendance}%
                    </span>
                  </div>
                  <p className="text-sm opacity-90">Final Attendance</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      {assignments.length}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">Total Assignments</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-green-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      {currentCourseData.attendance}%
                    </span>
                  </div>
                  <p className="text-sm opacity-90">Attendance</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      {currentCourseData.progress}%
                    </span>
                  </div>
                  <p className="text-sm opacity-90">Progress</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      {assignments.length}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">Assignments</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Enhanced Course Progress - only show for running/completed courses */}
        {!isRemainingCourse(courseId) && (
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-white/10 mb-8 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-xl font-bold flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                {isCompletedCourse(courseId)
                  ? "Course Summary"
                  : "Course Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium text-lg">
                    {isCompletedCourse(courseId)
                      ? "Final Progress"
                      : "Overall Progress"}
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {currentCourseData.progress || 0}%
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={currentCourseData.progress || 0}
                    className="h-4 bg-gray-700/50 rounded-full overflow-hidden"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"></div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                  {isCompletedCourse(courseId)
                    ? "🎉 Course completed successfully! Excellent work on achieving your learning goals."
                    : "🚀 You're making great progress! Keep up the excellent work and stay focused on your objectives."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Tabs for different sections */}
        <Tabs defaultValue="overview" className="w-full">
          {isRemainingCourse(courseId) ? (
            // For remaining courses, show only overview
            <TabsList className="grid w-full grid-cols-1 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-white/10 rounded-xl p-2">
              <TabsTrigger
                value="overview"
                className="text-white font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Course Overview
              </TabsTrigger>
            </TabsList>
          ) : (
            // For running/completed courses, show all tabs
            <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-white/10 rounded-xl p-2 gap-1">
              <TabsTrigger
                value="overview"
                className="text-white font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                className="text-white font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              >
                <FileText className="w-4 h-4 mr-1" />
                Assignments
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="text-white font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              >
                <Download className="w-4 h-4 mr-1" />
                Materials
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="text-white font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="announcements"
                className="text-white font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
              >
                <Bell className="w-4 h-4 mr-1" />
                Announcements
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-xl font-bold flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-blue-400" />
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {currentCourseData.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-xl font-bold flex items-center">
                    <Award className="w-6 h-6 mr-3 text-green-400" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentCourseData.objectives?.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-base">{objective}</span>
                      </li>
                    )) || (
                      <li className="text-gray-400 text-center py-8">
                        <Award className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                        No learning objectives specified
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Only show other tabs for running/completed courses */}
          {!isRemainingCourse(courseId) && (
            <>
              <TabsContent value="assignments" className="mt-8">
                <div className="space-y-6">
                  {assignments.map((assignment) => (
                    <Card
                      key={assignment.id}
                      className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                              {getStatusIcon(assignment.status)}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg mb-1">
                                {assignment.title}
                              </h3>
                              <p className="text-gray-400 text-sm flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Due: {assignment.dueDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <Badge
                              className={`${getStatusColor(
                                assignment.status
                              )} text-white font-semibold px-4 py-2 text-sm`}
                            >
                              {assignment.status}
                            </Badge>
                            {assignment.grade && (
                              <div className="text-right bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-lg border border-green-500/30">
                                <div className="text-white font-bold text-xl">
                                  {assignment.grade}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  /{assignment.totalMarks} points
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="materials" className="mt-8">
                <div className="space-y-8">
                  {/* PDF Resources */}
                  {currentCourseData.pdfResources &&
                    currentCourseData.pdfResources.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                          <FileText className="w-6 h-6 mr-2 text-blue-400" />
                          PDF Resources
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {currentCourseData.pdfResources.map(
                            (resource, index) => (
                              <Card
                                key={index}
                                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-8 h-8 text-blue-400" />
                                    <div className="flex-1">
                                      <h4 className="text-white font-medium text-sm">
                                        {resource.name}
                                      </h4>
                                      {resource.description && (
                                        <p className="text-gray-400 text-xs">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-blue-400 hover:text-blue-300"
                                      onClick={() =>
                                        window.open(resource.url, "_blank")
                                      }
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* URL Resources */}
                  {currentCourseData.urlResources &&
                    currentCourseData.urlResources.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                          <ExternalLink className="w-6 h-6 mr-2 text-green-400" />
                          Online Resources
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {currentCourseData.urlResources.map(
                            (resource, index) => (
                              <Card
                                key={index}
                                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <ExternalLink className="w-8 h-8 text-green-400" />
                                    <div className="flex-1">
                                      <h4 className="text-white font-medium text-sm">
                                        {resource.name}
                                      </h4>
                                      {resource.description && (
                                        <p className="text-gray-400 text-xs">
                                          {resource.description}
                                        </p>
                                      )}
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-green-400 hover:text-green-300"
                                      onClick={() =>
                                        window.open(resource.url, "_blank")
                                      }
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Fallback for when no resources are available */}
                  {(!currentCourseData.pdfResources ||
                    currentCourseData.pdfResources.length === 0) &&
                    (!currentCourseData.urlResources ||
                      currentCourseData.urlResources.length === 0) && (
                      <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                          No Materials Available
                        </h3>
                        <p className="text-gray-400">
                          Course materials will be available soon.
                        </p>
                      </div>
                    )}
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-8">
                <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-white/10 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-xl font-bold flex items-center">
                      <Calendar className="w-6 h-6 mr-3 text-orange-400" />
                      Class Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-500/30">
                        <div className="flex items-center mb-3">
                          <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                          <h4 className="text-white font-semibold">
                            Class Days
                          </h4>
                        </div>
                        <p className="text-gray-200 text-lg font-medium">
                          {currentCourseData.schedule?.days?.join(", ") ||
                            "TBD"}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30">
                        <div className="flex items-center mb-3">
                          <Clock className="w-5 h-5 text-green-400 mr-2" />
                          <h4 className="text-white font-semibold">Time</h4>
                        </div>
                        <p className="text-gray-200 text-lg font-medium">
                          {currentCourseData.schedule?.time || "TBD"}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                        <div className="flex items-center mb-3">
                          <MapPin className="w-5 h-5 text-purple-400 mr-2" />
                          <h4 className="text-white font-semibold">Location</h4>
                        </div>
                        <p className="text-gray-200 text-lg font-medium">
                          {currentCourseData.schedule?.room || "TBD"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="announcements" className="mt-8">
                <div className="space-y-6">
                  {announcements.map((announcement) => (
                    <Card
                      key={announcement.id}
                      className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                              <Bell className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-white font-bold text-lg">
                              {announcement.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${getPriorityColor(
                                announcement.priority
                              )} font-semibold px-3 py-1`}
                            >
                              {announcement.priority}
                            </Badge>
                            <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-lg">
                              {announcement.date}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-base bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
                          {announcement.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
