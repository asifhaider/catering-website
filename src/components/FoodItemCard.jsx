import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { MIN_PORTIONS, MAX_PORTIONS } from "../data/menuData";

const CATEGORY_LABELS = { protein: "Protein", vegetarian: "Vegetarian", sides: "Side" };

export default function FoodItemCard({ item, date, onViewDetails }) {
  const { addItem, items } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const [showAdd, setShowAdd] = useState(false);
  const [portions, setPortions] = useState(cartItem ? cartItem.portions : 10);
  const [added, setAdded] = useState(false);

  const adjust = (delta) => {
    setPortions((p) => Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, p + delta)));
  };

  const handleAddBtn = (e) => {
    e.stopPropagation();
    if (showAdd) {
      addItem(item, portions, date);
      setAdded(true);
      setTimeout(() => { setAdded(false); setShowAdd(false); }, 1500);
    } else {
      setShowAdd(true);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowAdd(false);
  };

  return (
    <article className="food-card" aria-label={item.name}>
      <div
        className="food-card-img-wrap"
        onClick={() => onViewDetails(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onViewDetails(item)}
        aria-label={`View details for ${item.name}`}
      >
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className={`badge badge-${item.category} food-card-badge`}>
          {CATEGORY_LABELS[item.category]}
        </span>
      </div>

      <div className="food-card-body">
        <div
          className="food-card-name"
          onClick={() => onViewDetails(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onViewDetails(item)}
        >
          {item.name}
        </div>
        <p className="food-card-desc">{item.description}</p>
        <div className="food-card-footer">
          <div className="food-card-price">
            ${item.price}<span>/person</span>
          </div>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => onViewDetails(item)}
          >
            Details
          </button>
        </div>
      </div>

      {showAdd ? (
        <div className="quick-add">
          <div>
            <div className="portion-control">
              <button
                className="portion-btn"
                onClick={(e) => { e.stopPropagation(); adjust(-1); }}
                disabled={portions <= MIN_PORTIONS}
                aria-label="Decrease portions"
              >−</button>
              <span className="portion-value">{portions}</span>
              <button
                className="portion-btn"
                onClick={(e) => { e.stopPropagation(); adjust(1); }}
                disabled={portions >= MAX_PORTIONS}
                aria-label="Increase portions"
              >+</button>
            </div>
            <div className="portion-label">{MIN_PORTIONS}–{MAX_PORTIONS} people</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-sm btn-ghost" onClick={handleCancel}>Cancel</button>
            <button
              className={`btn btn-sm ${added ? "btn-ghost" : "btn-primary"}`}
              onClick={handleAddBtn}
            >
              {added ? "✓ Added!" : "Confirm"}
            </button>
          </div>
        </div>
      ) : (
        <div className="quick-add" style={{ justifyContent: "center" }}>
          <button
            className={`btn btn-sm ${cartItem ? "btn-accent" : "btn-primary"}`}
            style={{ width: "100%" }}
            onClick={handleAddBtn}
          >
            {cartItem ? "✓ In Cart — Update" : "Add to Cart"}
          </button>
        </div>
      )}
    </article>
  );
}
