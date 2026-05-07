import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
        <div className="container navbar-inner">
          <Link to="/" className="nav-logo" aria-label="Maplewood Kitchen home">
            <div className="nav-logo-icon" aria-hidden="true">🍽️</div>
            <span>Maplewood Kitchen</span>
          </Link>

          <div className="nav-links" role="list">
            <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} end role="listitem">Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} role="listitem">About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} role="listitem">Contact</NavLink>
            <NavLink to="/orders" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} role="listitem">Orders</NavLink>
          </div>

          <div className="nav-right">
            <button
              className="cart-btn"
              onClick={openDrawer}
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? "s" : ""}` : ""}`}
            >
              🛒
              {itemCount > 0 && (
                <span className="cart-badge" aria-hidden="true">{itemCount}</span>
              )}
            </button>

            <button
              className="hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <Link to="/" className="mobile-nav-link" onClick={closeMenu}>🏠 Home</Link>
        <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>ℹ️ About</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>✉️ Contact</Link>
        <Link to="/orders" className="mobile-nav-link" onClick={closeMenu}>📋 Past Orders</Link>
        <button
          className="mobile-nav-link"
          style={{ textAlign: "left", width: "100%" }}
          onClick={() => { openDrawer(); closeMenu(); }}
        >
          🛒 Cart{itemCount > 0 ? ` (${itemCount})` : ""}
        </button>
      </div>
    </>
  );
}
