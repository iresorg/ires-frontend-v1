'use client'

import Link from 'next/link'
import PublicLayout from '@/components/layout/PublicLayout'
import {
    ShieldCheckIcon,
    UserGroupIcon,
    ClockIcon,
    MapIcon,
    DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

const benefits = [
    {
        name: 'Professional Development',
        description: 'Access to ongoing training and certification programs to enhance your skills.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Community Impact',
        description: 'Make a real difference in your community by helping those in need.',
        icon: UserGroupIcon,
    },
    {
        name: 'Flexible Schedule',
        description: 'Choose when and where you want to respond based on your availability.',
        icon: ClockIcon,
    },
    {
        name: 'Advanced Tools',
        description: 'Access to state-of-the-art emergency response technology and resources.',
        icon: DevicePhoneMobileIcon,
    },
    {
        name: 'Network Growth',
        description: 'Connect with other professionals in the emergency response field.',
        icon: UserGroupIcon,
    },
    {
        name: 'Location Freedom',
        description: 'Respond to incidents in your area or travel to where help is needed most.',
        icon: MapIcon,
    },
]

const requirements = [
    'Valid emergency response certification',
    'Background check clearance',
    'Minimum 2 years of experience',
    'Reliable transportation',
    'Strong communication skills',
    'Ability to work under pressure',
]

export default function RespondersPage() {
    return (
        <PublicLayout>
            <div className="bg-white dark:bg-gray-900">
                {/* Hero section */}
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 dark:from-primary-900/20">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                Join Our Network of Responders
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Be part of a community dedicated to saving lives and making a difference. Join IRES as a
                                responder and help us build a safer, more prepared world.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link
                                    href="/contact"
                                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    Apply Now
                                </Link>
                                <Link
                                    href="#requirements"
                                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                                >
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits section */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Why Join IRES?
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            As an IRES responder, you&apos;ll have access to a range of benefits designed to support your
                            professional growth and maximize your impact.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.name}
                                className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 xl:p-10"
                            >
                                <div>
                                    <div className="flex items-center gap-x-4">
                                        <benefit.icon
                                            className="h-7 w-7 flex-none text-primary-600"
                                            aria-hidden="true"
                                        />
                                        <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                                            {benefit.name}
                                        </h3>
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements section */}
                <div id="requirements" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Requirements
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            To join our network of responders, you&apos;ll need to meet the following requirements:
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-white p-8 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <ul role="list" className="space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {requirements.map((requirement) => (
                                <li key={requirement} className="flex gap-x-3">
                                    <svg
                                        className="h-6 w-5 flex-none text-primary-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {requirement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA section */}
                <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Ready to make a difference?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Join our network of responders and help save lives in your community. We provide training,
                            support, and the tools you need to be effective.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/contact"
                                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Apply Now
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
            </div>
        </PublicLayout>
    )
} 