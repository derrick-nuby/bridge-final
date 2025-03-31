"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, FileText, FlaskConical, Lightbulb, Search } from "lucide-react";

export default function ResearchProcess() {
  const researchSteps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Literature Review",
      description: "Analyzed existing attendance systems and identified limitations",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Hypothesis Formation",
      description: "Developed theories on how AI could improve attendance tracking",
    },
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: "Experimentation",
      description: "Tested various models and approaches with Rwandan classroom data",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Data Analysis",
      description: "Evaluated results and refined our approach based on findings",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Documentation",
      description: "Compiled findings and methodologies for academic publication",
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Research Process</h2>
        <p className="mb-12 text-lg text-muted-foreground">We followed a rigorous research methodology to develop Participro, ensuring it meets the needs of Rwandan educational institutions.</p>
      </motion.div>

      <div className="relative mx-auto max-w-4xl">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-ml-0.5"></div>

        {/* Research steps */}
        {researchSteps.map((step, index) => (
          <div key={index} className="relative mb-8 md:mb-0 md:h-40">
            <motion.div
              className={`flex md:absolute md:w-1/2 ${index % 2 === 0 ? "md:left-0 md:pr-8 md:text-right" : "md:left-1/2 md:pl-8"
                }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="ml-12 md:ml-0">
                <Card className="p-4 shadow-md">
                  <div className="flex items-start gap-4 md:gap-2">
                    <div
                      className={`rounded-full bg-primary/10 p-2 text-primary md:hidden ${index % 2 === 0 ? "order-first" : "order-first"
                        }`}
                    >
                      {step.icon}
                    </div>
                    <div className={index % 2 === 0 ? "md:text-right" : ""}>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground md:left-1/2 md:-ml-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              {step.icon}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

