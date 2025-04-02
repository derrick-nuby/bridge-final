"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Cpu, Database, LineChart, Zap } from "lucide-react";

export default function RawFeaturesInference() {
  const steps = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Raw Data Capture",
      description: "Camera and microphone data is captured in real-time",
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Feature Extraction",
      description: "Key features are extracted from raw data streams",
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Model Inference",
      description: "WebAssembly models process features to identify students",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Results",
      description: "Attendance and participation data is instantly available",
    },
  ];

  // Sample data for visualization
  const sampleData = [
    { time: 0, value: 10 },
    { time: 1, value: 30 },
    { time: 2, value: 20 },
    { time: 3, value: 50 },
    { time: 4, value: 35 },
    { time: 5, value: 60 },
    { time: 6, value: 40 },
    { time: 7, value: 70 },
    { time: 8, value: 55 },
    { time: 9, value: 80 },
  ];

  return (
    <section className="container mx-auto py-16 px-5 md:px-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Raw Features & Inference</h2>
          <p className="mb-12 text-lg text-muted-foreground">Participro processes raw camera and audio data directly in the browser, extracting features and performing inference with our optimized models.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Process Steps */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
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
          </motion.div>

          {/* Data Visualization */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full w-full overflow-hidden p-6 shadow-md">
              <h3 className="mb-4 text-center text-lg font-bold">Feature Extraction Visualization</h3>
              <div className="relative h-64">
                {/* X and Y axis */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-muted-foreground/30"></div>
                <div className="absolute bottom-0 left-0 h-full w-0.5 bg-muted-foreground/30"></div>

                {/* Data points and line */}
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d={`M ${sampleData.map((d) => `${(d.time / 9) * 100} ${100 - (d.value / 80) * 100}`).join(" L ")}`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                  />
                  {sampleData.map((d, i) => (
                    <motion.circle
                      key={i}
                      cx={(d.time / 9) * 100}
                      cy={100 - (d.value / 80) * 100}
                      r="2"
                      fill="hsl(var(--primary))"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </svg>

                {/* Labels */}
                <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">Time</div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 transform text-xs text-muted-foreground">
                  Feature Value
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

