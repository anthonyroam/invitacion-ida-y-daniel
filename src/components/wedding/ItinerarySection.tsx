"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { eventConfig } from "@/config/event-details";
import { motion } from "framer-motion";

export function ItinerarySection() {
  const { itinerary } = eventConfig;

  return (
    <Section size="default" className="pt-0">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-center">
            <Heading level={2}>
              {itinerary.title}
            </Heading>
          </div>
        </motion.div>

        <Spacer size="lg" />

        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          {itinerary.events.map((event, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === itinerary.events.length - 1;

            return (
              <div key={index} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm font-medium tracking-widest uppercase mb-1 text-muted-foreground">
                      {event.time}
                    </span>
                    <span className="text-2xl font-primary text-foreground">
                      {event.title}
                    </span>
                  </div>
                </motion.div>

                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                    className="w-[1px] h-16 my-4 origin-top bg-primary/50"
                  />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
