import Header from "./../components/Header";
import { SidebarNav } from "./../components/SidebarNav";
import { StatsCard } from "./../components/StatsCard";
import { QuickActionButton } from "./../components/QuickActionButton";
import { Plus, UserPlus, ClipboardEdit } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex h-screen bg-gray-950">
      <SidebarNav />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              Manage courses, students, and academic data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Students"
              value="1247"
              change="100% from last semester"
              changeType="positive"
              iconSrc="/students-icon.png"
              iconAlt="Students icon"
            />
            <StatsCard
              title="Active Courses"
              value="64"
              change="+2% new courses added"
              changeType="positive"
              iconSrc="/book-icon.png"
              iconAlt="Book icon"
            />
            <StatsCard
              title="Average CGPA"
              value="3.52"
              change="+0.1% improved"
              changeType="positive"
              iconSrc="/graduation-cap-icon.png"
              iconAlt="Graduation cap icon"
            />
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <QuickActionButton icon={Plus} label="Add Courses" />
              <QuickActionButton icon={UserPlus} label="Add Students" />
              <QuickActionButton icon={ClipboardEdit} label="Update results" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
