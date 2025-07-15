import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaDatabase, FaBullseye, FaHdd, FaBookOpen, FaUser, FaClipboardList, FaCog } from "react-icons/fa";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt className="w-5 h-5" /> },
  { href: "/sources", label: "Sources", icon: <FaDatabase className="w-5 h-5" /> },
  { href: "/targets", label: "Targets", icon: <FaBullseye className="w-5 h-5" /> },
  { href: "/storage", label: "Storage", icon: <FaHdd className="w-5 h-5" /> },
  { href: "/content", label: "Content", icon: <FaBookOpen className="w-5 h-5" /> },
  { href: "/users", label: "Users", icon: <FaUser className="w-5 h-5" /> },
  { href: "/logs", label: "Logs", icon: <FaClipboardList className="w-5 h-5" /> },
  { href: "/settings", label: "Settings", icon: <FaCog className="w-5 h-5" /> },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  return (
    <>
      {/* Overlay for all screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        {/* Close button for all screens */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-md text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Close sidebar</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="h-full px-3 py-18 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2 rounded-lg group transition-colors ${
                    pathname === link.href
                      ? "bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={onClose}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
} 