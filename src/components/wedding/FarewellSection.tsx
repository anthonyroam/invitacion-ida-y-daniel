"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeInUp } from "@/components/ui/animations";
import { Heading } from "@/components/layout/Heading";
import { eventConfig } from "@/config/event-details";

export function FarewellSection() {
  const { farewell } = eventConfig;

  return (
    <Section size="default" className="relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-44">
      <Container className="relative z-10 w-full flex flex-col items-center justify-center">
        <FadeInUp>
          <div className="text-center">
            <Heading level={2} className="text-6xl md:text-7xl">
              {farewell.message}
            </Heading>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
