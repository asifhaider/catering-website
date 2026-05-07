import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navigation() {
  const { cartItemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuBtnRef = useRef(null)
  const navRef = useRef(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Trap focus in mobile menu when open; close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const navLinks = [
    { to: '/', label: 'Menu' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header role="banner">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="container site-nav__inner">
          {/* SC 2.4.9: Brand link — purpose clear from label */}
          <Link
            to="/"
            className="site-nav__brand"
            aria-label="Zara's Kitchen — go to homepage"
          >
            <span className="site-nav__brand-name" aria-hidden="true">
              Zara's Kitchen
            </span>
            <span className="site-nav__brand-tagline" aria-hidden="true">
              Homemade with Heart
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            ref={menuBtnRef}
            className="site-nav__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="site-nav-links"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((o) => !o)}
            type="button"
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>

          {/* Nav links */}
          <ul
            id="site-nav-links"
            ref={navRef}
            className={`site-nav__links${menuOpen ? ' site-nav__links--open' : ''}`}
            role="list"
          >
            {navLinks.map(({ to, label }) => (
              <li key={to} role="listitem">
                <NavLink
                  to={to}
                  end={to === '/'}
                  className="site-nav__link"
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  {({ isActive }) => (
                    <>
                      {/* SC 1.4.1: Not only color — underline on current page via CSS */}
                      <span aria-current={isActive ? 'page' : undefined}>
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            <li role="listitem">
              <Link
                to="/cart"
                className="site-nav__cart-btn"
                aria-label={`Shopping cart, ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
              >
                <span aria-hidden="true">🛒</span>
                {cartItemCount > 0 && (
                  <span className="site-nav__cart-count" aria-hidden="true">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
