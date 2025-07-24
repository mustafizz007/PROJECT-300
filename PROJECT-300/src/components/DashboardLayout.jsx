"use client"; // If this component uses client-side hooks like useState or useEffect

import { LogOut } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// You might need to adjust the path to your global CSS file
import "../index.css"; // Assuming your main CSS is index.css or style.css

export default function DashboardLayout({ children }) {
  // In a non-Next.js App Router setup, you might not have `cookies()` directly here.
  // If you need to persist sidebar state, you'd typically use client-side storage (localStorage)
  // or a custom server-side solution if you have a backend.
  // For now, we'll default to true for demonstration.
  const defaultOpen = true; // Or retrieve from localStorage if applicable

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased flex h-full"
      )}
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        {/* This is the main flex container */}
        <AppSidebar /> {/* This will take its width: w-[--sidebar-width] */}
        <div className="flex flex-col flex-1">
          {/* This will take the remaining space */}
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900 text-white">
            <div className="flex items-center gap-4">
              {/* Sidebar trigger for mobile, hidden on desktop */}
              <SidebarTrigger className="-ml-1 md:hidden" />
            </div>
            {/* User info and logout button */}
            <div className="flex items-center gap-4 ml-auto">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt="Abira Haydar"
                />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">Abira Haydar</span>
                <span className="text-sm text-gray-400">CSE</span>
              </div>
              <Button
                variant="outline"
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                Log Out <LogOut className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </header>
          {children} {/* This will be your StudentDashboard content */}
        </div>
      </SidebarProvider>
    </div>
  );
}
