"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAttendance } from "../context/attendance-context";
import { StudentCard } from "./student-card";
import { UserX } from "lucide-react";

export function StudentSidebar() {
  const { students } = useAttendance();
  const presentStudents = students.filter((student) => student.isPresent);
  const absentStudents = students.filter((student) => !student.isPresent);

  return (
    <motion.div
      className="w-1/5 min-w-[250px] border-l bg-background overflow-y-auto p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-lg font-semibold mb-4">Students</h2>

      {presentStudents.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-green-600 mb-2 flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            Present ({presentStudents.length})
          </h3>
          <div className="space-y-3">
            <AnimatePresence>
              {presentStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {absentStudents.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-800 mr-2"></div>
            Absent ({absentStudents.length})
          </h3>
          <div className="space-y-3">
            <AnimatePresence>
              {absentStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {students.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <UserX className="h-10 w-10 mb-2" />
          <p>No students currently recorded</p>
        </div>
      )}
    </motion.div>
  );
}

