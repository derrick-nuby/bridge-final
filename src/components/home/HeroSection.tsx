import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-gray-50 py-24 px-5 md:px-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg"
          alt="Participro Hero Background"
          className="h-full w-full object-cover"
          height={1080}
          width={1920}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Participro
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-white/90 sm:text-2xl">
          Revolutionizing attendance and participation tracking in Rwanda
        </p>
        <Link href="#demo">
          <Button size="lg" className="bg-primary px-8 py-6 text-lg font-semibold transition-transform hover:scale-105">
            View Demo
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

