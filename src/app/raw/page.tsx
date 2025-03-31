'use client';

import React, { useEffect, useRef, useState } from 'react';

const RawImageExtractor = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rawOutput, setRawOutput] = useState<string>('');

  useEffect(() => {
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

    const width = 96;
    const height = 96;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height).data;

    const hexPixels: string[] = [];

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const packedRGB = (r << 16) | (g << 8) | b;
      hexPixels.push(`0x${packedRGB.toString(16).padStart(6, '0')}`);
    }

    const formattedOutput = hexPixels.join(', ');
    setRawOutput(formattedOutput);
    console.log('Raw RGB888 values:', formattedOutput);
  };

  return (
    <div className="p-4 space-y-4">
      <video ref={videoRef} autoPlay playsInline className="rounded-lg w-64 h-64" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button
        onClick={captureFrame}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Capture Frame
      </button>
      {rawOutput && (
        <textarea
          value={rawOutput}
          readOnly
          rows={10}
          className="w-full text-sm p-2 border rounded resize-none font-mono"
        />
      )}
    </div>
  );
};

export default RawImageExtractor;
