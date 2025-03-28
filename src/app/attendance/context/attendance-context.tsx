"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Student {
  id: number
  name: string
  isPresent: boolean
  lastSeen: Date | null
  attendanceCount: number
  participationScore: number
}

interface AttendanceContextType {
  students: Student[]
  markAttendance: (studentId: number) => void
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

// Mock student data
const initialStudents: Student[] = [
  { id: 1, name: "John Doe", isPresent: false, lastSeen: null, attendanceCount: 15, participationScore: 85 },
  { id: 2, name: "Jane Smith", isPresent: false, lastSeen: null, attendanceCount: 12, participationScore: 78 },
  { id: 3, name: "Alice Smith", isPresent: false, lastSeen: null, attendanceCount: 14, participationScore: 92 },
  { id: 4, name: "Bob Johnson", isPresent: false, lastSeen: null, attendanceCount: 10, participationScore: 65 },
  { id: 5, name: "Charlie Brown", isPresent: false, lastSeen: null, attendanceCount: 13, participationScore: 75 },
  { id: 6, name: "Diana Prince", isPresent: false, lastSeen: null, attendanceCount: 15, participationScore: 88 },
  { id: 7, name: "Ethan Hunt", isPresent: false, lastSeen: null, attendanceCount: 11, participationScore: 70 },
]

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents)

  const markAttendance = (studentId: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              isPresent: true,
              lastSeen: new Date(),
              attendanceCount: student.attendanceCount + 1,
            }
          : student,
      ),
    )
  }

  return <AttendanceContext.Provider value={{ students, markAttendance }}>{children}</AttendanceContext.Provider>
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider")
  }
  return context
}

