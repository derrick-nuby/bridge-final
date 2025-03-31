"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, FileText, FileArchiveIcon as FileZip, Presentation } from "lucide-react";
import Link from "next/link";

interface DownloadItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  size?: string;
  version?: string;
}

const Downloads = () => {
  const downloads: DownloadItem[] = [
    {
      title: "Project Documentation",
      description: "Comprehensive guide to Participro's architecture and implementation",
      icon: <FileText className="h-10 w-10" />,
      url: "/downloads/participro-documentation.pdf",
      size: "2.4 MB",
      version: "v1.2",
    },
    {
      title: "Research Paper",
      description: "Academic paper on the AI models and methodologies used",
      icon: <FileText className="h-10 w-10" />,
      url: "/downloads/participro-research-paper.pdf",
      size: "1.8 MB",
      version: "2023",
    },
    {
      title: "Sample Dataset",
      description: "Anonymized sample data for testing and development",
      icon: <FileZip className="h-10 w-10" />,
      url: "/downloads/sample-dataset.zip",
      size: "4.5 MB",
      version: "v1.0",
    },
    {
      title: "Presentation Slides",
      description: "Slides explaining Participro for educational institutions",
      icon: <Presentation className="h-10 w-10" />,
      url: "/downloads/participro-presentation.pptx",
      size: "3.2 MB",
      version: "2023",
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
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Downloads & Resources</h2>
        <p className="mb-12 text-lg text-muted-foreground">Access documentation, sample data, and other resources for Participro</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {downloads.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="flex h-full flex-col shadow-md transition-all hover:shadow-lg">
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  {item.size && <span>Size: {item.size}</span>}
                  {item.version && <span>Version: {item.version}</span>}
                </div>
              </div>
              <div className="border-t p-4">
                <Link href={item.url}>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-12 max-w-2xl rounded-lg border bg-card p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="mb-2 text-center text-lg font-bold">Need Custom Resources?</h3>
        <p className="text-center text-muted-foreground">
          If you need additional resources or customized documentation for your institution in Rwanda, please contact
          our team at{" "}
          <a href="mailto:resources@participro.com" className="font-medium text-primary hover:underline">
            resources@participro.com
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default Downloads

