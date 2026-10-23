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

  const [passCount, setPassCount] = useState(guidelines.passes.defaultPasses);

  useEffect(() => {
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
  }, [token, guidelines.passes.defaultPasses]);

  return (
    <Section size="default">
      <Container>
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">

          {/* Passes Block */}
          <FadeInUp>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center opacity-80 text-foreground">
                <AnimatedMailOpen size={64} />
              </div>
              <Spacer size="xs" />

              <Heading level={2}>
                {guidelines.passes.title}
              </Heading>
              <Spacer size="sm" />

              <p className="font-secondary text-md text-muted-foreground">
                {guidelines.passes.description}
              </p>
              <Spacer size="md" />

              <p className="font-secondary text-2xl text-foreground">
                {passCount} {passCount === 1 ? "pase" : "pases"}
              </p>
            </div>
          </FadeInUp>

          <Spacer size="xl" />

          {/* Dress Code Block */}
          <FadeInUp>
            <div className="flex flex-col items-center">
              <Heading level={2}>
                {guidelines.dressCode.title}
              </Heading>
              <Spacer size="md" />

              <div className="flex items-center justify-center opacity-80 text-foreground">
                <AnimatedShirt size={64} />
              </div>
              <Spacer size="xs" />

              <Heading level={3}>
                {guidelines.dressCode.style}
              </Heading>
              <Spacer size="sm" />

              <p className="font-secondary text-md text-muted-foreground">
                {guidelines.dressCode.description}
              </p>

              <Spacer size="md" />

              <Button
                render={<a href={guidelines.dressCode.url} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
              >
                Inspirate para brillar
              </Button>
            </div>
          </FadeInUp>

          <Spacer size="xl" />

          {/* Attendance Block (No niños) */}
          <FadeInUp>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center opacity-80 text-foreground">
                <AnimatedAttendance size={64} />
              </div>
              <Spacer size="xs" />

              <Heading level={2}>
                {guidelines.attendance.title}
              </Heading>
              <Spacer size="sm" />

              <p className="font-secondary text-md text-muted-foreground">
                {guidelines.attendance.description}
              </p>
            </div>
          </FadeInUp>

        </div>
      </Container>
    </Section>
  );
}