"use client";

import { LogOut } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import "../index.css";

export default function DashboardLayout({ children }) {
  const defaultOpen = true;

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased flex h-full"
      )}
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        {/* This is the main flex container */}
        <AppSidebar />
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
                <AvatarImage src="/public/favicon.ico" alt="Joy Shib" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">Joy Shib</span>
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
