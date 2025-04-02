"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const CreditsResources = () => {
  const libraries = [
    {
      name: "Next.js",
      url: "https://nextjs.org",
      description: "React framework for production",
    },
    {
      name: "Edge Impulse",
      url: "https://edgeimpulse.com",
      description: "Machine learning for embedded devices",
    },
    {
      name: "TensorFlow.js",
      url: "https://tensorflow.org/js",
      description: "Machine learning for JavaScript",
    },
    {
      name: "WebAssembly",
      url: "https://webassembly.org",
      description: "Binary instruction format for a stack-based virtual machine",
    },
  ];

  const apis = [
    {
      name: "Web Audio API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
      description: "High-level JavaScript API for processing and synthesizing audio",
    },
    {
      name: "MediaDevices API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices",
      description: "Provides access to connected media input devices",
    },
  ];

  const acknowledgements = [
    "CMU Africa faculty and mentors for their guidance and support",
    "Participating schools in Rwanda for providing testing environments",
    "Ministry of Education, Rwanda for their collaboration",
    "Open source community for their invaluable contributions",
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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Credits & Resources</h2>
          <p className="mb-12 text-lg text-muted-foreground">Acknowledging the tools, libraries, and people that made Participro possible</p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Libraries */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold">Libraries & Frameworks</h3>
                <div className="space-y-4">
                  {libraries.map((lib, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <Link
                          href={lib.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center font-medium text-primary hover:underline"
                        >
                          {lib.name}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                        <p className="text-sm text-muted-foreground">{lib.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* APIs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold">APIs & Services</h3>
                <div className="space-y-4">
                  {apis.map((api, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <Link
                          href={api.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center font-medium text-primary hover:underline"
                        >
                          {api.name}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                        <p className="text-sm text-muted-foreground">{api.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Acknowledgements */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Acknowledgements</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {acknowledgements.map((ack, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                    <p className="text-muted-foreground">{ack}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreditsResources

