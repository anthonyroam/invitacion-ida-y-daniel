"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { eventConfig } from "@/config/event-details";

export function ItinerarySection() {
  const { itinerary } = eventConfig;

  return (
    <Section size="default" className="pt-0">
      <Container>
        <div className="text-center">
          <Heading level={2}>
            {itinerary.title}
          </Heading>
        </div>

        <Spacer size="lg" />

        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          {itinerary.events.map((event, index) => {
            const isLast = index === itinerary.events.length - 1;

            return (
              <div key={index} className="flex flex-col items-center w-full">
                <div className="w-full">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm font-medium tracking-widest uppercase mb-1 text-muted-foreground font-sans">
                      {event.time}
                    </span>
                    <span className="text-3xl font-primary text-foreground">
                      {event.title}
                    </span>
                  </div>
                </div>

                {!isLast && (
                  <div className="w-[1px] h-16 my-4 bg-primary/40" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
