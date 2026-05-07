import { Link } from 'react-router-dom'
import { business } from '../data/business'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer__grid">
          {/* Brand */}
          <div>
            <h2 className="site-footer__heading">Zara's Kitchen</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.85, lineHeight: 'var(--line-height-relaxed)', maxWidth: '30ch' }}>
              {business.tagline}
            </p>
          </div>

          {/* Navigation (SC 2.4.5 Multiple Ways) */}
          <nav aria-label="Footer navigation">
            <h2 className="site-footer__heading">Navigate</h2>
            <ul className="site-footer__list" role="list">
              <li><Link to="/">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__list" role="list">
              <li>
                <a
                  href={`tel:${business.contact.phonePlain}`}
                  aria-label={`Call us at ${business.contact.phone}`}
                >
                  <span aria-hidden="true">📞</span> {business.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.contact.email}`}
                  aria-label={`Email us at ${business.contact.email}`}
                >
                  <span aria-hidden="true">✉️</span> {business.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={business.social.instagram.url}
                  rel="noopener noreferrer"
                  aria-label={`Follow us on Instagram at ${business.social.instagram.handle}`}
                >
                  <span aria-hidden="true">📸</span> Instagram
                </a>
              </li>
              <li>
                <a
                  href={business.social.facebook.url}
                  rel="noopener noreferrer"
                  aria-label={`Visit our Facebook page, ${business.social.facebook.handle}`}
                >
                  <span aria-hidden="true">👍</span> Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h2 className="site-footer__heading">Order Info</h2>
            <ul
              className="site-footer__list"
              role="list"
              style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}
            >
              <li>{business.hours.orderPickup}</li>
              <li style={{ marginTop: 'var(--space-2)' }}>{business.hours.orderDeadline}</li>
              <li style={{ marginTop: 'var(--space-2)' }}>{business.hours.response}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {year} Zara's Kitchen. All rights reserved.
          </p>
          <p>
            {business.address.city}, {business.address.province}, {business.address.country}
          </p>
        </div>
      </div>
    </footer>
  )
}
