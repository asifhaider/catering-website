import { useState, useId } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { contactData } from '../data/contactData'

function InstagramIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.83a8.18 8.18 0 0 0 4.78 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z"/>
    </svg>
  )
}

const SOCIAL_ICONS = { instagram: InstagramIcon, facebook: FacebookIcon, tiktok: TikTokIcon }

export default function ContactPage() {
  usePageTitle('Contact')
  const formId = useId()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function field(name) {
    return {
      id: `${formId}-${name}`,
      name,
      value: form[name],
      onChange: e => {
        setForm(f => ({ ...f, [name]: e.target.value }))
        if (errors[name]) setErrors(err => ({ ...err, [name]: '' }))
      },
      'aria-invalid': errors[name] ? 'true' : undefined,
      'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
    }
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Subject is required.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErr = Object.keys(errs)[0]
      document.getElementById(`${formId}-${firstErr}`)?.focus()
      return
    }
    setSubmitted(true)
  }

  const inputClass = (name) =>
    `w-full border-2 rounded-lg px-3 py-2.5 text-stone-800 bg-white focus:outline-none focus:border-brand-500 transition-colors min-h-[44px] ${
      errors[name] ? 'border-red-500' : 'border-stone-300'
    }`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">Contact Us</h1>
      <p className="text-stone-500 mb-10">We&apos;d love to hear from you — whether it&apos;s a question, a custom request, or just saying hello.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Left: Contact info */}
        <aside aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="text-xl font-serif font-semibold text-stone-800 mb-5">Get in Touch</h2>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="text-brand-600 text-lg mt-0.5">📞</span>
              <div>
                <p className="text-sm font-medium text-stone-600">Phone</p>
                <a
                  href={`tel:${contactData.phoneTel}`}
                  className="font-semibold text-stone-800 hover:text-brand-700 underline"
                  aria-label={`Call us at ${contactData.phone}`}
                >
                  {contactData.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="text-brand-600 text-lg mt-0.5">✉️</span>
              <div>
                <p className="text-sm font-medium text-stone-600">Email</p>
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-semibold text-stone-800 hover:text-brand-700 underline"
                >
                  {contactData.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="text-brand-600 text-lg mt-0.5">🕐</span>
              <div>
                <p className="text-sm font-medium text-stone-600">Hours</p>
                <p className="font-semibold text-stone-800">{contactData.hours}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden="true" className="text-brand-600 text-lg mt-0.5">📍</span>
              <div>
                <p className="text-sm font-medium text-stone-600">Address</p>
                <p className="font-semibold text-stone-800">{contactData.address}</p>
              </div>
            </li>
          </ul>

          {/* Social links */}
          <section aria-labelledby="social-heading">
            <h3 id="social-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Follow Us
            </h3>
            <ul className="space-y-3" aria-label="Social media links">
              {contactData.social.map(({ platform, handle, url, label, icon }) => {
                const Icon = SOCIAL_ICONS[icon]
                return (
                  <li key={platform}>
                    <a
                      href={url}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-stone-700 hover:text-brand-700 group min-h-[44px]"
                    >
                      <span className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-stone-200 group-hover:border-brand-300 group-hover:text-brand-600 transition-colors flex-shrink-0">
                        {Icon && <Icon />}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{platform}</span>
                        <span className="block text-xs text-stone-500">{handle}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        </aside>

        {/* Right: Contact form */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-xl font-serif font-semibold text-stone-800 mb-5">Send a Message</h2>

          {submitted ? (
            <div role="status" aria-live="polite" className="bg-green-50 border border-green-300 rounded-xl p-6 text-center">
              <p className="text-2xl mb-2" aria-hidden="true">✓</p>
              <p className="font-semibold text-green-800 text-lg">Message sent!</p>
              <p className="text-green-700 text-sm mt-1">
                Thanks, {form.name}. We&apos;ll get back to you within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <p className="text-sm text-stone-500 mb-4">
                Fields marked <span aria-hidden="true" className="text-red-600 font-bold">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-stone-700 mb-1">
                    Name <span aria-hidden="true" className="text-red-600">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    {...field('name')}
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    className={inputClass('name')}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id={`${formId}-name-error`} role="alert" className="mt-1 text-sm text-red-700 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-stone-700 mb-1">
                    Email address <span aria-hidden="true" className="text-red-600">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    {...field('email')}
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    className={inputClass('email')}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p id={`${formId}-email-error`} role="alert" className="mt-1 text-sm text-red-700 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${formId}-subject`} className="block text-sm font-medium text-stone-700 mb-1">
                    Subject <span aria-hidden="true" className="text-red-600">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    {...field('subject')}
                    type="text"
                    autoComplete="off"
                    aria-required="true"
                    className={inputClass('subject')}
                    placeholder="e.g. Custom order enquiry"
                  />
                  {errors.subject && (
                    <p id={`${formId}-subject-error`} role="alert" className="mt-1 text-sm text-red-700 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-stone-700 mb-1">
                    Message <span aria-hidden="true" className="text-red-600">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <textarea
                    {...field('message')}
                    id={`${formId}-message`}
                    rows={5}
                    autoComplete="off"
                    aria-required="true"
                    className={`w-full border-2 rounded-lg px-3 py-2.5 text-stone-800 bg-white focus:outline-none focus:border-brand-500 transition-colors resize-y ${errors.message ? 'border-red-500' : 'border-stone-300'}`}
                    placeholder="Tell us what you have in mind..."
                  />
                  {errors.message && (
                    <p id={`${formId}-message-error`} role="alert" className="mt-1 text-sm text-red-700 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl min-h-[48px] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
