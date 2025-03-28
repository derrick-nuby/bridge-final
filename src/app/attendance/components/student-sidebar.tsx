"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAttendance } from "../context/attendance-context"
import { StudentCard } from "./student-card"

export function StudentSidebar() {
  const { students } = useAttendance()

  return (
    <motion.div
      className="w-1/5 min-w-[250px] border-l bg-background overflow-y-auto p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-lg font-semibold mb-4">Students</h2>

      <div className="space-y-3">
        <AnimatePresence>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

