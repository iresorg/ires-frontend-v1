"use client";

import PageHero from "@/components/sections/PageHero";

export default function AboutUsHero() {
  return (
    <PageHero
      title="About iRES"
      subtitle={
        <p>
          Incident Response Emergency System — founded to close the critical gap
          in cybersecurity emergency response for Nigerian organizations and
          individuals. Real Time. Real People. Real Protection.
        </p>
      }
      showGetProtected
      showWatchDemo
    />
  );
}
