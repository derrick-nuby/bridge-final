"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const TechnologiesUsed = () => {
  const title = "Technologies Used";
  const description = "Participro leverages cutting-edge technologies to deliver a seamless experience";
  const technologies = [
    {
      name: "Next.js",
      description: "React framework for production",
      icon: "/placeholder.svg",
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript for better code",
      icon: "/placeholder.svg",
    },
    {
      name: "Edge Impulse",
      description: "ML model training and deployment",
      icon: "/placeholder.svg",
    },
    {
      name: "WebAssembly",
      description: "Near-native performance in browser",
      icon: "/placeholder.svg",
    },
    {
      name: "Express.js",
      description: "Fast, unopinionated web framework",
      icon: "/placeholder.svg",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      icon: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 px-5 md:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mb-12 text-lg text-muted-foreground">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex h-full flex-col items-center justify-center p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-lg">
                <div className="mb-4 flex h-20 w-20 items-center justify-center">
                  <Image
                    src={tech.icon || "/placeholder.svg"}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesUsed;

