"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Github, Mail, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

const ContactGitHub = () => {
  return (
    <section className="py-16 bg-white px-5 md:px-20">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Contact & GitHub</h2>
        <p className="mb-12 text-lg text-muted-foreground">Get in touch with our team or contribute to the project on GitHub</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 shadow-md">
            <div className="mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Send us a message</h3>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="Message subject" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* GitHub and Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            {/* GitHub Card */}
            <Card className="p-6 shadow-md">
              <div className="mb-6 flex items-center gap-2">
                <Github className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">GitHub Repository</h3>
              </div>
              <p className="mb-6 text-muted-foreground">
                Participro is an open source project. We welcome contributions from developers interested in improving
                education technology in Rwanda.
              </p>
              <Link href="https://github.com/participro/participro" target="_blank" rel="noopener noreferrer">
                <Button className="w-full" variant="outline">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Button>
              </Link>
            </Card>

            {/* Email Contact Card */}
            <Card className="p-6 shadow-md">
              <div className="mb-6 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Email Us Directly</h3>
              </div>
              <p className="mb-6 text-muted-foreground">
                Prefer to email us directly? Reach out to our team at the address below for any questions or partnership
                inquiries.
              </p>
              <Link href={`mailto:contact@participro.com`}>
                <Button className="w-full">
                  <Mail className="mr-2 h-5 w-5" />
                  contact@participro.com
                </Button>
              </Link>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactGitHub;

