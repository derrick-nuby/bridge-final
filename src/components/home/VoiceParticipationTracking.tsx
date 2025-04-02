"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Mic, Radio, Volume2, AudioWaveformIcon as Waveform } from "lucide-react";

const VoiceParticipationTracking = () => {
  return (
    <section className="bg-muted/30 py-16 px-5 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Animated Visualization */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 w-64 rounded-full bg-primary/10 p-4 sm:h-80 sm:w-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <Mic className="h-20 w-20 text-primary" />
              </div>

              {/* Animated sound waves */}
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.5, 0.8],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Voice & Participation Tracking</h2>
            <p className="mb-8 text-lg text-muted-foreground">Our advanced voice recognition technology tracks student participation in real-time, providing valuable insights for educators in Rwanda.</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Voice Recognition",
                  description: "Identifies individual students by their unique voice patterns",
                  icon: <Mic className="h-10 w-10" />,
                },
                {
                  title: "Participation Metrics",
                  description: "Measures frequency and quality of classroom contributions",
                  icon: <Waveform className="h-10 w-10" />,
                },
                {
                  title: "Real-time Analysis",
                  description: "Processes audio directly in the browser for instant feedback",
                  icon: <Radio className="h-10 w-10" />,
                },
                {
                  title: "Privacy-focused",
                  description: "All processing happens locally with no audio recordings stored",
                  icon: <Volume2 className="h-10 w-10" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">{feature.icon}</div>
                  <h3 className="mb-1 text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VoiceParticipationTracking

