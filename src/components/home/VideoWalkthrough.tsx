"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const VideoWalkthrough = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const playVideo = () => {
    setVideoPlaying(true);
  };

  return (
    <section className="bg-muted/30 py-16 px-5 md:px-20">
      <div className="container mx-auto">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Video Walkthrough</h2>
          <p className="mb-8 text-lg text-muted-foreground">Watch a quick demonstration of Participro in action in a Rwandan classroom</p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden shadow-lg">
            <div className="relative aspect-video w-full">
              {!videoPlaying ? (
                <>
                  <Image
                    src="/placeholder.svg"
                    alt="Video thumbnail"
                    className="h-full w-full object-cover"
                    width={1280}
                    height={720}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button
                      onClick={playVideo}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 p-0 text-primary-foreground transition-all hover:bg-primary hover:scale-110"
                    >
                      <Play className="h-10 w-10" />
                    </Button>
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Participro Video Walkthrough"
                  className="h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="p-4">
              <p className="text-center text-sm text-muted-foreground">
                A 2-minute walkthrough of Participro&apos;s key features and benefits for Rwandan educators
              </p>
            </div>
          </Card>

          <div className="mt-8 flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 8a6 6 0 0 1-9 5.197M17 5.197A6 6 0 0 1 22 8v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a6 6 0 0 1 9-5.197M11.5 2H12.5V12H11.5V2Z" />
              </svg>
              Download Video
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
              Download Transcript
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoWalkthrough

