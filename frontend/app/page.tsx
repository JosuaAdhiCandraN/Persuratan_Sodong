"use client";

import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { AboutSection } from "@/components/landing/about-section";
import { Footer } from "@/components/landing/footer";

export default function PersuratanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <LandingHeader />
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}
