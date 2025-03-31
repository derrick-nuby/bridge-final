"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";


const TimelineMilestones = () => {
  const title = "Project Timeline";
  const description = "Key milestones in the development of Participro";
  const milestones = [
    {
      date: "January 2023",
      title: "Project Inception",
      description: "Initial research and problem definition",
      completed: true,
    },
    {
      date: "March 2023",
      title: "Data Collection",
      description: "Gathered training data from Rwandan schools",
      completed: true,
    },
    {
      date: "May 2023",
      title: "Model Training",
      description: "Trained initial AI models on Edge Impulse",
      completed: true,
    },
    {
      date: "July 2023",
      title: "Prototype Development",
      description: "Built first working prototype with basic functionality",
      completed: true,
    },
    {
      date: "September 2023",
      title: "Beta Testing",
      description: "Deployed beta version in select Rwandan schools",
      completed: true,
    },
    {
      date: "November 2023",
      title: "Public Launch",
      description: "Official release of Participro v1.0",
      completed: true,
    },
    {
      date: "January 2024",
      title: "Feature Expansion",
      description: "Added voice recognition and participation tracking",
      completed: true,
    },
    {
      date: "April 2024",
      title: "National Rollout",
      description: "Expanded to 50+ schools across Rwanda",
      completed: false,
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mb-12 text-lg text-muted-foreground">{description}</p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-9 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-ml-0.5"></div>

          {/* Timeline items */}
          {milestones.map((milestone, index) => (
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
                  <Card className={`p-4 shadow-md ${!milestone.completed ? "border-dashed" : ""}`}>
                    <div className="flex items-start gap-4 md:gap-2">
                      <div
                        className={`rounded-full bg-primary/10 p-2 text-primary md:hidden ${index % 2 === 0 ? "order-first" : "order-first"
                          }`}
                      >
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className={index % 2 === 0 ? "md:text-right" : ""}>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">{milestone.date}</span>
                          {milestone.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                        <h3 className="font-bold">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Timeline dot */}
              <motion.div
                className={`absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground md:left-1/2 md:-ml-4 ${milestone.completed ? "bg-primary" : "border-2 border-primary bg-background"
                  }`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Calendar className="h-4 w-4" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineMilestones

