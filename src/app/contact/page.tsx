'use client'

import { useState } from 'react'
import PublicLayout  from '@/components/layout/PublicLayout'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const contactInfo = [
    {
        name: 'Email',
        description: 'Get in touch with our team',
        icon: EnvelopeIcon,
        value: 'contact@ires.org',
        href: 'mailto:contact@ires.org',
    },
    {
        name: 'Phone',
        description: 'Call us directly',
        icon: PhoneIcon,
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
    },
    {
        name: 'Office',
        description: 'Visit our headquarters',
        icon: MapPinIcon,
        value: '123 Emergency Lane, Response City, RC 12345',
        href: 'https://maps.google.com',
    },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement form submission
        console.log('Form submitted:', formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <PublicLayout>
            <div className="bg-white dark:bg-gray-900">
                {/* Header */}
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 dark:from-primary-900/20">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                Contact Us
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Have questions about our services or want to learn more about becoming a responder?
                                We&apos;re here to help.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact form and info */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                            {/* Contact form */}
                            <div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                            Phone
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                            Subject
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="subject"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="responder">Become a Responder</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                                <option value="support">Technical Support</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                            Message
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Contact information */}
                            <div className="lg:pl-8">
                                <h2 className="text-base font-semibold leading-7 text-primary-600">Get in touch</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                    We&apos;re here to help
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                    Have questions about our services or want to learn more about becoming a responder?
                                    Reach out to us through any of these channels.
                                </p>
                                <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                                    {contactInfo.map((item) => (
                                        <div key={item.name} className="flex gap-x-4">
                                            <dt className="flex-none">
                                                <span className="sr-only">{item.name}</span>
                                                <item.icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                            </dt>
                                            <dd>
                                                <a
                                                    href={item.href}
                                                    className="hover:text-primary-600 dark:hover:text-primary-400"
                                                >
                                                    {item.value}
                                                </a>
                                                <p className="mt-1">{item.description}</p>
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
} 