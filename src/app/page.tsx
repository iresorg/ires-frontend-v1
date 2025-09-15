"use client";

import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import FeaturesSection from "@/components/sections/FeaturesSection";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Real-time Response",
    description:
      "Get immediate assistance from trained responders in emergency situations.",
    icon: ClockIcon,
  },
  {
    name: "Verified Responders",
    description:
      "All our responders are thoroughly vetted and professionally trained.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Community Driven",
    description:
      "Join a network of dedicated professionals committed to helping others.",
    icon: UserGroupIcon,
  },
  {
    name: "Data-Driven Insights",
    description:
      "Access comprehensive analytics and reporting for better decision making.",
    icon: ChartBarIcon,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollingTicker />
      <FeaturesSection />
    </>
  );
}
