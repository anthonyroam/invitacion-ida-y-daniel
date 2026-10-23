"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeInUp } from "@/components/ui/animations";
import { eventConfig } from "@/config/event-details";

export function FarewellSection() {
  const { farewell } = eventConfig;

  return (
    <Section size="default" className="relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={farewell.imageUrl}
          alt="Despedida"
          fill
          className="object-cover object-top mix-blend-multiply opacity-60"
          sizes="100vw"
        />
        {/* Radial fade to blend edges with background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_70%)]" />
      </div>

      <Container className="relative z-10 w-full flex flex-col items-center justify-end mt-auto pt-64">
        <FadeInUp>
          <div className="text-center">
            <h2 className="font-primary font-normal text-6xl text-foreground">
              {farewell.message}
            </h2>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
