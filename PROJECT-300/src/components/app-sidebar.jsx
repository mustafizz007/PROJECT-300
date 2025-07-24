import React from "react";
import {
  User,
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  BookOpen,
  FolderOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";

// Menu items.
const navItems = [
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Results",
    url: "#",
    icon: ClipboardList,
  },
  {
    title: "CGPA",
    url: "#",
    icon: GraduationCap,
  },
  {
    title: "Courses",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Resources",
    url: "#",
    icon: FolderOpen,
  },
];

export function AppSidebar(props) {
  return (
    <Sidebar
      {...props}
      className="bg-gray-900 text-white border-r border-gray-800"
    >
      <SidebarContent>
        <div className="p-4 text-xl font-bold text-white">MuPortal</div>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="hover:bg-gray-800 data-[active=true]:bg-gray-800"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
