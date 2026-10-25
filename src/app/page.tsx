import IntroEnvelope from "@/components/wedding/IntroEnvelope";
import Hero from "@/components/wedding/Hero";
import { QuoteSection } from "@/components/wedding/QuoteSection";
import { GuidelinesSection } from "@/components/wedding/GuidelinesSection";
import SongSection from "@/components/wedding/SongSection";
import Countdown from "@/components/wedding/Countdown";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import { GiftsSection } from "@/components/wedding/GiftsSection";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { FarewellSection } from "@/components/wedding/FarewellSection";
import { ItinerarySection } from "@/components/wedding/ItinerarySection";
import { GallerySection } from "@/components/wedding/GallerySection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start w-full">
      <IntroEnvelope />
      <Hero />
      <SongSection />
      <Countdown />
      <EventDetailsSection />
      <QuoteSection />
      <GuidelinesSection />
      <GiftsSection />
      <GallerySection />
      <RSVPSection />
      <FarewellSection />
    </div>
  );
}