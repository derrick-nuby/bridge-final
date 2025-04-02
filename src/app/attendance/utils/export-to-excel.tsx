import * as XLSX from "xlsx-js-style";

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

export function exportToExcel(students: Student[]) {
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Add title row
  XLSX.utils.sheet_add_aoa(worksheet, [["BLUE CLASS"]], { origin: "A1" });

  // Add header row
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [["ID", "Name", "Status", "Last Seen", "Attendance Count", "Participation Score"]],
    { origin: "A2" },
  );

  // Add data rows
  const data = students.map((student) => [
    student.id,
    student.name,
    student.isPresent ? "Present" : "Absent",
    student.lastSeen ? student.lastSeen.toLocaleString() : "Never",
    student.attendanceCount,
    "Nan",
  ]);
  XLSX.utils.sheet_add_aoa(worksheet, data, { origin: "A3" });

  // Set merged cells for title
  worksheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Merge A1:F1
  ];

  // Set column widths
  worksheet["!cols"] = [
    { wch: 10 }, // ID
    { wch: 15 }, // Name
    { wch: 10 }, // Status
    { wch: 25 }, // Last Seen
    { wch: 18 }, // Attendance Count
    { wch: 18 }, // Participation Score
  ];

  // Apply styles to title row (blue background, large text)
  const titleCell = XLSX.utils.encode_cell({ r: 0, c: 0 });
  worksheet[titleCell] = {
    v: "BLUE CLASS",
    t: "s",
    s: {
      font: { bold: true, sz: 24, color: { rgb: "000000" } },
      fill: { patternType: "solid", fgColor: { rgb: "0070C0" } }, // Blue background
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { auto: 1 } },
        bottom: { style: "thin", color: { auto: 1 } },
        left: { style: "thin", color: { auto: 1 } },
        right: { style: "thin", color: { auto: 1 } },
      },
    },
  };

  // Style header row
  const headers = ["ID", "Name", "Status", "Last Seen", "Attendance Count", "Participation Score"];
  headers.forEach((_, idx) => {
    const cellRef = XLSX.utils.encode_cell({ r: 1, c: idx });
    if (worksheet[cellRef]) {
      worksheet[cellRef].s = {
        font: { bold: true, sz: 12 },
        fill: { patternType: "solid", fgColor: { rgb: "F2F2F2" } },
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
          left: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
        },
      };
    }
  });

  // Style data cells
  data.forEach((row, rowIdx) => {
    row.forEach((_, colIdx) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIdx + 2, c: colIdx });
      if (worksheet[cellRef]) {
        worksheet[cellRef].s = {
          border: {
            top: { style: "thin", color: { auto: 1 } },
            bottom: { style: "thin", color: { auto: 1 } },
            left: { style: "thin", color: { auto: 1 } },
            right: { style: "thin", color: { auto: 1 } },
          },
          alignment: { horizontal: "left" },
        };
      }
    });
  });

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  // Generate Excel file
  const today = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `attendance_report_${today}.xlsx`);
}

