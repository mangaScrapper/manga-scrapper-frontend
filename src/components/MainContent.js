import React from "react";

export default function MainContent({ children, sidebarOpen }) {
  return (
    <main
      className={`flex-1 p-4 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      <div className="p-4 dark:border-gray-700 min-h-[200px]">
        {children}
      </div>
    </main>
  );
} 