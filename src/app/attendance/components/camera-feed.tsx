'use client';

import { useEffect, useRef } from 'react';
import { Camera, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="flex justify-between mb-4">
        <Button
          onClick={() => { }}
          className="bg-amber-800 hover:bg-amber-700 text-white"
          size="lg"
        >
          <Camera className="mr-2 h-4 w-4" />
          RECORD ATTENDANCE
        </Button>

        <Button
          onClick={() => { }}
          className="bg-amber-800 hover:bg-amber-700 text-white"
          size="lg"
        >
          <Download className="mr-2 h-4 w-4" />
          EXPORT ANALYTICS
        </Button>
      </div>

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
