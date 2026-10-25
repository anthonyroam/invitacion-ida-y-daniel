"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeInUp } from "@/components/ui/animations";
import { eventConfig } from "@/config/event-details";

export function QuoteSection() {
  const { quote } = eventConfig;

  return (
    <Section size="default" className="relative overflow-clip py-20">
      <Container className="relative z-10 max-w-2xl mx-auto">
        <FadeInUp>
          <div className="flex flex-col items-center text-center">
            {/* Pull Quote destacada en Playfair Display Itálica */}
            <blockquote className="font-primary italic text-4xl text-foreground max-w-xl mb-6">
              “{quote.text}”
            </blockquote>

            {/* Tarjeta narrativa con filetes lineales estilo papelería fina */}
            <div className="w-full border-y border-primary/20 py-6 px-4 space-y-4">
              {quote.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-secondary text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              {/* Firma de los novios en Great Vibes */}
              <div className="pt-4">
                <span className="font-primary text-3xl leading-relaxed text-foreground block">
                  Ida <span className="mx-1">&</span> Daniel
                </span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
