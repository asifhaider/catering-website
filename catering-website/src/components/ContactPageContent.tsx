"use client";

import { useId, useState, type FormEvent } from "react";
import { contactContent } from "@/lib/contact-data";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFormState | "summary", string>>;

export default function ContactPageContent() {
  const formId = useId();
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [success, setSuccess] = useState<string | null>(null);

  function updateField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      delete next.summary;
      return next;
    });
    setSuccess(null);
  }

  function validate(): ContactErrors {
    const next: ContactErrors = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Enter a message.";
    if (Object.keys(next).length > 0) {
      next.summary = "Please correct the errors in the form before sending.";
    }
    return next;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccess(null);
      return;
    }

    setErrors({});
    setSuccess(
      "Your message was sent. We’ll get back to you soon. (Demo only — no email is actually delivered.)"
    );
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="contact-layout">
      <article className="section-panel" aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="section-heading">
          Contact
        </h1>
        <p className="section-lede">
          Reach Hearth &amp; Plate by phone, email, social media, or the message
          form below.
        </p>

        <section aria-labelledby="direct-contact-heading">
          <h2 id="direct-contact-heading" className="menu-category-heading">
            Get in touch
          </h2>
          <ul className="ingredient-list" style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <a href={contactContent.phoneHref}>
                Call Hearth &amp; Plate at {contactContent.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactContent.email}`}>
                Email Hearth &amp; Plate at {contactContent.email}
              </a>
            </li>
          </ul>
          <ul className="social-list">
            {contactContent.social.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="location-heading" style={{ marginTop: "1.5rem" }}>
          <h2 id="location-heading" className="menu-category-heading">
            Pickup location
          </h2>
          <address style={{ fontStyle: "normal", lineHeight: 1.6 }}>
            {contactContent.addressLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
        </section>

        <section aria-labelledby="hours-heading" style={{ marginTop: "1.5rem" }}>
          <h2 id="hours-heading" className="menu-category-heading">
            Hours of operation
          </h2>
          <ul className="ingredient-list">
            {contactContent.hours.map((entry) => (
              <li key={entry.days}>
                {entry.days}: {entry.time}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <section
        className="section-panel"
        aria-labelledby="message-heading"
      >
        <h2 id="message-heading" className="section-heading">
          Send a message
        </h2>
        <p className="field-instructions">
          Required fields: name, email address, and message. Phone is optional.
        </p>

        {errors.summary ? (
          <p className="field-error" role="alert">
            {errors.summary}
          </p>
        ) : null}

        {success ? (
          <p className="date-status" role="status">
            {success}
          </p>
        ) : null}

        <form className="stack-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor={`${formId}-name`} className="field-label">
              Name (required)
            </label>
            <input
              id={`${formId}-name`}
              className="text-input"
              type="text"
              name="name"
              autoComplete="name"
              required
              value={form.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={
                errors.name ? `${formId}-name-error` : undefined
              }
              onChange={(event) => updateField("name", event.target.value)}
            />
            {errors.name ? (
              <p id={`${formId}-name-error`} className="field-error" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className="field-label">
              Email address (required)
            </label>
            <input
              id={`${formId}-email`}
              className="text-input"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              onChange={(event) => updateField("email", event.target.value)}
            />
            {errors.email ? (
              <p id={`${formId}-email-error`} className="field-error" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${formId}-phone`} className="field-label">
              Phone (optional)
            </label>
            <input
              id={`${formId}-phone`}
              className="text-input"
              type="tel"
              name="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-message`} className="field-label">
              Message (required)
            </label>
            <textarea
              id={`${formId}-message`}
              className="textarea-input"
              name="message"
              autoComplete="off"
              required
              rows={5}
              value={form.message}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? `${formId}-message-error` : undefined
              }
              onChange={(event) => updateField("message", event.target.value)}
            />
            {errors.message ? (
              <p
                id={`${formId}-message-error`}
                className="field-error"
                role="alert"
              >
                {errors.message}
              </p>
            ) : null}
          </div>

          <button type="submit" className="button button-primary">
            Send message
          </button>
        </form>
      </section>
    </div>
  );
}
