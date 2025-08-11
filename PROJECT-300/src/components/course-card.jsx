import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, Link, Award, BookOpen, User } from "lucide-react";

export default function CourseCard({ course }) {
  const { 
    title, 
    pdfResources = [], 
    urlResources = [], 
    instructor,
    grade,
    credits,
    semester,
    department,
    code,
    gpa
  } = course;

  return (
    <Card className="mb-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3 px-6 pt-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {title || "No Title Available"}
            </CardTitle>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
              {instructor && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{instructor}</span>
                </div>
              )}
              {department && (
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{department}</span>
                </div>
              )}
              {credits && (
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>{credits} Credits</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {grade && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                grade === 'In Progress' 
                  ? 'bg-blue-100 text-blue-800' 
                  : grade.includes('A') 
                    ? 'bg-green-100 text-green-800'
                    : grade.includes('B')
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
              }`}>
                {grade}
              </span>
            )}
            {gpa && (
              <span className="text-sm text-gray-500">
                GPA: {gpa}
              </span>
            )}
            {semester && semester !== 'current' && (
              <span className="text-sm text-gray-500">
                Semester: {semester}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-600" />
            PDF Resources ({pdfResources.length})
          </h3>
          <ul className="space-y-2">
            {pdfResources && pdfResources.length > 0 ? (
              pdfResources.map((resource, index) => (
                <li key={index} className="flex items-start text-gray-600 p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <FileText className="mr-2 h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <a
                      href={resource.url}
                      download
                      className="hover:underline text-blue-600 font-medium"
                    >
                      {resource.name}
                    </a>
                    {resource.description && (
                      <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic p-2 bg-gray-50 rounded-md">
                No PDF resources available
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left flex items-center gap-2">
            <Link className="h-5 w-5 text-gray-600" />
            URL Resources ({urlResources.length})
          </h3>
          <ul className="space-y-2">
            {urlResources && urlResources.length > 0 ? (
              urlResources.map((resource, index) => (
                <li key={index} className="flex items-start text-gray-600 p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <Link className="mr-2 h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-600 font-medium"
                    >
                      {resource.name}
                    </a>
                    {resource.description && (
                      <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                    )}
                    {resource.type && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {resource.type}
                      </span>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic p-2 bg-gray-50 rounded-md">
                No URL resources available
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
