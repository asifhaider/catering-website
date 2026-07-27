import { useRef, useState, type FormEvent } from 'react'
import { usePageTitle } from '../utils/usePageTitle'

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/homestylecatering', initials: 'IG' },
  { name: 'Facebook', href: 'https://facebook.com/homestylecatering', initials: 'FB' },
  { name: 'X', href: 'https://x.com/homestylecater', initials: 'X' },
]

interface FormState {
  name: string
  email: string
  message: string
}

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  usePageTitle('Contact Us')

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const confirmationRef = useRef<HTMLHeadingElement>(null)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const found: FieldErrors = {}
    if (!form.name.trim()) found.name = 'Name is required.'
    if (!form.email.trim()) {
      found.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      found.email = 'Enter a valid email address.'
    }
    if (!form.message.trim()) found.message = 'Message is required.'

    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSubmitted(true)
    requestAnimationFrame(() => confirmationRef.current?.focus())
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Contact Us</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Follow us</h2>
        <ul className="mt-3 flex list-none gap-3 p-0">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.name} (opens in a new tab)`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-sm font-semibold text-stone-800 hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
              >
                <span aria-hidden="true">{social.initials}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Call us</h2>
        <p className="mt-2 text-stone-700">
          <a href="tel:+15552468100" className="text-amber-800 hover:underline">
            (555) 246-8100
          </a>
        </p>
      </section>

      <section className="mt-6 max-w-md">
        <h2 className="text-lg font-semibold text-stone-900">Send us a message</h2>

        {submitted ? (
          <div role="status" className="mt-4 rounded-md border border-green-700 bg-green-50 p-4">
            <h3 ref={confirmationRef} tabIndex={-1} className="font-semibold text-green-900 focus:outline-none">
              Message sent
            </h3>
            <p className="mt-1 text-green-900">Thanks for reaching out — we'll get back to you soon.</p>
          </div>
        ) : (
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-stone-800">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                aria-invalid={errors.name ? true : undefined}
                className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1 text-sm font-medium text-red-700">
                  Error: {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-stone-800">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                aria-invalid={errors.email ? true : undefined}
                className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1 text-sm font-medium text-red-700">
                  Error: {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-stone-800">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                aria-invalid={errors.message ? true : undefined}
                className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1 text-sm font-medium text-red-700">
                  Error: {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="min-h-[44px] w-fit rounded-md bg-amber-800 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
            >
              Send message
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
