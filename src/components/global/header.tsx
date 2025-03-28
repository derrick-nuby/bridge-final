"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import { LayoutDashboard, ClipboardList, BarChart3, Settings, HelpCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { name: "Attendance Log", icon: <ClipboardList className="h-4 w-4 mr-2" /> },
    { name: "Analytics", icon: <BarChart3 className="h-4 w-4 mr-2" />, url: "/attendance" },
    { name: "Settings", icon: <Settings className="h-4 w-4 mr-2" /> },
    { name: "Help", icon: <HelpCircle className="h-4 w-4 mr-2" /> },
  ];

  return (
    <motion.header
      className="h-16 border-b bg-amber-800/90 text-white flex items-center justify-between px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Smart Attendance</h1>
        <div className="flex items-center text-sm ml-6">
          <Clock className="h-4 w-4 mr-2" />
          {currentTime}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="text-white hover:bg-amber-700/50 hover:text-white hover:cursor-pointer"
            onClick={() => item.url && (window.location.href = item.url)}
          >
            {item.icon}
            {item.name}
          </Button>
        ))}
        <ModeToggle />
      </div>
    </motion.header>
  );
}

