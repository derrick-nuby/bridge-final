import { CameraFeed } from "./components/camera-feed";
import KeyListener from "./components/listener";
import { StudentSidebar } from "./components/student-sidebar";
import { AttendanceProvider } from "./context/attendance-context";

export default function AttendancePage() {
  return (
    <AttendanceProvider>
      <div className="flex flex-col h-screen bg-background">
        <main className="flex flex-1 overflow-hidden">
          <CameraFeed />
          <StudentSidebar />
        </main>
      </div>
      <KeyListener />
    </AttendanceProvider>
  );
}

