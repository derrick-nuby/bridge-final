"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Upload, User, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRunClassification } from "@/hooks/useInferenceHooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

const InferencePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rawOutput, setRawOutput] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [recognizedPerson, setRecognizedPerson] = useState<{
    label: string;
    confidence: number;
  } | null>(null);

  const { mutate, isPending, isError, error, data } = useRunClassification();

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

  const processFile = (file: File) => {
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);

      // Automatically process the image once it's loaded
      processImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if it's an image
      if (file.type.startsWith("image/")) {
        processFile(file);
      }
    }
  };

  const processImage = (imageSrc: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 96;
    const height = 96;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = document.createElement("img") as HTMLImageElement;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
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
    img.src = imageSrc;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
          <div className="flex justify-center">
            <div
              className={`relative overflow-hidden rounded-lg w-64 h-64 flex items-center justify-center transition-colors duration-200 ${isDragging
                ? "bg-primary/10 border-2 border-dashed border-primary"
                : imagePreview
                  ? "bg-muted"
                  : "bg-muted border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {imagePreview ? (
                <Image src={imagePreview || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Upload
                    className={`h-12 w-12 mx-auto mb-2 ${isDragging ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <p className={`text-sm ${isDragging ? "text-primary" : "text-muted-foreground"}`}>
                    {isDragging ? "Drop image here" : "Drag & drop or click to upload"}
                  </p>
                </div>
              )}
              {isPending && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

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
          <Button onClick={triggerFileInput} disabled={isPending}>
            {isPending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InferencePage

