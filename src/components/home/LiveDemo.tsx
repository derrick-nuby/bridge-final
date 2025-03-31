"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const LiveDemo = () => {
  return (
    <section id="demo" className="container mx-auto py-16 px-5 md:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Try It Yourself</h2>
          <p className="mb-8 text-lg text-muted-foreground">Experience Participro&apos;s attendance tracking in action. Allow camera access to see how our technology identifies and tracks attendance in real-time.</p>
        </motion.div>

        <Card className="overflow-hidden bg-card p-1 shadow-lg">
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 p-0 text-primary-foreground transition-all hover:bg-primary hover:scale-110"
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
            <iframe
              className="h-full w-full"
              src="https://demo.participro.com"
              title="Participro Live Demo"
              allow="camera; microphone"
              loading="lazy"
            ></iframe>
          </div>
        </Card>

        <div className="mt-8">
          <Button size="lg" className="bg-primary px-8 py-6 text-lg font-semibold transition-transform hover:scale-105">
            Launch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo

