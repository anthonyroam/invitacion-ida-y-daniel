"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { FadeInUp, StaggeredText } from "@/components/ui/animations";
import { eventConfig } from "@/config/event-details";

export function QuoteSection() {
  const { quote } = eventConfig;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

  return (
    <Section ref={sectionRef} size="default" className="relative overflow-clip min-h-[60vh] flex items-center justify-center">
      {/* Background Image */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/quote-image.png"
          alt="Pareja"
          fill
          className="object-cover object-center mix-blend-multiply opacity-60"
          sizes="100vw"
        />
        {/* Radial fade to blend edges with background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%,transparent_30%,var(--background)_70%)]" />
      </motion.div>

      <Container className="relative z-10">
        <FadeInUp>
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-5xl font-primary text-foreground">
              <StaggeredText text={`"${quote.text}"`} />
            </blockquote>
            <Spacer size="md" />
            <cite className="text-3xl font-primary text-foreground block">
              {quote.reference}
            </cite>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
