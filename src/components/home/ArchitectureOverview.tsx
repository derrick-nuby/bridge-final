"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Camera, Database, Layers, Mic, Server, Smartphone } from "lucide-react";

const ArchitectureOverview = () => {
  const architectureComponents = [
    {
      id: "frontend",
      name: "Frontend",
      icon: <Smartphone className="h-8 w-8" />,
      description: "Next.js 15 & TypeScript UI",
      position: { x: "10%", y: "30%" },
    },
    {
      id: "camera",
      name: "Camera Input",
      icon: <Camera className="h-8 w-8" />,
      description: "Image capture for attendance",
      position: { x: "10%", y: "70%" },
    },
    {
      id: "voice",
      name: "Voice Input",
      icon: <Mic className="h-8 w-8" />,
      description: "Audio capture for participation",
      position: { x: "30%", y: "70%" },
    },
    {
      id: "wasm",
      name: "WebAssembly",
      icon: <Layers className="h-8 w-8" />,
      description: "Edge Impulse model runtime",
      position: { x: "30%", y: "30%" },
    },
    {
      id: "ai",
      name: "AI Processing",
      icon: <Brain className="h-8 w-8" />,
      description: "In-browser inference",
      position: { x: "50%", y: "50%" },
    },
    {
      id: "backend",
      name: "Backend",
      icon: <Server className="h-8 w-8" />,
      description: "Node.js Express API",
      position: { x: "70%", y: "30%" },
    },
    {
      id: "database",
      name: "Database",
      icon: <Database className="h-8 w-8" />,
      description: "Secure data storage",
      position: { x: "70%", y: "70%" },
    },
  ];

  // Define connections between components
  const connections = [
    { from: "frontend", to: "camera" },
    { from: "frontend", to: "voice" },
    { from: "camera", to: "wasm" },
    { from: "voice", to: "wasm" },
    { from: "wasm", to: "ai" },
    { from: "ai", to: "backend" },
    { from: "backend", to: "database" },
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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">System Architecture</h2>
          <p className="mb-12 text-lg text-muted-foreground">Participro uses a modern architecture that processes data directly in the browser for enhanced privacy and performance.</p>
        </motion.div>

        <div className="relative mx-auto h-[600px] w-full max-w-3xl rounded-lg border bg-card p-4 shadow-md">
          {/* Architecture diagram */}
          {architectureComponents.map((component) => (
            <motion.div
              key={component.id}
              className="absolute"
              style={{
                left: component.position.x,
                top: component.position.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="flex h-24 w-40 flex-col items-center justify-center p-2 text-center shadow-md transition-all hover:shadow-lg">
                <div className="mb-1 text-primary">{component.icon}</div>
                <h3 className="text-sm font-bold">{component.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{component.description}</p>
              </Card>
            </motion.div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
            {connections.map((connection, index) => {
              const fromComponent = architectureComponents.find((c) => c.id === connection.from);
              const toComponent = architectureComponents.find((c) => c.id === connection.to);

              if (!fromComponent || !toComponent) return null;

              // Convert percentage strings to numbers
              const fromX = Number.parseFloat(fromComponent.position.x) / 100;
              const fromY = Number.parseFloat(fromComponent.position.y) / 100;
              const toX = Number.parseFloat(toComponent.position.x) / 100;
              const toY = Number.parseFloat(toComponent.position.y) / 100;

              return (
                <motion.line
                  key={index}
                  x1={`${fromX * 100}%`}
                  y1={`${fromY * 100}%`}
                  x2={`${toX * 100}%`}
                  y2={`${toY * 100}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="text-muted-foreground"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureOverview

