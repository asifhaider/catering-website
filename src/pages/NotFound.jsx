import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty-state" style={{ paddingTop: 100 }}>
      <div className="empty-state-icon">🍽️</div>
      <h2 style={{ marginBottom: 8 }}>Page Not Found</h2>
      <p style={{ marginBottom: 28 }}>
        Looks like this page wandered off the menu.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
