"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { SidebarNav } from "./SidebarNav";

const CourseDetailPage = ({ onBack }) => {
  const [courseData] = useState({
    code: "CSE 201",
    title: "Data Structures",
    instructor: "Lecturer: Dr. Khudeja Khanom Anwara",
    credits: 3,
    semester: "Fall 2024",
    description:
      "This course introduces fundamental data structures and their applications. Students will learn about arrays, linked lists, stacks, queues, trees, graphs, and hash tables. The course emphasizes both theoretical understanding and practical implementation.",
    objectives: [
      "Understand and implement fundamental data structures",
      "Analyze time and space complexity of algorithms",
      "Apply appropriate data structures to solve real-world problems",
      "Design efficient algorithms using various data structures",
    ],
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "10:00 AM - 11:30 AM",
      room: "Room 310, 3rd Floor",
    },
    progress: 75,
    currentGrade: "A",
    attendance: 92,
  });

  const [assignments] = useState([
    {
      id: "2",
      title: "Graph Algorithms Project",
      dueDate: "2024-12-22",
      status: "pending",
      totalMarks: 150,
    },
  ]);

  const [announcements] = useState([
    {
      id: "1",
      title: "Final Exam Schedule",
      content:
        "The final exam will be held on January 15, 2025, from 2:00 PM to 5:00 PM in the Lab Hall.",
      date: "2024-12-01",
      priority: "high",
    },
  ]);

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
    <div className="w-full min-h-screen bg-gray-900 flex flex-col">
      {/* Main area: sidebar + content */}
      <div className="flex flex-1 min-h-0 w-full">
        {/* Using your existing SidebarNav component */}
        <SidebarNav
          onNavigate={(view) => (view === "courses" ? onBack() : null)}
        />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Back Button and Course Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="text-white hover:bg-gray-800 mb-4"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {courseData.code}: {courseData.title}
                </h1>
                <p className="text-gray-400 text-lg">{courseData.instructor}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {courseData.currentGrade}
                </div>
                <p className="text-gray-400">Current Grade</p>
              </div>
            </div>
          </div>

          {/* Course Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-6 h-6" />
                  <span className="text-2xl font-bold">
                    {courseData.credits}
                  </span>
                </div>
                <p className="text-sm opacity-90">Credits</p>
              </CardContent>
            </Card>

            <Card className="bg-green-600 text-white border-0">
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

            <Card className="bg-purple-600 text-white border-0">
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

            <Card className="bg-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-6 h-6" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-sm opacity-90">Assignments Due</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Progress */}
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span>Overall Progress</span>
                  <span>{courseData.progress}%</span>
                </div>
                <Progress value={courseData.progress} className="h-3" />
                <p className="text-gray-400 text-sm">
                  You're doing great! Keep up the excellent work.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="w-full">
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

              <TabsTrigger value="announcements" className="text-white">
                Announcements
              </TabsTrigger>
            </TabsList>

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
                  { name: "Midterm Study Guide", type: "PDF", size: "1.2 MB" },
                  { name: "Assignment Templates", type: "ZIP", size: "800 KB" },
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
                            className={getPriorityColor(announcement.priority)}
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CourseDetailPage;
