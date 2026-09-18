"use client";

import PageHero from "@/components/sections/PageHero";

export default function AboutUsHero() {
  return (
    <PageHero
      title="About Us"
      subtitle={
        <p>
          Experience fast security response like never before with cutting-edge
          technology to keep you safe. This is iRES — Real Time, Real People,
          Real Protection.
        </p>
      }
      showGetProtected
      showWatchDemo
    />
  );
}
