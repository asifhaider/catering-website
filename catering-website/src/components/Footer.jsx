import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl" aria-hidden="true">🍽️</span>
              <span className="font-display text-lg font-bold text-white">Mama's Table</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Homemade South Asian catering, made with love and traditional family recipes. Pickup orders welcome.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu"    className="hover:text-warm-400 transition-colors">View Menu</Link></li>
              <li><Link to="/cart"    className="hover:text-warm-400 transition-colors">My Cart</Link></li>
              <li><Link to="/about"   className="hover:text-warm-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-warm-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span aria-hidden="true">📞</span>
                <a href="tel:+15552345678" className="hover:text-warm-400 transition-colors">(555) 234-5678</a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">✉️</span>
                <a href="mailto:hello@mamastable.com" className="hover:text-warm-400 transition-colors">hello@mamastable.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">📍</span>
                <span className="text-gray-400">123 Oak Street, Springfield, IL</span>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">🕐</span>
                <span className="text-gray-400">Pickup: Mon–Sat, 11am–7pm</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/mamastable" target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-warm-400 transition-colors text-sm">Instagram</a>
              <a href="https://facebook.com/mamastable" target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-warm-400 transition-colors text-sm">Facebook</a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Mama's Table. All rights reserved. Orders accepted 2–14 days in advance · Serves 6–30 people.
        </div>
      </div>
    </footer>
  )
}
