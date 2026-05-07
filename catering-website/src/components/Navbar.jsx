import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { state } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = state.items.length

  // SC 4.1.2 – NavLink already sets aria-current="page" on the active route
  const linkClass = ({ isActive }) =>
    `font-medium transition-colors underline-offset-2 ${isActive
      ? 'text-brand-900 border-b-2 border-brand-900'
      : 'text-gray-700 hover:text-brand-900 hover:underline'}`

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* SC 2.4.4 – Logo link has descriptive label */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Mama's Table – Home">
          {/* SC 1.1.1 – decorative emoji hidden from assistive technology */}
          <span aria-hidden="true" className="text-2xl">🍽️</span>
          <div className="leading-tight" aria-hidden="true">
            <p className="font-display text-lg font-bold text-brand-900 group-hover:text-brand-800 transition-colors">
              Mama's Table
            </p>
            <p className="text-xs text-warm-700 -mt-0.5">Homemade Catering</p>
          </div>
        </Link>

        {/* SC 1.3.1 / 2.4.5 – labelled nav landmark; desktop */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <NavLink to="/menu"    className={linkClass}>Menu</NavLink>
          <NavLink to="/about"   className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {/* SC 4.1.2 – cart count surfaced in accessible name */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 bg-brand-900 hover:bg-brand-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            aria-label={cartCount > 0 ? `Cart, ${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Cart, empty'}
          >
            {/* SC 1.1.1 – decorative SVG hidden from AT */}
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* SC 1.4.6 – "Cart" visible text satisfies 2.5.3 Label in Name */}
            <span aria-hidden="true">Cart</span>
            {cartCount > 0 && (
              <span aria-hidden="true" className="ml-1 bg-warm-400 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* SC 4.1.2 / 2.5.5 – mobile toggle with aria-expanded and aria-controls */}
          <button
            className="md:hidden p-2.5 rounded-md text-gray-700 hover:text-brand-900 hover:bg-gray-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen
              ? <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg aria-hidden="true" focusable="false" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* SC 1.3.1 – Mobile nav as labelled landmark */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4"
        >
          <NavLink to="/menu"    className={linkClass} onClick={() => setMenuOpen(false)}>Menu</NavLink>
          <NavLink to="/about"   className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </nav>
      )}
    </header>
  )
}
