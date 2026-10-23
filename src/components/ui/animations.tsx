"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";

export const DEFAULT_DURATION = 0.5;
export const DEFAULT_EASE = "easeOut" as const;
export const DEFAULT_MARGIN = "-50px";

export interface CustomMotionProps extends HTMLMotionProps<"div"> {
  duration?: number;
  delay?: number;
}

export interface FadeInUpProps extends CustomMotionProps {
  y?: number;
}

export function FadeInUp({
  children,
  delay = 0.4,
  duration = DEFAULT_DURATION,
  y = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(6px)", y }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: DEFAULT_MARGIN }}
      transition={{
        duration,
        ease: DEFAULT_EASE,
        opacity: { duration: duration * 0.7, ease: DEFAULT_EASE, delay },
        filter: { duration, ease: DEFAULT_EASE, delay: delay + 0.15 },
        y: { duration, ease: DEFAULT_EASE, delay },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface ScaleInProps extends CustomMotionProps {
  scale?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  scale = 1,
  className,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: DEFAULT_MARGIN }}
      transition={{ duration, ease: DEFAULT_EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggeredTextProps extends CustomMotionProps {
  text: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export function StaggeredText({
  text,
  className,
  delay = 0,
  duration = 0.1,
  staggerDelay = 0.05,
  ...props
}: StaggeredTextProps) {
  // Separa el texto por palabras para permitir que el browser haga el wrapping correctamente
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -4,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: DEFAULT_EASE,
        opacity: { duration: duration * 0.7 },
        filter: { duration, ease: DEFAULT_EASE, delay: 0.05 },
        y: { duration, ease: DEFAULT_EASE },
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: DEFAULT_MARGIN }}
      className={className}
      {...props}
    >
      {words.map((word, wordIndex) => [
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`char-${wordIndex}-${charIndex}`}
              variants={childVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>,
        // El espacio animado se coloca FUERA del bloque de la palabra para que el CSS permita el salto de línea
        wordIndex < words.length - 1 && (
          <motion.span key={`space-${wordIndex}`} variants={childVariants}>
            {" "}
          </motion.span>
        )
      ])}
    </motion.span>
  );
}
