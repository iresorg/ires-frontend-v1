'use client'

import Link from 'next/link'
import PublicLayout from '@/components/layout/PublicLayout'
import { CheckIcon } from '@heroicons/react/24/outline'

const tiers = [
    {
        name: 'Basic',
        id: 'tier-basic',
        price: { monthly: '$49' },
        description: 'Essential emergency response features for small organizations.',
        features: [
            'Up to 5 responders',
            'Basic incident tracking',
            'Email support',
            'Standard response time',
            'Basic analytics',
        ],
        cta: 'Get started',
        mostPopular: false,
    },
    {
        name: 'Professional',
        id: 'tier-professional',
        price: { monthly: '$99' },
        description: 'Advanced features for growing organizations.',
        features: [
            'Up to 20 responders',
            'Advanced incident tracking',
            'Priority support',
            'Faster response time',
            'Advanced analytics',
            'Custom reporting',
            'API access',
        ],
        cta: 'Get started',
        mostPopular: true,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        price: { monthly: 'Custom' },
        description: 'Custom solutions for large organizations.',
        features: [
            'Unlimited responders',
            'Custom incident tracking',
            '24/7 dedicated support',
            'Fastest response time',
            'Custom analytics',
            'Advanced reporting',
            'Full API access',
            'Custom integrations',
            'Dedicated account manager',
        ],
        cta: 'Contact sales',
        mostPopular: false,
    },
]

export default function PricingPage() {
    return (
        <PublicLayout>
            <div className="bg-white dark:bg-gray-900">
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 dark:from-primary-900/20">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                Simple, transparent pricing
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Choose the perfect plan for your organization&apos;s emergency response needs.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-32 lg:px-8">
                    <div className="mx-auto max-w-4xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Monthly subscription
                            </h3>
                            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                                All plans include our core emergency response features. Choose the plan that best fits your
                                organization&apos;s needs.
                            </p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-primary-600">
                                    What&apos;s included
                                </h4>
                                <div className="h-px flex-auto bg-gray-100 dark:bg-gray-700" />
                            </div>
                            <ul
                                role="list"
                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:grid-cols-2 sm:gap-6"
                            >
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    Real-time response tracking
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    Verified responder network
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    Mobile app access
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    Basic incident management
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    Location services
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    Email notifications
                                </li>
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-600 dark:text-gray-300">
                                        Monthly subscription
                                    </p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            $49
                                        </span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">
                                            /month
                                        </span>
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="mt-10 block w-full rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                    >
                                        Get started today
                                    </Link>
                                    <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-gray-300">
                                        Invoices and receipts available for easy company reimbursement
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison */}
                <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Compare plans
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Choose the right plan for your organization&apos;s emergency response needs.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={`relative rounded-2xl p-8 ring-1 ring-gray-200 dark:ring-gray-700 ${tier.mostPopular
                                        ? 'bg-primary-600 text-white shadow-xl'
                                        : 'bg-white dark:bg-gray-800'
                                    }`}
                            >
                                {tier.mostPopular && (
                                    <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1 text-sm font-semibold leading-6 text-white">
                                        Most popular
                                    </div>
                                )}
                                <h3
                                    className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-white' : 'text-gray-900 dark:text-white'
                                        }`}
                                >
                                    {tier.name}
                                </h3>
                                <p
                                    className={`mt-4 text-sm leading-6 ${tier.mostPopular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {tier.description}
                                </p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span
                                        className={`text-4xl font-bold tracking-tight ${tier.mostPopular ? 'text-white' : 'text-gray-900 dark:text-white'
                                            }`}
                                    >
                                        {tier.price.monthly}
                                    </span>
                                    <span
                                        className={`text-sm font-semibold leading-6 ${tier.mostPopular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        /month
                                    </span>
                                </p>
                                <Link
                                    href={tier.id === 'tier-enterprise' ? '/contact' : '/contact'}
                                    className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tier.mostPopular
                                            ? 'bg-white text-primary-600 hover:bg-gray-100 focus-visible:outline-white'
                                            : 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600'
                                        }`}
                                >
                                    {tier.cta}
                                </Link>
                                <ul
                                    role="list"
                                    className={`mt-8 space-y-3 text-sm leading-6 ${tier.mostPopular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                className={`h-6 w-5 flex-none ${tier.mostPopular ? 'text-white' : 'text-primary-600'
                                                    }`}
                                                aria-hidden="true"
                                            />
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