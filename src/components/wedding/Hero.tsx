"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { eventConfig } from "@/config/event-details";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/layout/Heading";
import { Spacer } from "@/components/layout/Spacer";

export default function Hero() {
  const { logoUrl, brideName, groomName, weddingDate } = eventConfig;
  const [isReady, setIsReady] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const overlayControls = useAnimation();
  const namesControls = useAnimation();
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  // Format date to "DD.MM.YYYY"
  const [year, month, day] = weddingDate.split("-");
  const formattedDate = `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleComplete = () => setIsReady(true);
    window.addEventListener("envelopeComplete", handleComplete);

    const timer = setTimeout(() => setIsReady(true), 7000);

    return () => {
      window.removeEventListener("envelopeComplete", handleComplete);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    window.scrollTo(0, 0);

    const runAnimation = async () => {
      // Lock scroll during hero animation
      document.body.style.overflow = "hidden";

      setAnimationStarted(true);

      // 1. After 2 seconds, start overlay exit
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Start overlay exit (don't await — run in parallel)
      overlayControls.start({
        y: "-136%",
        transition: { duration: 4, ease: [0, 0, 0.58, 1] },
      });

      // 3. Wait 3s (overlap with overlay sliding up) then reveal logo and date
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await namesControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });

      setShowIndicator(true);

      // Restore scroll after hero animation completes
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    runAnimation();

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isReady, overlayControls, namesControls]);

  return (
    <div className="relative h-svh w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-background" />

      {/* Overlay with SVG tracing */}
      <motion.div
        animate={overlayControls}
        className="absolute inset-0 z-25 translate-y-[35%] flex items-center justify-center bg-[linear-gradient(to_bottom,var(--background)_0%,var(--background)_65%,transparent_100%)]"
      >
        <svg
          width="188"
          height="1154"
          viewBox="0 0 188 1154"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain max-w-[188px] text-foreground"
        >
          <motion.path
            d="M88.8145 176.403C81.8145 124.403 21.3105 90.4202 13.3125 58.9117C5.31442 27.4031 32.3145 5.91081 56.3145 5.91151C80.3145 5.91221 97.8145 27.4031 97.8145 27.4031C107 33.9843 117 83.9843 97.8145 84.4843C78.6289 84.9843 87.8145 31.3985 97.8145 27.4031C121.814 -2.09691 150 -0.66105 161.5 5.91163C173 12.4843 191.951 27.576 182.814 62.403C173.678 97.2301 113.314 121.903 105.314 176.403C97.3145 230.903 113.311 272.421 130.312 290.912C147.314 309.403 176.727 339.907 166.812 372.912C156.898 405.917 98.6955 448.412 94.3125 451.91C37.3125 497.41 56.3145 534.911 58.3125 539.91C83.3125 584.41 130.5 564.5 130.5 564.5C130.5 564.5 152.094 560.885 157.5 558.5C174.5 551 165.5 530.5 149.5 532.5C149 523 123.5 514.5 123.5 538.5C123.5 547.5 130.5 564.5 130.5 564.5C130.5 564.5 160 670.792 130.5 709.5C101 748.208 68.5 753 54.5 755.5C54.5 755.5 34.5005 760.809 26 759C2.50052 754 14.0006 727.5 25 731C19.5 721 42 705 51 727.5C52.9851 732.463 54.5 755.5 54.5 755.5C48.5 840 108.5 853.5 130.312 868.5C174.5 902 162.625 963 94.3125 986C26 1009 55.3376 1067.33 58.3125 1071.5C79 1100.5 107.5 1089.5 107.5 1150"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={animationStarted ? { pathLength: 1 } : {}}
            transition={{
              duration: 5,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Date and Logo - Revealed after overlay exits */}
      <motion.div
        animate={namesControls}
        initial={{ y: 48, opacity: 0 }}
        className="absolute inset-0 z-20 flex items-center justify-center px-4"
      >
        <Section className="py-0 w-full h-full flex items-center justify-center">
          <Container className="flex flex-col items-center justify-center text-center w-full">
            {/* Date - Numeros grandes editoriales */}
            <Heading
              level={2}
              className="font-primary tracking-[0.075em] text-4xl text-muted-foreground font-light  uppercase"
            >
              {formattedDate}
            </Heading>

            <Spacer size="md" />

            {/* Logo de los novios a ancho completo */}
            <div className="w-[130%] flex items-center justify-center px-2 ml-[-2.5%]">
              {logoUrl ? (
                <div className="relative w-full max-w-[650px] aspect-[1283/958] max-h-[58vh]">
                  <Image
                    src={logoUrl}
                    alt={`${brideName} & ${groomName}`}
                    fill
                    priority
                    sizes="(max-width: 700px) 96vw, 650px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Heading
                    level={1}
                    className="leading-none text-foreground text-7xl"
                  >
                    {brideName}
                  </Heading>

                  <Heading
                    level={1}
                    className="leading-none text-foreground text-7xl"
                  >
                    &
                  </Heading>

                  <Heading
                    level={1}
                    className="leading-none text-foreground text-7xl"
                  >
                    {groomName}
                  </Heading>
                </div>
              )}
            </div>
          </Container>
        </Section>
      </motion.div>

      {/* Scroll Down Indicator - Elevated to z-40 so it sits cleanly ABOVE the viewport gradient */}
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 pointer-events-none"
        >
          <div className="w-4 h-6 border-2 border-foreground rounded-full flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 0, 10, 10, 10, 0],
                opacity: [0, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.3, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut",
              }}
              className="w-1 h-1 rounded-full bg-foreground"
            />
          </div>
          <span className="text-xl font-secondary whitespace-nowrap text-foreground">
            Desliza para continuar
          </span>
        </motion.div>
      )}
    </div>
  );
}
