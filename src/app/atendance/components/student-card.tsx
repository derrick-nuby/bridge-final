"use client";

import { motion } from "framer-motion";
import { CheckCircle, User } from "lucide-react";

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <motion.div
      className="bg-white rounded-md shadow-sm p-3 flex items-center justify-between"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-amber-800/10 p-2">
          <User className="h-4 w-4 text-amber-800" />
        </div>
        <div>
          <p className="text-sm font-medium">{student.name}</p>
          <p className="text-xs text-muted-foreground">Seen: {student.lastSeen?.toLocaleTimeString() || "Never"}</p>
        </div>
      </div>
      <CheckCircle className="h-5 w-5 text-green-500" />
    </motion.div>
  );
}

