'use client'

import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useState } from 'react'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
}

const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1
        }
    }
}

const testimonials = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        author: "Ronald Michaels",
        position: "Marketing Director",
        avatar: "/images/person.png"
    },
    {
        id: 2,
        text: "Exceptional service! The team responded quickly to our cybersecurity incident and helped us recover our systems within hours. Their expertise and professionalism are unmatched.",
        author: "Sarah Johnson",
        position: "IT Manager",
        avatar: "/images/person.png"
    },
    {
        id: 3,
        text: "iRES saved our business from a major data breach. Their 24/7 support and rapid response time made all the difference. Highly recommend their services.",
        author: "Michael Chen",
        position: "CEO",
        avatar: "/images/person.png"
    }
]

export default function TestimonialsSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className="relative w-full py-12 lg:py-16 overflow-hidden">
            {/* Background shapes */}
            <motion.div
                className="absolute -top-10 right-1 w-40 h-40 lg:w-52 lg:h-52 z-0"
                variants={shapeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                animate={{
                    y: [0, 20, 0],
                }}
                transition={{
                    y: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                <Image
                    src="/shapes/section-bg-shape-6.svg"
                    alt="Background shape"
                    width={220}
                    height={220}
                    className="w-full h-full opacity-60"
                />
            </motion.div>

            <motion.div
                className="absolute bottom-0 left-0 w-48 h-48 lg:w-52 lg:h-52 z-0"
                variants={shapeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            >
                <Image
                    src="/shapes/section-bg-shape-7.svg"
                    alt="Background shape"
                    width={256}
                    height={256}
                    className="w-full h-full opacity-60"
                />
            </motion.div>

            <Section className="relative z-10">
                <motion.div
                    className="space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Header */}
                    <motion.div className="text-start space-y-4" variants={itemVariants}>
                        <SectionTitle
                            logo="/logos/ires-logo.svg"
                            logoAlt="iRES Logo"
                            title="Our Testimonials"
                        />
                        <h2 className="text-lg lg:text-2xl xl:text-3xl mt-2 lg:mt-6 font-light text-white leading-tight">
                            Our Clients speak real results
                        </h2>
                        <h3 
                            className="text-sm lg:text-base font-medium"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-secondary-color), var(--accent-color))',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            real protection
                        </h3>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Rating Card - 4 columns */}
                        <motion.div
                            className="lg:col-span-4 relative p-8 xl:p-10 rounded-3xl border border-transparent bg-linear-to-br from-white/5 to-white/10 backdrop-blur-sm text-center"
                            style={{
                                background: 'linear-gradient(var(--bg-color), var(--bg-color)) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box',
                                border: '1px solid transparent'
                            }}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Rating */}
                            <motion.div className="mb-6" variants={itemVariants}>
                                <div className="text-6xl lg:text-7xl font-bold text-white mb-2">4.9</div>
                                <div className="text-white/80 text-sm lg:text-base mb-4">(40+ Reviews)</div>
                                
                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text'
                                            }}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Customer Photos */}
                                <div className="flex justify-center -space-x-2 mb-6">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                                            style={{ borderColor: 'var(--accent-secondary-color)' }}
                                        >
                                            <Image
                                                src="/images/person.png"
                                                alt={`Customer ${i + 1}`}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <p className="text-white/90 text-sm lg:text-base">
                                    Customer experiences that speaks for themselves
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Testimonial Card - 8 columns, no border */}
                        <motion.div
                            className="lg:col-span-8 relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Testimonial Tag */}
                            <motion.div className="mb-6" variants={itemVariants}>
                                <div
                                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full border-2"
                                    style={{
                                        borderColor: 'var(--accent-secondary-color)',
                                        background: 'var(--secondary)',
                                    }}
                                >
                                    <Image
                                        src="/logos/ires-logo.svg"
                                        alt="iRES Logo"
                                        width={16}
                                        height={16}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm font-medium text-white">Testimonials</span>
                                </div>
                            </motion.div>

                            {/* Testimonial Content */}
                            <motion.div className="space-y-6" variants={itemVariants}>
                                <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                                    {testimonials[currentTestimonial].text}
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonials[currentTestimonial].avatar}
                                            alt={testimonials[currentTestimonial].author}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">
                                            {testimonials[currentTestimonial].author}
                                        </div>
                                        <div className="text-white/70 text-sm">
                                            {testimonials[currentTestimonial].position}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Navigation Arrows - Bottom Right */}
                            <motion.div
                                className="absolute bottom-8 right-8 flex gap-2"
                                variants={itemVariants}
                            >
                                <button
                                    onClick={prevTestimonial}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))'
                                    }}
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))'
                                    }}
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Call Now Button */}
                    <motion.div
                        className="flex justify-center"
                        variants={itemVariants}
                    >
                        <Button
                            href="tel:+1234567890"
                            className="flex items-center gap-3 px-8 py-4 text-lg rounded-xl"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Now
                        </Button>
                    </motion.div>
                </motion.div>
            </Section>
        </div>
    )
}
