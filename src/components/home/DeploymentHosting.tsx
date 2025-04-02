"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Database, Globe, Server } from "lucide-react";

export default function DeploymentHosting() {
  const deploymentServices = [
    {
      name: "Frontend",
      description: "Hosted on Vercel for optimal Next.js performance",
      icon: <Globe className="h-10 w-10" />,
    },
    {
      name: "Backend API",
      description: "Deployed on Render for reliable Express.js hosting",
      icon: <Server className="h-10 w-10" />,
    },
    {
      name: "Database",
      description: "MongoDB Atlas for secure and scalable data storage",
      icon: <Database className="h-10 w-10" />,
    },
  ];

  return (
    <section className="py-16 bg-white px-5 md:px-20">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Deployment & Hosting</h2>
        <p className="mb-12 text-lg text-muted-foreground">Our infrastructure is designed for reliability, scalability, and performance to serve Rwandan educational institutions.</p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {deploymentServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex h-full flex-col items-center p-6 text-center shadow-md transition-all hover:shadow-lg">
                <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">{service.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{service.name}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

