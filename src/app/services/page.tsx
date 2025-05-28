'use client'

import PublicLayout from '@/components/layout/PublicLayout'
import {
    ShieldCheckIcon,
    UserGroupIcon,
    ChartBarIcon,
    ClockIcon,
    MapIcon,
    DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

const services = [
    {
        name: 'Emergency Response',
        description: 'Immediate assistance from trained responders in emergency situations.',
        icon: ClockIcon,
        features: [
            '24/7 availability',
            'Rapid response times',
            'GPS-based location tracking',
            'Real-time status updates',
        ],
    },
    {
        name: 'Verified Responders',
        description: 'Access to a network of thoroughly vetted and professionally trained responders.',
        icon: ShieldCheckIcon,
        features: [
            'Background checks',
            'Professional certifications',
            'Regular training updates',
            'Performance monitoring',
        ],
    },
    {
        name: 'Community Network',
        description: 'Connect with local emergency response teams and community resources.',
        icon: UserGroupIcon,
        features: [
            'Local responder network',
            'Community partnerships',
            'Resource sharing',
            'Collaborative response',
        ],
    },
    {
        name: 'Analytics & Reporting',
        description: 'Comprehensive data insights for better emergency management.',
        icon: ChartBarIcon,
        features: [
            'Response time analytics',
            'Incident tracking',
            'Performance metrics',
            'Resource allocation',
        ],
    },
    {
        name: 'Location Services',
        description: 'Advanced location tracking and mapping for efficient response.',
        icon: MapIcon,
        features: [
            'Real-time location tracking',
            'Route optimization',
            'Area coverage analysis',
            'Resource distribution',
        ],
    },
    {
        name: 'Mobile Integration',
        description: 'Seamless mobile experience for responders and users.',
        icon: DevicePhoneMobileIcon,
        features: [
            'Mobile app access',
            'Push notifications',
            'Offline capabilities',
            'Cross-platform support',
        ],
    },
]

export default function ServicesPage() {
    return (
        <PublicLayout>
            <div className="bg-white dark:bg-gray-900">
                {/* Header */}
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 dark:from-primary-900/20">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                Our Services
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                IRES provides a comprehensive suite of emergency response services designed to ensure rapid,
                                reliable, and professional assistance when it matters most.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services grid */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Comprehensive Emergency Response Solutions
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our platform combines cutting-edge technology with a network of trained professionals to provide
                            the most effective emergency response services available.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
                        {services.map((service) => (
                            <div
                                key={service.name}
                                className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 xl:p-10"
                            >
                                <div>
                                    <div className="flex items-center gap-x-4">
                                        <service.icon
                                            className="h-7 w-7 flex-none text-primary-600"
                                            aria-hidden="true"
                                        />
                                        <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                        {service.description}
                                    </p>
                                </div>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
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
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
} 