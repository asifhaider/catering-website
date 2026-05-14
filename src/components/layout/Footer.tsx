import { Link } from 'react-router-dom';
import { contactContent } from '../../data/contact';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-display text-xl font-bold text-amber-400 mb-3">Nour's Kitchen</p>
            <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
              Homemade catering for 6–30 guests. Fresh, family-recipe food prepared the morning of
              your event, ready for pickup.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Quick Links
            </p>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'View Menu' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Get in Touch
            </p>
            <address className="not-italic text-sm space-y-2">
              <p>
                <a
                  href={`tel:${contactContent.phone.replace(/\s/g, '')}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {contactContent.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contactContent.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {contactContent.email}
                </a>
              </p>
            </address>

            <div className="flex gap-3 mt-4">
              {contactContent.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-stone-400 hover:text-amber-400 transition-colors text-sm font-medium min-h-[44px] flex items-center"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 text-xs text-stone-600 text-center">
          <p>© {year} Nour's Kitchen. All rights reserved. Mississauga, ON.</p>
        </div>
      </div>
    </footer>
  );
}
