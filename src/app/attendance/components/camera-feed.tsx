"use client";

import { useRef, useEffect } from "react";
import { useEdgeImpulse } from "@/hooks/useEdgeImpulse";

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const classifier = useEdgeImpulse();

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  const handleCapture = async () => {
    if (!classifier || !videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Flatten RGB data for model
    const input = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
      input.push(imageData.data[i]); // R only, or average RGB
    }

    const result = classifier.classify(input);
    console.log("Inference result:", result);
  };

  return (
    <div className="flex-1 p-4 flex flex-col space-y-4">
      <video ref={videoRef} className="rounded-xl w-full h-full object-cover border" />
      <button
        onClick={handleCapture}
        className="bg-amber-600 text-white py-2 px-4 rounded shadow hover:bg-amber-700 transition"
      >
        Capture & Run Inference
      </button>
    </div>
  );
}
