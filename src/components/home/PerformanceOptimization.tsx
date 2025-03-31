"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Cpu, Gauge, Zap } from "lucide-react";


const PerformanceOptimization = () => {
  const title = "Performance Optimization";
  const description = "We've optimized Participro for speed and efficiency, even on devices with limited resources common in Rwanda";
  const metrics = [
    {
      label: "Inference Speed",
      value: "120ms",
      icon: <Zap className="h-6 w-6" />,
      improvement: "3x faster than previous version",
    },
    {
      label: "Memory Usage",
      value: "45MB",
      icon: <Cpu className="h-6 w-6" />,
      improvement: "60% reduction in memory footprint",
    },
    {
      label: "Battery Impact",
      value: "Low",
      icon: <Gauge className="h-6 w-6" />,
      improvement: "Optimized for mobile devices",
    },
  ];

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

      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex h-full flex-col items-center p-6 text-center shadow-md transition-all hover:shadow-lg">
                <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">{metric.icon}</div>
                <h3 className="mb-1 text-xl font-bold">{metric.label}</h3>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{metric.improvement}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceOptimization

