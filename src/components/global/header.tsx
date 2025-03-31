"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import { LayoutDashboard, ClipboardList, BarChart3, Settings, HelpCircle, Clock, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    { name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" />, url: "/dashboard" },
    { name: "Attendance Log", icon: <ClipboardList className="h-4 w-4 mr-2" />, url: "/attendance-log" },
    { name: "Analytics", icon: <BarChart3 className="h-4 w-4 mr-2" />, url: "/attendance" },
    { name: "Settings", icon: <Settings className="h-4 w-4 mr-2" />, url: "/settings" },
    { name: "Help", icon: <HelpCircle className="h-4 w-4 mr-2" />, url: "/help" },
  ];

  return (
    <motion.header
      className="h-16 border-b bg-amber-800/90 text-white flex items-center justify-between px-4 md:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <FaRobot className="h-6 w-6 text-primary" />
          <span className="text-xl md:text-2xl font-bold text-primary">Participro</span>
        </Link>
        <div className="hidden md:flex items-center text-sm ml-6">
          <Clock className="h-4 w-4 mr-2" />
          {currentTime}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {navItems.map((item) => (
          <Button key={item.name} variant="ghost" className="text-white hover:bg-amber-700/50 hover:text-white" asChild>
            <Link href={item.url}>
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}
        <ModeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-2">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-amber-700/50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-amber-800/95 text-white border-amber-700 w-[250px] sm:w-[300px]">
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2" />
                {currentTime}
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    className="flex items-center py-2 px-3 rounded-md hover:bg-amber-700/50 transition-colors"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

