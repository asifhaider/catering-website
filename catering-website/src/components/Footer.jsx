import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    /* SC 1.3.1 – <footer> provides the contentinfo landmark implicitly */
    <footer className="bg-brand-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* SC 1.1.1 – decorative emoji hidden from AT */}
              <span aria-hidden="true" className="text-2xl">🍽️</span>
              <span className="font-display text-lg font-bold text-white">Mama's Table</span>
            </div>
            {/* SC 1.4.3 – gray-300 on brand-900 ≈ 5.4:1 (passes AA) */}
            <p className="text-sm leading-relaxed text-gray-300">
              Homemade South Asian catering, made with love and traditional family recipes. Pickup orders welcome.
            </p>
          </div>

          {/* SC 1.3.1 / 2.4.5 – labelled nav landmark */}
          <nav aria-label="Footer navigation">
            <h2 className="text-white font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu"    className="hover:text-warm-400 transition-colors hover:underline underline-offset-2">View Menu</Link></li>
              <li><Link to="/cart"    className="hover:text-warm-400 transition-colors hover:underline underline-offset-2">My Cart</Link></li>
              <li><Link to="/about"   className="hover:text-warm-400 transition-colors hover:underline underline-offset-2">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-warm-400 transition-colors hover:underline underline-offset-2">Contact</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-white font-semibold mb-4">Get in Touch</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                {/* SC 1.1.1 – decorative emojis hidden from AT; the link text provides the information */}
                <span aria-hidden="true">📞</span>
                <a href="tel:+15552345678" className="hover:text-warm-400 transition-colors hover:underline underline-offset-2">
                  (555) 234-5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">✉️</span>
                <a href="mailto:hello@mamastable.com" className="hover:text-warm-400 transition-colors hover:underline underline-offset-2">
                  hello@mamastable.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">📍</span>
                {/* SC 1.3.3 – not relying on location alone; text is descriptive */}
                <span className="text-gray-300">123 Oak Street, Springfield, <abbr title="Illinois">IL</abbr></span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">🕐</span>
                {/* SC 1.3.4 – no orientation lock; SC 3.1.4 – abbreviation expanded */}
                <span className="text-gray-300">
                  Pickup: <abbr title="Monday through Saturday">Mon–Sat</abbr>, 11<abbr title="ante meridiem">am</abbr>–7<abbr title="post meridiem">pm</abbr>
                </span>
              </li>
            </ul>

            <div className="flex gap-4 mt-4">
              {/* SC 2.4.4 / 2.4.9 – link purpose clear from text alone */}
              <a href="https://instagram.com/mamastable" target="_blank" rel="noreferrer"
                className="text-gray-300 hover:text-warm-400 transition-colors text-sm hover:underline underline-offset-2"
                aria-label="Mama's Table on Instagram (opens in new tab)">
                Instagram
              </a>
              <a href="https://facebook.com/mamastable" target="_blank" rel="noreferrer"
                className="text-gray-300 hover:text-warm-400 transition-colors text-sm hover:underline underline-offset-2"
                aria-label="Mama's Table on Facebook (opens in new tab)">
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* SC 1.4.3 – gray-300 on brand-900 passes AA */}
        <div className="border-t border-brand-800 mt-10 pt-6 text-center text-xs text-gray-300">
          © {new Date().getFullYear()} Mama's Table. All rights reserved.
          {' '}Orders accepted 2–14 days in advance · Serves 6–30 people.
        </div>
      </div>
    </footer>
  )
}
