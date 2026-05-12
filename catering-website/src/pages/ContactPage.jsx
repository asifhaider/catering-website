import { useState } from 'react'

const CONTACT_INFO = [
  { icon: '📞', label: 'Phone', value: '(555) 234-5678', href: 'tel:+15552345678' },
  { icon: '✉️', label: 'Email', value: 'hello@mamastable.com', href: 'mailto:hello@mamastable.com' },
  { icon: '📍', label: 'Address', value: '123 Oak Street, Springfield, IL 62701', href: 'https://maps.google.com' },
  { icon: '🕐', label: 'Pickup Hours', value: 'Monday – Saturday, 11am – 7pm', href: null },
]

const SOCIAL = [
  {
    name: 'Instagram',
    handle: '@mamastable',
    href: 'https://instagram.com/mamastable',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: 'hover:text-pink-600',
  },
  {
    name: 'Facebook',
    handle: 'facebook.com/mamastable',
    href: 'https://facebook.com/mamastable',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: 'hover:text-blue-600',
  },
  {
    name: 'WhatsApp',
    handle: '+1 (555) 234-5678',
    href: 'https://wa.me/15552345678',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.518 5.855L.057 23.882a.5.5 0 00.611.611l6.027-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.681-.51-5.21-1.4l-.374-.215-3.576.867.884-3.493-.234-.382A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    color: 'hover:text-green-600',
  },
]

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-shadow bg-white'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (!form.subject.trim()) errs.subject = 'Required'
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Please write at least 10 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    // Simulate submission
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-warm-400 text-sm font-semibold uppercase tracking-widest mb-2">We'd love to hear from you</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-brand-200 text-lg max-w-xl">
            Have a question about our menu, a special request for your event, or just want to say hello?
            We're a small team and we personally respond to every message.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact cards */}
            <div className="space-y-4">
              {CONTACT_INFO.map(item => (
                <div key={item.label} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer"
                        className="text-sm font-medium text-gray-900 hover:text-brand-700 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="space-y-3">
                {SOCIAL.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-3 text-gray-600 ${s.color} transition-colors group`}
                  >
                    <span className="text-gray-400 group-hover:text-current transition-colors">{s.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time note */}
            <div className="bg-warm-50 border border-warm-200 rounded-2xl p-4 text-sm text-warm-700">
              <strong>⏱ Response time:</strong> We typically respond within 24 hours. For urgent event inquiries,
              please call or WhatsApp us directly.
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">💌</div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Message sent!</h2>
                <p className="text-gray-500 max-w-sm">
                  Thank you, {form.name.split(' ')[0]}! We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-6 text-brand-700 font-medium text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" placeholder="Your name" value={form.name}
                        onChange={e => set('name', e.target.value)} className={inputClass} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => set('email', e.target.value)} className={inputClass} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)} className={inputClass + ' cursor-pointer'}>
                      <option value="">Select a topic…</option>
                      <option>General Inquiry</option>
                      <option>Order Question</option>
                      <option>Event / Large Group</option>
                      <option>Feedback</option>
                      <option>Dietary & Allergy Question</option>
                      <option>Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us about your event, any special dietary needs, questions about our menu, or anything else on your mind…"
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      className={inputClass + ' resize-none'}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md"
                  >
                    Send Message →
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
