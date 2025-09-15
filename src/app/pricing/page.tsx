import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans - Cybersecurity Emergency Response Plans',
  description: 'Explore iRES cybersecurity incident response pricing plans. Affordable 24/7 protection for individuals, businesses, and enterprises. Compare features and choose your plan.',
  keywords: ['cybersecurity pricing', 'incident response plans', 'security pricing', 'emergency response cost'],
  openGraph: {
    title: 'Pricing Plans - iRES Cybersecurity Emergency Response',
    description: 'Compare cybersecurity incident response plans. Find the perfect protection plan for your needs with transparent pricing.',
    url: 'https://iresorg.com/pricing',
  },
  twitter: {
    title: 'Pricing Plans - iRES Cybersecurity Emergency Response',
    description: 'Compare cybersecurity incident response plans. Find the perfect protection plan for your needs.',
  },
};

export default function PricingPage() {
    return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Pricing Plans</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Coming soon - Transparent pricing for comprehensive cybersecurity incident response plans.
                            </p>
                        </div>
                    </div>
                </div>
  );
} 