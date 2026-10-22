"use client";

import PageHero from "@/components/sections/PageHero";

export default function ServiceHero() {
  return (
    <PageHero
      title="Our Services"
      subtitle={
        <p>
          SOC monitoring, 24/7 incident response, digital forensics, and
          CISO-as-a-Service. Take one service, or coordinate them together.
        </p>
      }
      primaryLabel="View Plans"
      primaryHref="/pricing"
      showWatchDemo
    />
  );
}
