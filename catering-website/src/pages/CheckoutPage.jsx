import { useState, useEffect, useId } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/Breadcrumb'
import { PICKUP_TIMES, dayThemes } from '../data/menu'
import { business } from '../data/business'

function formatDisplayDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase()
  return `ZK-${ts}`
}

const PAYMENT_METHODS = [
  {
    value: 'cash',
    label: 'Cash on Pickup',
    info: 'Bring exact cash when you come to pick up your order.',
  },
  {
    value: 'etransfer',
    label: 'E-Transfer',
    info: `Send payment to ${business.contact.email}. Use your order number as the message.`,
  },
  {
    value: 'cheque',
    label: 'Cheque',
    info: "Make the cheque payable to \"Zara's Kitchen\". Bring it with you at pickup.",
  },
]

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'phone', 'pickupTime', 'payment']

export default function CheckoutPage() {
  const { cartItems, cartTotal, selectedDate, clearCart } = useCart()
  const navigate = useNavigate()
  const formId = useId()

  useEffect(() => {
    document.title = 'Checkout — Zara\'s Kitchen'
  }, [])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupTime: '',
    payment: '',
    specialInstructions: '',
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // SC 3.2.2 On Input: no unexpected context change on input; only validate on submit

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    // Clear error when user corrects field
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: '' }))
    }
  }

  function validate() {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required.'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.'
    } else if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) {
      errs.phone = 'Please enter a valid phone number.'
    }
    if (!form.pickupTime) errs.pickupTime = 'Please select a pickup time.'
    if (!form.payment) errs.payment = 'Please select a payment method.'
    if (!form.agreeTerms) errs.agreeTerms = 'You must agree to the terms to place your order.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Move focus to first error field
      const firstErrorKey = Object.keys(errs)[0]
      const el = document.getElementById(`${formId}-${firstErrorKey}`)
      el?.focus()
      return
    }

    // Build and store order
    const orderId = generateOrderId()
    const order = {
      orderId,
      placedAt: new Date().toISOString(),
      pickupDate: selectedDate.toISOString(),
      pickupTime: form.pickupTime,
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      },
      items: cartItems.map(({ food, quantity }) => ({
        id: food.id,
        name: food.name,
        category: food.category,
        pricePerPerson: food.price,
        quantity,
        subtotal: food.price * quantity,
      })),
      total: cartTotal,
      payment: form.payment,
      specialInstructions: form.specialInstructions,
    }

    // Store in localStorage (for business owner viewing later)
    try {
      const existing = JSON.parse(localStorage.getItem('zk_orders') || '[]')
      existing.push(order)
      localStorage.setItem('zk_orders', JSON.stringify(existing))
    } catch (_) {
      // localStorage unavailable — continue gracefully
    }

    clearCart()
    navigate(`/invoice/${orderId}`, { state: { order } })
  }

  // Guard: redirect if cart is empty
  if (cartItems.length === 0 && !submitted) {
    return (
      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Checkout</h1>
          <p style={{ margin: 'var(--space-6) auto' }}>
            Your cart is empty. Please add items before checking out.
          </p>
          <Link to="/" className="btn btn--primary">Browse Menu</Link>
        </div>
      </main>
    )
  }

  const selectedPayment = PAYMENT_METHODS.find((p) => p.value === form.payment)

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: 'Menu', to: '/' },
          { label: 'Cart', to: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container">
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Checkout</h1>

          {selectedDate && (
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
              Pickup on <strong>{formatDisplayDate(selectedDate)}</strong>
              {' '}— {dayThemes[selectedDate.getDay()]}
            </p>
          )}

          {/* Display first-error summary for screen readers */}
          {Object.keys(errors).length > 0 && (
            <div
              className="alert alert--error"
              role="alert"
              aria-live="assertive"
              style={{ marginBottom: 'var(--space-6)' }}
            >
              <span className="alert__icon" aria-hidden="true">✕</span>
              <div>
                <strong>Please correct the following errors:</strong>
                <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                  {Object.values(errors).map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Checkout form"
          >
            <div className="checkout-layout">
              {/* Form fields */}
              <div>
                {/* ── Section 1: Pickup ── */}
                <section className="checkout-form-section" aria-labelledby="pickup-section">
                  <h2 id="pickup-section" className="checkout-form-section__title">
                    <span className="checkout-form-section__step" aria-hidden="true">1</span>
                    Pickup Details
                  </h2>

                  <div className="form-group">
                    <div style={{ background: 'var(--color-primary-light)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                      <strong>Pickup date:</strong> {formatDisplayDate(selectedDate)}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`${formId}-pickupTime`} className="form-label form-label--required">
                      Pickup Time
                    </label>
                    <select
                      id={`${formId}-pickupTime`}
                      className="form-select"
                      value={form.pickupTime}
                      onChange={(e) => update('pickupTime', e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.pickupTime}
                      aria-describedby={errors.pickupTime ? `${formId}-pickupTime-error` : undefined}
                      // SC 1.3.5: autocomplete not applicable for business time slots
                    >
                      <option value="">— Select a time —</option>
                      {PICKUP_TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.pickupTime && (
                      <span id={`${formId}-pickupTime-error`} className="form-error" role="alert">
                        <span aria-hidden="true">✕</span> {errors.pickupTime}
                      </span>
                    )}
                  </div>
                </section>

                {/* ── Section 2: Contact ── */}
                <section className="checkout-form-section" aria-labelledby="contact-section">
                  <h2 id="contact-section" className="checkout-form-section__title">
                    <span className="checkout-form-section__step" aria-hidden="true">2</span>
                    Contact Information
                  </h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`${formId}-firstName`} className="form-label form-label--required">
                        First Name
                      </label>
                      <input
                        type="text"
                        id={`${formId}-firstName`}
                        className="form-input"
                        value={form.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        autoComplete="given-name"   /* SC 1.3.5 */
                        aria-required="true"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? `${formId}-firstName-error` : undefined}
                        spellCheck={false}
                      />
                      {errors.firstName && (
                        <span id={`${formId}-firstName-error`} className="form-error" role="alert">
                          <span aria-hidden="true">✕</span> {errors.firstName}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor={`${formId}-lastName`} className="form-label form-label--required">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id={`${formId}-lastName`}
                        className="form-input"
                        value={form.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        autoComplete="family-name"  /* SC 1.3.5 */
                        aria-required="true"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? `${formId}-lastName-error` : undefined}
                        spellCheck={false}
                      />
                      {errors.lastName && (
                        <span id={`${formId}-lastName-error`} className="form-error" role="alert">
                          <span aria-hidden="true">✕</span> {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                    <label htmlFor={`${formId}-email`} className="form-label form-label--required">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id={`${formId}-email`}
                      className="form-input"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      autoComplete="email"          /* SC 1.3.5 */
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={`${formId}-email-hint${errors.email ? ` ${formId}-email-error` : ''}`}
                      inputMode="email"
                    />
                    <span id={`${formId}-email-hint`} className="form-hint">
                      Your invoice confirmation will be sent to this address.
                    </span>
                    {errors.email && (
                      <span id={`${formId}-email-error`} className="form-error" role="alert">
                        <span aria-hidden="true">✕</span> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                    <label htmlFor={`${formId}-phone`} className="form-label form-label--required">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id={`${formId}-phone`}
                      className="form-input"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      autoComplete="tel"            /* SC 1.3.5 */
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                      inputMode="tel"
                      placeholder="+1 (000) 000-0000"
                    />
                    {errors.phone && (
                      <span id={`${formId}-phone-error`} className="form-error" role="alert">
                        <span aria-hidden="true">✕</span> {errors.phone}
                      </span>
                    )}
                  </div>
                </section>

                {/* ── Section 3: Payment ── */}
                <section className="checkout-form-section" aria-labelledby="payment-section">
                  <h2 id="payment-section" className="checkout-form-section__title">
                    <span className="checkout-form-section__step" aria-hidden="true">3</span>
                    Payment Method
                  </h2>

                  {/* SC 3.3.2: Group with fieldset+legend */}
                  <fieldset aria-describedby={errors.payment ? `${formId}-payment-error` : undefined}>
                    <legend className="sr-only">Select payment method</legend>

                    <div className="payment-option">
                      {PAYMENT_METHODS.map((method) => (
                        <label key={method.value} className="form-check" style={{ alignItems: 'center' }}>
                          <input
                            type="radio"
                            name={`${formId}-payment`}
                            value={method.value}
                            checked={form.payment === method.value}
                            onChange={() => update('payment', method.value)}
                            className="form-check__input"
                            id={`${formId}-payment-${method.value}`}
                            aria-required="true"
                          />
                          <span className="form-check__label">
                            <strong>{method.label}</strong>
                          </span>
                        </label>
                      ))}

                      {/* SC 3.2.2: Info shown on selection, not on focus */}
                      {selectedPayment && (
                        <div
                          className="payment-option__info"
                          role="note"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {selectedPayment.info}
                        </div>
                      )}
                    </div>
                  </fieldset>

                  {errors.payment && (
                    <span id={`${formId}-payment-error`} className="form-error" role="alert">
                      <span aria-hidden="true">✕</span> {errors.payment}
                    </span>
                  )}
                </section>

                {/* ── Section 4: Special Instructions ── */}
                <section className="checkout-form-section" aria-labelledby="notes-section">
                  <h2 id="notes-section" className="checkout-form-section__title">
                    <span className="checkout-form-section__step" aria-hidden="true">4</span>
                    Special Instructions
                    <span
                      style={{ fontSize: 'var(--font-size-sm)', fontWeight: 400, marginLeft: 'var(--space-2)', color: 'var(--color-text-muted)' }}
                    >
                      (optional)
                    </span>
                  </h2>

                  <div className="form-group">
                    <label htmlFor={`${formId}-instructions`} className="form-label">
                      Notes for the kitchen
                    </label>
                    <textarea
                      id={`${formId}-instructions`}
                      className="form-textarea"
                      value={form.specialInstructions}
                      onChange={(e) => update('specialInstructions', e.target.value)}
                      aria-describedby={`${formId}-instructions-hint`}
                      placeholder="E.g. extra spicy, mild heat, nut allergy, additional serving containers needed…"
                      rows={4}
                      autoComplete="off"
                    />
                    <span id={`${formId}-instructions-hint`} className="form-hint">
                      Any dietary requirements not shown above, packaging requests, or other notes.
                    </span>
                  </div>
                </section>

                {/* Terms */}
                <section className="checkout-form-section" aria-labelledby="terms-section">
                  <h2 id="terms-section" className="sr-only">Terms agreement</h2>

                  <div className="form-group">
                    <label className="form-check" htmlFor={`${formId}-agreeTerms`}>
                      <input
                        type="checkbox"
                        id={`${formId}-agreeTerms`}
                        className="form-check__input"
                        checked={form.agreeTerms}
                        onChange={(e) => update('agreeTerms', e.target.checked)}
                        aria-required="true"
                        aria-invalid={!!errors.agreeTerms}
                        aria-describedby={errors.agreeTerms ? `${formId}-terms-error` : `${formId}-terms-hint`}
                      />
                      <span className="form-check__label">
                        I understand that orders require a minimum of{' '}
                        <strong>2 days notice</strong>, payment is due at pickup,
                        and I will be contacted at the email or phone number provided
                        if there are any issues.
                      </span>
                    </label>
                    {errors.agreeTerms ? (
                      <span id={`${formId}-terms-error`} className="form-error" role="alert">
                        <span aria-hidden="true">✕</span> {errors.agreeTerms}
                      </span>
                    ) : (
                      <span id={`${formId}-terms-hint`} className="sr-only">
                        You must check this box to place your order.
                      </span>
                    )}
                  </div>
                </section>

                <button type="submit" className="btn btn--primary btn--full" style={{ fontSize: 'var(--font-size-lg)' }}>
                  Place Order
                </button>
              </div>

              {/* Order summary sidebar */}
              <aside aria-labelledby="checkout-summary-heading" className="checkout-sidebar">
                <div className="order-summary" style={{ position: 'sticky', top: 'calc(64px + var(--space-4))' }}>
                  <h2 id="checkout-summary-heading" className="order-summary__title">
                    Order Summary
                  </h2>

                  <div className="order-summary__rows">
                    {cartItems.map(({ food, quantity }) => (
                      <div key={food.id} className="order-summary__row">
                        <span>
                          {food.name}{' '}
                          <span style={{ color: 'var(--color-text-muted)' }}>×{quantity}</span>
                        </span>
                        <span>${(food.price * quantity).toFixed(2)}</span>
                      </div>
                    ))}

                    <hr className="divider" style={{ margin: 0 }} />

                    <div className="order-summary__row order-summary__row--total">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-summary__note">
                    Prices are in Canadian dollars (<abbr title="Canadian dollars">CAD</abbr>).
                    Taxes, if applicable, will be discussed at pickup.
                  </div>

                  <Link
                    to="/cart"
                    className="btn btn--ghost btn--sm btn--full"
                    style={{ marginTop: 'var(--space-4)' }}
                    aria-label="Edit cart items"
                  >
                    ← Edit Cart
                  </Link>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
