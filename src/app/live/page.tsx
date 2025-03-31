"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, User, UserX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRunClassification } from "@/hooks/useInferenceHooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const LivePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rawOutput, setRawOutput] = useState<string>("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [recognizedPerson, setRecognizedPerson] = useState<{
    label: string;
    confidence: number;
  } | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [captureInterval, setCaptureInterval] = useState(10); // seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastCaptureTime, setLastCaptureTime] = useState<Date | null>(null);
  const [nextCaptureIn, setNextCaptureIn] = useState<number>(captureInterval);

  const { mutate, isPending, isError, error, data } = useRunClassification();

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setIsCameraReady(false);
      }
    };

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());

      // Clear any running intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Process recognition results
  useEffect(() => {
    if (data?.success && data.data) {
      if (data.data.results && data.data.results.length > 0) {
        const person = data.data.results[0];
        setRecognizedPerson({
          label: person.label,
          confidence: person.value,
        });
      } else {
        setRecognizedPerson(null);
      }

      // Update last capture time
      setLastCaptureTime(new Date());
    }
  }, [data]);

  // Handle live mode timer
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isLiveMode && isCameraReady) {
      // Initial capture
      captureAndClassify();

      // Set up countdown timer
      const countdownInterval = setInterval(() => {
        setNextCaptureIn((prev) => {
          if (prev <= 1) {
            captureAndClassify();
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
  }, [isLiveMode, isCameraReady, captureInterval]);

  const captureAndClassify = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || isPending) return;

    const width = 96;
    const height = 96;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height).data;

    const hexPixels: string[] = [];

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const packedRGB = (r << 16) | (g << 8) | b;
      hexPixels.push(`0x${packedRGB.toString(16).padStart(6, "0")}`);
    }

    const formattedOutput = hexPixels.join(", ");
    setRawOutput(formattedOutput);

    // Send to backend for classification
    mutate(formattedOutput);
  };

  const toggleLiveMode = () => {
    setIsLiveMode((prev) => !prev);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setCaptureInterval(value);
      setNextCaptureIn(value);
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Live Attendance Monitoring</h1>
        <Button variant="outline" asChild>
          <Link href="/model-info">View Model Info</Link>
        </Button>
      </div>

      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle className="text-center">Live Face Recognition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isCameraReady && (
            <Alert variant="destructive">
              <AlertTitle>Camera Error</AlertTitle>
              <AlertDescription>
                Could not access camera. Please check permissions and refresh the page.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-lg w-full h-64 md:h-80 bg-muted">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                {isPending && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-white animate-spin" />
                  </div>
                )}

                {isLiveMode && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                    Live
                  </div>
                )}

                {isLiveMode && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                    Next capture in: {nextCaptureIn}s
                  </div>
                )}
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Live Mode Settings</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="live-mode" checked={isLiveMode} onCheckedChange={toggleLiveMode} />
                    <Label htmlFor="live-mode">{isLiveMode ? "Live Mode Active" : "Live Mode Inactive"}</Label>
                  </div>

                  <Button variant={isLiveMode ? "destructive" : "default"} size="sm" onClick={toggleLiveMode}>
                    {isLiveMode ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interval">Capture Interval (seconds)</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="interval"
                      type="number"
                      min="1"
                      value={captureInterval}
                      onChange={handleIntervalChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                {lastCaptureTime && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Last capture: {lastCaptureTime.toLocaleTimeString()}
                  </div>
                )}
              </div>

              {isError && (
                <Alert variant="destructive">
                  <AlertTitle>Classification Error</AlertTitle>
                  <AlertDescription>{error?.message || "An error occurred during classification"}</AlertDescription>
                </Alert>
              )}

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Recognition Results</h3>
                {recognizedPerson ? (
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">{recognizedPerson.label}</p>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {(recognizedPerson.confidence * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted p-3 rounded-full">
                      <UserX className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No person recognized</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={captureAndClassify} disabled={!isCameraReady || isPending || isLiveMode}>
            {isPending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Manual Capture
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LivePage

