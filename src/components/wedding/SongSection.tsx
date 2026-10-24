"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/config/event-details";
import { Play, Pause } from "lucide-react";
import { FadeInUp } from "@/components/ui/animations";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";

export default function SongSection() {
  const { songSettings } = eventConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    if (audio) {
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, []);

  return (
    <Section
      className="flex flex-col items-center justify-center"
      size="small"
    >
      <Container className="flex flex-col items-center">
        {/* Reproductor invisible */}
        <audio ref={audioRef} src={songSettings.audioUrl} preload="auto" />

        {/* Frase animada */}
        <FadeInUp>
          <div className="flex flex-col items-center">
            <p className="text-center text-xl font-secondary italic text-muted-foreground">
              {songSettings.message}
            </p>

            <Spacer size="sm" />

            {/* Botón Play */}
            <motion.button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors outline-none cursor-pointer bg-primary text-primary-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" fill="currentColor" strokeWidth={1} />
              ) : (
                <Play className="w-4 h-4 ml-0.5" fill="currentColor" strokeWidth={1} />
              )}
            </motion.button>
          </div>
        </FadeInUp>
      </Container>
    </Section>
  );
}
