"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Github, Users } from "lucide-react";
import Link from "next/link";

const OpenSourceContribution = () => {
  const contributionAreas = [
    {
      title: "Code Contributions",
      description: "Help improve the codebase with bug fixes and new features",
      icon: <Code className="h-10 w-10" />,
    },
    {
      title: "Documentation",
      description: "Improve our docs to help others understand the project",
      icon: <Github className="h-10 w-10" />,
    },
    {
      title: "Community",
      description: "Join discussions and help shape the future of Participro",
      icon: <Users className="h-10 w-10" />,
    },
  ];

  return (
    <section className="bg-muted/30 py-16 px-5 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Text Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Open Source Project</h2>
            <p className="mb-8 text-lg text-muted-foreground">Participro is proudly open source. We welcome contributions from developers across Rwanda and around the world.</p>

            <div className="space-y-6">
              {contributionAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-full bg-primary/10 p-2 text-primary">{area.icon}</div>
                  <div>
                    <h3 className="font-bold">{area.title}</h3>
                    <p className="text-muted-foreground">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="https://github.com/participro/participro" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-primary px-8 py-6 text-lg font-semibold transition-transform hover:scale-105"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="w-full max-w-md overflow-hidden shadow-lg">
              <div className="bg-card p-6">
                <div className="flex items-center gap-4">
                  <Github className="h-10 w-10" />
                  <div>
                    <h3 className="text-xl font-bold">participro/participro</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered attendance tracking for Rwandan classrooms
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Stars", value: "124" },
                    { label: "Forks", value: "38" },
                    { label: "Contributors", value: "15" },
                  ].map((stat, index) => (
                    <div key={index}>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">TypeScript</span>
                    <span className="text-xs">68%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">JavaScript</span>
                    <span className="text-xs">22%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-yellow-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "22%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CSS</span>
                    <span className="text-xs">10%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t bg-muted/30 p-4">
                <Link href="https://github.com/participro/participro" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    Star this project
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceContribution

