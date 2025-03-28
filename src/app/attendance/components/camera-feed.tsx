"use client";

import { Card, CardContent } from "@/components/ui/card";

export function CameraFeed() {
  return (
    <div className="flex-1 p-4 flex flex-col">
      <Card className="flex-1 relative overflow-hidden rounded-xl border border-amber-800/30 shadow-lg">
        <CardContent className="p-0 h-full relative">
          <div className="w-full h-full bg-gray-200 relative"></div>
        </CardContent>
      </Card>
    </div>
  );
}
