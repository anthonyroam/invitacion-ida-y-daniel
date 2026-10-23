"use client";

import { eventConfig } from "@/config/event-details";
import { FadeInUp, ScaleIn } from "@/components/ui/animations";
import { AnimatedChurch, AnimatedReception } from "@/components/ui/AnimatedIcons";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { Button } from "@/components/ui/button";

export default function EventDetailsSection() {
  const { ceremony, reception } = eventConfig;

  // Convertir formato 24h a 12h AM/PM
  const formatTime = (time24: string) => {
    const [h, m] = time24.split(":");
    let hours = parseInt(h);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${m} ${ampm}`;
  };

  return (
    <Section className="pt-0" size="default">
      <Container>
        {/* Título */}
        <FadeInUp>
          <Heading level={2} className="text-center">
            Detalles de la boda
          </Heading>
        </FadeInUp>

        <Spacer size="lg" />

        <div className="flex flex-col gap-16 items-center w-full justify-center">

          {/* Columna Ceremonia */}
          <ScaleIn delay={0.1}>
            <div className="flex flex-col items-center text-center max-w-xs">
              <AnimatedChurch size={64} className="text-foreground" />
              <Spacer size="xs" />

              <Heading level={3}>Ceremonia Religiosa</Heading>

              <Spacer size="xs" />

              <div className="flex flex-col text-muted-foreground font-secondary">
                <span>Hora: {formatTime(ceremony.time)}</span>
                <span>{ceremony.locationName}</span>
              </div>

              <Spacer size="sm" />

              <Button
                render={<a href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
              >
                Ver mapa
              </Button>
            </div>
          </ScaleIn>

          {/* Columna Recepción */}
          <ScaleIn delay={0.2}>
            <div className="flex flex-col items-center text-center max-w-xs">
              <AnimatedReception size={64} className="text-foreground" />
              <Spacer size="xs" />

              <Heading level={3}>Recepción</Heading>

              <Spacer size="xs" />

              <div className="flex flex-col text-muted-foreground font-secondary">
                <span>Hora: {formatTime(reception.time)}</span>
                <span>{reception.locationName}</span>
              </div>

              <Spacer size="sm" />

              <Button
                render={<a href={reception.mapUrl} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
              >
                Ver mapa
              </Button>
            </div>
          </ScaleIn>

        </div>
      </Container>
    </Section>
  );
}
