import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatDate, MIN_PORTIONS, MAX_PORTIONS } from "../data/menuData";

export default function CartDrawer() {
  const {
    isDrawerOpen, closeDrawer,
    items, selectedDate,
    subtotal, tax, total,
    removeItem, updatePortions,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeDrawer();
    navigate("/checkout");
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      <div
        className="cart-overlay"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button
            className="btn btn-icon btn-ghost"
            onClick={closeDrawer}
            aria-label="Close cart"
          >✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Browse the menu to add items</p>
            </div>
          ) : (
            <>
              {selectedDate && (
                <div className="cart-date-header">
                  📅 Pickup: {formatDate(selectedDate)}
                </div>
              )}
              {items.map((cartItem) => (
                <CartItemRow
                  key={cartItem.id}
                  cartItem={cartItem}
                  onRemove={() => removeItem(cartItem.id)}
                  onUpdatePortions={(p) => updatePortions(cartItem.id, p)}
                />
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItemRow({ cartItem, onRemove, onUpdatePortions }) {
  const { foodItem, portions } = cartItem;

  const adjust = (delta) => {
    const next = Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, portions + delta));
    onUpdatePortions(next);
  };

  return (
    <div className="cart-item">
      <img
        src={foodItem.image}
        alt={foodItem.name}
        className="cart-item-img"
        loading="lazy"
      />
      <div className="cart-item-info">
        <div className="cart-item-name">{foodItem.name}</div>
        <div className="cart-item-price-hint">${foodItem.price}/person</div>
        <div className="cart-item-controls">
          <div className="portion-control">
            <button
              className="portion-btn"
              onClick={() => adjust(-1)}
              disabled={portions <= MIN_PORTIONS}
              aria-label="Decrease portions"
            >−</button>
            <span className="portion-value" aria-label={`${portions} people`}>{portions}</span>
            <button
              className="portion-btn"
              onClick={() => adjust(1)}
              disabled={portions >= MAX_PORTIONS}
              aria-label="Increase portions"
            >+</button>
          </div>
          <span className="portion-label">ppl</span>
          <span className="cart-item-subtotal">${(foodItem.price * portions).toFixed(2)}</span>
        </div>
      </div>
      <button
        className="cart-remove-btn"
        onClick={onRemove}
        aria-label={`Remove ${foodItem.name} from cart`}
      >✕</button>
    </div>
  );
}
