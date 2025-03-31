"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const DevelopmentJourney = () => {
  const title = "Our Development Journey";
  const description = "Follow our step-by-step process from concept to completion";
  const steps = [
    {
      week: "Week 1",
      title: "Research & Planning",
      description: "Researched existing solutions and defined project scope",
    },
    {
      week: "Week 2",
      title: "Data Collection",
      description: "Gathered training data from Rwandan classrooms",
    },
    {
      week: "Week 3",
      title: "Model Training",
      description: "Trained initial models on Edge Impulse platform",
    },
    {
      week: "Week 4",
      title: "Frontend Development",
      description: "Built Next.js UI and camera integration",
    },
    {
      week: "Week 5",
      title: "Backend Integration",
      description: "Developed Express.js API and database schema",
    },
    {
      week: "Week 6",
      title: "Testing & Optimization",
      description: "Conducted field tests in Rwandan schools and optimized performance",
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

      <div className="mx-auto max-w-5xl overflow-x-auto pb-4">
        <div className="flex min-w-max space-x-4 px-4 md:px-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="w-80 flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 shadow-md transition-all hover:shadow-lg">
                <div className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                  {step.week}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile indicator dots */}
      <div className="mt-6 flex justify-center space-x-2 md:hidden">
        {steps.map((_, index) => (
          <div key={index} className="h-2 w-2 rounded-full bg-primary/50"></div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentJourney;

