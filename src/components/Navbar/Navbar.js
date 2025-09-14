import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { withAuth } from "../withAuth";

function Navbar({ onSidebarToggle, onThemeToggle, theme }) {

  const { logout } = useAuth();


  return (
    <nav className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 h-16 sm:h-16 w-full">
      <div className="flex items-center w-full sm:w-auto">
        {/* Sidebar toggle button for all screens */}
        <button
          onClick={onSidebarToggle}
          className="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MangaScrap</span>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        {/* Theme toggle button */}
        {theme ? (
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            )}
          </button>
        ) : null}
        <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
      </div>
    </nav>
  );
} 

export default withAuth(Navbar);