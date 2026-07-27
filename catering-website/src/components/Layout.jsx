import { NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

function NavItem({ to, label }) {
  const match = useMatch(to === '/' ? { path: to, end: true } : to)
  const isActive = Boolean(match)
  return (
    <NavLink
      to={to}
      end={to === '/'}
      aria-current={isActive ? 'page' : undefined}
      className={`text-sm font-medium px-1 py-0.5 border-b-2 transition-colors focus-visible:rounded ${
        isActive
          ? 'text-brand-700 border-brand-600'
          : 'text-stone-600 border-transparent hover:text-brand-700 hover:border-brand-300'
      }`}
    >
      {label}
    </NavLink>
  )
}

function MobileNavItem({ to, label }) {
  const match = useMatch(to === '/' ? { path: to, end: true } : to)
  const isActive = Boolean(match)
  return (
    <NavLink
      to={to}
      end={to === '/'}
      aria-current={isActive ? 'page' : undefined}
      className={`block py-2 text-sm font-medium ${isActive ? 'text-brand-700' : 'text-stone-600'}`}
    >
      {label}
    </NavLink>
  )
}

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  const cartBtnRef = useRef(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { to: '/', label: 'Menu' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Skip link — must be first focusable element (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-30 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Brand */}
          <NavLink
            to="/"
            className="font-serif text-xl font-bold text-brand-700 hover:text-brand-800 focus-visible:rounded"
            aria-label="Nana's Kitchen — go to home page"
          >
            🍲 Nana&apos;s Kitchen
          </NavLink>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ to, label }) => (
              <NavItem key={to} to={to} label={label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              ref={cartBtnRef}
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart — ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
              className="relative flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 rounded-lg min-h-[44px] min-w-[44px] transition-colors"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="sm:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav id="mobile-nav" aria-label="Mobile navigation" className="sm:hidden border-t border-stone-100 bg-white px-4 pb-3">
            {navLinks.map(({ to, label }) => (
              <MobileNavItem key={to} to={to} label={label} />
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>

      <footer className="mt-16 bg-stone-800 text-stone-300 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-white text-lg font-bold mb-2">🍲 Nana&apos;s Kitchen</p>
            <p className="text-sm">Homemade catering, made with love.</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="text-white font-semibold text-sm mb-2">Pages</p>
            <ul className="space-y-1">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'} className="text-sm hover:text-white transition-colors">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-white font-semibold text-sm mb-2">Order Hours</p>
            <p className="text-sm">Orders accepted at least 2 days and up to 2 weeks in advance.</p>
            <p className="text-sm mt-2">Pickup available Tue–Sat.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-stone-700 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Nana&apos;s Kitchen. All rights reserved.</p>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => {
          setCartOpen(false)
          cartBtnRef.current?.focus()
        }}
      />
    </>
  )
}
