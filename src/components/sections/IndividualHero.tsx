"use client";

import PageHero from "@/components/sections/PageHero";

export default function IndividualHero() {
  return (
    <PageHero
      title="Individual"
      subtitle={
        <p>
          Protect what&apos;s yours. From personal data to online identity, iRES
          keeps you one step ahead of cyber threats — fast, private, and built
          for individuals who don&apos;t settle for less.
        </p>
      }
      showGetProtected
      showWatchDemo
      demoVideoSrc="/video/hero-video.mp4"
      statusLabel="Personal Cover Active"
    />
  );
}
