import { useState } from 'react';
import type { ContactFormData } from '../types';
import { contactContent } from '../data/contact';
import PageWrapper from '../components/layout/PageWrapper';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

const empty: ContactFormData = { name: '', email: '', subject: '', message: '' };

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: ContactFormData): Errors {
  const e: Errors = {};
  if (!data.name.trim()) e.name = 'Name is required';
  if (!data.email.trim()) {
    e.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    e.email = 'Please enter a valid email address';
  }
  if (!data.subject.trim()) e.subject = 'Subject is required';
  if (!data.message.trim()) e.message = 'Message is required';
  else if (data.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
  return e;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const update = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const updated = { ...formData, [field]: e.target.value };
    setFormData(updated);
    if (touched) setErrors(validate(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setFormData(empty);
      setTouched(false);
      setErrors({});
    }
  };

  return (
    <PageWrapper title="Contact">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          Get in Touch
        </h1>
        <p className="text-stone-500 max-w-xl">
          Have a question about an order, a special request, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact info column */}
        <aside className="lg:col-span-2 flex flex-col gap-8">
          {/* Direct contact */}
          <section aria-labelledby="contact-details">
            <h2 id="contact-details" className="font-semibold text-stone-900 mb-4">Contact Details</h2>
            <address className="not-italic flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-xs text-stone-500 mb-0.5">Phone</p>
                  <a href={`tel:${contactContent.phone.replace(/\s/g, '')}`} className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                    {contactContent.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-stone-500 mb-0.5">Email</p>
                  <a href={`mailto:${contactContent.email}`} className="text-stone-800 hover:text-amber-700 font-medium transition-colors">
                    {contactContent.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-xs text-stone-500 mb-0.5">Address (pickup only)</p>
                  <p className="text-stone-800 font-medium">{contactContent.address}</p>
                </div>
              </div>
            </address>
          </section>

          {/* Business hours */}
          <section aria-labelledby="business-hours">
            <h2 id="business-hours" className="font-semibold text-stone-900 mb-3">Business Hours</h2>
            <dl className="space-y-2">
              {contactContent.businessHours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-sm">
                  <dt className="text-stone-500">{day}</dt>
                  <dd className="text-stone-800 font-medium">{hours}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Social links */}
          <section aria-labelledby="social-links">
            <h2 id="social-links" className="font-semibold text-stone-900 mb-3">Follow Us</h2>
            <ul className="flex flex-col gap-2">
              {contactContent.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="inline-flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors min-h-[44px]"
                  >
                    <span>→</span>
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Contact form */}
        <div className="lg:col-span-3">
          <section aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="font-semibold text-stone-900 mb-6">Send a Message</h2>

            {/* Success message */}
            <div aria-live="polite" aria-atomic="true">
              {submitted && (
                <div
                  role="status"
                  className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-6 flex items-start gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sage-800">Message sent!</p>
                    <p className="text-sm text-sage-700 mt-0.5">
                      Thank you for reaching out. We'll get back to you within 1 business day.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <FormField id="contact-name" label="Your Name" required error={errors.name}>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={update('name')}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Fatima Nour"
                />
              </FormField>

              <FormField id="contact-email" label="Email Address" required error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={update('email')}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                />
              </FormField>

              <FormField id="contact-subject" label="Subject" required error={errors.subject}>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={update('subject')}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  placeholder="Question about my order"
                />
              </FormField>

              <FormField id="contact-message" label="Message" required error={errors.message}>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={formData.message}
                  onChange={update('message')}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  placeholder="Tell us how we can help…"
                  maxLength={1000}
                />
              </FormField>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Send Message
              </Button>

              <p className="text-xs text-stone-500 text-center">
                <span aria-hidden="true">*</span> Required fields. We won't share your contact information with anyone.
              </p>
            </form>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
