"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatCurrency,
  formatDisplayDate,
  parseDateInputValue,
} from "@/lib/dates";
import { getInvoiceById, paymentMethodLabels } from "@/lib/invoices";
import type { Invoice } from "@/lib/types";

interface InvoiceViewProps {
  invoiceId: string;
}

export default function InvoiceView({ invoiceId }: InvoiceViewProps) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInvoice(getInvoiceById(invoiceId));
    setReady(true);
  }, [invoiceId]);

  if (!ready) {
    return (
      <div className="section-panel">
        <p className="section-lede">Loading invoice…</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <section className="section-panel" aria-labelledby="invoice-missing">
        <h1 id="invoice-missing" className="section-heading">
          Invoice not found
        </h1>
        <p className="section-lede">
          We could not find invoice {invoiceId} in this browser’s local storage.
          If you just placed an order, try again from the same device.
        </p>
        <Link href="/#menu" className="button button-primary">
          Return to menu
        </Link>
      </section>
    );
  }

  const pickupDate = parseDateInputValue(invoice.pickupDate);
  const created = new Date(invoice.createdAt);

  return (
    <article className="invoice-sheet" aria-labelledby="invoice-heading">
      <p className="date-status" role="status" aria-label="Order confirmation">
        Order placed successfully. Thank you—your pickup order is confirmed.
      </p>

      <h1 id="invoice-heading" className="section-heading">
        Order confirmation
      </h1>
      <p className="section-lede">
        Invoice {invoice.id}. Keep this confirmation for pickup.
      </p>

      <section aria-labelledby="order-meta-heading">
        <h2 id="order-meta-heading" className="menu-category-heading">
          Order details
        </h2>
        <dl className="invoice-dl">
          <div>
            <dt>Invoice number</dt>
            <dd>{invoice.id}</dd>
          </div>
          <div>
            <dt>Order placed</dt>
            <dd>
              {formatDisplayDate(created)} at{" "}
              {created.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="pickup-heading">
        <h2 id="pickup-heading" className="menu-category-heading">
          Pickup information
        </h2>
        <dl className="invoice-dl">
          <div>
            <dt>Pickup date</dt>
            <dd>
              {pickupDate
                ? formatDisplayDate(pickupDate)
                : invoice.pickupDate}
            </dd>
          </div>
          <div>
            <dt>Pickup time</dt>
            <dd>{invoice.pickupTime}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="customer-heading">
        <h2 id="customer-heading" className="menu-category-heading">
          Customer contact
        </h2>
        <dl className="invoice-dl">
          <div>
            <dt>Full name</dt>
            <dd>{invoice.customer.fullName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{invoice.customer.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{invoice.customer.phone}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="payment-heading">
        <h2 id="payment-heading" className="menu-category-heading">
          Payment and notes
        </h2>
        <dl className="invoice-dl">
          <div>
            <dt>Payment method</dt>
            <dd>{paymentMethodLabels[invoice.paymentMethod]}</dd>
          </div>
          <div>
            <dt>Special instructions</dt>
            <dd>
              {invoice.specialInstructions.trim()
                ? invoice.specialInstructions
                : "None"}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="items-heading">
        <h2 id="items-heading" className="menu-category-heading">
          Order items
        </h2>
        <div className="nutrition-scroll">
          <table className="nutrition-table">
            <caption className="visually-hidden">
              Line items for invoice {invoice.id}
            </caption>
            <thead>
              <tr>
                <th scope="col">Dish</th>
                <th scope="col">Portions</th>
                <th scope="col">Price per portion</th>
                <th scope="col">Line total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.foodItemId}>
                  <th scope="row">{item.name}</th>
                  <td>{item.portions}</td>
                  <td>{formatCurrency(item.pricePerPortion)}</td>
                  <td>{formatCurrency(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="totals-heading">
        <h2 id="totals-heading" className="menu-category-heading">
          Totals
        </h2>
        <dl className="invoice-dl">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(invoice.subtotal)}</dd>
          </div>
          <div>
            <dt>Tax (sales tax)</dt>
            <dd>{formatCurrency(invoice.tax)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>
              <strong>{formatCurrency(invoice.total)}</strong>
            </dd>
          </div>
        </dl>
      </section>

      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/#menu" className="button button-primary">
          Return to menu
        </Link>
      </p>
    </article>
  );
}
