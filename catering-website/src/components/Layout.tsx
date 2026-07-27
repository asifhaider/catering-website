import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Menu", end: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function navLinkClass({ isActive }: { isActive: boolean }): string {
  return [
    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
    isActive ? "bg-brand-600 text-white" : "text-brand-900 hover:bg-brand-100",
  ].join(" ");
}

export default function Layout() {
  const { totalPortions } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-brand-50 text-brand-900">
      <a
        href="#main-content"
        className="sr-only-focusable fixed top-2 left-2 z-50 bg-white text-brand-900 px-4 py-2 rounded shadow"
      >
        Skip to main content
      </a>
      <header className="bg-white border-b border-brand-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <NavLink to="/" className="text-lg font-bold text-brand-700 whitespace-nowrap">
            Homestead Catering Co.
          </NavLink>
          <nav aria-label="Main navigation" className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/cart" className={navLinkClass}>
              Cart
              <span className="sr-only"> — {totalPortions} portions</span>
              {totalPortions > 0 && (
                <span
                  aria-hidden="true"
                  className="ml-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-brand-700 text-white text-xs"
                >
                  {totalPortions}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-brand-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-brand-700">
          © {new Date().getFullYear()} Homestead Catering Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
