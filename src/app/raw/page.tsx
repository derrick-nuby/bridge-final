'use client';

import React, { useEffect, useRef } from 'react';

const RawImageExtractor = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Start the webcam
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();
  }, []);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = 96; // resize to match Edge Impulse input shape
    const height = 96;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the current video frame to canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Extract pixel data
    const imageData = ctx.getImageData(0, 0, width, height).data;

    // Convert RGBA to grayscale or RGB (depending on model)
    const grayscalePixels: number[] = [];
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      // Edge Impulse expects grayscale in some models
      const gray = Math.floor((r + g + b) / 3);
      grayscalePixels.push(gray);
    }

    console.log('Flattened grayscale pixels:', grayscalePixels);
  };

  return (
    <div className="p-4">
      <video ref={videoRef} autoPlay playsInline className="rounded-lg w-64 h-64" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button
        onClick={captureFrame}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Capture Frame
      </button>
    </div>
  );
};

export default RawImageExtractor;
