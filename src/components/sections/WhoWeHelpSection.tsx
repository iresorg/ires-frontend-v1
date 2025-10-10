'use client'

import Image from 'next/image'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { motion } from 'framer-motion'

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

export default function WhoWeHelpSection() {
    return (
        <div className="relative w-full py-12 lg:py-16">
            {/* Background shapes */}
            <motion.div
                className="absolute -top-10 right-0 w-40 h-40 lg:w-52 lg:h-52 z-0"
                variants={shapeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                animate={{
                    y: [0, 700, 0],
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
                    src="/shapes/section-bg-shape-1.svg"
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
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            >
                <Image
                    src="/shapes/section-bg-shape-2.svg"
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
                            title="Who We Help"
                        />
                        <h2 className="text-lg lg:text-2xl xl:text-3xl mt-2 lg:mt-6 font-light text-white leading-tight">
                            <motion.span
                                className="font-bold bg-clip-text text-transparent inline-block mr-2"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)',
                                    backgroundSize: '200% auto',
                                }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                transition={{
                                    backgroundPosition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                Users
                            </motion.span>
                            we offer our services and support to
                        </h2>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Individual Card */}
                        <motion.div
                            className="relative p-8 lg:p-10 rounded-3xl border border-transparent bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
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
                            {/* Lock Icon */}
                            <motion.div
                                className="flex justify-center mb-6"
                                variants={itemVariants}
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"

                                >
                                    <Image
                                        src="/icons/lock-ad.svg"
                                        alt="Lock icon"
                                        width={32}
                                        height={32}
                                        className="w-full h-full text-white"
                                    />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                className="text-2xl lg:text-3xl font-bold text-center mb-6"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-secondary-color), #ff6b9d)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                                variants={itemVariants}
                            >
                                Individual
                            </motion.h3>

                            {/* Description */}
                            <motion.div
                                className="space-y-4 text-white/90 text-sm lg:text-base leading-relaxed"
                                variants={itemVariants}
                            >
                                <p>
                                    We help everyday internet users, high-profile personalities, remote workers,
                                    and anyone facing online threats. Whether you&apos;re dealing with stolen accounts,
                                    online scams, identity theft, or privacy breaches.
                                </p>
                                <p>
                                    Our expert team provides incident investigation, account recovery, stopping
                                    impersonators, and flexible protection plans - from one-off fixes to ongoing
                                    monitoring that keeps you safe 24/7.
                                </p>
                            </motion.div>

                            {/* Button */}
                            <motion.div
                                className="mt-8 flex justify-center"
                                variants={itemVariants}
                            >
                                <Button
                                    href="/individual"
                                    className="px-8 py-3 text-sm lg:text-base rounded-xl"
                                >
                                    Explore More
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Organization Card */}
                        <motion.div
                            className="relative p-8 lg:p-10 rounded-3xl border border-transparent bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
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
                            {/* Lock Icon */}
                            <motion.div
                                className="flex justify-center mb-6"
                                variants={itemVariants}
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                >
                                    <Image
                                        src="/icons/lock-ad.svg"
                                        alt="Lock icon"
                                        width={32}
                                        height={32}
                                        className="w-full h-full text-white"
                                    />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                className="text-2xl lg:text-3xl font-bold text-center mb-6"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                                variants={itemVariants}
                            >
                                Organization
                            </motion.h3>

                            {/* Description */}
                            <motion.div
                                className="space-y-4 text-white/90 text-sm lg:text-base leading-relaxed"
                                variants={itemVariants}
                            >
                                <p>
                                    We serve small businesses, growing startups, large corporations, and global
                                    enterprises across industries like finance, retail, healthcare, education,
                                    and technology.
                                </p>
                                <p>
                                    From phishing attacks and ransomware to insider threats and data breaches,
                                    we provide quick response to contain damage, secure systems, and prevent
                                    future incidents. Flexible business protection plans for single incidents
                                    or full-scale ongoing security.
                                </p>
                            </motion.div>

                            {/* Button */}
                            <motion.div
                                className="mt-8 flex justify-center"
                                variants={itemVariants}
                            >
                                <Button
                                    href="/organization"
                                    className="px-8 py-3 text-sm lg:text-base rounded-xl"
                                >
                                    Explore More
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </Section>
        </div>
    )
}
