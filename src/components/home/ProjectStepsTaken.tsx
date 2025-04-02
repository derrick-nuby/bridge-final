"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

const ProjectStepsTaken = () => {
  const steps: Step[] = [
    {
      title: "Problem Identification",
      description: "Identified inefficiencies in traditional attendance tracking in Rwandan schools",
      completed: true,
    },
    {
      title: "Research & Analysis",
      description: "Conducted extensive research on existing solutions and technologies",
      completed: true,
    },
    {
      title: "Technology Selection",
      description: "Chose Next.js, Edge Impulse, and WebAssembly as our core technologies",
      completed: true,
    },
    {
      title: "Data Collection",
      description: "Gathered diverse training data from Rwandan classrooms",
      completed: true,
    },
    {
      title: "Model Training",
      description: "Trained and optimized AI models for attendance and participation tracking",
      completed: true,
    },
    {
      title: "Frontend Development",
      description: "Built responsive UI with Next.js and Tailwind CSS",
      completed: true,
    },
    {
      title: "Backend Development",
      description: "Created Express.js API for data processing and storage",
      completed: true,
    },
    {
      title: "Integration & Testing",
      description: "Combined all components and conducted extensive testing",
      completed: true,
    },
    {
      title: "Deployment",
      description: "Deployed solution to production environment",
      completed: true,
    },
    {
      title: "Documentation",
      description: "Created comprehensive documentation for users and contributors",
      completed: true,
    },
  ];

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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Project Steps Taken</h2>
          <p className="mb-12 text-lg text-muted-foreground">A detailed breakdown of our development process from planning to deployment</p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-9 top-0 h-full w-0.5 bg-primary/20"></div>

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative mb-8 flex items-start gap-6 pl-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Checkbox */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-1 text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectStepsTaken

