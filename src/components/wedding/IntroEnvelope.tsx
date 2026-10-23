"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { eventConfig } from "@/config/event-details";

export interface IntroEnvelopeProps {
  /**
   * Video source path or URL.
   * Defaults to eventConfig.introVideo?.videoSrc or fallback video.
   */
  videoSrc?: string;
  /**
   * Playback time in seconds when the fade-out should begin.
   * Defaults to eventConfig.introVideo?.fadeStartTime or 2.4.
   */
  fadeStartTime?: number;
  /**
   * Duration of the fade-out animation in seconds.
   * Defaults to eventConfig.introVideo?.fadeDuration or 0.6.
   */
  fadeDuration?: number;
  /**
   * Custom DOM event name dispatched on window upon completion.
   * Set to null to disable window event dispatch.
   * @default "envelopeComplete"
   */
  eventName?: string | null;
  /**
   * Direct callback fired when the intro sequence finishes and element is unmounted.
   */
  onComplete?: () => void;
  /**
   * Additional or overriding container classes (e.g. width/max-width).
   * @default "max-w-[700px]"
   */
  className?: string;
}

export default function IntroEnvelope({
  videoSrc = eventConfig.introVideo?.videoSrc || "/videos/envelope-weddy-template-04.mp4",
  fadeStartTime = eventConfig.introVideo?.fadeStartTime ?? 2.4,
  fadeDuration = eventConfig.introVideo?.fadeDuration ?? 0.6,
  eventName = "envelopeComplete",
  onComplete,
  className = "max-w-[700px]",
}: IntroEnvelopeProps = {}) {
  const [scope, animate] = useAnimate();
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingStartedRef = useRef(false);
  const sequenceFinishedRef = useRef(false);

  const finishSequence = useCallback(async () => {
    if (sequenceFinishedRef.current) return;
    sequenceFinishedRef.current = true;

    if (scope.current) {
      await animate(
        scope.current,
        { opacity: 0 },
        { duration: fadeDuration, ease: "easeOut" }
      );
    }

    if (eventName && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(eventName));
    }

    if (onComplete) {
      onComplete();
    }

    setIsDone(true);
  }, [animate, scope, fadeDuration, eventName, onComplete]);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!fadingStartedRef.current && video.currentTime >= fadeStartTime) {
        fadingStartedRef.current = true;
        finishSequence();
      }
    },
    [fadeStartTime, finishSequence]
  );

  const handleVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (video && !fadingStartedRef.current) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video playback was interrupted or prevented:", err);
        });
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        handleVideoReady();
      }
    }

    // Safety fallback: ensure UI unlocks even if media fails to load or play
    const safetyTimer = setTimeout(() => {
      if (!sequenceFinishedRef.current) {
        finishSequence();
      }
    }, 6000);

    return () => clearTimeout(safetyTimer);
  }, [handleVideoReady, finishSequence]);

  if (isDone) {
    return null;
  }

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className={cn(
        "fixed inset-y-0 left-0 right-0 mx-auto w-full z-50 overflow-hidden pointer-events-none select-none bg-background flex items-center justify-center",
        className
      )}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={handleVideoReady}
        onLoadedData={handleVideoReady}
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishSequence}
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
