"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const RawImageExtractor = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rawOutput, setRawOutput] = useState<string>("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast.error("Could not access camera. Please check permissions.");
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

  const captureFrame = () => {
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
    console.log("Raw RGB888 values:", formattedOutput);
  };

  const copyToClipboard = async () => {
    if (!rawOutput) return;

    try {
      await navigator.clipboard.writeText(rawOutput);
      toast.success("Raw pixel data copied to clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Raw Image Extractor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative overflow-hidden rounded-lg w-64 h-64 bg-muted">
            <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden" />

        {rawOutput && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Raw Pixel Data</h3>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
                <Copy className="h-3.5 w-3.5 mr-2" />
                Copy
              </Button>
            </div>
            <div className="relative border rounded-md">
              <Textarea value={rawOutput} readOnly className="font-mono text-xs h-24 overflow-auto resize-none pr-2" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={captureFrame}>
          <Camera className="mr-2 h-4 w-4" />
          Capture Frame
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RawImageExtractor

