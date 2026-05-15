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
          <main className="flex-1 overflow-auto p-6 bg-white">{children}</main>
        </div>
      </SidebarProvider>
    </>
  );
}
