"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CoursesPage({ onCourseSelect }) {
  const [activeTab, setActiveTab] = useState("running");

  const coursesData = {
    completed: [
      {
        id: 1,
        title: "Introduction to Programming",
        instructor: "Lecturer: Khudeja Khanom Anwara",
        grade: "A+",
        code: "CSE 101",
        credits: 3,
      },
      {
        id: 2,
        title: "Discrete Mathematics",
        instructor: "Lecturer: Limon Ahmed",
        grade: "A",
        code: "MATH 201",
        credits: 3,
      },
    ],
    running: [
      {
        id: 3,
        title: "Artificial intelligence",
        instructor: "Lecturer: Limon Ahmed",
        grade: "A",
        code: "CSE 301",
        credits: 3,
      },
      {
        id: 4,
        title: "Compiler construction",
        instructor: "Lecturer: Srabanti Choudhury",
        grade: "A",
        code: "CSE 401",
        credits: 3,
      },
      {
        id: 5,
        title: "Project 300",
        instructor: "Lecturer: Dewan Ahmed Muhtasim",
        grade: "A",
        code: "CSE 300",
        credits: 3,
      },
    ],
    remaining: [
      {
        id: 6,
        title: "Bioinformatics",
        instructor: "Lecturer: Limon Ahmed",
        grade: null,
        code: "CSE 501",
        credits: 3,
      },
      {
        id: 7,
        title: "Computer Networks",
        instructor: "Lecturer: Rafi Islam",
        grade: null,
        code: "CSE 421",
        credits: 4,
      },
    ],
  };

  const CourseCard = ({ course }) => (
    <Card
      className="bg-gray-200 border border-gray-300 mb-4 hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={() => onCourseSelect && onCourseSelect(course.id)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {course.title}
            </h3>
            <p className="text-gray-700 mb-1">{course.instructor}</p>
            {course.grade && (
              <p className="text-gray-700">
                <span className="font-medium">Grade: {course.grade}</span>
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {course.code}
            </div>
            <div className="text-gray-700">{course.credits} Credits</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full h-full bg-gray-100 p-8 overflow-auto">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-300 rounded-none h-auto p-0">
          <TabsTrigger
            value="completed"
            className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black bg-transparent rounded-none py-4 px-6 text-lg font-medium"
          >
            Completed Courses
          </TabsTrigger>
          <TabsTrigger
            value="running"
            className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black bg-transparent rounded-none py-4 px-6 text-lg font-medium"
          >
            Running Courses
          </TabsTrigger>
          <TabsTrigger
            value="remaining"
            className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black bg-transparent rounded-none py-4 px-6 text-lg font-medium"
          >
            Remaining Courses
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="completed" className="mt-0">
            <div className="space-y-4">
              {coursesData.completed.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="running" className="mt-0">
            <div className="space-y-4">
              {coursesData.running.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="remaining" className="mt-0">
            <div className="space-y-4">
              {coursesData.remaining.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
