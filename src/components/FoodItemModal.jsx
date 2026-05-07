import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import NutritionFacts from "./NutritionFacts";
import { MIN_PORTIONS, MAX_PORTIONS } from "../data/menuData";

const CATEGORY_LABELS = {
  protein: "Protein",
  vegetarian: "Vegetarian",
  sides: "Side",
};

export default function FoodItemModal({ item, date, onClose }) {
  const { addItem, items } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const [portions, setPortions] = useState(cartItem ? cartItem.portions : 10);
  const [added, setAdded] = useState(false);
  const closeRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  const adjust = (delta) => {
    setPortions((p) => Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, p + delta)));
  };

  const handleAdd = () => {
    addItem(item, portions, date);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBackdrop = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} ref={closeRef} aria-label="Close dialog">✕</button>
        <img
          src={item.image}
          alt={item.name}
          className="modal-img"
          loading="lazy"
        />
        <div className="modal-body">
          <div className="modal-header">
            <div>
              <span className={`badge badge-${item.category}`} style={{ marginBottom: 8, display: "inline-flex" }}>
                {CATEGORY_LABELS[item.category]}
              </span>
              <h2 className="modal-title" id="modal-title">{item.name}</h2>
            </div>
            <div>
              <div className="modal-price">
                ${item.price}<span>/person</span>
              </div>
            </div>
          </div>

          <p className="modal-desc">{item.description}</p>

          <div className="modal-section">
            <div className="modal-section-title">Ingredients</div>
            <div className="ingredients-list">
              {item.ingredients.map((ing) => (
                <span key={ing} className="ingredient-chip">{ing}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Nutrition Facts</div>
            <NutritionFacts nutrition={item.nutrition} />
          </div>

          <div className="modal-add-section">
            <div className="modal-add-left">
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: 4, color: "var(--text-secondary)" }}>
                  Portions (people)
                </div>
                <div className="portion-control">
                  <button
                    className="portion-btn"
                    onClick={() => adjust(-1)}
                    disabled={portions <= MIN_PORTIONS}
                    aria-label="Decrease portions"
                  >−</button>
                  <span className="portion-value" aria-live="polite" aria-label={`${portions} portions`}>
                    {portions}
                  </span>
                  <button
                    className="portion-btn"
                    onClick={() => adjust(1)}
                    disabled={portions >= MAX_PORTIONS}
                    aria-label="Increase portions"
                  >+</button>
                </div>
                <div className="portion-range-hint">Min {MIN_PORTIONS} · Max {MAX_PORTIONS} people</div>
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--primary)" }}>
                  ${(item.price * portions).toFixed(2)}
                </span>
                <br />total
              </div>
            </div>
            <button
              className={`btn ${added ? "btn-ghost" : "btn-primary"}`}
              onClick={handleAdd}
              aria-live="polite"
            >
              {added ? "✓ Added!" : cartItem ? "Update Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
