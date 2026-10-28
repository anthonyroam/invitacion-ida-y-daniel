"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeInUp } from "@/components/ui/animations";
import { Heading } from "@/components/layout/Heading";
import { Spacer } from "@/components/layout/Spacer";
import { eventConfig } from "@/config/event-details";

export function FarewellSection() {
  const { farewell, brideName, groomName } = eventConfig;

  return (
    <Section size="default" className="relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-52">
      <Container className="relative z-10 w-full flex flex-col items-center justify-center">
        <FadeInUp>
          <div className="text-center max-w-sm mx-auto flex flex-col items-center">
            {farewell.description && (
              <>
                <p className="font-secondary italic text-lg text-muted-foreground leading-relaxed">
                  {farewell.description}
                </p>
                <Spacer size="md" />
              </>
            )}

            <Heading level={2} className="text-5xl text-foreground font-normal leading-tight">
              {farewell.message}
            </Heading>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
