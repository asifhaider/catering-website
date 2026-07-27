import { useState, type FormEvent } from 'react'
import { businessInfo, contactInfo } from '../data/business'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Contact() {
  useDocumentTitle(`Contact — ${businessInfo.name}`)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'A valid email is required.'
    }
    if (!form.message.trim()) newErrors.message = 'Please enter a message.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-warm-brown">Contact Us</h1>
      <p className="mt-2 text-warm-brown/80">
        Have a question about catering? We&apos;d love to hear from you.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="font-display text-xl font-semibold text-warm-brown">
            Get in Touch
          </h2>

          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-warm-brown">Phone</dt>
              <dd>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  style={{ color: '#a34a1e' }}
                >
                  {contactInfo.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-warm-brown">Email</dt>
              <dd>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  style={{ color: '#a34a1e' }}
                >
                  {contactInfo.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-warm-brown">Address</dt>
              <dd className="text-warm-brown/90">{contactInfo.address}</dd>
            </div>
            <div>
              <dt className="font-medium text-warm-brown">Hours</dt>
              <dd className="text-warm-brown/90">{contactInfo.hours}</dd>
            </div>
          </dl>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-warm-brown/80">
            Follow Us
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                style={{ color: '#a34a1e' }}
              >
                Instagram
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                style={{ color: '#a34a1e' }}
              >
                Facebook
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={contactInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                style={{ color: '#a34a1e' }}
              >
                Twitter / X
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="font-display text-xl font-semibold text-warm-brown">
            Send a Message
          </h2>

          {submitted ? (
            <p role="status" className="mt-4 rounded-lg bg-sage/15 p-4 text-sm" style={{ color: '#4a5d42' }}>
              Thank you for your message! We&apos;ll get back to you within 1–2 business days.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
              <ContactField
                id="contact-name"
                label="Your name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                error={errors.name}
                required
              />
              <ContactField
                id="contact-email"
                label="Email address"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                error={errors.email}
                required
              />
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-warm-brown">
                  Message
                  <span aria-hidden="true" className="text-red-700"> *</span>
                  <span className="sr-only"> (required)</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  required
                  className="mt-1 block w-full rounded-lg border border-warm-brown/20 px-3 py-2.5 text-warm-brown focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-1 text-sm text-red-700">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-terracotta py-3 text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}

interface ContactFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  autoComplete?: string
}

function ContactField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  required,
  autoComplete,
}: ContactFieldProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-warm-brown">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-red-700"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-describedby={errorId}
        aria-invalid={error ? true : undefined}
        required={required}
        className="mt-1 block w-full rounded-lg border border-warm-brown/20 px-3 py-2.5 text-warm-brown focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
