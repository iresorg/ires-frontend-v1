"use client";

import PageHero from "@/components/sections/PageHero";

export default function ServiceHero() {
  return (
    <PageHero
      title="Our Services"
      subtitle={
        <p>
          Explore our cybersecurity incident response services — built for
          speed, trust, and human-led protection when every second counts.
        </p>
      }
      primaryLabel="View Plans"
      primaryHref="/pricing"
      showWatchDemo
    />
  );
}
