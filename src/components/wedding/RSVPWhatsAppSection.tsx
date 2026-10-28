"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/ui/animations";
import { AnimatedMailCheck } from "@/components/ui/AnimatedIcons";
import { eventConfig } from "@/config/event-details";

export function RSVPWhatsAppSection() {
  const { rsvp, brideName, groomName } = eventConfig;
  const phoneNumber = "584247073678";
  const message = `¡Hola! Quiero confirmar mi asistencia a la boda de ${brideName} y ${groomName}.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Section size="default">
      <Container>
        <FadeInUp>
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-foreground">
              <AnimatedMailCheck size={80} />
            </div>
            <Spacer size="sm" />
            <Heading level={2} className="text-5xl">
              {rsvp.title}
            </Heading>

            <Spacer size="sm" />

            <p className="font-secondary text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {rsvp.description}
            </p>
            <Spacer size="md" />

            <Button
              render={
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
            >
              {rsvp.buttonText}
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
