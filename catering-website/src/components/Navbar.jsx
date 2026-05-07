import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { state } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = state.items.length

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors ${isActive
      ? 'text-brand-700 border-b-2 border-brand-700'
      : 'text-gray-700 hover:text-brand-700'}`

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Mama's Table – home">
          <span className="text-2xl" aria-hidden="true">🍽️</span>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-brand-800 group-hover:text-brand-600 transition-colors">
              Mama's Table
            </p>
            <p className="text-xs text-warm-600 -mt-0.5">Homemade Catering</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <NavLink to="/menu" className={linkClass}>Menu</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            aria-label={cartCount > 0 ? `Cart, ${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Cart, empty'}
          >
            <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span aria-hidden="true">Cart</span>
            {cartCount > 0 && (
              <span aria-hidden="true" className="ml-1 bg-warm-400 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-700 hover:bg-gray-50"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen
              ? <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          <NavLink to="/menu"    className={linkClass} onClick={() => setMenuOpen(false)}>Menu</NavLink>
          <NavLink to="/about"   className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </nav>
      )}
    </header>
  )
}
