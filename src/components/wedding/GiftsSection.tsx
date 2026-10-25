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
            <div className="flex items-center justify-center text-foreground">
              <AnimatedGift size={80} />
            </div>
            <Spacer size="md" />

            <Heading level={2} className="text-5xl">
              {gifts.title}
            </Heading>
            <Spacer size="sm" />

            <p className="font-secondary text-base leading-relaxed text-muted-foreground">
              Lo que más deseamos es celebrar con ustedes.
Si desean consentirnos con un regalo, cualquier detalle en efectivo o aporte digital será recibido con todo nuestro cariño y gratitud.
            </p>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
