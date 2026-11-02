"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { FadeInUp } from "@/components/ui/animations";
import { Button } from "@/components/ui/button";
import { AnimatedShirt, AnimatedMailOpen, AnimatedAttendance } from "@/components/ui/AnimatedIcons";
import { eventConfig } from "@/config/event-details";
import { getRSVPData } from "@/services/rsvp";

export function GuidelinesSection() {
  return (
    <Suspense>
      <GuidelinesContent />
    </Suspense>
  );
}

function GuidelinesContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("rsvp_token") || searchParams.get("guestId");
  const { guidelines } = eventConfig;

  const [passCount, setPassCount] = useState(() => {
    const queryPasses = searchParams.get("passes") || searchParams.get("pases");
    if (queryPasses) {
      const parsed = parseInt(queryPasses, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return guidelines.passes.defaultPasses;
  });

  useEffect(() => {
    // 1. Parámetro de pases prioritario en query o pathname (ej: ?passes=1, /passes=1)
    const queryPasses = searchParams.get("passes") || searchParams.get("pases");
    if (queryPasses) {
      const parsed = parseInt(queryPasses, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setPassCount(parsed);
        return;
      }
    }

    if (typeof window !== "undefined") {
      const match = window.location.pathname.match(/(?:passes|pases)[=/](\d+)/i) ||
                    window.location.href.match(/[?&#/](?:passes|pases)[=/](\d+)/i);
      if (match && match[1]) {
        const parsed = parseInt(match[1], 10);
        if (!isNaN(parsed) && parsed > 0) {
          setPassCount(parsed);
          return;
        }
      }
    }

    // 2. Consulta dinámica por token de invitado si no viene el parámetro directo
    async function fetchGuest() {
      if (token) {
        try {
          const result = await getRSVPData(token);
          if (result.success && result.data?.guest) {
            setPassCount(result.data.guest.passes_assigned);
          }
        } catch (error) {
          console.error("Error fetching guest info:", error);
        }
      }
    }
    fetchGuest();
  }, [token, searchParams, guidelines.passes.defaultPasses]);

  return (
    <Section size="default" className="pt-0">
      <Container>
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">

          {/* Passes Block */}
          <FadeInUp>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center text-foreground">
                <AnimatedMailOpen size={80} />
              </div>
              <Spacer size="sm" />

              <Heading level={2} className="text-5xl">
                {guidelines.passes.title}
              </Heading>
              <Spacer size="sm" />

              <p className="font-secondary text-lg leading-relaxed text-muted-foreground">
                {guidelines.passes.description}
              </p>
              <Spacer size="md" />

              <p className="font-secondary text-3xl font-medium text-muted-foreground">
                {passCount} {passCount === 1 ? "pase" : "pases"}
              </p>
            </div>
          </FadeInUp>



          {/* Dress Code Block */}
          <FadeInUp>
            <div className="flex flex-col items-center mt-20">
              <div className="flex items-center justify-center text-foreground">
                <AnimatedShirt size={80} />
              </div>
              <Spacer size="sm" />
              <Heading level={2} className="text-5xl">
                {guidelines.dressCode.title}
              </Heading>

              <Spacer size="sm" />

              <Heading level={3} className="text-3xl">
                {guidelines.dressCode.style}
              </Heading>
              <Spacer size="sm" />

              <p className="font-secondary text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {guidelines.dressCode.description}
              </p>
            </div>
          </FadeInUp>

          <Spacer size="xl" />

          <div className="hidden">
            {/* Attendance Block (No niños) */}
            <FadeInUp>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-foreground">
                  <AnimatedAttendance size={80} />
                </div>
                <Spacer size="xs" />

                <Heading level={2} className="text-5xl">
                  {guidelines.attendance.title}
                </Heading>
                <Spacer size="sm" />

                <p className="font-secondary text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                  {guidelines.attendance.description}
                </p>
              </div>
            </FadeInUp>

          </div>  
        </div>
      </Container>
    </Section>
  );
}
