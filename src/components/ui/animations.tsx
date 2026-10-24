"use client";

import * as React from "react";
import { HTMLMotionProps } from "framer-motion";

export const DEFAULT_DURATION = 0.5;
export const DEFAULT_EASE = "easeOut" as const;
export const DEFAULT_MARGIN = "-50px";

export interface CustomMotionProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  duration?: number;
  delay?: number;
}

export interface FadeInUpProps extends CustomMotionProps {
  y?: number;
}

/**
 * FadeInUp: Temporalmente simplificado sin animaciones de opacidad/fade-in.
 * El efecto de aparición gradual se delega al gradiente fijo inferior de la pantalla.
 */
export function FadeInUp({
  children,
  className,
}: FadeInUpProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export interface ScaleInProps extends CustomMotionProps {
  scale?: number;
}

export function ScaleIn({
  children,
  className,
}: ScaleInProps) {
  return (
    <div className={className}>
      {children}
    </div>
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
}: StaggeredTextProps) {
  return <span className={className}>{text}</span>;
}
