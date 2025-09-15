import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services - Cybersecurity Emergency Response Services',
  description: 'Comprehensive cybersecurity services including incident response, threat detection, data breach response, malware removal, and 24/7 security monitoring.',
  keywords: ['cybersecurity services', 'incident response services', 'threat detection', 'data breach response', 'malware removal', 'security monitoring'],
  openGraph: {
    title: 'Cybersecurity Services - iRES Emergency Response',
    description: 'Comprehensive cybersecurity services including 24/7 monitoring, incident response, and threat mitigation.',
    url: 'https://iresorg.com/services',
  },
  twitter: {
    title: 'Cybersecurity Services - iRES Emergency Response',
    description: 'Comprehensive cybersecurity services including 24/7 monitoring, incident response, and threat mitigation.',
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Coming soon - Comprehensive cybersecurity services and emergency response solutions.
          </p>
        </div>
      </div>
    </div>
  );
}