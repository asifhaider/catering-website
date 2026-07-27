import { Link, NavLink, Outlet } from 'react-router-dom'
import { businessInfo } from '../data/business'
import { useCart } from '../context/CartContext'

export default function Layout() {
  const { itemCount } = useCart()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-terracotta focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <header className="border-b border-warm-brown/10 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-xl font-bold text-terracotta">
            {businessInfo.name}
          </Link>

          <nav aria-label="Main navigation">
            <ul className="flex gap-6">
              {[
                { to: '/', label: 'Menu' },
                { to: '/cart', label: itemCount > 0 ? `Cart (${itemCount})` : 'Cart' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-terracotta underline decoration-2 underline-offset-4'
                          : 'text-warm-brown/70 hover:text-terracotta'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-warm-brown/10 bg-white py-6 text-center text-sm text-warm-brown/60">
        <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
