'use client'

import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import ScrollingTicker from '@/components/sections/ScrollingTicker'
import {
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Real-time Response',
    description: 'Get immediate assistance from trained responders in emergency situations.',
    icon: ClockIcon,
  },
  {
    name: 'Verified Responders',
    description: 'All our responders are thoroughly vetted and professionally trained.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Community Driven',
    description: 'Join a network of dedicated professionals committed to helping others.',
    icon: UserGroupIcon,
  },
  {
    name: 'Data-Driven Insights',
    description: 'Access comprehensive analytics and reporting for better decision making.',
    icon: ChartBarIcon,
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollingTicker />

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Faster Response</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to handle emergencies
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our platform combines cutting-edge technology with a network of trained professionals to provide
            rapid response in emergency situations.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col rounded-xl shadow p-6 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center rounded-xl shadow bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to make a difference?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8">
            Join our network of responders and help save lives in your community. We provide training,
            support, and the tools you need to be effective.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/responders"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Become a Responder
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6"
            >
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
