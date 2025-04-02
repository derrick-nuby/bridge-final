"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Download, Pause, Settings2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAttendance } from "../context/attendance-context";
import { exportToExcel } from "../utils/export-to-excel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { students, processRecognition, isProcessing, lastRecognitionResult } = useAttendance();

  // Live mode states
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [captureInterval, setCaptureInterval] = useState(10);
  const [nextCaptureIn, setNextCaptureIn] = useState(captureInterval);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 96 },
            height: { ideal: 96 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setError(null);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setError("Could not access camera. Please check permissions and refresh the page.");
      }
    };

    startCamera();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle live mode timer
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isLiveMode) {
      // Initial capture
      captureAndProcess();

      // Set up countdown timer
      const countdownInterval = setInterval(() => {
        setNextCaptureIn((prev) => {
          if (prev <= 1) {
            captureAndProcess();
            return captureInterval;
          }
          return prev - 1;
        });
      }, 1000);

      intervalRef.current = countdownInterval;
    } else {
      setNextCaptureIn(captureInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiveMode, captureInterval]);

  const captureAndProcess = async () => {
    if (isProcessing || !videoRef.current || !canvasRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions
      canvas.width = 96;
      canvas.height = 96;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Convert to hex format
      const hexPixels: string[] = [];
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const packedRGB = (r << 16) | (g << 8) | b;
        hexPixels.push(`0x${packedRGB.toString(16).padStart(6, "0")}`);
      }

      const formattedOutput = hexPixels.join(", ");

      // Process the image data with the real API
      await processRecognition(formattedOutput);

      // Visual feedback for capture
      const feedbackEl = document.createElement("div");
      feedbackEl.className = "absolute inset-0 bg-white/20 z-10";
      if (videoRef.current.parentNode) {
        videoRef.current.parentNode.appendChild(feedbackEl);
        setTimeout(() => feedbackEl.remove(), 150);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      setError("Failed to process image. Please try again.");
    }
  };

  const toggleLiveMode = () => {
    setIsLiveMode((prev) => !prev);
  };

  const handleExport = () => {
    exportToExcel(students);
  };

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button
            onClick={captureAndProcess}
            className="bg-amber-800 hover:bg-amber-700 text-white"
            size="lg"
            disabled={isLiveMode || isProcessing}
          >
            <Camera className="mr-2 h-4 w-4" />
            RECORD ATTENDANCE
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-amber-800/30 text-amber-800 hover:bg-amber-800/10 hover:text-amber-700"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Live Mode Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="p-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="live-mode" checked={isLiveMode} onCheckedChange={toggleLiveMode} />
                    <Label htmlFor="live-mode" className="text-sm">
                      {isLiveMode ? "Live Mode Active" : "Live Mode Inactive"}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interval" className="text-sm">
                      Capture Interval
                    </Label>
                    <span className="text-sm font-medium">{captureInterval}s</span>
                  </div>
                  <Slider
                    id="interval"
                    min={1}
                    max={30}
                    step={1}
                    value={[captureInterval]}
                    onValueChange={(value) => setCaptureInterval(value[0])}
                    className="my-2"
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={handleExport} className="bg-amber-800 hover:bg-amber-700 text-white" size="lg">
          <Download className="mr-2 h-4 w-4" />
          EXPORT ANALYTICS
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="flex-1 relative overflow-hidden rounded-xl border border-amber-800/30 shadow-lg">
        <CardContent className="p-0 h-full relative">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-xl" />
          <canvas ref={canvasRef} className="hidden" />

          {isProcessing && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="animate-spin h-8 w-8 border-4 border-amber-800 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-white text-center">Processing...</p>
              </div>
            </div>
          )}

          {lastRecognitionResult && (
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm shadow-lg max-w-xs">
              <p className="font-medium capitalize">{lastRecognitionResult.label}</p>
              <p className="text-xs">Confidence: {(lastRecognitionResult.value * 100).toFixed(1)}%</p>
            </div>
          )}

          {isLiveMode && (
            <>
              <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                Live Capture
              </div>

              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center shadow-lg">
                <Clock className="h-3 w-3 mr-1" />
                Next: {nextCaptureIn}s
              </div>

              <Button
                className="absolute bottom-4 left-4 bg-red-500 hover:bg-red-600 text-white"
                size="sm"
                onClick={toggleLiveMode}
              >
                <Pause className="mr-2 h-3 w-3" />
                Stop Live Mode
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

