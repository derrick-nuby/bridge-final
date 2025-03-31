"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import Image from "next/image";

const CMUAfricaBridge = () => {
  return (
    <section className="py-16 bg-white px-5 md:px-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Image/Logo Column */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden p-8 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="mb-6 rounded-full bg-primary/10 p-6">
                <School className="h-24 w-24 text-primary" />
              </div>
              <Image src="/placeholder.svg" alt="CMU Africa Logo" className="h-auto max-w-full" height={200} width={200} />
              <p className="mt-6 text-center text-lg font-medium">Carnegie Mellon University Africa</p>
              <p className="text-center text-muted-foreground">Kigali, Rwanda</p>
            </div>
          </Card>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">CMU Africa – Bridge Program</h2>
          <p className="mb-6 text-lg text-muted-foreground">Participro was developed as part of the Carnegie Mellon University Africa Bridge Program, connecting technology innovation with Rwandan education needs.</p>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 flex items-center text-xl font-bold">
                <GraduationCap className="mr-2 h-5 w-5" />
                Program Overview
              </h3>
              <p className="text-muted-foreground">
                The Bridge Program connects talented students with real-world challenges in Rwanda, fostering innovation
                that addresses local needs while building technical expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 flex items-center text-xl font-bold">
                <GraduationCap className="mr-2 h-5 w-5" />
                Our Experience
              </h3>
              <p className="text-muted-foreground">
                Through the CMU Africa Bridge Program, our team gained invaluable mentorship, resources, and connections
                to develop Participro from concept to implementation in Rwandan schools.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                &quot;The CMU Africa Bridge Program provided the perfect environment to develop technology that makes a real
                difference in Rwandan education.&quot;
                <footer className="mt-2 text-right font-medium not-italic">— Jean Mugabo, Project Lead</footer>
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CMUAfricaBridge

