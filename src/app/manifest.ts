import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'iRES - Cybersecurity Incident Response Emergency System',
    short_name: 'iRES',
    description: '24/7 Cybersecurity incident response emergency system. Real Time. Real People. Real Protection.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1c1b2b',
    theme_color: '#4185dd',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['security', 'business', 'productivity'],
    lang: 'en',
    orientation: 'portrait-primary',
    scope: '/',
  }
}
