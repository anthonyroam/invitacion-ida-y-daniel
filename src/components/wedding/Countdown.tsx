"use client";

import { useState, useEffect } from "react";
import { eventConfig } from "@/config/event-details";
import { FadeInUp } from "@/components/ui/animations";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";

// Helper para forzar números tabulares en fuentes que no lo soportan nativamente
const FixedNumber = ({ num }: { num: string }) => (
  <span className="flex justify-center font-medium font-primary tabular-nums">
    {num.split("").map((digit, i) => (
      <span key={i} className="inline-block text-center w-[1ch] text-4xl">
        {digit}
      </span>
    ))}
  </span>
);

export default function Countdown() {
  const { weddingDate, ceremony } = eventConfig;

  // Fecha objetivo (basada en la ceremonia religiosa)
  const targetDate = new Date(`${weddingDate}T${ceremony.time}:00`);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Section className="flex flex-col items-center justify-center pt-0">
      <Container>
        <FadeInUp>
          <div className="flex flex-col items-center">
            <Heading level={3} className="text-4xl md:text-5xl">Faltan...</Heading>
            <Spacer size="md" />

            <div className="flex items-start justify-center text-3xl gap-3 text-foreground">
              <div className="flex flex-col items-center">
                <FixedNumber num={timeLeft.days} />
                <span className="font-secondary text-sm uppercase tracking-wider text-muted-foreground mt-1">Días</span>
              </div>

              <span className="font-medium font-primary tabular-nums">:</span>

              <div className="flex flex-col items-center">
                <FixedNumber num={timeLeft.hours} />
                <span className="font-secondary text-sm uppercase tracking-wider text-muted-foreground mt-1">Horas</span>
              </div>

              <span className="font-medium font-primary tabular-nums">:</span>

              <div className="flex flex-col items-center">
                <FixedNumber num={timeLeft.minutes} />
                <span className="font-secondary text-sm uppercase tracking-wider text-muted-foreground mt-1">Minutos</span>
              </div>

              <span className="font-medium font-primary tabular-nums">:</span>

              <div className="flex flex-col items-center">
                <FixedNumber num={timeLeft.seconds} />
                <span className="font-secondary text-sm uppercase tracking-wider text-muted-foreground mt-1">Segundos</span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
