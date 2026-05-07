import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatDate, PICKUP_TIMES, generateOrderId, BUSINESS } from "../data/menuData";

const PAYMENT_OPTIONS = [
  { id: "cash", label: "Cash on Pickup", icon: "💵" },
  { id: "card", label: "Credit / Debit", icon: "💳" },
  { id: "check", label: "Check", icon: "📝" },
];

function Field({ label, required, error, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}{required && <span className="required" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <span className="form-error" role="alert">⚠ {error}</span>}
    </div>
  );
}

export default function Checkout() {
  const { items, selectedDate, subtotal, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    pickupTime: "",
    paymentMethod: "cash",
    cardNumber: "", cardName: "", cardExpiry: "", cardCVV: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🛒</div>
        <h2>Your cart is empty</h2>
        <p style={{ marginBottom: 24 }}>Add some items before checking out.</p>
        <Link to="/" className="btn btn-primary">Browse Menu</Link>
      </div>
    );
  }

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[\d\s\-().+]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.pickupTime) e.pickupTime = "Please select a pickup time";
    if (form.paymentMethod === "card") {
      const raw = form.cardNumber.replace(/\s/g, "");
      if (!raw) e.cardNumber = "Card number is required";
      else if (!/^\d{15,16}$/.test(raw)) e.cardNumber = "Enter a valid 15 or 16 digit card number";
      if (!form.cardName.trim()) e.cardName = "Name on card is required";
      if (!form.cardExpiry) e.cardExpiry = "Expiry date is required";
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = "Use MM/YY format";
      if (!form.cardCVV) e.cardCVV = "CVV is required";
      else if (!/^\d{3,4}$/.test(form.cardCVV)) e.cardCVV = "Enter 3 or 4 digit CVV";
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    const orderId = generateOrderId();
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      pickupDate: selectedDate,
      pickupTime: form.pickupTime,
      customer: { name: form.name, phone: form.phone, email: form.email },
      items: items.map((ci) => ({
        id: ci.foodItem.id,
        name: ci.foodItem.name,
        category: ci.foodItem.category,
        price: ci.foodItem.price,
        portions: ci.portions,
        itemTotal: ci.foodItem.price * ci.portions,
        image: ci.foodItem.image,
      })),
      subtotal,
      tax,
      total,
      paymentMethod: form.paymentMethod,
      paymentInfo: form.paymentMethod === "card"
        ? { cardLast4: form.cardNumber.replace(/\s/g, "").slice(-4), cardName: form.cardName }
        : {},
      specialInstructions: form.instructions,
    };

    try {
      localStorage.setItem(`mk_order_${orderId}`, JSON.stringify(order));
      const idx = JSON.parse(localStorage.getItem("mk_order_index") || "[]");
      idx.unshift(orderId);
      localStorage.setItem("mk_order_index", JSON.stringify(idx));
    } catch {
      // localStorage may be full; still navigate
    }

    clearCart();
    navigate(`/order/${orderId}`);
  };

  const inp = (field) => ({
    className: `form-input${errors[field] ? " error" : ""}`,
    value: form[field],
    onChange: set(field),
    "aria-invalid": errors[field] ? "true" : undefined,
  });

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 style={{ marginBottom: 8 }}>Checkout</h1>
        <p style={{ marginBottom: 32, color: "var(--text-muted)" }}>
          Pickup: <strong style={{ color: "var(--text)" }}>{formatDate(selectedDate)}</strong>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="checkout-layout">
            <div>
              {/* Contact */}
              <div className="checkout-section">
                <h3>
                  <span className="checkout-section-icon">👤</span>
                  Contact Information
                </h3>
                <div className="form-row form-row-2" style={{ marginBottom: 16 }}>
                  <Field label="Full Name" required error={errors.name}>
                    <input {...inp("name")} type="text" placeholder="Sarah Thompson" autoComplete="name" />
                  </Field>
                  <Field label="Phone Number" required error={errors.phone}>
                    <input {...inp("phone")} type="tel" placeholder="(503) 555-0100" autoComplete="tel" />
                  </Field>
                </div>
                <Field label="Email Address" required error={errors.email}>
                  <input {...inp("email")} type="email" placeholder="sarah@example.com" autoComplete="email" />
                </Field>
              </div>

              {/* Pickup */}
              <div className="checkout-section">
                <h3>
                  <span className="checkout-section-icon">📅</span>
                  Pickup Details
                </h3>
                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label className="form-label">Pickup Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formatDate(selectedDate)}
                      readOnly
                      style={{ background: "var(--bg-alt)", cursor: "default" }}
                    />
                  </div>
                  <Field label="Pickup Time" required error={errors.pickupTime}>
                    <select
                      className={`form-select${errors.pickupTime ? " error" : ""}`}
                      value={form.pickupTime}
                      onChange={set("pickupTime")}
                      aria-invalid={errors.pickupTime ? "true" : undefined}
                    >
                      <option value="">Select a time…</option>
                      {PICKUP_TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.pickupTime && <span className="form-error" role="alert">⚠ {errors.pickupTime}</span>}
                  </Field>
                </div>
                <div style={{ marginTop: 14, padding: "12px 14px", background: "var(--bg-alt)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  📍 Pickup at: <strong>{BUSINESS.address}</strong><br />
                  🕐 Hours: {BUSINESS.pickupHours}
                </div>
              </div>

              {/* Payment */}
              <div className="checkout-section">
                <h3>
                  <span className="checkout-section-icon">💳</span>
                  Payment Method
                </h3>
                <div className="payment-options" role="group" aria-label="Payment method">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`payment-option${form.paymentMethod === opt.id ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.id}
                        checked={form.paymentMethod === opt.id}
                        onChange={set("paymentMethod")}
                        style={{ display: "none" }}
                      />
                      <span className="payment-option-icon">{opt.icon}</span>
                      <span className="payment-option-label">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {form.paymentMethod === "card" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <Field label="Card Number" required error={errors.cardNumber}>
                      <input
                        {...inp("cardNumber")}
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                          const spaced = v.replace(/(\d{4})(?=\d)/g, "$1 ");
                          setForm((f) => ({ ...f, cardNumber: spaced }));
                          setErrors((err) => ({ ...err, cardNumber: "" }));
                        }}
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                    </Field>
                    <Field label="Name on Card" required error={errors.cardName}>
                      <input {...inp("cardName")} type="text" placeholder="Sarah Thompson" autoComplete="cc-name" />
                    </Field>
                    <div className="form-row form-row-2">
                      <Field label="Expiry Date" required error={errors.cardExpiry}>
                        <input
                          {...inp("cardExpiry")}
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                            setForm((f) => ({ ...f, cardExpiry: v }));
                            setErrors((err) => ({ ...err, cardExpiry: "" }));
                          }}
                          inputMode="numeric"
                          autoComplete="cc-exp"
                        />
                      </Field>
                      <Field label="CVV" required error={errors.cardCVV}>
                        <input
                          {...inp("cardCVV")}
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          inputMode="numeric"
                          autoComplete="cc-csc"
                        />
                      </Field>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      🔒 Your payment information is collected for record-keeping only and is not processed online.
                    </p>
                  </div>
                )}

                {form.paymentMethod === "check" && (
                  <p style={{ padding: "12px 14px", background: "var(--bg-alt)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    📝 Please make your check payable to <strong>Maplewood Kitchen</strong> and bring it at pickup.
                  </p>
                )}

                {form.paymentMethod === "cash" && (
                  <p style={{ padding: "12px 14px", background: "var(--bg-alt)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    💵 Please bring the exact amount or we'll provide change. Total due at pickup: <strong>${total.toFixed(2)}</strong>
                  </p>
                )}
              </div>

              {/* Special Instructions */}
              <div className="checkout-section">
                <h3>
                  <span className="checkout-section-icon">📝</span>
                  Special Instructions
                </h3>
                <Field label="Notes for us (optional)">
                  <textarea
                    className="form-textarea"
                    value={form.instructions}
                    onChange={set("instructions")}
                    placeholder="Allergies, packaging requests, delivery notes…"
                    rows={3}
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
                disabled={submitting}
              >
                {submitting ? "Placing Order…" : `Place Order · $${total.toFixed(2)}`}
              </button>
            </div>

            {/* Order Summary */}
            <div className="checkout-order-summary">
              <div className="order-summary-card">
                <div className="order-summary-header">Order Summary</div>
                <div className="order-summary-items">
                  {items.map((ci) => (
                    <div key={ci.id} className="summary-item">
                      <img src={ci.foodItem.image} alt={ci.foodItem.name} className="summary-item-img" loading="lazy" />
                      <div className="summary-item-info">
                        <div className="summary-item-name">{ci.foodItem.name}</div>
                        <div className="summary-item-qty">{ci.portions} people × ${ci.foodItem.price}</div>
                      </div>
                      <div className="summary-item-price">${(ci.foodItem.price * ci.portions).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="order-summary-totals">
                  <div className="summary-total-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="summary-total-line"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="summary-grand-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
