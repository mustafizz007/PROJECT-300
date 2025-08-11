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
} from "lucide-react";

export function CourseDetailPage({ courseId, onBack }) {
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

  const [courseData] = useState(allCoursesData[courseId] || allCoursesData[3]);

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
    <div className="w-full h-full  bg-gradient-to-br from-violet-100 to-blue-100 p-4 md:p-8 flex justify-center items-start overflow-auto">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-0 md:p-8 backdrop-blur-md border border-gray-200">
        {/* Sticky Header */}
        <div className="top-0 z-10 bg-gradient-to-r from-violet-200/80 to-blue-200/80 rounded-t-3xl px-4 md:px-8 pt-6 pb-2 border-b border-gray-300 mb-6">
          <Button
            variant="ghost"
            className="text-gray-800 hover:bg-gray-700 mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {courseData.code}: {courseData.title}
              </h1>
              <p className="text-gray-600 text-lg">{courseData.instructor}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {courseData.currentGrade}
              </div>
              <p className="text-gray-600">
                {isCompletedCourse(courseId) ? "Final Grade" : "Current Grade"}
              </p>
            </div>
          </div>
        </div>
        {/* Course Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-600/90 text-white border-0 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-2xl font-bold">{courseData.credits}</span>
              </div>
              <p className="text-sm opacity-90">Credits</p>
            </CardContent>
          </Card>
          {isRemainingCourse(courseId) ? (
            <>
              <Card className="bg-gray-600/90 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-6 h-6" />
                    <span className="text-lg font-bold">
                      {courseData.semester}
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
                      {courseData.attendance}%
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
                      {courseData.attendance}%
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
                      {courseData.progress}%
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

        {/* Course Progress - only show for running/completed courses */}
        {!isRemainingCourse(courseId) && (
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">
                {isCompletedCourse(courseId)
                  ? "Course Summary"
                  : "Course Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span>
                    {isCompletedCourse(courseId)
                      ? "Final Progress"
                      : "Overall Progress"}
                  </span>
                  <span>{courseData.progress}%</span>
                </div>
                <Progress value={courseData.progress} className="h-3" />
                <p className="text-gray-400 text-sm">
                  {isCompletedCourse(courseId)
                    ? "Course completed successfully! Well done."
                    : "You're doing great! Keep up the excellent work."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="w-full">
          {isRemainingCourse(courseId) ? (
            // For remaining courses, show only overview
            <TabsList className="grid w-full grid-cols-1 bg-gray-800">
              <TabsTrigger value="overview" className="text-white">
                Course Overview
              </TabsTrigger>
            </TabsList>
          ) : (
            // For running/completed courses, show all tabs
            <TabsList className="grid w-full grid-cols-5 bg-gray-800">
              <TabsTrigger value="overview" className="text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="assignments" className="text-white">
                Assignments
              </TabsTrigger>
              <TabsTrigger value="materials" className="text-white">
                Materials
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-white">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="announcements" className="text-white">
                Announcements
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {courseData.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseData.objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Only show other tabs for running/completed courses */}
          {!isRemainingCourse(courseId) && (
            <>
              <TabsContent value="assignments" className="mt-6">
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card
                      key={assignment.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {getStatusIcon(assignment.status)}
                            <div>
                              <h3 className="text-white font-semibold">
                                {assignment.title}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                Due: {assignment.dueDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              className={`${getStatusColor(
                                assignment.status
                              )} text-white`}
                            >
                              {assignment.status}
                            </Badge>
                            {assignment.grade && (
                              <div className="text-right">
                                <div className="text-white font-bold">
                                  {assignment.grade}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  /{assignment.totalMarks}
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

              <TabsContent value="materials" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Lecture 1: Introduction to Data Structures",
                      type: "PDF",
                      size: "2.5 MB",
                    },
                    {
                      name: "Lab Manual - Arrays and Linked Lists",
                      type: "PDF",
                      size: "1.8 MB",
                    },
                    {
                      name: "Sample Code - Binary Trees",
                      type: "ZIP",
                      size: "450 KB",
                    },
                    {
                      name: "Midterm Study Guide",
                      type: "PDF",
                      size: "1.2 MB",
                    },
                    {
                      name: "Assignment Templates",
                      type: "ZIP",
                      size: "800 KB",
                    },
                    {
                      name: "Reference Book - Chapter 5",
                      type: "PDF",
                      size: "3.1 MB",
                    },
                  ].map((material, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-400" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">
                              {material.name}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {material.type} • {material.size}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Class Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">
                            Days: {courseData.schedule.days.join(", ")}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Time: {courseData.schedule.time}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Location: {courseData.schedule.room}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="announcements" className="mt-6">
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <Card
                      key={announcement.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-blue-400" />
                            <h3 className="text-white font-semibold">
                              {announcement.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getPriorityColor(
                                announcement.priority
                              )}
                            >
                              {announcement.priority}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              {announcement.date}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
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
