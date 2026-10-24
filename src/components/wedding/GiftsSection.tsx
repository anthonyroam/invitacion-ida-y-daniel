"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { FadeInUp } from "@/components/ui/animations";
import { AnimatedGift } from "@/components/ui/AnimatedIcons";
import { eventConfig } from "@/config/event-details";

export function GiftsSection() {
  const { gifts } = eventConfig;

  return (
    <Section size="default" className="pt-0">
      <Container>
        <FadeInUp>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center opacity-80 text-foreground">
              <AnimatedGift size={64} />
            </div>
            <Spacer size="md" />

            <Heading level={2} className="text-5xl md:text-6xl">
              {gifts.title}
            </Heading>
            <Spacer size="sm" />

            <p className="font-secondary text-base leading-relaxed text-muted-foreground">
              {gifts.description}
            </p>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
