import { useState, useEffect } from 'react'

const CONTACT_INFO = [
  { icon: '📞', label: 'Phone',        value: '(555) 234-5678',                href: 'tel:+15552345678' },
  { icon: '✉️', label: 'Email',        value: 'hello@mamastable.com',           href: 'mailto:hello@mamastable.com' },
  { icon: '📍', label: 'Address',      value: '123 Oak Street, Springfield, IL 62701', href: 'https://maps.google.com/?q=123+Oak+Street+Springfield+IL' },
  { icon: '🕐', label: 'Pickup Hours', value: 'Monday – Saturday, 11am – 7pm', href: null },
]

const SOCIAL = [
  {
    name: 'Instagram',
    handle: '@mamastable',
    href: 'https://instagram.com/mamastable',
    icon: (
      <svg aria-hidden="true" focusable="false" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: 'hover:text-pink-700',
  },
  {
    name: 'Facebook',
    handle: 'facebook.com/mamastable',
    href: 'https://facebook.com/mamastable',
    icon: (
      <svg aria-hidden="true" focusable="false" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: 'hover:text-blue-700',
  },
  {
    name: 'WhatsApp',
    handle: '+1 (555) 234-5678',
    href: 'https://wa.me/15552345678',
    icon: (
      <svg aria-hidden="true" focusable="false" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.518 5.855L.057 23.882a.5.5 0 00.611.611l6.027-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.681-.51-5.21-1.4l-.374-.215-3.576.867.884-3.493-.234-.382A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    color: 'hover:text-green-700',
  },
]

const inputClass = 'w-full border border-gray-500 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-700 focus:border-transparent outline-none transition-shadow bg-white'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // SC 2.4.2 – update page title for this route
  useEffect(() => {
    document.title = 'Contact – Mama\'s Table'
  }, [])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Your name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'A valid email address is required'
    if (!form.subject.trim()) errs.subject = 'Please select a subject'
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Please write at least 10 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* SC 1.4.3 – white on brand-900 ≈ 8.75:1 (AAA) */}
          <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">We'd love to hear from you</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-white text-lg max-w-xl">
            Have a question about our menu, a special request for your event, or just want to say hello?
            We're a small team and we personally respond to every message.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Left: contact info ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact cards */}
            <ul className="space-y-4 list-none" aria-label="Contact information">
              {CONTACT_INFO.map(item => (
                <li key={item.label} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                  {/* SC 1.1.1 – decorative emoji hidden; label text conveys the info */}
                  <span aria-hidden="true" className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        aria-label={item.href.startsWith('http') ? `${item.value} (opens in new tab)` : undefined}
                        className="text-sm font-medium text-gray-900 hover:text-brand-900 transition-colors hover:underline underline-offset-2"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Follow Us</h2>
              <ul className="space-y-3 list-none">
                {SOCIAL.map(s => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      /* SC 2.4.4 / 2.4.9 – link purpose is clear from accessible name */
                      aria-label={`${s.name}: ${s.handle} (opens in new tab)`}
                      className={`flex items-center gap-3 text-gray-700 ${s.color} transition-colors group hover:underline underline-offset-2`}
                    >
                      <span className="text-gray-500 group-hover:text-current transition-colors">{s.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-gray-600">{s.handle}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="bg-warm-50 border border-warm-200 rounded-2xl p-4 text-sm text-warm-800" role="note">
              <span aria-hidden="true">⏱</span>{' '}
              <strong>Response time:</strong> We typically respond within 24 hours. For urgent event inquiries,
              please call or <abbr title="WhatsApp">WA</abbr> us directly.
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center h-full flex flex-col items-center justify-center"
                role="status"
                aria-live="polite"
              >
                <div aria-hidden="true" className="text-6xl mb-4">💌</div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Message sent!</h2>
                <p className="text-gray-700 max-w-sm">
                  Thank you, {form.name.split(' ')[0]}! We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-6 text-brand-900 font-medium text-sm hover:underline underline-offset-2 min-h-[44px] px-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>

                {/* SC 3.3.2 – required field notice */}
                <p className="text-sm text-gray-700 mb-5">
                  Fields marked with <span className="text-red-600 font-bold" aria-hidden="true"> *</span>
                  <span className="sr-only"> (asterisk)</span> are required.
                </p>

                {/* SC 4.1.2 – form-level error summary */}
                {hasErrors && (
                  <div role="alert" className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 font-semibold text-sm mb-1">Please correct the following errors:</p>
                    <ul className="list-disc list-inside text-red-600 text-sm space-y-0.5">
                      {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      {/* SC 1.3.1 / 4.1.2 – explicit label association */}
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-800 mb-1">
                        Name <span className="text-red-600" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        aria-required="true"
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        /* SC 1.3.5 – autocomplete token */
                        autoComplete="name"
                        className={inputClass}
                      />
                      {errors.name && (
                        <p id="contact-name-error" role="alert" className="text-red-600 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-800 mb-1">
                        Email <span className="text-red-600" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        aria-required="true"
                        aria-invalid={errors.email ? 'true' : undefined}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        autoComplete="email"
                        className={inputClass}
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="text-red-600 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-800 mb-1">
                      Subject <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={e => set('subject', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.subject ? 'true' : undefined}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      autoComplete="off"
                      className={inputClass + ' cursor-pointer'}
                    >
                      <option value="">Select a topic…</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Question">Order Question</option>
                      <option value="Event / Large Group">Event / Large Group</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Dietary & Allergy Question">Dietary &amp; Allergy Question</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p id="contact-subject-error" role="alert" className="text-red-600 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-800 mb-1">
                      Message <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      placeholder="Tell us about your event, any special dietary needs, questions about our menu, or anything else on your mind…"
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.message ? 'true' : undefined}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      autoComplete="off"
                      className={inputClass + ' resize-none'}
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="text-red-600 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* SC 2.5.5 – min 44px */}
                  <button
                    type="submit"
                    className="w-full bg-brand-900 hover:bg-brand-800 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md min-h-[44px]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
