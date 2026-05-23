import Sidebar from "@/src/components/dashboard/sidebar/Sidebar";
import { SidebarProvider } from "@/src/components/dashboard/sidebar/SidebarContext";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
          <Sidebar />
          <main className=" flex-1 overflow-auto mt-5 bg-gray-50">
            <div className="max-w-7xl mx-auto">
            {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
