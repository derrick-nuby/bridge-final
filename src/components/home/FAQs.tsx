"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQs = () => {
  const title = "Frequently Asked Questions";
  const description = "Common questions about Participro and its implementation in Rwandan schools";
  const faqs = [
    {
      question: "How does Participro protect student privacy?",
      answer:
        "Participro processes all camera and audio data directly in the browser. No images or voice recordings are uploaded to the cloud, ensuring maximum privacy and data security.",
    },
    {
      question: "What hardware requirements are needed to run Participro?",
      answer:
        "Participro works on most modern devices with a camera and microphone. For optimal performance, we recommend a device with at least 2GB of RAM and a recent browser version.",
    },
    {
      question: "Can Participro work offline or in areas with limited connectivity?",
      answer:
        "Yes, Participro has offline capabilities. The core attendance tracking features work without an internet connection, and data can be synchronized when connectivity is restored.",
    },
    {
      question: "How accurate is the attendance tracking?",
      answer:
        "Our system achieves over 94% accuracy in typical classroom environments. The accuracy can vary based on lighting conditions and camera quality.",
    },
    {
      question: "Is Participro available in Kinyarwanda?",
      answer:
        "Yes, Participro supports both English and Kinyarwanda interfaces to ensure accessibility for all Rwandan users.",
    },
    {
      question: "How can schools in Rwanda get access to Participro?",
      answer:
        "Schools can register their interest through our website. We offer free pilots for qualifying institutions and provide implementation support throughout the process.",
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

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Have more questions? Contact our support team at{" "}
            <a href="mailto:support@participro.com" className="font-medium text-primary hover:underline">
              support@participro.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs

