"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Copy, Upload, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const RawImageExtractor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rawOutput, setRawOutput] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 96;
    const height = 96;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = document.createElement("img");
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
      setIsProcessing(false);
      toast.success("Image processed successfully");
    };
    img.onerror = () => {
      setIsProcessing(false);
      toast.error("Failed to load image");
    };
    img.src = imageSrc;
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Raw Image Extractor</CardTitle>
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
              <div className="relative w-full h-full">
                <Image src={imagePreview || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
              </div>
            ) : (
              <div className="text-center p-4">
                <Upload className={`h-12 w-12 mx-auto mb-2 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                <p className={`text-sm ${isDragging ? "text-primary" : "text-muted-foreground"}`}>
                  {isDragging ? "Drop image here" : "Drag & drop or click to upload"}
                </p>
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-white animate-spin" />
              </div>
            )}
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        {rawOutput && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Raw Pixel Data (RGB888 Format)</h3>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
                <Copy className="h-3.5 w-3.5 mr-2" />
                Copy
              </Button>
            </div>
            <div className="relative border rounded-md">
              <Textarea value={rawOutput} readOnly className="font-mono text-xs h-32 overflow-auto resize-none pr-2" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={triggerFileInput} disabled={isProcessing}>
          {isProcessing ? (
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
  );
};

export default RawImageExtractor

