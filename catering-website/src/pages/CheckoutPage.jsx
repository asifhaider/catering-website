import { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'

function generateOrderId() {
  return 'NK-' + Date.now().toString(36).toUpperCase()
}

function saveInvoice(order) {
  const invoices = JSON.parse(localStorage.getItem('nk-invoices') || '[]')
  invoices.push(order)
  localStorage.setItem('nk-invoices', JSON.stringify(invoices))
}

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash on pickup' },
  { value: 'etransfer', label: 'E-Transfer' },
  { value: 'card', label: 'Credit / Debit card' },
]

export default function CheckoutPage() {
  usePageTitle('Checkout')

  const { items, subtotal, tax, total, cateringDate, clearCart } = useCart()
  const navigate = useNavigate()
  const formId = useId()

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    portionSize: '10',
    paymentMethod: 'cash',
    cardNumber: '', cardExpiry: '', cardCvv: '',
    specialInstructions: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function field(name) {
    return {
      id: `${formId}-${name}`,
      name,
      value: form[name],
      onChange: e => {
        setForm(f => ({ ...f, [name]: e.target.value }))
        if (errors[name]) setErrors(err => ({ ...err, [name]: '' }))
      },
      'aria-invalid': errors[name] ? 'true' : undefined,
      'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
    }
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    if (!form.email.trim()) e.email = 'Email address is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.'
    const ps = parseInt(form.portionSize)
    if (!form.portionSize || isNaN(ps) || ps < 6 || ps > 30) {
      e.portionSize = 'Portion size must be between 6 and 30 people.'
    }
    if (form.paymentMethod === 'card') {
      if (!form.cardNumber.trim()) e.cardNumber = 'Card number is required.'
      if (!form.cardExpiry.trim()) e.cardExpiry = 'Expiry date is required.'
      if (!form.cardCvv.trim()) e.cardCvv = 'CVV is required.'
    }
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first error
      const firstErr = Object.keys(errs)[0]
      document.getElementById(`${formId}-${firstErr}`)?.focus()
      return
    }
    setSubmitting(true)
    const orderId = generateOrderId()
    const order = {
      orderId,
      placedAt: new Date().toISOString(),
      cateringDate: cateringDate?.toISOString(),
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
      },
      portionSize: parseInt(form.portionSize),
      paymentMethod: form.paymentMethod,
      specialInstructions: form.specialInstructions,
      items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      subtotal,
      tax,
      total,
    }
    saveInvoice(order)
    clearCart()
    navigate(`/invoice/${orderId}`)
  }

  const inputClass = (name) =>
    `w-full border-2 rounded-lg px-3 py-2.5 text-stone-800 bg-white focus:outline-none focus:border-brand-500 transition-colors min-h-[44px] ${
      errors[name] ? 'border-red-500' : 'border-stone-300'
    }`

  const labelClass = 'block text-sm font-medium text-stone-700 mb-1'

  if (items.length === 0 && !submitting) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-stone-800 mb-3">Your cart is empty</h1>
        <p className="text-stone-500 mb-6">Add some items from the menu before checking out.</p>
        <button onClick={() => navigate('/')} className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl min-h-[48px]">
          Browse Menu
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form — takes 2/3 */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Order checkout form"
          >
            {/* Required fields note */}
            <p className="text-sm text-stone-500 mb-6">
              Fields marked <span aria-hidden="true" className="text-red-600 font-bold">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            {/* Contact information */}
            <fieldset className="mb-8">
              <legend className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2 mb-4 w-full">
                Contact Information
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="First name"
                  required
                  error={errors.firstName}
                  errorId={`${formId}-firstName-error`}
                >
                  <input
                    {...field('firstName')}
                    type="text"
                    autoComplete="given-name"
                    aria-required="true"
                    className={inputClass('firstName')}
                    placeholder="Jane"
                  />
                </FormField>
                <FormField
                  label="Last name"
                  required
                  error={errors.lastName}
                  errorId={`${formId}-lastName-error`}
                >
                  <input
                    {...field('lastName')}
                    type="text"
                    autoComplete="family-name"
                    aria-required="true"
                    className={inputClass('lastName')}
                    placeholder="Smith"
                  />
                </FormField>
                <FormField
                  label="Phone number"
                  required
                  error={errors.phone}
                  errorId={`${formId}-phone-error`}
                >
                  <input
                    {...field('phone')}
                    type="tel"
                    autoComplete="tel"
                    aria-required="true"
                    className={inputClass('phone')}
                    placeholder="+1 (416) 555-0100"
                  />
                </FormField>
                <FormField
                  label="Email address"
                  required
                  error={errors.email}
                  errorId={`${formId}-email-error`}
                >
                  <input
                    {...field('email')}
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    className={inputClass('email')}
                    placeholder="jane@example.com"
                  />
                </FormField>
              </div>
            </fieldset>

            {/* Order details */}
            <fieldset className="mb-8">
              <legend className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2 mb-4 w-full">
                Order Details
              </legend>
              <FormField
                label="Portion size (number of people)"
                required
                hint="Must be between 6 and 30 people."
                error={errors.portionSize}
                errorId={`${formId}-portionSize-error`}
              >
                <input
                  {...field('portionSize')}
                  id={`${formId}-portionSize`}
                  type="number"
                  min={6}
                  max={30}
                  aria-required="true"
                  aria-describedby={`${formId}-portionSize-hint ${errors.portionSize ? `${formId}-portionSize-error` : ''}`}
                  className={inputClass('portionSize') + ' max-w-xs'}
                />
              </FormField>

              {cateringDate && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-stone-700">
                  <strong>Catering date:</strong>{' '}
                  <time dateTime={cateringDate.toISOString().split('T')[0]}>
                    {cateringDate.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
              )}
            </fieldset>

            {/* Payment method */}
            <fieldset className="mb-8">
              <legend className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2 mb-4 w-full">
                Payment Method
              </legend>
              <div className="space-y-3" role="group" aria-labelledby="payment-group-label">
                <span id="payment-group-label" className="sr-only">Select payment method</span>
                {PAYMENT_METHODS.map(method => (
                  <label key={method.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={form.paymentMethod === method.value}
                      onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                      className="w-5 h-5 min-w-[20px] accent-brand-600 cursor-pointer"
                    />
                    <span className="text-stone-700 group-hover:text-stone-900">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Card fields — only shown when card is selected (WCAG 3.2.2: only user-initiated) */}
              {form.paymentMethod === 'card' && (
                <div className="mt-5 p-4 border-2 border-stone-200 rounded-xl space-y-4" aria-label="Card payment details">
                  <p className="text-xs text-stone-500 italic">
                    Note: This is a demo. No real payment is processed.
                  </p>
                  <FormField
                    label="Card number (16 digits)"
                    required
                    error={errors.cardNumber}
                    errorId={`${formId}-cardNumber-error`}
                  >
                    <input
                      {...field('cardNumber')}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      maxLength={19}
                      aria-required="true"
                      className={inputClass('cardNumber')}
                      placeholder="1234 5678 9012 3456"
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Expiry date (MM/YY)"
                      required
                      error={errors.cardExpiry}
                      errorId={`${formId}-cardExpiry-error`}
                    >
                      <input
                        {...field('cardExpiry')}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        maxLength={5}
                        aria-required="true"
                        className={inputClass('cardExpiry')}
                        placeholder="MM/YY"
                      />
                    </FormField>
                    <FormField
                      label={<><abbr title="Card Verification Value">CVV</abbr> (3–4 digits)</>}
                      required
                      error={errors.cardCvv}
                      errorId={`${formId}-cardCvv-error`}
                    >
                      <input
                        {...field('cardCvv')}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        aria-required="true"
                        className={inputClass('cardCvv')}
                        placeholder="123"
                      />
                    </FormField>
                  </div>
                </div>
              )}
            </fieldset>

            {/* Special instructions */}
            <fieldset className="mb-8">
              <legend className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2 mb-4 w-full">
                Special Instructions
              </legend>
              <FormField label="Dietary requirements or special requests (optional)">
                <textarea
                  {...field('specialInstructions')}
                  id={`${formId}-specialInstructions`}
                  rows={4}
                  autoComplete="off"
                  className="w-full border-2 border-stone-300 rounded-lg px-3 py-2.5 text-stone-800 bg-white focus:outline-none focus:border-brand-500 transition-colors resize-y"
                  placeholder="e.g. nut allergy, gluten-free options, extra napkins..."
                />
              </FormField>
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-bold text-base py-3.5 px-10 rounded-xl min-h-[52px] transition-colors"
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order summary sidebar */}
        <aside aria-labelledby="summary-heading" className="lg:col-span-1">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sticky top-24">
            <h2 id="summary-heading" className="font-semibold text-stone-800 text-lg mb-4">Order Summary</h2>
            <ul aria-label="Items in your order" className="space-y-3 mb-5">
              {items.map(item => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-stone-700 flex-1 min-w-0 pr-2">
                    {item.name}
                    <span className="text-stone-500 ml-1">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-stone-800 flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="border-t border-stone-200 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone-600">Subtotal</dt>
                <dd className="font-medium text-stone-800">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-600"><abbr title="Harmonized Sales Tax">HST</abbr> (13%)</dt>
                <dd className="font-medium text-stone-800">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 mt-2">
                <dt className="font-bold text-stone-800">Total</dt>
                <dd className="font-bold text-brand-700 text-base">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FormField({ label, required, hint, error, errorId, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-red-600 ml-0.5">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {hint && (
        <p id={errorId?.replace('-error', '-hint')} className="text-xs text-stone-500 mb-1">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  )
}
