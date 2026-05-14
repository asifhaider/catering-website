import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';

const navLinks = [
  { to: '/', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream border-b border-amber-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl font-bold text-terracotta-600 hover:text-terracotta-700 transition-colors"
              aria-label="Nour's Kitchen — go to home"
            >
              Nour's Kitchen
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-100 text-amber-800'
                        : 'text-stone-700 hover:bg-amber-50 hover:text-amber-800'
                    }`
                  }
                  aria-current={undefined}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Cart button */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800 transition-colors min-h-[44px] min-w-[44px] justify-center"
                aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ', empty'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-terracotta-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                    aria-hidden="true"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                className="md:hidden flex items-center justify-center p-2 rounded-md text-stone-700 hover:bg-amber-50 min-h-[44px] min-w-[44px]"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-amber-200 bg-cream px-4 py-3 space-y-1"
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-sm font-medium min-h-[44px] flex items-center transition-colors ${
                    isActive
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-stone-700 hover:bg-amber-50 hover:text-amber-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
