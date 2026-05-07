import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { foodItems, formatDateString } from '../data/menuData'

const PICKUP_TIMES = ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']

/**
 * SC 1.3.1 / 4.1.2 – Field associates label and input via htmlFor/id.
 * SC 3.3.2 – visible label + optional helper text.
 * SC 4.1.2 – error is linked via aria-describedby and announced with role=alert.
 */
function Field({ id, label, error, required = false, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
        {label}
        {required && (
          <span className="text-red-600 ml-0.5" aria-hidden="true"> *</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-gray-600 mb-1">{hint}</p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-600 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full border border-gray-500 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-700 focus:border-transparent outline-none transition-shadow bg-white'

const selectClass = inputClass + ' cursor-pointer'

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const navigate = useNavigate()
  const { items, selectedDate } = state

  // SC 2.4.2 – update page title for this route
  useEffect(() => {
    document.title = 'Checkout – Mama\'s Table'
  }, [])

  const [form, setForm] = useState({
    firstName:     '',
    lastName:      '',
    email:         '',
    phone:         '',
    pickupTime:    PICKUP_TIMES[0],
    payment:       'cash',
    paymentHandle: '',
    guests:        '',
    instructions:  '',
  })
  const [errors, setErrors] = useState({})

  const total = items.reduce((sum, entry) => {
    const item = foodItems[entry.itemId]
    return sum + (item ? item.pricePerPerson * entry.quantity : 0)
  }, 0)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim())  errs.lastName  = 'Last name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'A valid email address is required'
    if (!form.phone.trim() || !/^\+?[\d\s\-().]{7,}$/.test(form.phone))
      errs.phone = 'A valid phone number is required'
    if (form.payment !== 'cash' && !form.paymentHandle.trim())
      errs.paymentHandle = `${form.payment === 'venmo' ? 'Venmo @handle' : 'Zelle phone or email'} is required`
    if (!form.guests || +form.guests < 6 || +form.guests > 30)
      errs.guests = 'Enter a number between 6 and 30'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const orderNumber = `MT-${Date.now().toString().slice(-6)}`
    const order = {
      orderNumber,
      placedAt:   new Date().toISOString(),
      pickupDate: selectedDate,
      pickupTime: form.pickupTime,
      customer: {
        name:  `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
      },
      guests:  +form.guests,
      payment: { method: form.payment, handle: form.paymentHandle || null },
      instructions: form.instructions || null,
      items: items.map(entry => {
        const item = foodItems[entry.itemId]
        return {
          id:             entry.itemId,
          name:           item.name,
          category:       item.category,
          quantity:       entry.quantity,
          pricePerPerson: item.pricePerPerson,
          subtotal:       item.pricePerPerson * entry.quantity,
        }
      }),
      total,
    }

    const existing = JSON.parse(localStorage.getItem('mamastable_orders') || '[]')
    localStorage.setItem('mamastable_orders', JSON.stringify([...existing, order]))
    localStorage.setItem('mamastable_last_order', JSON.stringify(order))

    dispatch({ type: 'CLEAR_CART' })
    navigate(`/invoice/${orderNumber}`)
  }

  if (!items.length) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Your cart is empty.</p>
          <Link to="/menu" className="text-brand-900 font-medium hover:underline underline-offset-2">← Back to Menu</Link>
        </div>
      </div>
    )
  }

  /* SC 3.3.2 – required field notice at form level */
  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link to="/cart" className="text-sm text-gray-700 hover:text-brand-900 transition-colors hover:underline underline-offset-2">← Back to Cart</Link>
          <h1 className="font-display text-3xl font-bold text-gray-900 mt-2">Checkout</h1>
          <p className="text-gray-700 text-sm mt-1">Complete your order for {formatDateString(selectedDate)}</p>
        </div>

        {/* SC 3.3.2 – required field indicator explained at top of form */}
        <p className="text-sm text-gray-700 mb-6">
          Fields marked with <span className="text-red-600 font-bold" aria-hidden="true"> *</span>
          <span className="sr-only"> (asterisk)</span> are required.
        </p>

        {/* SC 4.1.2 – form-level error summary for AT */}
        {hasErrors && (
          <div role="alert" className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 font-semibold text-sm mb-1">Please correct the following errors:</p>
            <ul className="list-disc list-inside text-red-600 text-sm space-y-0.5">
              {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Checkout form">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── Left: form ── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Section 1 – Pickup Details */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5" aria-labelledby="section-pickup">
                <h2 id="section-pickup" className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span aria-hidden="true" className="w-6 h-6 bg-brand-900 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
                  Pickup Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <Field id="pickup-date" label="Pickup Date">
                    <input
                      id="pickup-date"
                      type="text"
                      value={formatDateString(selectedDate)}
                      readOnly
                      aria-readonly="true"
                      className={inputClass + ' bg-gray-50 cursor-default text-gray-700'}
                    />
                  </Field>

                  <Field id="pickup-time" label="Pickup Time">
                    <select
                      id="pickup-time"
                      value={form.pickupTime}
                      onChange={e => set('pickupTime', e.target.value)}
                      className={selectClass}
                      /* SC 1.3.5 – no standard autocomplete token for custom pickup times */
                      autoComplete="off"
                    >
                      {PICKUP_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field
                    id="guests"
                    label="Number of Guests"
                    error={errors.guests}
                    required
                    hint="Between 6 and 30 people"
                  >
                    <input
                      id="guests"
                      type="number"
                      min={6}
                      max={30}
                      placeholder="e.g. 15"
                      value={form.guests}
                      onChange={e => set('guests', e.target.value)}
                      aria-required="true"
                      aria-describedby={`guests-hint${errors.guests ? ' guests-error' : ''}`}
                      aria-invalid={errors.guests ? 'true' : undefined}
                      className={inputClass}
                      autoComplete="off"
                    />
                  </Field>
                </div>
              </section>

              {/* Section 2 – Contact Information */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5" aria-labelledby="section-contact">
                <h2 id="section-contact" className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span aria-hidden="true" className="w-6 h-6 bg-brand-900 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <Field id="first-name" label="First Name" error={errors.firstName} required>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="Zara"
                      value={form.firstName}
                      onChange={e => set('firstName', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.firstName ? 'true' : undefined}
                      aria-describedby={errors.firstName ? 'first-name-error' : undefined}
                      /* SC 1.3.5 Identify Input Purpose */
                      autoComplete="given-name"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="last-name" label="Last Name" error={errors.lastName} required>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Al-Hassan"
                      value={form.lastName}
                      onChange={e => set('lastName', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.lastName ? 'true' : undefined}
                      aria-describedby={errors.lastName ? 'last-name-error' : undefined}
                      autoComplete="family-name"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email} required>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      autoComplete="email"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="phone" label="Phone" error={errors.phone} required>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.phone ? 'true' : undefined}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </section>

              {/* Section 3 – Payment Method */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5" aria-labelledby="section-payment">
                <h2 id="section-payment" className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span aria-hidden="true" className="w-6 h-6 bg-brand-900 text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
                  Payment Method
                </h2>

                {/* SC 1.3.1 / 4.1.2 – fieldset + legend groups radio buttons */}
                <fieldset>
                  <legend className="sr-only">Choose a payment method</legend>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { value: 'cash',  label: 'Cash',  icon: '💵', note: 'Pay at pickup' },
                      { value: 'venmo', label: 'Venmo', icon: '💳', note: '@handle sent after' },
                      { value: 'zelle', label: 'Zelle', icon: '🏦', note: 'Request sent after' },
                    ].map(opt => (
                      <label
                        key={opt.value}
                        className={`border rounded-xl p-3 cursor-pointer flex flex-col items-center gap-1 transition-all text-center ${
                          form.payment === opt.value
                            ? 'border-brand-900 bg-brand-50 ring-2 ring-brand-900'
                            : 'border-gray-300 hover:border-brand-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.value}
                          className="sr-only"
                          checked={form.payment === opt.value}
                          onChange={() => { set('payment', opt.value); set('paymentHandle', '') }}
                        />
                        <span aria-hidden="true" className="text-xl">{opt.icon}</span>
                        <span className="font-semibold text-sm text-gray-900">{opt.label}</span>
                        <span className="text-xs text-gray-600">{opt.note}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {form.payment === 'cash' && (
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3" role="status">
                    <span aria-hidden="true">💵</span>{' '}
                    Please have exact cash ready at pickup. We appreciate it!
                  </p>
                )}

                {form.payment === 'venmo' && (
                  <Field id="venmo-handle" label="Your Venmo @handle" error={errors.paymentHandle} required
                    hint="We'll send a payment request the day before pickup.">
                    <input
                      id="venmo-handle"
                      type="text"
                      placeholder="@your-handle"
                      value={form.paymentHandle}
                      onChange={e => set('paymentHandle', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.paymentHandle ? 'true' : undefined}
                      aria-describedby={`venmo-handle-hint${errors.paymentHandle ? ' venmo-handle-error' : ''}`}
                      autoComplete="off"
                      className={inputClass}
                    />
                  </Field>
                )}

                {form.payment === 'zelle' && (
                  <Field id="zelle-contact" label="Your Zelle phone or email" error={errors.paymentHandle} required
                    hint="We'll send a Zelle request the day before pickup.">
                    <input
                      id="zelle-contact"
                      type="text"
                      placeholder="(555) 123-4567 or you@example.com"
                      value={form.paymentHandle}
                      onChange={e => set('paymentHandle', e.target.value)}
                      aria-required="true"
                      aria-invalid={errors.paymentHandle ? 'true' : undefined}
                      aria-describedby={`zelle-contact-hint${errors.paymentHandle ? ' zelle-contact-error' : ''}`}
                      autoComplete="off"
                      className={inputClass}
                    />
                  </Field>
                )}
              </section>

              {/* Section 4 – Special Instructions */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5" aria-labelledby="section-instructions">
                <h2 id="section-instructions" className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span aria-hidden="true" className="w-6 h-6 bg-brand-900 text-white rounded-full text-xs flex items-center justify-center font-bold">4</span>
                  Special Instructions
                  <span className="text-gray-600 font-normal text-xs ml-1">(optional)</span>
                </h2>
                <label htmlFor="instructions" className="sr-only">Special instructions (optional)</label>
                <textarea
                  id="instructions"
                  rows={4}
                  placeholder="Allergies, dietary restrictions, delivery notes, or anything else you'd like us to know…"
                  value={form.instructions}
                  onChange={e => set('instructions', e.target.value)}
                  autoComplete="off"
                  className={inputClass + ' resize-none'}
                />
              </section>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-20">
                {/* SC 2.4.6 – labelled section */}
                <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

                {/* SC 1.3.1 – description list for key-value pairs */}
                <dl className="space-y-2 text-sm mb-4">
                  {items.map(entry => {
                    const item = foodItems[entry.itemId]
                    if (!item) return null
                    return (
                      <div key={entry.itemId} className="flex justify-between gap-2 text-gray-700">
                        <dt className="truncate">
                          {item.name}{' '}
                          <span className="text-gray-600">×{entry.quantity}</span>
                        </dt>
                        <dd className="flex-shrink-0 font-medium text-gray-900">${item.pricePerPerson * entry.quantity}</dd>
                      </div>
                    )
                  })}
                </dl>

                <div className="border-t border-gray-100 pt-3 mb-5">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-brand-900 text-lg">${total}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Pickup · {formatDateString(selectedDate)}</p>
                </div>

                {/* SC 2.5.5 – min 44px height */}
                <button
                  type="submit"
                  className="w-full bg-brand-900 hover:bg-brand-800 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md min-h-[44px]"
                >
                  Place Order
                </button>
                {/* SC 1.4.3 – gray-700 on white ≈ 10:1 */}
                <p className="text-center text-xs text-gray-700 mt-3">
                  By placing an order you agree to our pickup and payment terms.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
