import React from "react";
import { Link } from "react-router-dom";
import { BUSINESS } from "../data/menuData";

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🍽️ Maplewood Kitchen</h3>
            <p>{BUSINESS.description}</p>
            <div className="footer-social" aria-label="Social media links">
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">📷</a>
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">👍</a>
              <a href={BUSINESS.twitter} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Twitter/X">🐦</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/orders" className="footer-link">Past Orders</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Order</h4>
            <div className="footer-links">
              <span className="footer-link">Sun: Classic Comfort</span>
              <span className="footer-link">Mon: Mediterranean</span>
              <span className="footer-link">Tue: Asian Fusion</span>
              <span className="footer-link">Wed: Latin & Mexican</span>
              <span className="footer-link">Thu: Italian</span>
              <span className="footer-link">Fri: Middle Eastern</span>
              <span className="footer-link">Sat: BBQ & Southern</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-links">
              <a href={`tel:${BUSINESS.phone}`} className="footer-link">{BUSINESS.phone}</a>
              <a href={`mailto:${BUSINESS.email}`} className="footer-link">{BUSINESS.email}</a>
              <span className="footer-link" style={{ fontSize: "0.8rem" }}>{BUSINESS.address}</span>
              <span className="footer-link" style={{ fontSize: "0.8rem" }}>{BUSINESS.pickupHours}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Maplewood Kitchen. All rights reserved.</span>
          <span>Made with ❤️ in Portland, OR</span>
        </div>
      </div>
    </footer>
  );
}
