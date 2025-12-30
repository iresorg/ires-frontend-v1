"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/sections/Hero";
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhoWeHelpSection from "@/components/sections/WhoWeHelpSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function HomeContent() {
    return (
        <div className="home-custom-cursor">
            <CustomCursor />
            <Hero />
            <ScrollingTicker />
            <FeaturesSection />
            <WhoWeHelpSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <ContactUsSection />
        </div>
    );
}


