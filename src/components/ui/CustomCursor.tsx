'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for title elements
      if (target.matches('h1, h2, h3, h4, h5, h6, [data-cursor="title"]')) {
        setCursorVariant('title')
        setIsHovering(true)
      }
      // Check for gradient text elements
      else if (target.matches('[data-cursor="gradient"], .gradient-text')) {
        setCursorVariant('gradient')
        setIsHovering(true)
      }
      // Check for buttons and links
      else if (target.matches('button, a, [data-cursor="button"]')) {
        setCursorVariant('button')
        setIsHovering(true)
      }
      else {
        setCursorVariant('default')
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => {
      setCursorVariant('default')
      setIsHovering(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
      background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary-color))',
    },
    title: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
      background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary-color))',
    },
    gradient: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    },
    button: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1.5,
      background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary-color))',
    },
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        style={{
          width: 16,
          height: 16,
        }}
      />
      
      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full opacity-30"
        style={{
          width: 24,
          height: 24,
          background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary-color))',
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      />
      
      {/* Additional trail particles */}
      {isHovering && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full opacity-20"
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary-color))',
            }}
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          />
        </>
      )}
    </>
  )
}
