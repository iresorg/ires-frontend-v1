'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after component mounts
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        {/* Rotating outer curve */}
        <div className="absolute inset-0 animate-spin">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="opacity-60"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#border-gradient)"
              strokeWidth="3"
              strokeDasharray="200 100"
              strokeDashoffset="0"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Rotating inner curve */}
        <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="opacity-40"
          >
            <circle
              cx="60"
              cy="60"
              r="35"
              fill="none"
              stroke="url(#border-gradient)"
              strokeWidth="2"
              strokeDasharray="150 80"
              strokeDashoffset="50"
            />
          </svg>
        </div>

        {/* Lock icon */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16">
          {/* Gradient border circle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #4185DD 0%, #B425DA 100%)',
              padding: '2px'
            }}
          >
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              {/* Lock icon from public/icons/lock.svg */}
              <div 
                className="w-8 h-8"
                style={{
                  backgroundImage: 'url(/icons/lock.svg)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  WebkitMask: 'url(/icons/lock.svg) no-repeat center',
                  mask: 'url(/icons/lock.svg) no-repeat center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  background: 'linear-gradient(90deg, #4C8AFD 54%, #B425DA 81%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* SVG gradients */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="54%" stopColor="#4C8AFD" />
              <stop offset="81%" stopColor="#B425DA" />
            </linearGradient>
            <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4185DD" />
              <stop offset="100%" stopColor="#B425DA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
