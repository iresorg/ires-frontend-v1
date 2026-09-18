"use client";

import PageHero from "@/components/sections/PageHero";

export default function PricingHero() {
  return (
    <PageHero
      title="Pricing Plans"
      subtitle={
        <p>
          Explore our affordable and tailored pricing plans — flexible cover for
          individuals and organizations, from one-time response to always-on
          protection.
        </p>
      }
      showGetProtected
      showWatchDemo
    />
  );
}
