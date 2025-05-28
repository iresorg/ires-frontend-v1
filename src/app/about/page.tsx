'use client'

import Link from 'next/link'
import PublicLayout from '@/components/layout/PublicLayout'
import {
    ShieldCheckIcon,
    HeartIcon,
    AcademicCapIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline'

const values = [
    {
        name: 'Safety First',
        description: 'We prioritize the safety and well-being of both responders and those in need.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Community Impact',
        description: 'We believe in making a positive difference in our communities through rapid response.',
        icon: HeartIcon,
    },
    {
        name: 'Professional Excellence',
        description: 'We maintain the highest standards of training and professional conduct.',
        icon: AcademicCapIcon,
    },
    {
        name: 'Global Reach',
        description: 'We work to expand our network of responders to serve communities worldwide.',
        icon: GlobeAltIcon,
    },
]

export default function AboutPage() {
    return (
        <PublicLayout>
            {/* Hero section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 dark:from-primary-900/20">
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            About IRES
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            We are dedicated to revolutionizing emergency response through technology and community
                            collaboration. Our mission is to ensure that help is always just a moment away.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Our Mission</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Rapid Response, Reliable Service
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        IRES was founded with a simple yet powerful vision: to create a world where emergency
                        assistance is always within reach. We combine cutting-edge technology with a network of
                        trained professionals to provide rapid response in emergency situations.
                    </p>
                </div>
            </div>

            {/* Values section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Our Values</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        What Drives Us
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {values.map((value) => (
                            <div key={value.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <value.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    {value.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">{value.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Team section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Our Team</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        The People Behind IRES
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Our team consists of experienced emergency response professionals, technology experts, and
                        community leaders who are passionate about making a difference. Together, we work to ensure
                        that our platform serves communities effectively and efficiently.
                    </p>
                </div>
            </div>

            {/* Join section */}
            <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Join Our Mission
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Whether you&apos;re a trained responder looking to make a difference or an organization
                        interested in partnering with us, we&apos;d love to hear from you.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/responders"
                            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                            Become a Responder
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                        >
                            Contact us <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
