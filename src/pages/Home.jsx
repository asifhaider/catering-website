import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMinDate, getMaxDate, getMenuForDate, formatDate, MENUS } from "../data/menuData";

const FEATURED_IDS = ["sun-p1", "mon-v2", "sat-p2"];

function getFeatured() {
  const all = Object.values(MENUS).flatMap((m) => m.items);
  return FEATURED_IDS.map((id) => all.find((i) => i.id === id)).filter(Boolean);
}

export default function Home() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const minDate = getMinDate();
  const maxDate = getMaxDate();
  const featured = getFeatured();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDateError("");
  };

  const handleViewMenu = () => {
    if (!selectedDate) {
      setDateError("Please select a date.");
      return;
    }
    navigate(`/menu/${selectedDate}`);
  };

  const menuInfo = selectedDate ? getMenuForDate(selectedDate) : null;

  return (
    <>
      <section className="hero" aria-label="Welcome">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-eyebrow">🌿 Portland's Favourite Home Kitchen</div>
            <h1>Homemade Catering,<br />Straight from Our Kitchen</h1>
            <p>
              Scratch-made, seasonal menus crafted with love for your next gathering.
              Order online, pick up fresh — it's that simple.
            </p>
            <div className="hero-actions">
              <a href="#order-section" className="btn btn-hero-primary btn-lg">Order Now →</a>
              <Link to="/about" className="btn btn-hero-secondary btn-lg">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" aria-labelledby="how-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="how-heading">How It Works</h2>
            <p>Three easy steps to a home-cooked feast for your whole group</p>
          </div>
          <div className="steps-grid">
            {[
              { n: "1", icon: "📅", title: "Choose Your Date", desc: "Pick any date 2–14 days from today. Each day of the week has its own unique themed menu." },
              { n: "2", icon: "🍽️", title: "Build Your Order", desc: "Browse 10 handcrafted dishes — proteins, vegetarian, and sides — and add what you love." },
              { n: "3", icon: "🛍️", title: "Pick Up Fresh", desc: "We'll have everything ready at the window. Hot, fresh, and packed with care for 6–30 people." },
            ].map(({ n, icon, title, desc }) => (
              <div key={n} className="card step-card">
                <div className="step-number" aria-hidden="true">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="date-section" id="order-section" aria-labelledby="date-heading">
        <div className="container">
          <div className="date-section-inner">
            <div className="date-picker-card">
              <h3>📅 Select Your Pickup Date</h3>
              <p>Choose a date to see that day's menu</p>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  className={`date-input-native${dateError ? " error" : ""}`}
                  value={selectedDate}
                  min={minDate}
                  max={maxDate}
                  onChange={handleDateChange}
                  aria-label="Select pickup date"
                  aria-describedby="date-hint"
                  aria-invalid={!!dateError}
                />
              </div>
              {dateError && (
                <p className="form-error" role="alert" style={{ marginTop: 8 }}>⚠ {dateError}</p>
              )}
              <p className="date-info" id="date-hint">
                📌 Orders accepted 2 days to 2 weeks in advance
              </p>
              {menuInfo && selectedDate && (
                <div className="date-selected-info" role="status">
                  <div>
                    <strong>{menuInfo.dayName}'s Menu</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {menuInfo.theme} · {formatDate(selectedDate)}
                    </div>
                  </div>
                  <span className="menu-theme-chip">🎨 {menuInfo.theme}</span>
                </div>
              )}
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: 18 }}
                onClick={handleViewMenu}
                disabled={!selectedDate}
              >
                View Menu →
              </button>
            </div>

            <div className="date-text-content">
              <h2 id="date-heading">A Different Menu Every Day of the Week</h2>
              <p>
                We believe variety keeps the table exciting. Each weekday brings a distinct culinary theme, so your guests are always in for a fresh experience.
              </p>
              <div className="date-constraints">
                {Object.values(MENUS).map((m) => (
                  <div key={m.dayName} className="constraint-item">
                    <div className="constraint-dot" />
                    <span><strong>{m.dayName}:</strong> {m.theme}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="featured-heading">Guest Favourites</h2>
            <p>A taste of what awaits you — our most-loved dishes across the week</p>
          </div>
          <div className="featured-grid">
            {featured.map((item) => (
              <div key={item.id} className="card food-card" style={{ pointerEvents: "none" }}>
                <div className="food-card-img-wrap" style={{ cursor: "default" }}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <span className={`badge badge-${item.category} food-card-badge`}>
                    {item.category === "protein" ? "Protein" : item.category === "vegetarian" ? "Vegetarian" : "Side"}
                  </span>
                </div>
                <div className="food-card-body">
                  <div className="food-card-name" style={{ cursor: "default" }}>{item.name}</div>
                  <p className="food-card-desc">{item.description}</p>
                  <div className="food-card-footer">
                    <div className="food-card-price">${item.price}<span>/person</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a href="#order-section" className="btn btn-secondary btn-lg">
              Start Your Order ↑
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
