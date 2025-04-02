"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Participro has transformed how we track attendance in our school. It saves us valuable teaching time and provides accurate data.",
      author: "Emmanuel Nkusi",
      role: "Principal, Kigali Secondary School",
      image: "/placeholder.svg",
    },
    {
      quote:
        "The voice recognition feature helps me identify which students are actively participating in discussions. It's been a game-changer.",
      author: "Claudine Mukamana",
      role: "Teacher, FAWE Girls' School",
      image: "/placeholder.svg",
    },
    {
      quote:
        "As a student, I appreciate that the system is transparent and fair. Everyone's participation is tracked accurately.",
      author: "Patrick Habimana",
      role: "Student, University of Rwanda",
      image: "/placeholder.svg",
    },
    {
      quote: "The privacy-focused approach gives us confidence that student data is being handled responsibly.",
      author: "Jacqueline Uwimana",
      role: "Education Technology Coordinator",
      image: "/placeholder.svg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What People Are Saying</h2>
        <p className="mb-12 text-lg text-muted-foreground">Feedback from educators and students using Participro in Rwanda</p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="flex h-full flex-col items-center p-8 text-center shadow-md md:p-10">
                    <div className="mb-6 rounded-full bg-primary/10 p-3">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                    <blockquote className="mb-6 text-lg font-medium italic md:text-xl">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div className="mt-auto flex flex-col items-center">
                      {testimonial.image && (
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.author}
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                          />
                        </div>
                      )}
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Previous testimonial"
          >
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
              className="h-6 w-6"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Next testimonial"
          >
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
              className="h-6 w-6"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots navigation */}
        <div className="mt-6 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-8 rounded-full transition-colors ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials

