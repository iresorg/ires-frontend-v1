'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Set loaded state after a short delay to ensure everything is mounted
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Hide loading screen after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      // Dispatch custom event to signal loading is complete
      window.dispatchEvent(new CustomEvent('loadingComplete'));
    }, 2500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            {/* Rotating outer curve */}
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
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
                />
              </svg>
            </motion.div>

            {/* Rotating inner curve */}
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
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
            </motion.div>

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
                  {/* Lock icon */}
                  <motion.div 
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
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Loading text */}
            <motion.div 
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 mt-16 py-48"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <motion.p 
                  className="text-white text-sm font-medium mb-2"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Securing Your Digital World
                </motion.p>
                <div className="flex justify-center space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* SVG gradients */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4185DD" />
                <stop offset="100%" stopColor="#B425DA" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}