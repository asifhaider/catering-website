import { NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-amber-100 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
  }`

export default function Layout() {
  const { itemCount } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-amber-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="text-lg font-semibold text-amber-900">
            Homestyle Catering
          </NavLink>
          <nav aria-label="Primary" className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Menu
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              Cart
              <span className="sr-only"> ({itemCount} portions)</span>
              <span aria-hidden="true"> ({itemCount})</span>
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500">
        <p>© {new Date().getFullYear()} Homestyle Catering. All rights reserved.</p>
      </footer>
    </div>
  )
}
