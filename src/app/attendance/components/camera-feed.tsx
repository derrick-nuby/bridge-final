// file: src/app/attendance/components/camera-feed.tsx

'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="flex-1 p-4 flex flex-col">
      <Card className="flex-1 relative overflow-hidden rounded-xl border border-amber-800/30 shadow-lg">
        <CardContent className="p-0 h-full relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />
        </CardContent>
      </Card>
    </div>
  );
}
