"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Brain, Database, LineChart } from "lucide-react";

const AIModelTraining = () => {
  const trainingSteps = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Collection",
      description: "Gathered diverse image and audio samples from Rwandan classrooms",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Model Training",
      description: "Trained on Edge Impulse using optimized neural network architectures",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Validation",
      description: "Tested against diverse datasets to ensure high accuracy",
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Optimization",
      description: "Optimized for WebAssembly to ensure fast in-browser performance",
    },
  ];

  const metrics = [
    { label: "Accuracy", value: "94%" },
    { label: "Inference Time", value: "120ms" },
    { label: "Model Size", value: "4.2MB" },
    { label: "Data Points", value: "10,000+" },
  ];

  return (
    <section className="bg-muted/30 py-16 px-5 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Text Column */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">AI Model Training</h2>
            <p className="mb-8 text-lg text-muted-foreground">Our models are trained using Edge Impulse with data collected from Rwandan classrooms to ensure accuracy and relevance.</p>

            <div className="space-y-4">
              {trainingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-full bg-primary/10 p-2 text-primary">{step.icon}</div>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Metrics Column */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="flex h-40 flex-col items-center justify-center p-6 text-center shadow-md transition-all hover:shadow-lg">
                    <h3 className="text-lg font-medium text-muted-foreground">{metric.label}</h3>
                    <p className="mt-2 text-4xl font-bold text-primary">{metric.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIModelTraining

