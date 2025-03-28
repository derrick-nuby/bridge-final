import * as XLSX from "xlsx";

interface Student {
  id: number;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

export function exportToExcel(students: Student[]) {
  // Create worksheet data
  const worksheetData = students.map((student) => ({
    ID: student.id,
    Name: student.name,
    Status: student.isPresent ? "Present" : "Absent",
    "Last Seen": student.lastSeen ? student.lastSeen.toLocaleString() : "Never",
    "Attendance Count": student.attendanceCount,
    "Participation Score": `${student.participationScore}%`,
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  // Generate Excel file
  const today = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `attendance_report_${today}.xlsx`);
}

