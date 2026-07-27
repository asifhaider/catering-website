"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import {
  formatCurrency,
  formatDisplayDate,
  parseDateInputValue,
} from "@/lib/dates";
import { MAX_PORTIONS, MIN_PORTIONS } from "@/lib/types";

export default function CartView() {
  const { items, subtotal, cateringDate, updatePortions, removeItem } =
    useCart();
  const headingId = useId();
  const liveRegionRef = useRef<HTMLParagraphElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const nextFocusIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (nextFocusIdRef.current) {
      const target = document.getElementById(nextFocusIdRef.current);
      target?.focus();
      nextFocusIdRef.current = null;
    }
  }, [items]);

  const date = cateringDate ? parseDateInputValue(cateringDate) : null;
  const dateLabel = date
    ? formatDisplayDate(date)
    : cateringDate || "Not selected";

  function handleRemove(foodItemId: string, name: string, index: number) {
    const nextItem = items[index + 1] ?? items[index - 1];
    nextFocusIdRef.current = nextItem
      ? `remove-${nextItem.foodItemId}`
      : "browse-menu-link";
    removeItem(foodItemId);
    setAnnouncement(`Removed ${name} from cart.`);
  }

  function handlePortionChange(foodItemId: string, name: string, value: string) {
    const parsed = Number(value);
    if (!Number.isInteger(parsed)) return;
    if (parsed < MIN_PORTIONS || parsed > MAX_PORTIONS) {
      setAnnouncement(
        `Portions for ${name} must be between ${MIN_PORTIONS} and ${MAX_PORTIONS}.`
      );
      return;
    }
    updatePortions(foodItemId, parsed);
    setAnnouncement(
      `Updated ${name} to ${parsed} portions. Line total ${formatCurrency(
        (items.find((item) => item.foodItemId === foodItemId)?.pricePerPortion ??
          0) * parsed
      )}.`
    );
  }

  if (items.length === 0) {
    return (
      <section className="section-panel" aria-labelledby={headingId}>
        <h1 id={headingId} className="section-heading">
          Your cart is empty
        </h1>
        <p className="section-lede">
          Add dishes from a day’s menu to build your catering order for pickup.
        </p>
        <Link
          id="browse-menu-link"
          href="/#menu"
          className="button button-primary"
        >
          Browse menu
        </Link>
        <p className="visually-hidden" role="status" ref={liveRegionRef}>
          {announcement}
        </p>
      </section>
    );
  }

  return (
    <section className="section-panel" aria-labelledby={headingId}>
      <h1 id={headingId} className="section-heading">
        Your cart
      </h1>
      <p className="section-lede">
        Review your cart before checkout. Pickup date:{" "}
        <strong>{dateLabel}</strong>. Portions for each dish must be between{" "}
        {MIN_PORTIONS} and {MAX_PORTIONS} people.
      </p>

      <h2 className="menu-category-heading">Cart items</h2>
      <ul className="cart-list" role="list">
        {items.map((item, index) => {
          const lineTotal = item.pricePerPortion * item.portions;
          const inputId = `portions-${item.foodItemId}`;
          return (
            <li key={item.foodItemId} className="cart-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="cart-item-image"
              />
              <div className="cart-item-body">
                <h3 className="food-card-name">{item.name}</h3>
                <p className="section-lede" style={{ margin: 0 }}>
                  {formatCurrency(item.pricePerPortion)} per portion
                </p>
                <div className="qty-control" style={{ marginTop: "0.75rem" }}>
                  <label htmlFor={inputId} className="visually-hidden">
                    Portions for {item.name}
                  </label>
                  <button
                    type="button"
                    aria-label={`Decrease portions for ${item.name}`}
                    disabled={item.portions <= MIN_PORTIONS}
                    onClick={() =>
                      handlePortionChange(
                        item.foodItemId,
                        item.name,
                        String(item.portions - 1)
                      )
                    }
                  >
                    −
                  </button>
                  <input
                    id={inputId}
                    type="number"
                    min={MIN_PORTIONS}
                    max={MAX_PORTIONS}
                    value={item.portions}
                    onChange={(event) =>
                      handlePortionChange(
                        item.foodItemId,
                        item.name,
                        event.target.value
                      )
                    }
                  />
                  <button
                    type="button"
                    aria-label={`Increase portions for ${item.name}`}
                    disabled={item.portions >= MAX_PORTIONS}
                    onClick={() =>
                      handlePortionChange(
                        item.foodItemId,
                        item.name,
                        String(item.portions + 1)
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className="date-status" style={{ marginTop: "0.75rem" }}>
                  Line total: <strong>{formatCurrency(lineTotal)}</strong>
                </p>
                <button
                  id={`remove-${item.foodItemId}`}
                  type="button"
                  className="button button-brand"
                  style={{ marginTop: "0.75rem" }}
                  aria-label={`Remove ${item.name}`}
                  onClick={() =>
                    handleRemove(item.foodItemId, item.name, index)
                  }
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <section aria-labelledby="order-summary-heading" style={{ marginTop: "2rem" }}>
        <h2 id="order-summary-heading" className="menu-category-heading">
          Order summary
        </h2>
        <p className="date-status">
          Subtotal: <strong>{formatCurrency(subtotal)}</strong>
        </p>
        <p className="field-instructions">
          Tax will be calculated at checkout.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link href="/#menu" className="button button-brand">
            Back to menu
          </Link>
          <Link href="/checkout" className="button button-primary">
            Proceed to checkout
          </Link>
        </div>
      </section>

      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
