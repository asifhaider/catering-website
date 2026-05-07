import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../data/menuData";

function loadOrders() {
  try {
    const idx = JSON.parse(localStorage.getItem("mk_order_index") || "[]");
    return idx.map((id) => {
      try { return JSON.parse(localStorage.getItem(`mk_order_${id}`)); } catch { return null; }
    }).filter(Boolean);
  } catch { return []; }
}

export default function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { setOrders(loadOrders()); }, []);

  const handleClear = () => {
    if (!window.confirm("Clear all past orders? This cannot be undone.")) return;
    try {
      const idx = JSON.parse(localStorage.getItem("mk_order_index") || "[]");
      idx.forEach((id) => localStorage.removeItem(`mk_order_${id}`));
      localStorage.removeItem("mk_order_index");
    } catch {}
    setOrders([]);
  };

  return (
    <div className="past-orders-page">
      <div className="container">
        <div className="past-orders-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1>Past Orders</h1>
            <p style={{ marginTop: 4 }}>All orders placed through this device are stored here.</p>
          </div>
          {orders.length > 0 && (
            <button className="btn btn-danger btn-sm" onClick={handleClear}>
              🗑️ Clear All
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No orders yet</h3>
            <p style={{ marginBottom: 24 }}>Orders you place will appear here for your records.</p>
            <Link to="/" className="btn btn-primary">Start an Order</Link>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isOpen={expanded === order.id}
                onToggle={() => setExpanded((e) => e === order.id ? null : order.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, isOpen, onToggle }) {
  const placed = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
  const payLabel = {
    cash: "Cash",
    card: `Card ···${order.paymentInfo?.cardLast4 ?? "****"}`,
    check: "Check",
  }[order.paymentMethod] || order.paymentMethod;

  return (
    <div className="order-card">
      <div
        className="order-card-header"
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
      >
        <div>
          <div className="order-id">{order.id}</div>
          <div className="order-date">Placed {placed} · Pickup {formatDate(order.pickupDate)} at {order.pickupTime}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="order-total-summary">${order.total.toFixed(2)}</span>
          <span className={`order-expand-icon${isOpen ? " open" : ""}`} aria-hidden="true">▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="order-card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Customer</div>
              <div style={{ fontSize: "0.88rem" }}>{order.customer.name}<br />{order.customer.phone}<br />{order.customer.email}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Payment</div>
              <div style={{ fontSize: "0.88rem" }}>{payLabel}</div>
            </div>
            {order.specialInstructions && (
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Instructions</div>
                <div style={{ fontSize: "0.88rem", fontStyle: "italic" }}>"{order.specialInstructions}"</div>
              </div>
            )}
          </div>

          <table className="invoice-table" style={{ marginBottom: 16 }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Portions</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.portions} people</td>
                  <td>${item.itemTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ maxWidth: 240, marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", padding: "2px 0" }}>
              <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", padding: "2px 0" }}>
              <span>Tax</span><span>${order.tax.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1rem", borderTop: "2px solid var(--border)", marginTop: 8, paddingTop: 8 }}>
              <span>Total</span><span style={{ color: "var(--primary)" }}>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <Link to={`/order/${order.id}`} className="btn btn-sm btn-secondary">
              View Invoice
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
