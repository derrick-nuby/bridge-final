"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";


const BrowserCompatibility = () => {
  const title = "Browser Compatibility";
  const description = "Participro works across modern browsers, with special optimizations for devices commonly used in Rwanda";
  const browsers = [
    {
      name: "Chrome",
      icon: "/placeholder.svg",
      supported: true,
      notes: "Fully supported, recommended browser",
    },
    {
      name: "Firefox",
      icon: "/placeholder.svg",
      supported: true,
      notes: "Fully supported",
    },
    {
      name: "Edge",
      icon: "/placeholder.svg",
      supported: true,
      notes: "Fully supported",
    },
    {
      name: "Safari",
      icon: "/placeholder.svg",
      supported: true,
      notes: "Supported on iOS 14+ and macOS 11+",
    },
    {
      name: "Opera",
      icon: "/placeholder.svg",
      supported: true,
      notes: "Fully supported",
    },
    {
      name: "Internet Explorer",
      icon: "/placeholder.svg",
      supported: false,
      notes: "Not supported, please use a modern browser",
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {browsers.map((browser, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`flex h-full flex-col items-center p-6 text-center shadow-md transition-all hover:shadow-lg ${!browser.supported ? "border-red-200 bg-red-50/50" : ""
                  }`}
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center">
                  <Image
                    src={browser.icon || "/placeholder.svg"}
                    alt={browser.name}
                    className="h-16 w-16 object-contain"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{browser.name}</h3>
                <div
                  className={`mb-2 flex items-center justify-center rounded-full p-1 ${browser.supported ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                >
                  {browser.supported ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  <span className="ml-1 text-xs font-medium">{browser.supported ? "Supported" : "Not Supported"}</span>
                </div>
                <p className="text-sm text-muted-foreground">{browser.notes}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Compatibility */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 shadow-md">
            <h3 className="mb-6 text-center text-xl font-bold">Mobile Device Compatibility</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  platform: "Android",
                  version: "Android 7.0+",
                  notes: "Works best on Chrome for Android",
                  supported: true,
                },
                {
                  platform: "iOS",
                  version: "iOS 14.0+",
                  notes: "Works on Safari and Chrome for iOS",
                  supported: true,
                },
                {
                  platform: "Low-end Android",
                  version: "1GB RAM devices",
                  notes: "Limited functionality, basic mode available",
                  supported: true,
                },
                {
                  platform: "Feature phones",
                  version: "KaiOS, etc.",
                  notes: "Not currently supported",
                  supported: false,
                },
              ].map((device, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${!device.supported ? "border-red-200 bg-red-50/50" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold">{device.platform}</h4>
                      <p className="text-sm text-muted-foreground">{device.version}</p>
                    </div>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${device.supported ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                      {device.supported ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{device.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BrowserCompatibility;

