import { useState } from "react";
import { X, Upload, Link } from "lucide-react";

export default function AddResourceModal({ isOpen, onClose, onSubmit }) {
  console.log("AddResourceModal props:", {
    isOpen,
    onClose: !!onClose,
    onSubmit: !!onSubmit,
  });

  const [resourceType, setResourceType] = useState("pdf");
  const [formData, setFormData] = useState({
    course: "Machine Learning (CS 401)",
    resourceName: "",
    description: "",
    file: null,
    url: "",
  });

  const courses = [
    "Machine Learning (CSE 401)",
    "Software Engineering (CSE 402)",
    "Artificial Intelligence (CSE 301)",
    "Project 300 (CSE 300)",
    "Bioinformatics (CSE 501)",
    "Computer Networks (CSE 421)",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, type: resourceType });
    // Reset form
    setFormData({
      course: "Machine Learning (CSE 401)",
      resourceName: "",
      description: "",
      file: null,
      url: "",
    });
    setResourceType("pdf");
    onClose();
  };

  console.log("AddResourceModal: isOpen =", isOpen);
  if (!isOpen) {
    console.log("AddResourceModal: Early return - modal not open");
    return null;
  }

  console.log("AddResourceModal: Rendering modal");
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Resource</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Resource Type */}
          <div>
            <label className="block text-sm text-gray-300 mb-2 text-left">
              Resource Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setResourceType("pdf")}
                className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                  resourceType === "pdf"
                    ? "border-gray-500 bg-blue-500/20 text-blue-400"
                    : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <Upload size={24} />
                <span className="text-sm font-medium">PDF Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setResourceType("url")}
                className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                  resourceType === "url"
                    ? "border-gray-500 bg-blue-500/20 text-blue-400"
                    : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <Link size={24} />
                <span className="text-sm font-medium">URL Resource</span>
              </button>
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm text-gray-300 mb-2 text-left">
              Course
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Resource Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2 text-left">
              Resource Name
            </label>
            <input
              type="text"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleInputChange}
              placeholder="e.g. Lecture Notes Week 5"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Conditional Fields */}
          {resourceType === "pdf" ? (
            <div>
              <label className="block text-sm text-gray-300 mb-2 text-left">
                Upload PDF
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-700/50">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400 mb-2">
                  Drag and drop PDF file here or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Maximum file size: 10MB
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  Select PDF File
                </label>
                {formData.file && (
                  <p className="mt-2 text-sm text-blue-400">
                    Selected: {formData.file.name}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-300 mb-2 text-left">
                Resource URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://example.com/resource"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                required={resourceType === "url"}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Upload Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
