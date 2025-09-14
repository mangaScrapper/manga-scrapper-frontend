'use client';

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent";
import useTheme from "../hooks/useTheme";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";

function LayoutContent({ children }) {
  const { sidebarOpen, setSidebarOpen, ready } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { user, loading, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);
  const handleSidebarClose = () => setSidebarOpen(false);

  // Login sayfasında navbar ve sidebar gösterme
  const isLoginPage = pathname === '/login';

  // Sidebar context henüz hazır değilse loading göster
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {!isLoginPage && isAuthenticated && (
        <>
          <Navbar onSidebarToggle={handleSidebarToggle} onThemeToggle={toggleTheme} theme={theme} />
          <div className="flex flex-1 min-h-0">
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
            <MainContent sidebarOpen={sidebarOpen}>{children}</MainContent>
          </div>
        </>
      )}
      {isLoginPage && children}
      {!isLoginPage && !user && !loading && children}
    </div>
  );
}

export default function ClientLayout({ children }) {
  return <LayoutContent>{children}</LayoutContent>;
} 