"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import Image from "next/image";

const screenshots = [
  {
    src: "/placeholder.svg",
    alt: "Screenshot 1",
    caption: "Caption for Screenshot 1",
  },
  {
    src: "/placeholder.svg",
    alt: "Screenshot 2",
    caption: "Caption for Screenshot 2",
  },
  {
    src: "/placeholder.svg",
    alt: "Screenshot 3",
    caption: "Caption for Screenshot 3",
  },
];

const title = "Screenshots Gallery";
const description = "Explore the screenshots of our application.";


const ScreenshotsUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1));
  };

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className="py-16 bg-gray-50 px-5 md:px-20">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mb-12 text-lg text-muted-foreground">{description}</p>
      </motion.div>

      <div className="relative mx-auto max-w-4xl">
        <Card className="overflow-hidden shadow-lg">
          {/* Main carousel */}
          <div className="relative aspect-video w-full overflow-hidden">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={screenshot.src || "/placeholder.svg"}
                  alt={screenshot.alt}
                  className="h-full w-full object-cover"
                  width={1920}
                  height={1080}
                />
                <button
                  onClick={openLightbox}
                  className="absolute right-4 top-4 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Caption */}
          <div className="bg-card p-4 text-center">
            <p className="text-lg font-medium">{screenshots[currentIndex].caption}</p>
          </div>
        </Card>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Thumbnail navigation */}
        <div className="mt-4 flex justify-center space-x-2">
          {screenshots.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-8 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closeLightbox}>
          <div className="relative max-h-screen max-w-screen-xl p-4">
            <Image
              src={screenshots[currentIndex].src || "/placeholder.svg"}
              alt={screenshots[currentIndex].alt}
              className="max-h-[90vh] max-w-full object-contain"
              width={1920}
              height={1080}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScreenshotsUI

