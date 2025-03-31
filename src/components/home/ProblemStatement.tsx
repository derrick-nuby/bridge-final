"use client";

import { motion } from "framer-motion";
import { LucideAlertCircle } from "lucide-react";

const ProblemStatement = () => {
  const title = "The Challenge";
  const description = "Traditional attendance tracking methods are inefficient, error-prone, and time-consuming.";
  const points = [
    "Manual attendance taking wastes valuable class time",
    "Paper-based systems are prone to errors and fraud",
    "Lack of real-time insights into student participation",
    "Difficult to track engagement in large classrooms",
  ];

  return (
    <section className="container mx-auto py-16 px-5 md:px-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Visual Column */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative h-64 w-64 rounded-full bg-primary/10 p-4 sm:h-80 sm:w-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <LucideAlertCircle className="h-32 w-32 text-primary sm:h-40 sm:w-40" />
            </div>
          </div>
        </motion.div>

        {/* Text Column */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mb-6 text-lg text-muted-foreground">{description}</p>
          <ul className="space-y-3">
            {points.map((point, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement

