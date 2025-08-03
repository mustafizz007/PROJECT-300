"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CourseCard from "./course-card";

export default function StudentResource() {
  const [activeTab, setActiveTab] = useState("completed");
  const completedCourses = [
    {
      id: 1,
      title: "CSE 401 Machine Learning",
      pdfResources: [
        {
          name: "chap1.pdf",
          url: "/placeholder.pdf?query=chapter1-machine-learning",
        },
        {
          name: "chap2.pdf",
          url: "/placeholder.pdf?query=chapter2-machine-learning",
        },
      ],
      urlResources: [
        { name: "Intro of ml", url: "https://example.com/intro-ml" },
        {
          name: "Random Forest Model",
          url: "https://example.com/random-forest",
        },
      ],
    },
    {
      id: 2,
      title: "CSE 402 Software Engineering",
      pdfResources: [
        {
          name: "chap1.pdf",
          url: "/placeholder.pdf?query=chapter1-software-engineering",
        },
        {
          name: "chap2.pdf",
          url: "/placeholder.pdf?query=chapter2-software-engineering",
        },
      ],
      urlResources: [
        { name: "Intro of SE", url: "https://example.com/intro-se" },
        {
          name: "Random Forest Model",
          url: "https://example.com/random-forest-se",
        },
      ],
    },
  ];

  const runningCourses = [
    {
      id: 3,
      title: "CSE 301 Artificial Intelligence",
      pdfResources: [
        {
          name: "AI_Lecture_Notes.pdf",
          url: "/placeholder.pdf?query=ai-lecture-notes",
        },
        {
          name: "Neural_Networks_Guide.pdf",
          url: "/placeholder.pdf?query=neural-networks",
        },
      ],
      urlResources: [
        {
          name: "TensorFlow Tutorial",
          url: "https://tensorflow.org/tutorials",
        },
        {
          name: "Machine Learning Course",
          url: "https://coursera.org/learn/machine-learning",
        },
      ],
    },
    {
      id: 4,
      title: "CSE 300 Project 300",
      pdfResources: [
        {
          name: "Project_Guidelines.pdf",
          url: "/placeholder.pdf?query=project-guidelines",
        },
        {
          name: "Documentation_Template.pdf",
          url: "/placeholder.pdf?query=documentation-template",
        },
      ],
      urlResources: [
        { name: "GitHub Repository", url: "https://github.com/project-300" },
        {
          name: "Project Management Tool",
          url: "https://trello.com/project-300",
        },
      ],
    },
  ];

  const remainingCourses = [
    {
      id: 5,
      title: "CSE 501 Bioinformatics",
      pdfResources: [
        {
          name: "Course_Syllabus.pdf",
          url: "/placeholder.pdf?query=bioinformatics-syllabus",
        },
        {
          name: "Prerequisites_Guide.pdf",
          url: "/placeholder.pdf?query=prerequisites-guide",
        },
      ],
      urlResources: [
        { name: "Course Overview", url: "https://example.com/bioinformatics" },
        {
          name: "Enrollment Info",
          url: "https://example.com/enrollment",
        },
      ],
    },
    {
      id: 6,
      title: "CSE 421 Computer Networks",
      pdfResources: [
        {
          name: "Network_Fundamentals.pdf",
          url: "/placeholder.pdf?query=network-fundamentals",
        },
        {
          name: "Lab_Requirements.pdf",
          url: "/placeholder.pdf?query=lab-requirements",
        },
      ],
      urlResources: [
        {
          name: "Course Registration",
          url: "https://example.com/registration",
        },
        {
          name: "Prerequisites Check",
          url: "https://example.com/prerequisites",
        },
      ],
    },
  ];

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
                {completedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="running" className="mt-0">
              <div className="space-y-4">
                {runningCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="remaining" className="mt-0">
              <div className="space-y-4">
                {remainingCourses.map((course) => (
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
