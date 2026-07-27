import { useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { businessInfo } from '../data/business'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { Order } from '../types'
import { formatDate, parseISODate } from '../utils/dates'
import { getStoredInvoices } from '../utils/invoices'

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Cash on pickup',
  card: 'Credit / Debit card',
  venmo: 'Venmo',
}

export default function Invoice() {
  const { orderId } = useParams<{ orderId: string }>()
  const location = useLocation()
  const printRef = useRef<HTMLDivElement>(null)

  const order: Order | undefined =
    (location.state as { order?: Order } | null)?.order ??
    getStoredInvoices().find((o) => o.id === orderId)

  useDocumentTitle(
    order
      ? `Order Invoice ${order.id} — ${businessInfo.name}`
      : `Invoice Not Found — ${businessInfo.name}`,
  )

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Invoice Not Found</h1>
        <p className="mt-4 text-warm-brown/80" role="status">
          We couldn&apos;t find an invoice with that ID. It may have been cleared from your browser storage.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Back to Menu
        </Link>
      </div>
    )
  }

  const { checkout: c } = order

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p
        role="status"
        className="mb-6 rounded-lg bg-sage/15 px-4 py-3 text-sm font-medium print:hidden"
        style={{ color: '#4a5d42' }}
      >
        Your order is confirmed. A copy of this invoice has been saved for your records.
      </p>

      <div
        ref={printRef}
        className="rounded-xl bg-white p-8 shadow-sm print:shadow-none"
        aria-labelledby="invoice-title"
      >
        <header className="border-b border-warm-brown/30 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-terracotta">
            {businessInfo.name}
          </p>
          <h1 id="invoice-title" className="mt-2 font-display text-2xl font-bold text-warm-brown">
            Order Invoice
          </h1>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <dt className="text-warm-brown">Invoice #</dt>
              <dd className="font-medium text-warm-brown">{order.id}</dd>
            </div>
            <div>
              <dt className="text-warm-brown/80">Order date</dt>
              <dd className="font-medium text-warm-brown">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="customer-info-heading" className="mt-6">
          <h2 id="customer-info-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown">
            Customer Information
          </h2>
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Name:</dt>
              <dd className="text-warm-brown">{c.customerName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Email:</dt>
              <dd className="text-warm-brown">{c.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Phone:</dt>
              <dd className="text-warm-brown">{c.phone}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="pickup-info-heading" className="mt-6">
          <h2 id="pickup-info-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown">
            Pickup Details
          </h2>
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Date:</dt>
              <dd className="text-warm-brown">{formatDate(parseISODate(c.pickupDate))}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Time:</dt>
              <dd className="text-warm-brown">{c.pickupTime}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Portion size:</dt>
              <dd className="text-warm-brown">{c.portionSize} people</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="order-items-heading" className="mt-6">
          <h2 id="order-items-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown">
            Order Items
          </h2>
          <table className="mt-2 w-full text-sm">
            <caption className="sr-only">Items ordered</caption>
            <thead>
              <tr className="border-b border-warm-brown/30 text-left">
                <th scope="col" className="py-2 font-medium">Item</th>
                <th scope="col" className="py-2 font-medium">Qty</th>
                <th scope="col" className="py-2 text-right font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(({ foodItem, quantity }) => (
                <tr key={foodItem.id} className="border-b border-warm-brown/20">
                  <td className="py-2">{foodItem.name}</td>
                  <td className="py-2">{quantity}</td>
                  <td className="py-2 text-right">
                    ${(foodItem.price * quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="payment-info-heading" className="mt-6">
          <h2 id="payment-info-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown">
            Payment
          </h2>
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="text-warm-brown/80">Method:</dt>
              <dd className="text-warm-brown">{PAYMENT_LABELS[c.paymentMethod]}</dd>
            </div>
            {c.paymentDetails && (
              <div className="flex gap-2">
                <dt className="text-warm-brown/80">Details:</dt>
                <dd className="text-warm-brown">{c.paymentDetails}</dd>
              </div>
            )}
          </dl>
        </section>

        {c.specialInstructions && (
          <section aria-labelledby="instructions-heading" className="mt-6">
            <h2 id="instructions-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown">
              Special Instructions
            </h2>
            <p className="mt-2 text-sm text-warm-brown">{c.specialInstructions}</p>
          </section>
        )}

        <section aria-labelledby="order-summary-heading" className="mt-6 border-t border-warm-brown/30 pt-4">
          <h2 id="order-summary-heading" className="text-sm font-semibold uppercase tracking-wide text-warm-brown">
            Order Summary
          </h2>
          <dl className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${order.subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tax (8%)</dt>
              <dd>${order.tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <dt>Total</dt>
              <dd>${order.total.toFixed(2)}</dd>
            </div>
          </dl>
        </section>

        <p className="mt-6 text-sm text-warm-brown">
          Thank you for your order! Payment will be collected at pickup. This invoice has been saved for your records.
        </p>
      </div>

      <div className="mt-6 flex gap-4 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="flex-1 rounded-lg border border-warm-brown/20 bg-white py-3 text-sm font-semibold text-warm-brown hover:bg-warm-brown/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Print Invoice
        </button>
        <Link
          to="/"
          className="flex-1 rounded-lg bg-terracotta py-3 text-center text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  )
}
