// src/components/global/Footer.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaUserCircle,
  FaRobot
} from "react-icons/fa";

export default function Footer() {
  const teamMembers = [
    "Brian",
    "Derrick",
    "Favor",
    "Mathew",
    "Annick",
    "Alice",
  ];

  return (
    <footer className="bg-muted/50 dark:bg-muted/10 py-12 md:py-16 px-5 md:px-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <FaRobot className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">Participro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Smart Class Attendance & Participation Tracking System using Trained Models on Edge Impulse.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, idx) => (
                <Button key={idx} variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label={Icon.name}>
                    <Icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Project Specific</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["attendance", "inference", "live", "model-info", "raw", "upload", "upload-raw"].map((route) => (
                <li key={route}>
                  <Link href={`/${route}`} className="hover:text-primary capitalize">
                    {route.replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Our Team</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {teamMembers.map((name, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FaUserCircle className="h-4 w-4 text-primary" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" type="email" className="max-w-[240px]" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Participro. Developed through CMU-Africa&apos;s Bridge Program.
          </p>
          <p className="mt-1">
            <Link href="https://github.com/derrick-nuby/participro-ui" className="hover:text-primary underline mr-2" target="_blank" rel="noopener noreferrer">
              Frontend Repo
            </Link>
            |
            <Link href="https://github.com/derrick-nuby/participro-server" className="hover:text-primary underline mx-2" target="_blank" rel="noopener noreferrer">
              Backend Repo
            </Link>
            |
            <Link href="https://participro-ui.vercel.app/" className="hover:text-primary underline mx-2" target="_blank" rel="noopener noreferrer">
              Live Frontend
            </Link>
            |
            <Link href="https://participro-server.onrender.com/" className="hover:text-primary underline ml-2" target="_blank" rel="noopener noreferrer">
              Live API
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}