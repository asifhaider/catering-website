import React, { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMenuForDate, formatDate, isDateValid } from "../data/menuData";
import FoodItemCard from "../components/FoodItemCard";
import FoodItemModal from "../components/FoodItemModal";
import { useCart } from "../context/CartContext";

const SECTIONS = [
  { key: "protein", label: "Proteins", icon: "🥩", iconClass: "icon-protein", desc: "5 items" },
  { key: "vegetarian", label: "Vegetarian", icon: "🥦", iconClass: "icon-vegetarian", desc: "3 items" },
  { key: "sides", label: "Sides", icon: "🥗", iconClass: "icon-sides", desc: "2 items" },
];

export default function Menu() {
  const { date } = useParams();
  const navigate = useNavigate();
  const { selectedDate: cartDate, items: cartItems, openDrawer } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSection, setActiveSection] = useState("protein");
  const sectionRefs = useRef({});

  if (!isDateValid(date)) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>📅</div>
        <h2>Date Not Available</h2>
        <p style={{ marginBottom: 24 }}>
          This date is outside our ordering window (2 days to 2 weeks ahead).
        </p>
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    );
  }

  const menu = getMenuForDate(date);
  const itemsByCategory = SECTIONS.reduce((acc, sec) => {
    acc[sec.key] = menu.items.filter((i) => i.category === sec.key);
    return acc;
  }, {});

  const cartDateMismatch = cartDate && cartDate !== date && cartItems.length > 0;

  const scrollToSection = (key) => {
    setActiveSection(key);
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="menu-page-header">
        <div className="container">
          <Link to="/" className="btn btn-ghost btn-sm" style={{ marginBottom: 14 }}>
            ← Change Date
          </Link>
          <div className="menu-meta">
            <span className="menu-date-chip">📅 {formatDate(date)}</span>
            <span className="menu-theme-chip">🎨 {menu.theme}</span>
          </div>
          <h1 className="menu-page-title">{menu.dayName}'s Menu</h1>
          <p className="menu-page-subtitle">10 handcrafted dishes · Serves 6–30 people per item</p>
        </div>
      </div>

      <nav className="menu-nav-bar" aria-label="Menu categories">
        <div className="container">
          <div className="menu-nav-inner">
            {SECTIONS.map((sec) => (
              <button
                key={sec.key}
                className={`menu-nav-tab${activeSection === sec.key ? " active" : ""}`}
                onClick={() => scrollToSection(sec.key)}
                aria-current={activeSection === sec.key ? "true" : undefined}
              >
                {sec.icon} {sec.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="menu-content">
        <div className="container">
          {cartDateMismatch && (
            <div className="cart-date-conflict" role="alert">
              ⚠️ Your cart has items for a different date ({formatDate(cartDate)}).
              Adding items here will replace that order.{" "}
              <button
                className="btn btn-sm"
                style={{ padding: "4px 10px", marginLeft: 8 }}
                onClick={openDrawer}
              >
                View Cart
              </button>
            </div>
          )}

          {SECTIONS.map((sec) => (
            <section
              key={sec.key}
              className="menu-section"
              ref={(el) => { sectionRefs.current[sec.key] = el; }}
              aria-labelledby={`section-${sec.key}`}
            >
              <div className="menu-section-header">
                <div className={`menu-section-icon ${sec.iconClass}`} aria-hidden="true">
                  {sec.icon}
                </div>
                <div className="menu-section-info">
                  <h2 id={`section-${sec.key}`}>{sec.label}</h2>
                  <div className="menu-section-count">{itemsByCategory[sec.key].length} items</div>
                </div>
              </div>
              <div className="menu-grid">
                {itemsByCategory[sec.key].map((item) => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                    date={date}
                    onViewDetails={setSelectedItem}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {selectedItem && (
        <FoodItemModal
          item={selectedItem}
          date={date}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
