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
              Grade: {course.grade}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-700 mb-1">
            {course.code}
          </div>
          <div className="text-gray-700 font-medium">{course.credits} Credits</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-violet-100 to-blue-100 p-4 md:p-8 flex justify-center items-start overflow-auto">
    <div className="w-full max-w-6xl bg-white/80 rounded-3xl shadow-2xl p-0 md:p-8 backdrop-blur-md border border-gray-200">
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
      Completed Courses
    </TabsTrigger>
    <TabsTrigger
      value="running"
      className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
    >
      Running Courses
    </TabsTrigger>
    <TabsTrigger
      value="remaining"
      className="text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 bg-transparent rounded-none py-4 px-6 text-lg font-semibold tracking-wide transition-colors"
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
    </div>
  );
}
