import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { foodItems, formatDateString } from '../data/menuData'

const PICKUP_TIMES = ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']

function Field({ label, error, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p id={htmlFor ? `${htmlFor}-error` : undefined} className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-shadow bg-white'

const selectClass = inputClass + ' cursor-pointer'

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const navigate = useNavigate()
  const { items, selectedDate } = state

  const [form, setForm] = useState({
    firstName:    '',
    lastName:     '',
    email:        '',
    phone:        '',
    pickupTime:   PICKUP_TIMES[0],
    payment:      'cash',
    paymentHandle: '',
    guests:       '',
    instructions: '',
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
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email required'
    if (!form.phone.trim() || !/^\+?[\d\s\-().]{7,}$/.test(form.phone))
      errs.phone = 'Valid phone number required'
    if (form.payment !== 'cash' && !form.paymentHandle.trim())
      errs.paymentHandle = `${form.payment === 'venmo' ? 'Venmo @handle' : 'Zelle phone/email'} required`
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
      placedAt: new Date().toISOString(),
      pickupDate: selectedDate,
      pickupTime: form.pickupTime,
      customer: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
      },
      guests: +form.guests,
      payment: {
        method: form.payment,
        handle: form.paymentHandle || null,
      },
      instructions: form.instructions || null,
      items: items.map(entry => {
        const item = foodItems[entry.itemId]
        return {
          id: entry.itemId,
          name: item.name,
          category: item.category,
          quantity: entry.quantity,
          pricePerPerson: item.pricePerPerson,
          subtotal: item.pricePerPerson * entry.quantity,
        }
      }),
      total,
    }

    // Persist to localStorage
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
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/menu" className="text-brand-700 font-medium hover:underline">← Back to Menu</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link to="/cart" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">← Back to Cart</Link>
          <h1 className="font-display text-3xl font-bold text-gray-900 mt-2">Checkout</h1>
          <p className="text-gray-500 text-sm mt-1">Complete your order for {formatDateString(selectedDate)}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Pickup details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-700 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
                  Pickup Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Pickup Date" htmlFor="checkout-pickup-date">
                    <input
                      id="checkout-pickup-date"
                      type="text"
                      value={formatDateString(selectedDate)}
                      readOnly
                      className={inputClass + ' bg-gray-50 cursor-default text-gray-600'}
                    />
                  </Field>
                  <Field label="Pickup Time" htmlFor="checkout-pickup-time">
                    <select
                      id="checkout-pickup-time"
                      value={form.pickupTime}
                      onChange={e => set('pickupTime', e.target.value)}
                      className={selectClass}
                    >
                      {PICKUP_TIMES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Number of Guests" htmlFor="checkout-guests" error={errors.guests}>
                    <input
                      id="checkout-guests"
                      type="number"
                      min={6}
                      max={30}
                      placeholder="e.g. 15"
                      value={form.guests}
                      onChange={e => set('guests', e.target.value)}
                      className={inputClass}
                      required
                      aria-describedby={errors.guests ? 'checkout-guests-error' : 'checkout-guests-hint'}
                    />
                    <p id="checkout-guests-hint" className="text-xs text-gray-400 mt-1">Between 6 and 30 people</p>
                  </Field>
                </div>
              </div>

              {/* Contact info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-700 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" htmlFor="checkout-first-name" error={errors.firstName}>
                    <input id="checkout-first-name" type="text" placeholder="Zara" value={form.firstName}
                      onChange={e => set('firstName', e.target.value)} className={inputClass}
                      required aria-describedby={errors.firstName ? 'checkout-first-name-error' : undefined} />
                  </Field>
                  <Field label="Last Name" htmlFor="checkout-last-name" error={errors.lastName}>
                    <input id="checkout-last-name" type="text" placeholder="Al-Hassan" value={form.lastName}
                      onChange={e => set('lastName', e.target.value)} className={inputClass}
                      required aria-describedby={errors.lastName ? 'checkout-last-name-error' : undefined} />
                  </Field>
                  <Field label="Email" htmlFor="checkout-email" error={errors.email}>
                    <input id="checkout-email" type="email" placeholder="you@example.com" value={form.email}
                      onChange={e => set('email', e.target.value)} className={inputClass}
                      required aria-describedby={errors.email ? 'checkout-email-error' : undefined} />
                  </Field>
                  <Field label="Phone" htmlFor="checkout-phone" error={errors.phone}>
                    <input id="checkout-phone" type="tel" placeholder="(555) 123-4567" value={form.phone}
                      onChange={e => set('phone', e.target.value)} className={inputClass}
                      required aria-describedby={errors.phone ? 'checkout-phone-error' : undefined} />
                  </Field>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-700 text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
                  Payment Method
                </h2>

                <fieldset>
                  <legend className="sr-only">Payment method</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                    {[
                      { value: 'cash',  label: 'Cash',  icon: '💵', note: 'Pay at pickup' },
                      { value: 'venmo', label: 'Venmo', icon: '💳', note: '@handle sent after' },
                      { value: 'zelle', label: 'Zelle', icon: '🏦', note: 'Request sent after' },
                    ].map(opt => (
                      <label
                        key={opt.value}
                        className={`border rounded-xl p-3 cursor-pointer flex flex-row sm:flex-col items-center gap-3 sm:gap-1 sm:text-center transition-all ${
                          form.payment === opt.value
                            ? 'border-brand-700 bg-brand-50 ring-1 ring-brand-700'
                            : 'border-gray-200 hover:border-brand-300'
                        }`}
                      >
                        <input type="radio" name="payment" value={opt.value} className="sr-only"
                          checked={form.payment === opt.value}
                          onChange={() => { set('payment', opt.value); set('paymentHandle', '') }} />
                        <span className="text-xl flex-shrink-0" aria-hidden="true">{opt.icon}</span>
                        <span className="flex-1 sm:flex-none">
                          <span className="block font-semibold text-sm text-gray-800">{opt.label}</span>
                          <span className="block text-xs text-gray-400">{opt.note}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {form.payment === 'cash' && (
                  <p className="text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                    <span aria-hidden="true">💵</span> Please have exact cash ready at pickup. We appreciate it!
                  </p>
                )}

                {form.payment === 'venmo' && (
                  <Field label="Your Venmo @handle" htmlFor="checkout-payment-handle" error={errors.paymentHandle}>
                    <input id="checkout-payment-handle" type="text" placeholder="@your-handle" value={form.paymentHandle}
                      onChange={e => set('paymentHandle', e.target.value)} className={inputClass}
                      required aria-describedby={errors.paymentHandle ? 'checkout-payment-handle-error' : 'checkout-payment-handle-hint'} />
                    <p id="checkout-payment-handle-hint" className="text-xs text-gray-400 mt-1">We'll send a payment request the day before pickup.</p>
                  </Field>
                )}

                {form.payment === 'zelle' && (
                  <Field label="Your Zelle phone or email" htmlFor="checkout-payment-handle" error={errors.paymentHandle}>
                    <input id="checkout-payment-handle" type="text" placeholder="(555) 123-4567 or you@example.com"
                      value={form.paymentHandle}
                      onChange={e => set('paymentHandle', e.target.value)} className={inputClass}
                      required aria-describedby={errors.paymentHandle ? 'checkout-payment-handle-error' : 'checkout-payment-handle-hint'} />
                    <p id="checkout-payment-handle-hint" className="text-xs text-gray-400 mt-1">We'll send a Zelle request the day before pickup.</p>
                  </Field>
                )}
              </div>

              {/* Special instructions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 id="special-instructions-heading" className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-700 text-white rounded-full text-xs flex items-center justify-center font-bold">4</span>
                  Special Instructions
                  <span className="text-gray-400 font-normal text-xs ml-1">(optional)</span>
                </h2>
                <textarea
                  id="checkout-instructions"
                  aria-labelledby="special-instructions-heading"
                  rows={4}
                  placeholder="Allergies, dietary restrictions, delivery notes, or anything else you'd like us to know…"
                  value={form.instructions}
                  onChange={e => set('instructions', e.target.value)}
                  className={inputClass + ' resize-none'}
                />
              </div>
            </div>

            {/* Right: order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
                <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-2 text-sm mb-4">
                  {items.map(entry => {
                    const item = foodItems[entry.itemId]
                    if (!item) return null
                    return (
                      <div key={entry.itemId} className="flex justify-between gap-2 text-gray-600">
                        <span className="truncate">{item.name} <span className="text-gray-400">×{entry.quantity}</span></span>
                        <span className="flex-shrink-0 font-medium text-gray-800">${item.pricePerPerson * entry.quantity}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-gray-100 pt-3 mb-5">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-brand-700 text-lg">${total}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Pickup · {formatDateString(selectedDate)}</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md"
                >
                  Place Order →
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
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
