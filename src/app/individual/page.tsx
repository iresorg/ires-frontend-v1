import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Individual Plans - Personal Cybersecurity Protection',
  description: 'Personal cybersecurity incident response plans for individuals. 24/7 protection, identity theft response, and personal data breach assistance.',
  keywords: ['personal cybersecurity', 'individual security', 'identity protection', 'personal incident response'],
  openGraph: {
    title: 'Individual Cybersecurity Plans - Personal Protection',
    description: 'Protect yourself with personal cybersecurity incident response. Individual plans for comprehensive digital protection.',
    url: 'https://iresorg.com/individual',
  },
  twitter: {
    title: 'Individual Cybersecurity Plans - Personal Protection',
    description: 'Protect yourself with personal cybersecurity incident response.',
  },
};

export default function IndividualPage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Individual Plans</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Coming soon - Personal cybersecurity incident response plans for individuals.
          </p>
        </div>
      </div>
    </div>
  );
}
