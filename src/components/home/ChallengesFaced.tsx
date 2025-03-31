"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  solution: string;
}

const ChallengesFaced = () => {
  const title = "Challenges We Overcame";
  const description = "Building Participro presented unique technical challenges that our team successfully navigated";
  const challenges: Challenge[] = [
    {
      title: "Model Integration",
      description: "Integrating Edge Impulse models with WebAssembly in the browser was complex",
      solution: "Created a custom wrapper to handle model loading and inference in the browser environment",
    },
    {
      title: "Raw Feature Processing",
      description: "Processing raw camera and audio data efficiently in real-time",
      solution: "Implemented optimized algorithms for feature extraction with minimal latency",
    },
    {
      title: "Cross-Browser Compatibility",
      description: "Ensuring consistent performance across different browsers and devices",
      solution: "Developed feature detection and fallback mechanisms for older browsers",
    },
    {
      title: "Data Privacy",
      description: "Maintaining user privacy while collecting necessary training data",
      solution: "Implemented in-browser processing with no cloud uploads of sensitive information",
    },
    {
      title: "Performance Optimization",
      description: "Achieving real-time performance on lower-end devices common in Rwanda",
      solution: "Optimized code and models specifically for resource-constrained environments",
    },
    {
      title: "Connectivity Issues",
      description: "Handling intermittent internet connectivity in rural areas",
      solution: "Built offline-first functionality with local storage and synchronization",
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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mb-12 text-lg text-muted-foreground">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden shadow-md transition-all hover:shadow-lg">
                <div className="border-b border-border bg-muted/50 p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-bold">{challenge.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <p className="text-sm">
                      <span className="font-medium">Solution:</span> {challenge.solution}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesFaced

