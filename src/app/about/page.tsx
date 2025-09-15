import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - iRES Cybersecurity Emergency Response',
  description: 'Learn about iRES - the leading 24/7 cybersecurity incident response emergency system. Our expert team provides real-time protection and rapid response to digital threats.',
  openGraph: {
    title: 'About iRES - Cybersecurity Emergency Response Team',
    description: 'Meet the experts behind iRES cybersecurity emergency response system. Real Time. Real People. Real Protection.',
    url: 'https://iresorg.com/about',
  },
  twitter: {
    title: 'About iRES - Cybersecurity Emergency Response Team',
    description: 'Meet the experts behind iRES cybersecurity emergency response system.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">About iRES</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Coming soon - Learn about our mission to provide 24/7 cybersecurity incident response emergency system.
          </p>
        </div>
      </div>
    </div>
  );
}