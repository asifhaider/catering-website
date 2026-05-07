import { useState, useEffect, useId } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { business, contactFormSubjects } from '../data/business'

export default function ContactPage() {
  const formId = useId()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact — Zara\'s Kitchen'
  }, [])

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Your name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.subject) errs.subject = 'Please select a subject.'
    if (!form.message.trim()) {
      errs.message = 'Please write your message.'
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      document.getElementById(`${formId}-${firstKey}`)?.focus()
      return
    }
    // In a real implementation, send to an API endpoint
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Contact' }]} />

      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container">
          <div className="page-hero" style={{ textAlign: 'left', background: 'none', padding: '0 0 var(--space-8) 0', border: 'none' }}>
            <h1 className="page-hero__title" style={{ textAlign: 'left' }}>Contact Us</h1>
            <p className="page-hero__subtitle" style={{ textAlign: 'left', marginInline: 0 }}>
              We'd love to hear from you. Reach out for inquiries, large event catering,
              or any questions about our menu.
            </p>
          </div>

          <div className="contact-layout">
            {/* Contact info */}
            <aside aria-label="Contact information">
              <section aria-labelledby="contact-methods-heading">
                <h2 id="contact-methods-heading" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-xl)' }}>
                  Get in Touch
                </h2>

                {/* Phone */}
                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">📞</span>
                  <div>
                    <div className="contact-info__label">Phone</div>
                    <div className="contact-info__value">
                      <a
                        href={`tel:${business.contact.phonePlain}`}
                        aria-label={`Call us at ${business.contact.phone}`}
                      >
                        {business.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">💬</span>
                  <div>
                    <div className="contact-info__label">
                      <abbr title="WhatsApp">WhatsApp</abbr>
                    </div>
                    <div className="contact-info__value">
                      <a
                        href={`https://wa.me/${business.contact.whatsappPlain}`}
                        rel="noopener noreferrer"
                        aria-label={`Message us on WhatsApp at ${business.contact.whatsapp}`}
                      >
                        {business.contact.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">✉️</span>
                  <div>
                    <div className="contact-info__label">Email</div>
                    <div className="contact-info__value">
                      <a
                        href={`mailto:${business.contact.email}`}
                        aria-label={`Email us at ${business.contact.email}`}
                      >
                        {business.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">📍</span>
                  <div>
                    <div className="contact-info__label">Pickup Location</div>
                    <address className="contact-info__value" style={{ fontStyle: 'normal' }}>
                      {business.address.street}<br />
                      {business.address.city}, {business.address.province}<br />
                      {business.address.postalCode}
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">🕐</span>
                  <div>
                    <div className="contact-info__label">Pickup Hours</div>
                    <div className="contact-info__value">
                      {business.hours.orderPickup}<br />
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                        {business.hours.orderDeadline}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Social media */}
              <section aria-labelledby="social-heading" style={{ marginTop: 'var(--space-8)' }}>
                <h2 id="social-heading" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' }}>
                  Follow Us
                </h2>

                <div className="social-links">
                  <a
                    href={business.social.instagram.url}
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Follow us on Instagram, ${business.social.instagram.handle}`}
                  >
                    <span aria-hidden="true">📸</span>
                    Instagram
                  </a>
                  <a
                    href={business.social.facebook.url}
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Visit our Facebook page, ${business.social.facebook.handle}`}
                  >
                    <span aria-hidden="true">👍</span>
                    Facebook
                  </a>
                  <a
                    href={business.social.tiktok.url}
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Watch us on TikTok, ${business.social.tiktok.handle}`}
                  >
                    <span aria-hidden="true">🎵</span>
                    TikTok
                  </a>
                </div>
              </section>
            </aside>

            {/* Contact form */}
            <section aria-labelledby="form-heading">
              <h2 id="form-heading" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-5)' }}>
                Send a Message
              </h2>

              {submitted ? (
                <div
                  className="alert alert--success"
                  role="alert"
                  aria-live="assertive"
                  style={{ padding: 'var(--space-6)' }}
                >
                  <span className="alert__icon" aria-hidden="true">✅</span>
                  <div>
                    <strong style={{ fontSize: 'var(--font-size-lg)' }}>
                      Message Sent!
                    </strong>
                    <p style={{ marginTop: 'var(--space-2)', maxWidth: 'unset' }}>
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      style={{ marginTop: 'var(--space-4)' }}
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  {Object.keys(errors).length > 0 && (
                    <div
                      className="alert alert--error"
                      role="alert"
                      aria-live="assertive"
                      style={{ marginBottom: 'var(--space-5)' }}
                    >
                      <span className="alert__icon" aria-hidden="true">✕</span>
                      <div>
                        <strong>Please correct the following:</strong>
                        <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                          {Object.values(errors).map((msg, i) => (
                            <li key={i}>{msg}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor={`${formId}-name`} className="form-label form-label--required">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id={`${formId}-name`}
                        className="form-input"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        autoComplete="name"     /* SC 1.3.5 */
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                      />
                      {errors.name && (
                        <span id={`${formId}-name-error`} className="form-error" role="alert">
                          <span aria-hidden="true">✕</span> {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor={`${formId}-email`} className="form-label form-label--required">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id={`${formId}-email`}
                        className="form-input"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        autoComplete="email"    /* SC 1.3.5 */
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                        inputMode="email"
                      />
                      {errors.email && (
                        <span id={`${formId}-email-error`} className="form-error" role="alert">
                          <span aria-hidden="true">✕</span> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone (optional) */}
                    <div className="form-group">
                      <label htmlFor={`${formId}-phone`} className="form-label">
                        Phone Number{' '}
                        <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        id={`${formId}-phone`}
                        className="form-input"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        autoComplete="tel"      /* SC 1.3.5 */
                        aria-invalid={!!errors.phone}
                        inputMode="tel"
                      />
                    </div>

                    {/* Subject */}
                    <div className="form-group">
                      <label htmlFor={`${formId}-subject`} className="form-label form-label--required">
                        Subject
                      </label>
                      <select
                        id={`${formId}-subject`}
                        className="form-select"
                        value={form.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
                      >
                        <option value="">— Select a subject —</option>
                        {contactFormSubjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && (
                        <span id={`${formId}-subject-error`} className="form-error" role="alert">
                          <span aria-hidden="true">✕</span> {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor={`${formId}-message`} className="form-label form-label--required">
                        Message
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        className="form-textarea"
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        rows={6}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={`${formId}-message-hint${errors.message ? ` ${formId}-message-error` : ''}`}
                        placeholder="Tell us about your event, how many people you're expecting, any dietary requirements…"
                      />
                      <span id={`${formId}-message-hint`} className="form-hint">
                        Minimum 10 characters. Include event details for faster assistance.
                      </span>
                      {errors.message && (
                        <span id={`${formId}-message-error`} className="form-error" role="alert">
                          <span aria-hidden="true">✕</span> {errors.message}
                        </span>
                      )}
                    </div>

                    <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
