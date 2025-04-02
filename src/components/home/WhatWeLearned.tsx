"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const WhatWeLearned = () => {
  const title = "What We Learned";
  const description = "Our journey building Participro taught us valuable lessons about technology, education, and innovation in Rwanda";
  const learnings = [
    {
      quote: "Building for low-resource environments requires rethinking traditional approaches to AI deployment.",
      author: "Jean Mugabo",
      role: "Project Lead",
    },
    {
      quote: "The most elegant solution isn't always the most complex one - sometimes simplicity is key to adoption.",
      author: "Marie Uwase",
      role: "ML Engineer",
    },
    {
      quote: "Understanding the specific needs of Rwandan classrooms was crucial to building a relevant solution.",
      author: "Eric Ndayishimiye",
      role: "Frontend Developer",
    },
    {
      quote: "Privacy and security must be built-in from the start, not added as an afterthought.",
      author: "Diane Mukasine",
      role: "Backend Developer",
    },
  ];

  return (
    <section className="container mx-auto py-16 bg-gray-50 px-5 md:px-20">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {learnings.map((learning, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
              </div>
              <blockquote className="mb-4 text-center text-lg font-medium italic">&quot;{learning.quote}&quot;</blockquote>
              <div className="text-center">
                <p className="font-bold">{learning.author}</p>
                <p className="text-sm text-muted-foreground">{learning.role}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeLearned

