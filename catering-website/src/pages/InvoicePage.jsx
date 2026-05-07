import { useEffect, useRef } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { business } from '../data/business'

const PAYMENT_LABELS = {
  cash: 'Cash on Pickup',
  etransfer: 'E-Transfer',
  cheque: 'Cheque',
}

function formatDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatDateTime(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function InvoicePage() {
  const { orderId } = useParams()
  const location = useLocation()
  const printBtnRef = useRef(null)

  // Try state passed from checkout, then fall back to localStorage
  let order = location.state?.order ?? null
  if (!order) {
    try {
      const stored = JSON.parse(localStorage.getItem('zk_orders') || '[]')
      order = stored.find((o) => o.orderId === orderId) ?? null
    } catch (_) {}
  }

  useEffect(() => {
    document.title = order
      ? `Invoice ${order.orderId} — Zara's Kitchen`
      : 'Invoice — Zara\'s Kitchen'
  }, [order])

  if (!order) {
    return (
      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Invoice Not Found</h1>
          <p style={{ margin: 'var(--space-6) auto' }}>
            We couldn't find order <strong>{orderId}</strong>. If you just placed
            the order, please check your browser and try again.
          </p>
          <Link to="/" className="btn btn--primary">Back to Menu</Link>
        </div>
      </main>
    )
  }

  const subtotal = order.items.reduce((s, i) => s + i.subtotal, 0)

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: 'Menu', to: '/' },
          { label: `Invoice ${order.orderId}` },
        ]}
      />

      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container">
          {/* Success banner */}
          <div className="invoice-success-banner" role="status" aria-live="polite">
            <span className="invoice-success-banner__icon" aria-hidden="true">🎉</span>
            <div>
              <div className="invoice-success-banner__title">
                Order Placed Successfully!
              </div>
              <p className="invoice-success-banner__msg">
                Thank you, {order.customer.firstName}! Your order has been received.
                We'll be in touch at <strong>{order.customer.email}</strong> or{' '}
                <strong>{order.customer.phone}</strong> if we have any questions.
              </p>
            </div>
          </div>

          {/* Print / Action buttons */}
          <div
            className="invoice-actions"
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-6)',
            }}
          >
            <button
              ref={printBtnRef}
              type="button"
              className="btn btn--outline btn--print"
              onClick={() => window.print()}
              aria-label="Print this invoice"
            >
              🖨 Print Invoice
            </button>
            <Link to="/" className="btn btn--ghost">
              ← Back to Menu
            </Link>
          </div>

          {/* Invoice document */}
          <article className="invoice" aria-label={`Invoice for order ${order.orderId}`}>

            {/* Header */}
            <header className="invoice-header">
              <div>
                <div className="invoice-header__brand">{business.name}</div>
                <address style={{ fontStyle: 'normal', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>
                  {business.address.street}<br />
                  {business.address.city}, {business.address.province} {business.address.postalCode}<br />
                  <a href={`tel:${business.contact.phonePlain}`}>{business.contact.phone}</a><br />
                  <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
                </address>
              </div>

              <div className="invoice-header__meta">
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  Order Confirmation
                </div>
                <div className="invoice-header__order-num">{order.orderId}</div>
                <div className="invoice-header__date">
                  Placed: {formatDateTime(order.placedAt)}
                </div>
              </div>
            </header>

            {/* Info grid */}
            <div className="invoice-info-grid">
              <div className="invoice-info-block">
                <div className="invoice-info-block__title">Bill To</div>
                <address style={{ fontStyle: 'normal' }}>
                  <p>
                    <strong>{order.customer.firstName} {order.customer.lastName}</strong>
                  </p>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </address>
              </div>

              <div className="invoice-info-block">
                <div className="invoice-info-block__title">Pickup Details</div>
                <p>
                  <strong>Date:</strong> {formatDate(order.pickupDate)}
                </p>
                <p>
                  <strong>Time:</strong> {order.pickupTime}
                </p>
                <p>
                  <strong>Payment:</strong> {PAYMENT_LABELS[order.payment] || order.payment}
                </p>
                <p>
                  <strong>Location:</strong><br />
                  {business.address.street},<br />
                  {business.address.city}, {business.address.province}
                </p>
              </div>
            </div>

            {/* Special instructions */}
            {order.specialInstructions && (
              <section aria-labelledby="instructions-heading" style={{ marginBottom: 'var(--space-6)' }}>
                <h2 id="instructions-heading" style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                  Special Instructions
                </h2>
                <p style={{ background: 'var(--color-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-sm)', maxWidth: 'unset' }}>
                  {order.specialInstructions}
                </p>
              </section>
            )}

            {/* Items table */}
            <section aria-labelledby="items-heading">
              <h2 id="items-heading" className="sr-only">Order items</h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="invoice-items-table" aria-label="Ordered items">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Category</th>
                      <th scope="col">
                        <abbr title="Portions">Qty</abbr>
                      </th>
                      <th scope="col">
                        Price / <abbr title="person">prs</abbr>
                      </th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td style={{ textTransform: 'capitalize' }}>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>${item.pricePerPerson.toFixed(2)}</td>
                        <td>${item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="invoice-totals">
                <div className="invoice-totals__row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="invoice-totals__row">
                  <span>
                    <abbr title="Harmonized Sales Tax">HST</abbr> / Tax
                  </span>
                  <span>Discussed at pickup</span>
                </div>
                <div className="invoice-totals__row invoice-totals__row--total">
                  <span>Amount Due</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="invoice-footer">
              <p>
                Thank you for ordering from {business.name}!
              </p>
              <p style={{ marginTop: 'var(--space-2)' }}>
                Questions? Contact us at{' '}
                <a href={`tel:${business.contact.phonePlain}`}>{business.contact.phone}</a>{' '}
                or{' '}
                <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>.
              </p>
              <p style={{ marginTop: 'var(--space-2)', opacity: 0.7 }}>
                Order {order.orderId} &mdash; This is your receipt.
                Please keep it for your records.
              </p>
            </footer>
          </article>
        </div>
      </main>
    </>
  )
}
