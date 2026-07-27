"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="flex-1">
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Have questions or want to place a special order? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section aria-labelledby="reach-heading">
              <h2 id="reach-heading" className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <dt className="font-medium text-gray-900">Address</dt>
                    <dd className="text-sm text-gray-600">123 Flavor Street, Foodtown, CA 90210</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div>
                    <dt className="font-medium text-gray-900">Phone</dt>
                    <dd className="text-sm"><a href="tel:+15551234567" className="text-amber-700 hover:underline">(555) 123-4567</a></dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div>
                    <dt className="font-medium text-gray-900">Email</dt>
                    <dd className="text-sm"><a href="mailto:hello@mamaskitchen.com" className="text-amber-700 hover:underline">hello@mamaskitchen.com</a></dd>
                  </div>
                </div>
              </dl>
            </section>

            <section aria-labelledby="social-heading">
              <h2 id="social-heading" className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
              <div className="flex gap-4">
                {[
                  { label: "Facebook", href: "https://facebook.com", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                  { label: "Instagram", href: "https://instagram.com", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z" },
                  { label: "Twitter / X", href: "https://x.com", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors min-w-[44px] min-h-[44px]"
                    aria-label={`Visit our ${s.label} page`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </section>

            <section aria-labelledby="hours-heading">
              <h2 id="hours-heading" className="text-xl font-bold text-gray-900 mb-4">Hours</h2>
              <dl className="text-sm space-y-1">
                <div className="flex justify-between"><dt>Monday - Friday</dt><dd>8:00 AM - 6:00 PM</dd></div>
                <div className="flex justify-between"><dt>Saturday</dt><dd>9:00 AM - 4:00 PM</dd></div>
                <div className="flex justify-between"><dt>Sunday</dt><dd>10:00 AM - 2:00 PM</dd></div>
              </dl>
            </section>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            {submitted && (
              <div role="status" className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                Thank you! Your message has been sent. We&apos;ll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input id="contact-name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="contact-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" autoComplete="email" />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input id="contact-subject" type="text" required value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="contact-message" rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <button type="submit" className="w-full bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors min-h-[44px]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
