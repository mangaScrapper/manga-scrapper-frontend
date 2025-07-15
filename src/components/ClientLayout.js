'use client';

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent";
import useTheme from "../hooks/useTheme";
import { useSidebar } from "./SidebarContext";

function LayoutContent({ children }) {
  const { sidebarOpen, setSidebarOpen, ready } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);
  const handleSidebarClose = () => setSidebarOpen(false);

  if (!ready) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar onSidebarToggle={handleSidebarToggle} onThemeToggle={toggleTheme} theme={theme} />
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        <MainContent sidebarOpen={sidebarOpen}>{children}</MainContent>
      </div>
    </div>
  );
}

export default function ClientLayout({ children }) {
  return <LayoutContent>{children}</LayoutContent>;
} 