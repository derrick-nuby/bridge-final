"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

const OurSolution = () => {
  return (
    <section className="bg-muted/30 py-16 px-5 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Image Column */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/placeholder.svg"
                alt="Participro Solution"
                className="h-full w-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Solution</h2>
            <p className="mb-6 text-lg text-muted-foreground">Participro leverages cutting-edge AI technology to automate attendance and participation tracking directly in your browser.</p>
            <ul className="space-y-3">
              {[
                "Real-time image recognition for attendance",
                "Voice recognition for participation tracking",
                "Browser-based AI processing for enhanced privacy",
                "No cloud uploads - all data stays on your device",
                "Seamless integration with existing systems",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurSolution

