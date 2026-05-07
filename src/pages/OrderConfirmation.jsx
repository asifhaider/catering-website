import React from "react";
import { useParams, Link } from "react-router-dom";
import { formatDate, BUSINESS } from "../data/menuData";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  let order = null;
  try {
    const raw = localStorage.getItem(`mk_order_${orderId}`);
    if (raw) order = JSON.parse(raw);
  } catch {}

  if (!order) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>❓</div>
        <h2>Order not found</h2>
        <p style={{ marginBottom: 24 }}>This order doesn't exist or may have been cleared.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  const placed = new Date(order.createdAt).toLocaleString("en-US", {
    month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

  const paymentDisplay = {
    cash: "Cash on Pickup",
    card: `Credit/Debit Card ending in ${order.paymentInfo?.cardLast4 ?? "****"}`,
    check: "Check (payable to Maplewood Kitchen)",
  }[order.paymentMethod] || order.paymentMethod;

  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <div className="confirmation-icon" role="img" aria-label="Order placed successfully">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you! Your order has been received. We'll have it ready for you at the window.</p>
      </div>

      <div className="container">
        <div className="invoice" id="invoice" aria-label="Order invoice">
          <div className="invoice-header">
            <div>
              <div className="invoice-brand">
                🍽️ Maplewood Kitchen
                <span>Homemade Catering — Portland, OR</span>
              </div>
            </div>
            <div className="invoice-meta">
              <strong>Order #{order.id}</strong>
              <div>Placed: {placed}</div>
            </div>
          </div>

          <div className="invoice-body">
            <div className="invoice-grid">
              <div>
                <div className="invoice-section-title">Customer</div>
                <div className="invoice-section-content">
                  {order.customer.name}<br />
                  {order.customer.phone}<br />
                  {order.customer.email}
                </div>
              </div>
              <div>
                <div className="invoice-section-title">Pickup</div>
                <div className="invoice-section-content">
                  <strong>{formatDate(order.pickupDate)}</strong><br />
                  {order.pickupTime}<br />
                  {BUSINESS.address}
                </div>
              </div>
              <div>
                <div className="invoice-section-title">Payment</div>
                <div className="invoice-section-content">{paymentDisplay}</div>
              </div>
              {order.specialInstructions && (
                <div>
                  <div className="invoice-section-title">Special Instructions</div>
                  <div className="invoice-section-content" style={{ fontStyle: "italic" }}>
                    "{order.specialInstructions}"
                  </div>
                </div>
              )}
            </div>

            <table className="invoice-table" aria-label="Order items">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Portions</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                      <br />
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                        {item.category}
                      </span>
                    </td>
                    <td>{item.portions} people</td>
                    <td>${item.price.toFixed(2)}/person</td>
                    <td>${item.itemTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-totals">
              <div className="invoice-total-line">
                <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="invoice-total-line">
                <span>Tax (8%)</span><span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="invoice-total-line grand">
                <span>Total</span><span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="invoice-footer">
            <p>{BUSINESS.phone} · {BUSINESS.email}</p>
            <p>Thank you for choosing Maplewood Kitchen!</p>
          </div>
        </div>

        <div className="invoice-actions">
          <button
            className="btn btn-secondary"
            onClick={() => window.print()}
            aria-label="Print this invoice"
          >
            🖨️ Print Invoice
          </button>
          <Link to="/orders" className="btn btn-ghost">📋 View All Orders</Link>
          <Link to="/" className="btn btn-primary">Place Another Order →</Link>
        </div>
      </div>
    </div>
  );
}
