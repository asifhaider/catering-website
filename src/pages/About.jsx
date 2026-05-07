import React from "react";
import { Link } from "react-router-dom";

const VALUES = [
  { icon: "🌿", title: "Local & Seasonal", desc: "We source from Portland-area farmers and rotate our menus with the seasons, so ingredients are always at their peak." },
  { icon: "🤌", title: "Scratch-Made", desc: "Every stock, sauce, and pastry is made from scratch in our certified kitchen. Never from a jar or a box." },
  { icon: "🏡", title: "Community First", desc: "Born from a neighborhood meal-prep service, we believe food brings people together. That's still our north star." },
  { icon: "♻️", title: "Sustainably Packed", desc: "We use compostable containers and packaging made from recycled materials wherever possible." },
];

const TEAM = [
  {
    name: "Sarah Thompson",
    role: "Head Chef & Co-founder",
    photo: "https://picsum.photos/seed/sarah-chef/200/200",
    bio: "Trained at the Culinary Institute of America, Sarah spent a decade in fine dining before returning home to cook the food she loves most.",
  },
  {
    name: "James Thompson",
    role: "Operations & Co-founder",
    photo: "https://picsum.photos/seed/james-ops/200/200",
    bio: "Former supply-chain manager turned logistics wizard, James keeps every order running on time and every table smiling.",
  },
  {
    name: "Lily Chen",
    role: "Pastry & Baked Goods",
    photo: "https://picsum.photos/seed/lily-pastry/200/200",
    bio: "Lily's focaccia, cornbread, and flatbreads are the talk of every pickup window — she has a gift for turning simple dough into something magical.",
  },
];

export default function About() {
  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>
            What started as Sunday dinners for neighbours grew into Portland's
            most-loved home catering service. Here's how it happened.
          </p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="https://picsum.photos/seed/maplewood-kitchen/800/600"
                alt="The Maplewood Kitchen"
                loading="lazy"
              />
            </div>
            <div className="about-text">
              <h2>From Our Kitchen to Your Table</h2>
              <p>
                Maplewood Kitchen was born in 2018 when Sarah Thompson started
                cooking weekly meal boxes for a few families on Oak Street.
                Word spread quickly — her slow-braised brisket and herb-roasted
                chicken became neighbourhood legends.
              </p>
              <p>
                Within a year, demand outgrew the dining table. Sarah and her
                husband James converted their garage into a certified commercial
                kitchen and launched a catering service focused on what they
                knew best: honest, home-cooked food made with love and local
                ingredients.
              </p>
              <p>
                Today, Maplewood Kitchen serves hundreds of gatherings a year —
                from intimate family reunions to corporate lunches — without
                ever losing the warmth that started it all.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 8 }}>
                Get in Touch →
              </Link>
            </div>
          </div>

          <div className="about-grid" style={{ direction: "rtl" }}>
            <div className="about-image" style={{ direction: "ltr" }}>
              <img
                src="https://picsum.photos/seed/farm-ingredients/800/600"
                alt="Fresh local ingredients"
                loading="lazy"
              />
            </div>
            <div className="about-text" style={{ direction: "ltr" }}>
              <h2>Rooted in the Pacific Northwest</h2>
              <p>
                Every week we visit the Portland Farmers Market and work with
                over a dozen local farms. Choosing what goes in a menu means
                asking: what's perfect right now? That question shapes every
                dish we make.
              </p>
              <p>
                We also hold a Class A Commercial Kitchen Certification from
                Multnomah County and carry full food-handler permits for all
                team members. We take food safety as seriously as we take flavour.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="values-section" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="values-heading">What We Stand For</h2>
            <p>The principles that guide every dish we cook</p>
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.title} className="card value-card">
                <span className="value-icon" role="img" aria-label={v.title}>{v.icon}</span>
                <h4>{v.title}</h4>
                <p style={{ fontSize: "0.88rem" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="team-heading">The Team</h2>
            <p>The people behind every dish</p>
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="card team-card">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="team-photo"
                  loading="lazy"
                />
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <p style={{ fontSize: "0.85rem", marginTop: 10 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: "var(--primary)", color: "#fff", padding: "56px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "#fff", marginBottom: 12 }}>Ready to Order?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 28 }}>
            Pick a date, browse our menu, and let us cook for your next gathering.
          </p>
          <Link to="/" className="btn btn-hero-primary btn-lg">View This Week's Menus →</Link>
        </div>
      </div>
    </>
  );
}
