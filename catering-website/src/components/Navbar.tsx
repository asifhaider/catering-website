"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav aria-label="Main navigation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-amber-700 hover:text-amber-800">
            Mama&apos;s Kitchen
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                  pathname === link.href
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-600 hover:text-amber-700"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-amber-700 px-3 py-2 rounded-md"
              aria-label={`Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <button
            className="sm:hidden p-2 rounded-md text-gray-600 hover:text-amber-700 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="sm:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium min-h-[44px] ${
                  pathname === link.href
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-600 hover:text-amber-700 hover:bg-gray-50"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50 min-h-[44px]"
              aria-label={`Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
            >
              Cart
              {totalItems > 0 && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
