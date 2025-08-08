import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function StudentProfile({ studentId }) {
  const [studentData, setStudentData] = useState({
    name: "Loading...",
    phone: "Loading...",
    department: "Computer Science",
    cgpa: "Loading...",
    year: "Loading...",
    credits: "Loading...",
    major: "",
    specification: "",
    expectedGraduation: "",
    academicAdvisor: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/${studentId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched student data:", data); // Debug log
          console.log("Phone field:", data.phone); // Debug phone specifically
          console.log("Phone type:", typeof data.phone); // Debug phone type

          setStudentData((prev) => ({
            ...prev,
            name: data.name || "Unknown Student",
            phone: data.phone || "", // Remove "No phone available" fallback
            department: data.department || "Computer Science",
          }));
        } else {
          console.error("API Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    const fetchCGPAData = async () => {
      try {
        // Fetch current CGPA
        const cgpaResponse = await fetch(
          `http://localhost:3000/api/student/result/${studentId}`
        );
        if (cgpaResponse.ok) {
          const cgpaData = await cgpaResponse.json();
          setStudentData((prev) => ({
            ...prev,
            cgpa: cgpaData.cgpa,
            credits: `${cgpaData.total_credits}/160`, // Assuming 160 is total required
          }));
        }
      } catch (error) {
        console.error("Error fetching CGPA data:", error);
      }
    };

    const fetchAcademicYearStatus = async () => {
      try {
        // Fetch academic year status to determine current year and semester
        const yearResponse = await fetch(
          `http://localhost:3000/api/student/academic-years-status/${studentId}`
        );
        if (yearResponse.ok) {
          const yearData = await yearResponse.json();

          // Also fetch semester data to get specific semester info
          const semesterResponse = await fetch(
            `http://localhost:3000/api/student/semesters/${studentId}`
          );

          let currentYearSemester = "1st Year, 1st Semester";

          if (semesterResponse.ok) {
            const semesterData = await semesterResponse.json();
            const semesters = semesterData.semesters || [];

            if (semesters.length > 0) {
              // Get the latest semester (assuming semesters are sorted)
              const latestSemester = semesters[semesters.length - 1];
              const [year, semester] = latestSemester.split("-");

              // Convert to ordinal format
              const getOrdinal = (num) => {
                const n = parseInt(num);
                if (n === 1) return "1st";
                if (n === 2) return "2nd";
                if (n === 3) return "3rd";
                return `${n}th`;
              };

              const yearOrdinal = getOrdinal(year);
              const semesterOrdinal = getOrdinal(semester);

              currentYearSemester = `${yearOrdinal} Year, ${semesterOrdinal} Semester`;
            }
          }

          setStudentData((prev) => ({
            ...prev,
            year: currentYearSemester,
          }));
        }
      } catch (error) {
        console.error("Error fetching academic year data:", error);
      }
    };

    if (studentId) {
      fetchStudentData();
      fetchCGPAData();
      fetchAcademicYearStatus();
    }
  }, [studentId]);

  const handleInputChange = (field, value) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const updateData = {
        name: studentData.name,
        phone: studentData.phone || null,
        department: studentData.department,
        major: studentData.major,
        specification: studentData.specification,
        expectedGraduation: studentData.expectedGraduation,
        academicAdvisor: studentData.academicAdvisor,
      };

      const response = await fetch(
        `http://localhost:3000/api/student/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        alert("Error updating profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleChangePassword = () => {
    alert("Password change functionality will be implemented here");
  };

  // Function to get initials from student name
  const getInitials = (name) => {
    if (!name || name === "Loading...") return "?";

    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    // Get first letter of first name and first letter of last name
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  };

  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-gray-100 via-teal-50 to-gray-200 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Profile Card - Left */}
        <div className="bg-gradient-to-br from-gray-200 via-teal-50 to-gray-300 rounded-2xl p-8 shadow-2xl border border-teal-300/30">
          <div className="text-center mb-8">
            <Avatar className="h-20 w-20 mx-auto mb-4 shadow-lg">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt={studentData.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-gray-400 via-teal-500 to-gray-500 text-white text-xl">
                {getInitials(studentData.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-teal-600 to-gray-800 mb-2">
              {studentData.name}
            </h2>
            <p className="text-teal-700 mb-1 font-semibold">
              Dept : {studentData.department}
            </p>
            <p className="text-blue-600 mb-6 font-semibold">
              Student ID : {studentId}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-teal-700 font-medium">Current CGPA :</span>
              <span className="text-2xl font-extrabold text-teal-700">
                {studentData.cgpa}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-teal-700 font-medium">Year:</span>
              <span className="text-2xl font-extrabold text-teal-700">
                {studentData.year}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-teal-700 font-medium">
                Credits Completed :
              </span>
              <span className="text-2xl font-extrabold text-teal-700">
                {studentData.credits}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-gray-400 via-teal-500 to-gray-500 hover:from-gray-400 hover:to-teal-500 text-white py-3 rounded-xl shadow-lg font-bold transition-all duration-300"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Edit" : "Edit profile"}
          </Button>
        </div>

        {/* Right Side - Forms */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gradient-to-br from-gray-50 via-teal-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-teal-200/30">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-teal-600 to-gray-800 mb-6">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-teal-700 mb-2 block text-left">
                  Full Name
                </Label>
                <Input
                  value={studentData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="w-full bg-gray-100 border-0 rounded-md h-10 text-gray-900 font-semibold"
                />
              </div>

              <div>
                <Label className="text-sm font-bold text-teal-700 mb-2 block text-left">
                  Student ID
                </Label>
                <Input
                  value={studentId}
                  disabled={true}
                  className="w-full bg-gray-100 border-0 rounded-md h-10 text-gray-900 font-semibold"
                />
              </div>

              <div>
                <Label className="text-sm font-bold text-teal-700 mb-2 block text-left">
                  Department
                </Label>
                <Input
                  value={studentData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full bg-gray-100 border-0 rounded-md h-10 text-gray-900 font-semibold"
                />
              </div>

              <div>
                <Label className="text-sm font-bold text-teal-700 mb-2 block text-left">
                  Phone
                </Label>
                <Input
                  placeholder={
                    isEditing ? "Enter phone number" : "No phone number"
                  }
                  value={studentData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className="w-full bg-gray-100 border-0 rounded-md h-10 text-gray-900 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gradient-to-br from-teal-50 via-gray-50 to-teal-100 rounded-2xl p-6 shadow-lg border border-teal-200/30">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-gray-700 mb-6">
              Academic Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-blue-700 mb-2 block text-left">
                    Major
                  </Label>
                  <Input
                    value={studentData.major}
                    onChange={(e) => handleInputChange("major", e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-teal-100 border-0 rounded-md h-10 text-teal-900 font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-blue-700 mb-2 block text-left">
                    Specification
                  </Label>
                  <Input
                    value={studentData.specification}
                    onChange={(e) =>
                      handleInputChange("specification", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full bg-teal-100 border-0 rounded-md h-10 text-teal-900 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-blue-700 mb-2 block text-left">
                    Expected Graduation
                  </Label>
                  <Input
                    value={studentData.expectedGraduation}
                    onChange={(e) =>
                      handleInputChange("expectedGraduation", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full bg-teal-100 border-0 rounded-md h-10 text-teal-900 font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-blue-700 mb-2 block text-left">
                    Academic advisor
                  </Label>
                  <Input
                    value={studentData.academicAdvisor}
                    onChange={(e) =>
                      handleInputChange("academicAdvisor", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full bg-teal-100 border-0 rounded-md h-10 text-teal-900 font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-gradient-to-br from-gray-50 via-teal-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-teal-200/30">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-gray-600 to-teal-800 mb-6">
              Privacy & Security
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-600 font-bold mb-1 text-left">
                  Change Password
                </p>
                <p className="text-sm text-teal-700">
                  Update your account password
                </p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal-500 to-gray-500 hover:from-teal-600 hover:to-gray-600 text-white px-8 py-2 rounded-xl font-bold shadow-md transition-all duration-300"
                onClick={handleChangePassword}
              >
                Change
              </Button>
            </div>
          </div>

          {isEditing && (
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white hover:opacity-90 py-3 rounded-xl shadow-lg font-bold transition-all duration-300"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
