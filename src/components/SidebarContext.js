'use client';

import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen");
    if (stored !== null) {
      setSidebarOpen(stored === "true");
    } else {
      setSidebarOpen(true); // default
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("sidebarOpen", sidebarOpen);
    }
  }, [sidebarOpen, ready]);

  if (!ready) return null;

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, ready }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
} 