"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, User, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRunClassification } from "@/hooks/useInferenceHooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const InferencePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rawOutput, setRawOutput] = useState<string>("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [recognizedPerson, setRecognizedPerson] = useState<{
    label: string;
    confidence: number;
  } | null>(null);

  const { mutate, isPending, isError, error, data } = useRunClassification();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    };
  }, []);

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
    }
  }, [data]);

  const captureAndClassify = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

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

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Smart Attendance System</h1>
        <Button variant="outline" asChild>
          <Link href="/model-info">View Model Info</Link>
        </Button>
      </div>

      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle className="text-center">Face Recognition</CardTitle>
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

          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-lg w-64 h-64 bg-muted">
              <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover" />
              {isPending && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />

          {isError && (
            <Alert variant="destructive">
              <AlertTitle>Classification Error</AlertTitle>
              <AlertDescription>{error?.message || "An error occurred during classification"}</AlertDescription>
            </Alert>
          )}

          {data && (
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
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={captureAndClassify} disabled={!isCameraReady || isPending}>
            {isPending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Capture & Identify
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InferencePage

