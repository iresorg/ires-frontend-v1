// app/page.tsx
'use client';

export default function ComingSoonPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/image/iresvideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Logo */}
        <div className="p-6">
          <img
            src="/image/ireslogo.png"
            alt="iRES Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          {/* Heading */}
          <h1
            className="
              mb-6 text-3xl font-extrabold tracking-wide
              md:text-4xl
              text-transparent bg-clip-text
              bg-gradient-to-r from-blue-400 to-purple-500
              drop-shadow-lg
            "
          >
            COMING SOON !!!
          </h1>

          {/* Small Glass Tag */}
         <div
            className="
              mb-6 rounded-md
              border border-transparent
              px-4 py-1 text-sm
              backdrop-blur
              text-white
            "
            style={{
              borderImage: 'linear-gradient(to right, #3b82f6, #a855f7) 1',
            }}
          >
            iRES - Incident Response Emergency System
          </div>

          {/* Sub Heading */}
          <h2
            className="
              max-w-3xl text-2xl font-bold leading-snug
              md:text-4xl
              text-white/90
              
            "
          >
            24/7 Cybersecurity Incident <br />
            Response Hotline
          </h2>

          {/* Paragraph */}
          <p className="mb-2 max-w-lg text-sm text-white/80 md:text-base">
            Experience fast security response like never before with cutting-edge
            technology to keep you safe.
          </p>

          {/* CTA Tag */}
          <div
            className="
              rounded-full border
              border-transparent bg-gradient-to-r from-blue-400 to-purple-500
              p-[1px] transition-all duration-500 hover:scale-105
            "
          >
            <div className="rounded-full bg-black/60 px-8 py-2 text-sm font-semibold">
              WE ARE COMING SOON
            </div>
          </div>

          {/* Footer Line */}
          <p className="mt-6 text-xs text-white/70 tracking-wide">
            This is iRES - Real Time, Real People, Real Protection
          </p>
        </div>
      </div>
    </main>
  );
}
