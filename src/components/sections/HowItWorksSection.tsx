'use client'

import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
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

const processSteps = [
    {
        icon: "/icons/phone.svg",
        title: "Contact us",
        description: "Reach us instantly through our hotline or online form",
        highlight: "24/7"
    },
    {
        icon: "/icons/laptop.svg",
        title: "We Investigate",
        description: "Our cyber responders analyze your incident & outline the best",
        highlight: "solution"
    },
    {
        icon: "/icons/shield.svg",
        title: "We Take Action",
        description: "We contain threats, recover accounts, secure data and block",
        highlight: "attackers"
    },
    {
        icon: "/icons/lock.svg",
        title: "Stay Protected",
        description: "We close the case, strengthen your defenses and give",
        highlight: "tips"
    }
]

const serviceCards = [
    {
        title: "SignUp",
        description: "Creating an account with us is your first step to experiencing protection.",
        buttonText: "Sign Up",
        buttonHref: "/signup"
    },
    {
        title: "Subscribe To A Plan",
        description: "Subscribe to a suitable and affordable plan to get help from us.",
        buttonText: "Explore Plans",
        buttonHref: "/pricing"
    },
    {
        title: "Call Hotline",
        description: "Put a call through our hotline, for all your cyber emergencies, we're available 24/7",
        buttonText: "Call Now",
        buttonHref: "tel:+1234567890"
    },
    {
        title: "Stay Safe",
        description: "Our team resolves your emergencies, we continue to update you with tips to keep you protected",
        buttonText: "Sign Up",
        buttonHref: "/signup"
    }
]

export default function HowItWorksSection() {
    return (
        <div className="relative w-full py-12 lg:py-16">
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
                            title="How It Works"
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
                                Learn
                            </motion.span>
                            how our system works
                        </h2>
                    </motion.div>

                    {/* Process Flow */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Process Card */}
                                <motion.div
                                    className="relative p-6 lg:p-8 rounded-3xl border border-transparent bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm text-center"
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
                                    {/* Icon */}
                                    <motion.div
                                        className="flex justify-center mb-4"
                                        variants={itemVariants}
                                    >
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center">
                                            <Image
                                                src={step.icon}
                                                alt={`${step.title} icon`}
                                                width={32}
                                                height={32}
                                                className="w-full h-full text-white"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h3
                                        className="text-lg lg:text-xl font-bold text-white mb-3"
                                        variants={itemVariants}
                                    >
                                        {step.title}
                                    </motion.h3>

                                    {/* Description */}
                                    <motion.p
                                        className="text-white/90 text-sm lg:text-base leading-relaxed"
                                        variants={itemVariants}
                                    >
                                        {step.description}{' '}
                                        <span
                                            className="font-bold bg-clip-text text-transparent"
                                            style={{
                                                backgroundImage: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            {step.highlight}
                                        </span>
                                        .
                                    </motion.p>
                                </motion.div>

                                {/* Arrow (except for last card) */}
                                {index < processSteps.length - 1 && (
                                    <motion.div
                                        className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10"
                                        variants={itemVariants}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* To Use Our Services Section */}
                    <motion.div className="space-y-12" variants={containerVariants}>
                        {/* Header */}
                        <motion.div className="text-start space-y-4" variants={itemVariants}>
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
                                    To Use
                                </motion.span>
                                Our Services
                            </h2>
                        </motion.div>

                        {/* Service Cards Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {serviceCards.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="relative p-6 lg:p-8 rounded-3xl border border-transparent bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
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
                                    {/* Title */}
                                    <motion.h3
                                        className="text-lg lg:text-xl font-bold mb-4"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent-secondary-color), var(--accent-color))',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                        variants={itemVariants}
                                    >
                                        {service.title}
                                    </motion.h3>

                                    {/* Description */}
                                    <motion.p
                                        className="text-white/90 text-sm lg:text-base leading-relaxed mb-6"
                                        variants={itemVariants}
                                    >
                                        {service.description}
                                    </motion.p>

                                    {/* Button */}
                                    <motion.div variants={itemVariants}>
                                        <Button
                                            href={service.buttonHref}
                                            className="w-full px-6 py-3 text-sm lg:text-base rounded-xl"
                                        >
                                            {service.buttonText}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </Section>
        </div>
    )
}
