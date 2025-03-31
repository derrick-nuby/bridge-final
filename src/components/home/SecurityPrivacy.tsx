"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, Lock, Shield, ShieldCheck } from "lucide-react";

const SecurityPrivacy = () => {
  const securityFeatures = [
    {
      icon: <Lock className="h-10 w-10" />,
      title: "In-Browser Processing",
      description: "All camera and audio data is processed directly in your browser - nothing is uploaded to the cloud",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Data Minimization",
      description: "We only collect the minimum data necessary for attendance tracking",
    },
    {
      icon: <Eye className="h-10 w-10" />,
      title: "Transparency",
      description: "Clear indicators when camera or microphone is in use",
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Secure Storage",
      description: "All saved data is encrypted and stored securely",
    },
  ];

  return (
    <section className="py-16 bg-white px-5 md:px-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Text Content */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Security & Privacy</h2>
          <p className="mb-8 text-lg text-muted-foreground">Participro prioritizes user privacy and data security, especially important for educational institutions in Rwanda</p>

          <div className="space-y-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary/10 p-2 text-primary">{feature.icon}</div>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden p-8 shadow-lg">
            <div className="relative mx-auto h-64 w-64 rounded-full bg-primary/10 p-4 sm:h-80 sm:w-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-32 w-32 text-primary sm:h-40 sm:w-40" />
              </div>

              {/* Animated security rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.7,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold">Your Data Stays With You</h3>
              <p className="mt-2 text-muted-foreground">
                Participro processes all data locally in your browser, ensuring maximum privacy and security
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityPrivacy

