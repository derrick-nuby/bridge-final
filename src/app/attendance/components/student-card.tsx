"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Clock, BarChart2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StudentCardProps {
  student: {
    id: number;
    name: string;
    isPresent: boolean;
    lastSeen: Date | null;
    attendanceCount: number;
    participationScore: number;
  };
}

export function StudentCard({ student }: StudentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        className={`
          cursor-pointer transition-all duration-300 
          ${student.isPresent ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-amber-800/30"}
          hover:shadow-md dark:hover:shadow-amber-800/10
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${student.isPresent ? "bg-green-500 text-white" : "bg-amber-800/20 text-amber-800 dark:text-amber-400"}
              `}
              >
                <User className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">{student.name}</h3>
                <p className="text-xs text-muted-foreground">{student.isPresent ? "Present" : "Absent"}</p>
              </div>
            </div>

            <div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t space-y-3"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Last seen: </span>
                  <span className="font-medium">
                    {student.lastSeen ? formatDistanceToNow(student.lastSeen, { addSuffix: true }) : "Never"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  <span>Attendance: </span>
                  <span className="font-medium">{student.attendanceCount} classes</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Participation:</span>
                    <span className="font-medium">{student.participationScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-amber-800/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-800"
                      initial={{ width: 0 }}
                      animate={{ width: `${student.participationScore}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

