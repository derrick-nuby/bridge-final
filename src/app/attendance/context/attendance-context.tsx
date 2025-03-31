"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRunClassification } from "@/hooks/useInferenceHooks";

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

interface RecognitionResult {
  label: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AttendanceContextType {
  students: Student[];
  markAttendance: (studentName: string, confidence: number) => void;
  processRecognition: (imageData: string) => Promise<void>;
  isProcessing: boolean;
  lastRecognitionResult: RecognitionResult | null;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode; }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [lastRecognitionResult, setLastRecognitionResult] = useState<RecognitionResult | null>(null);

  const { mutate, isPending, data } = useRunClassification();

  // Initialize students from recognized people
  useEffect(() => {
    // This will populate the students array as people are recognized
    // We start with an empty array and add students as they are detected
  }, []);

  // Process recognition results when data changes
  useEffect(() => {
    if (data?.success && data.data && data.data.results && data.data.results.length > 0) {
      const recognizedPerson = data.data.results[0];
      setLastRecognitionResult(recognizedPerson);

      // Mark attendance for the recognized person
      markAttendance(recognizedPerson.label, recognizedPerson.value);
    }
  }, [data]);

  const markAttendance = (studentName: string, confidence: number) => {
    setStudents((prevStudents) => {
      // Check if student already exists
      const existingStudentIndex = prevStudents.findIndex((s) => s.name.toLowerCase() === studentName.toLowerCase());

      const now = new Date();

      if (existingStudentIndex >= 0) {
        // Update existing student
        return prevStudents.map((student, index) =>
          index === existingStudentIndex
            ? {
              ...student,
              isPresent: true,
              lastSeen: now,
              attendanceCount: student.attendanceCount + 1,
            }
            : student,
        );
      } else {
        // Add new student
        return [
          ...prevStudents,
          {
            id: studentName.toLowerCase(),
            name: studentName,
            isPresent: true,
            lastSeen: now,
            attendanceCount: 1,
            participationScore: Math.round(confidence * 100), // Initialize with confidence score
          },
        ];
      }
    });
  };

  const processRecognition = async (imageData: string): Promise<void> => {
    try {
      // Send the image data to the backend for classification
      mutate(imageData);
    } catch (error) {
      console.error("Error processing recognition:", error);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        students,
        markAttendance,
        processRecognition,
        isProcessing: isPending,
        lastRecognitionResult,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
}

