import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { business } from '../data/business'

const TEAM_AVATARS = ['👩‍🍳', '👨‍💼', '👩‍🍰']

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'About — Zara\'s Kitchen'
  }, [])

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx))
  }

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'About' }]} />

      <main id="main-content" className="page-main" tabIndex={-1}>
        {/* Hero */}
        <section className="about-hero" aria-labelledby="about-hero-heading">
          <div className="container">
            <h1 id="about-hero-heading">{business.name}</h1>
            <p>{business.tagline}</p>
          </div>
        </section>

        {/* Our story */}
        <section aria-labelledby="story-heading" style={{ background: 'var(--color-bg)' }}>
          <div className="about-story">
            <h2 id="story-heading" style={{ marginBottom: 'var(--space-6)' }}>Our Story</h2>
            {business.about.story.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section
          aria-labelledby="mission-heading"
          style={{
            background: 'var(--color-primary)',
            padding: 'var(--space-12) 0',
            textAlign: 'center',
          }}
        >
          <div className="container" style={{ maxWidth: '640px' }}>
            <h2
              id="mission-heading"
              style={{
                color: 'var(--color-text-on-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                color: 'rgba(255,253,246,0.9)',
                fontSize: 'var(--font-size-xl)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-heading)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '56ch',
                marginInline: 'auto',
              }}
            >
              "{business.about.mission}"
            </p>
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values-heading" style={{ padding: 'var(--space-12) 0', background: 'var(--color-surface)' }}>
          <div className="container">
            <h2 id="values-heading" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              What We Stand For
            </h2>
            <div className="values-grid">
              {business.about.values.map((v) => (
                <article key={v.title} className="value-card">
                  <h3 className="value-card__title">{v.title}</h3>
                  <p className="value-card__desc">{v.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading" style={{ padding: 'var(--space-12) 0' }}>
          <div className="container">
            <h2 id="team-heading" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              Meet the Team
            </h2>
            <div className="team-grid">
              {business.about.team.map((member, idx) => (
                <article key={member.name} className="team-card">
                  <div
                    className="team-card__avatar"
                    role="img"
                    aria-label={`${member.name} avatar`}
                  >
                    <span aria-hidden="true">{TEAM_AVATARS[idx] ?? '👤'}</span>
                  </div>
                  <h3 className="team-card__name">{member.name}</h3>
                  <div className="team-card__role">{member.role}</div>
                  <p className="team-card__bio">{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          style={{ padding: 'var(--space-12) 0', background: 'var(--color-surface)' }}
        >
          <div className="container" style={{ maxWidth: '760px' }}>
            <h2 id="faq-heading" style={{ marginBottom: 'var(--space-4)' }}>
              Frequently Asked Questions
            </h2>

            <div className="faq-list">
              {business.faq.map((item, idx) => {
                const isOpen = openFaq === idx
                const panelId = `faq-panel-${idx}`
                const btnId = `faq-btn-${idx}`
                return (
                  <div key={idx} className="faq-item">
                    {/* SC 4.1.2 Name/Role/Value on disclosure button */}
                    <button
                      type="button"
                      id={btnId}
                      className="faq-item__btn"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(idx)}
                    >
                      {item.question}
                      <span
                        className="faq-item__icon"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>

                    {/* SC 2.2.2: No auto-collapsing content */}
                    {isOpen && (
                      <div
                        id={panelId}
                        className="faq-item__answer"
                        role="region"
                        aria-labelledby={btnId}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="cta-heading"
          style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}
        >
          <div className="container">
            <h2 id="cta-heading" style={{ marginBottom: 'var(--space-4)' }}>
              Ready to Order?
            </h2>
            <p style={{ marginBottom: 'var(--space-6)', marginInline: 'auto' }}>
              Browse our rotating daily menus and place an order for pickup.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn--primary">
                View the Menu
              </Link>
              <Link to="/contact" className="btn btn--outline">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
