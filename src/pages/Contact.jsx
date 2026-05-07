import React, { useState } from "react";
import { BUSINESS } from "../data/menuData";

const SUBJECTS = [
  "General Inquiry",
  "Order Question",
  "Dietary / Allergy Info",
  "Catering Enquiry",
  "Feedback",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Please write at least 10 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inp = (field) => ({
    className: `form-input${errors[field] ? " error" : ""}`,
    value: form[field],
    onChange: set(field),
    "aria-invalid": errors[field] ? "true" : undefined,
  });

  return (
    <>
      <div className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>
            Questions about our menus, allergies, or catering options? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-layout">
            <div>
              <h3 style={{ marginBottom: 20 }}>Contact Info</h3>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">📞</div>
                  <div className="contact-info-text">
                    <strong>Phone</strong>
                    <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">✉️</div>
                  <div className="contact-info-text">
                    <strong>Email</strong>
                    <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">📍</div>
                  <div className="contact-info-text">
                    <strong>Pickup Address</strong>
                    {BUSINESS.address}
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">🕐</div>
                  <div className="contact-info-text">
                    <strong>Pickup Hours</strong>
                    {BUSINESS.pickupHours}
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Find Us Online</h4>
                <div className="social-list" aria-label="Social media links">
                  <a
                    href={BUSINESS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Instagram — @maplewoodkitchen"
                    title="Instagram"
                  >📷</a>
                  <a
                    href={BUSINESS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Facebook — Maplewood Kitchen"
                    title="Facebook"
                  >👍</a>
                  <a
                    href={BUSINESS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Twitter / X — @maplewoodkitchen"
                    title="Twitter/X"
                  >🐦</a>
                </div>
                <div style={{ marginTop: 14, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  @maplewoodkitchen on Instagram, Facebook & X
                </div>
              </div>

              <div style={{ marginTop: 28, padding: "20px", background: "var(--bg-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <h4 style={{ marginBottom: 10 }}>Ordering Policy</h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    "Orders must be placed 2–14 days in advance",
                    "Each order serves 6–30 people per dish",
                    "Custom dietary requests: contact us first",
                    "Cancellations within 24 hours: 50% fee applies",
                  ].map((item) => (
                    <li key={item} style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--primary)", flexShrink: 0 }}>•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="contact-form-card">
              <h3>Send Us a Message</h3>

              {submitted ? (
                <div className="form-success" role="status">
                  <span style={{ fontSize: "1.3rem" }}>✓</span>
                  <div>
                    <strong>Message sent!</strong><br />
                    <span style={{ fontWeight: 400, fontSize: "0.9rem" }}>
                      We'll get back to you within one business day.
                    </span>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        Full Name<span className="required" aria-hidden="true">*</span>
                      </label>
                      <input {...inp("name")} type="text" placeholder="Jane Smith" autoComplete="name" />
                      {errors.name && <span className="form-error" role="alert">⚠ {errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Email<span className="required" aria-hidden="true">*</span>
                      </label>
                      <input {...inp("email")} type="email" placeholder="jane@example.com" autoComplete="email" />
                      {errors.email && <span className="form-error" role="alert">⚠ {errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label className="form-label">Phone (optional)</label>
                      <input
                        className="form-input"
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="(503) 555-0000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Subject<span className="required" aria-hidden="true">*</span>
                      </label>
                      <select
                        className={`form-select${errors.subject ? " error" : ""}`}
                        value={form.subject}
                        onChange={set("subject")}
                        aria-invalid={errors.subject ? "true" : undefined}
                      >
                        <option value="">Select…</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <span className="form-error" role="alert">⚠ {errors.subject}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Message<span className="required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      className={`form-textarea${errors.message ? " error" : ""}`}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us what you need…"
                      rows={5}
                      aria-invalid={errors.message ? "true" : undefined}
                    />
                    {errors.message && <span className="form-error" role="alert">⚠ {errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
