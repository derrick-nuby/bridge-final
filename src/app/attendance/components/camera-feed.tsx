"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAttendance } from "../context/attendance-context";
import { exportToExcel } from "../utils/export-to-excel";
import { FaceOverlayBox } from "./face-overlay-box";
import { toast } from "react-hot-toast";

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  interface DetectedFace {
    id: number;
    name: string;
    confidence: number;
    box: { x: number; y: number; width: number; height: number; };
  }

  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([]);
  const { markAttendance, students } = useAttendance();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast.error("Could not access camera. Please check permissions.", {
          duration: 4000,
        });
      }
    };

    startCamera();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleRecordAttendance = async () => {
    setIsRecording(true);

    // Simulate face detection process
    setTimeout(() => {
      // Mock detected faces for demo
      const mockDetectedFaces = [
        { id: 1, name: "John Doe", confidence: 0.98, box: { x: 100, y: 100, width: 200, height: 200 } },
        { id: 3, name: "Alice Smith", confidence: 0.95, box: { x: 400, y: 150, width: 180, height: 180 } },
      ];

      setDetectedFaces(mockDetectedFaces);

      // Mark attendance for detected students
      mockDetectedFaces.forEach((face) => {
        markAttendance(face.id);
      });

      toast.success(`Attendance Recorded: Detected ${mockDetectedFaces.length} students`, {
        duration: 4000,
      });

      setIsRecording(false);
    }, 2000);
  };

  const handleExportAnalytics = () => {
    exportToExcel(students);
    toast.success("Attendance data has been exported to Excel", {
      duration: 4000,
    });
  };

  return (
    <motion.div
      className="flex-1 p-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between mb-4">
        <Button
          onClick={handleRecordAttendance}
          disabled={isRecording || !cameraActive}
          className="bg-amber-800 hover:bg-amber-700 text-white"
          size="lg"
        >
          {isRecording ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" />
              RECORD ATTENDANCE
            </>
          )}
        </Button>

        <Button onClick={handleExportAnalytics} className="bg-amber-800 hover:bg-amber-700 text-white" size="lg">
          <Download className="mr-2 h-4 w-4" />
          EXPORT ANALYTICS
        </Button>
      </div>

      <Card className="flex-1 relative overflow-hidden rounded-xl border border-amber-800/30 shadow-lg">
        <CardContent className="p-0 h-full relative">
          {cameraActive ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

              <AnimatePresence>
                {detectedFaces.map((face) => (
                  <FaceOverlayBox key={face.id} face={face} />
                ))}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-amber-800/20 text-amber-900 dark:text-amber-400 text-4xl font-bold">
              LEAVE HERE FOR CAMERA
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-2 text-sm text-muted-foreground">
        {detectedFaces.length > 0 ? (
          <p>
            Detected {detectedFaces.length} students. Last recognized: {detectedFaces[detectedFaces.length - 1].name}
          </p>
        ) : (
          <p>No students detected yet. Click &quot;RECORD ATTENDANCE&quot; to begin.</p>
        )}
      </div>
    </motion.div>
  );
}

