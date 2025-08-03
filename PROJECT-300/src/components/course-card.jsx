import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, Link } from "lucide-react";

export default function CourseCard({ course }) {
  const { title, pdfResources, urlResources } = course;

  return (
    <Card className="mb-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <CardHeader className="pb-3 px-6 pt-6 border-b border-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
          {title || "No Title Available"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            PDF Resources
          </h3>
          <ul className="space-y-2">
            {pdfResources && pdfResources.length > 0 ? (
              pdfResources.map((resource, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  <a
                    href={resource.url}
                    download
                    className="hover:underline text-blue-600"
                  >
                    {resource.name}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">
                No PDF resources available
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            URL Resources
          </h3>
          <ul className="space-y-2">
            {urlResources && urlResources.length > 0 ? (
              urlResources.map((resource, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Link className="mr-2 h-4 w-4 text-gray-500" />
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    {resource.name}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">
                No URL resources available
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
