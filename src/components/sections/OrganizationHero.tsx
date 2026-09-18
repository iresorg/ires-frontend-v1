"use client";

import PageHero from "@/components/sections/PageHero";

export default function OrganizationHero() {
  return (
    <PageHero
      title="Organizations"
      subtitle={
        <p>
          Empowering organizations to stay secure and grow. Rapid incident
          response, containment, and recovery for teams that can&apos;t afford
          downtime.
        </p>
      }
      showGetProtected
      showWatchDemo
      statusLabel="Enterprise Ready"
    />
  );
}
