"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const OurTeam = () => {
  const title = "Meet Our Team";
  const description = "The talented individuals behind Participro, bringing innovation to Rwandan education";
  const members = [
    {
      name: "Brian",
      role: "Project Lead",
      bio: "Oversaw the project vision, coordination, and delivery, ensuring team alignment and high-quality outcomes.",
      image: "/placeholder.svg",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Derrick",
      role: "IoT & Full Stack Developer",
      bio: "Built the smart class system's frontend and backend, integrating Edge Impulse models into a browser-based UI with WebAssembly.",
      image: "/placeholder.svg",
      socialLinks: {
        twitter: "https://twitter.com/DerrickNuby",
        linkedin: "https://linkedin.com/in/derrick-nuby",
        github: "https://github.com/Derrick-Nuby",
      },
    },
    {
      name: "Favor",
      role: "Feasibility & Marketing Analyst",
      bio: "Led the feasibility study and communication strategy to ensure the system aligns with real-world classroom needs and user adoption.",
      image: "/placeholder.svg",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Mathew",
      role: "AI Specialist",
      bio: "Handled data preparation, training, and fine-tuning of facial and voice recognition models using Edge Impulse.",
      image: "/placeholder.svg",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Annick",
      role: "Business Analyst",
      bio: "Defined use cases and system requirements, aligning the technical solution with classroom operational goals and impact metrics.",
      image: "/placeholder.svg",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Alice",
      role: "Backend Developer",
      bio: "Developed core APIs and data processing logic to power real-time attendance, participation tracking, and reporting.",
      image: "/placeholder.svg",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
  ];


  return (
    <section className="bg-muted/30 py-16 px-5 md:px-20">
      <div className="container mx-auto">
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    {member.socialLinks.twitter && (
                      <Link
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {member.socialLinks.linkedin && (
                      <Link
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {member.socialLinks.github && (
                      <Link
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam

