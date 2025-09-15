"use client"

import React from "react"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

export default function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section
      className={`max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  )
}


