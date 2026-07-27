"use client";

import { useMemo, useState } from "react";
import DateMenuPicker from "@/components/DateMenuPicker";
import MenuList from "@/components/MenuList";
import {
  formatDisplayDate,
  getDefaultPickupDateValue,
  parseDateInputValue,
} from "@/lib/dates";
import { getMenuForDate, getWeekdayFromDate, weekdayLabels } from "@/lib/menu-data";

export default function HomePage() {
  const [pickupDate, setPickupDate] = useState(getDefaultPickupDateValue);

  const selected = parseDateInputValue(pickupDate);
  const menu = useMemo(
    () => (selected ? getMenuForDate(selected) : []),
    [selected]
  );
  const weekdayLabel = selected
    ? weekdayLabels[getWeekdayFromDate(selected)]
    : null;

  return (
    <>
      <section className="hero" aria-labelledby="hero-brand">
        <div className="hero-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1800&q=80"
            alt=""
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p id="hero-brand" className="hero-brand">
            Hearth &amp; Plate
          </p>
          <h1 className="hero-headline">Homemade catering, ready for pickup</h1>
          <p className="hero-lede">
            Choose a date, browse that day’s menu, and pick up a meal made from
            scratch in our kitchen.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">
              Browse the menu
            </a>
            <a className="button button-secondary" href="/about">
              Our story
            </a>
          </div>
        </div>
      </section>

      <div className="page-shell" id="menu">
        <div className="section-panel" style={{ marginBottom: "1.5rem" }}>
          <DateMenuPicker value={pickupDate} onChange={setPickupDate} />
          {selected && weekdayLabel ? (
            <p className="section-lede" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
              Each {weekdayLabel} has its own menu. You are viewing{" "}
              {formatDisplayDate(selected)}.
            </p>
          ) : null}
        </div>

        {selected ? (
          <div className="section-panel">
            <MenuList items={menu} cateringDate={pickupDate} />
          </div>
        ) : null}
      </div>
    </>
  );
}
