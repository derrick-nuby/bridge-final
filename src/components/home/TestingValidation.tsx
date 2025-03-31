"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, CheckCircle, LineChart, PieChart } from "lucide-react";

const TestingValidation = () => {
  const metrics = [
    { label: "Accuracy", value: "94.2%" },
    { label: "Precision", value: "92.8%" },
    { label: "Recall", value: "95.1%" },
    { label: "F1 Score", value: "93.9%" },
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Testing & Validation</h2>
        <p className="mb-12 text-lg text-muted-foreground">We rigorously tested Participro with real data from Rwandan classrooms to ensure accuracy and reliability</p>
      </motion.div>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Metrics Cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="flex h-40 flex-col items-center justify-center p-6 text-center shadow-md transition-all hover:shadow-lg">
                  <h3 className="text-lg font-medium text-muted-foreground">{metric.label}</h3>
                  <p className="mt-2 text-4xl font-bold text-primary">{metric.value}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Confusion Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-6 shadow-md">
              <h3 className="mb-4 text-center text-lg font-bold">Confusion Matrix</h3>
              <div className="relative mx-auto h-64 w-64">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
                  <motion.div
                    className="flex items-center justify-center bg-green-100 p-2 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <p className="text-2xl font-bold text-green-700">86%</p>
                      <p className="text-xs text-muted-foreground">True Positive</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center bg-red-100 p-2 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <p className="text-2xl font-bold text-red-700">6%</p>
                      <p className="text-xs text-muted-foreground">False Positive</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center bg-red-100 p-2 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <p className="text-2xl font-bold text-red-700">4%</p>
                      <p className="text-xs text-muted-foreground">False Negative</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center bg-green-100 p-2 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <p className="text-2xl font-bold text-green-700">84%</p>
                      <p className="text-xs text-muted-foreground">True Negative</p>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 transform text-xs font-medium text-muted-foreground">
                  Actual Class
                </div>
                <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 transform text-xs font-medium text-muted-foreground">
                  Predicted Class
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Testing Methods */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 shadow-md">
            <h3 className="mb-6 text-center text-xl font-bold">Testing Methodology</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  icon: <BarChart className="h-10 w-10" />,
                  title: "Cross-Validation",
                  description: "Used 5-fold cross-validation to ensure model robustness",
                },
                {
                  icon: <LineChart className="h-10 w-10" />,
                  title: "Real-World Testing",
                  description: "Tested with 500+ students across 10 Rwandan schools",
                },
                {
                  icon: <PieChart className="h-10 w-10" />,
                  title: "A/B Testing",
                  description: "Compared against traditional methods for accuracy benchmarking",
                },
              ].map((method, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">{method.icon}</div>
                  <h4 className="mb-2 text-lg font-bold">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">All tests passed quality thresholds</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestingValidation

