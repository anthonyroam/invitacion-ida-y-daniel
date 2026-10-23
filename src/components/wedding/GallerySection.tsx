"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Spacer } from "@/components/layout/Spacer";
import { Heading } from "@/components/layout/Heading";
import { FadeInUp } from "@/components/ui/animations";
import { eventConfig } from "@/config/event-details";

const ROTATIONS = [-4, 2, -1, 3, -2, 1];
const STICKY_TOPS = [40, 50, 60, 70, 80, 90];

export function GallerySection() {
  const { gallery } = eventConfig;
  const images = gallery.images ?? [];

  return (
    <FadeInUp>
      <div className="relative w-full">
        <Container>
          <div className="text-center">
            <Heading level={2}>
              {gallery.title}
            </Heading>
          </div>

          <Spacer size="lg" />
        </Container>

        <div className="relative w-full h-auto flex flex-col gap-[120px]">
          {images.map((image, index) => {
            const rotation = ROTATIONS[index % ROTATIONS.length];
            const stickyTop = STICKY_TOPS[index % STICKY_TOPS.length];

            return (
              <div
                key={index}
                className="flex justify-center"
                style={{
                  position: "sticky",
                  top: stickyTop,
                  zIndex: index,
                  overflow: "visible",
                }}
              >
                <div
                  style={{ rotate: `${rotation}deg` }}
                  className="w-[300px]"
                >
                  <div
                    className="bg-white p-3 pb-12 rounded-sm"
                    style={{
                      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 280px, 320px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeInUp>
  );
}
