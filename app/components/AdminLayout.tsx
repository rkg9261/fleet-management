"use client";

import { ReactNode, useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
}