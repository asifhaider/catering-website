import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../utils/usePageTitle'
import { formatFriendlyDate, toDateInputValue } from '../utils/date'
import { createInvoice, saveInvoice } from '../utils/invoiceStorage'
import type { PaymentMethod } from '../types/order'

const PICKUP_TIME_SLOTS = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
]

interface FormState {
  pickupTime: string
  fullName: string
  phone: string
  email: string
  paymentMethod: PaymentMethod | ''
  cardNumber: string
  cardExpiry: string
  cardCvv: string
  specialInstructions: string
}

const INITIAL_FORM: FormState = {
  pickupTime: '',
  fullName: '',
  phone: '',
  email: '',
  paymentMethod: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  specialInstructions: '',
}

interface FieldError {
  field: keyof FormState
  message: string
}

export default function CheckoutPage() {
  usePageTitle('Checkout')
  const { items, subtotal, pickupDate, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<FieldError[]>([])
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errors.length > 0) {
      summaryRef.current?.focus()
    }
  }, [errors])

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function errorFor(field: keyof FormState): string | undefined {
    return errors.find((e) => e.field === field)?.message
  }

  function validate(): FieldError[] {
    const found: FieldError[] = []

    if (!form.fullName.trim()) {
      found.push({ field: 'fullName', message: 'Full name is required.' })
    }
    if (!form.phone.trim()) {
      found.push({ field: 'phone', message: 'Phone number is required.' })
    } else if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) {
      found.push({ field: 'phone', message: 'Enter a valid phone number.' })
    }
    if (!form.email.trim()) {
      found.push({ field: 'email', message: 'Email is required.' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      found.push({ field: 'email', message: 'Enter a valid email address.' })
    }
    if (!form.pickupTime) {
      found.push({ field: 'pickupTime', message: 'Pickup time is required.' })
    }
    if (!form.paymentMethod) {
      found.push({ field: 'paymentMethod', message: 'Select a payment method.' })
    }
    if (form.paymentMethod === 'credit-card' || form.paymentMethod === 'debit-card') {
      if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, ''))) {
        found.push({ field: 'cardNumber', message: 'Enter a valid card number (13–19 digits).' })
      }
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry.trim())) {
        found.push({ field: 'cardExpiry', message: 'Enter expiry as MM/YY.' })
      }
      if (!/^\d{3,4}$/.test(form.cardCvv.trim())) {
        found.push({ field: 'cardCvv', message: 'Enter a valid CVV (3–4 digits).' })
      }
    }

    return found
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (found.length > 0 || !pickupDate) return

    const invoice = createInvoice(items, {
      pickupDate: toDateInputValue(pickupDate),
      pickupTime: form.pickupTime,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      paymentMethod: form.paymentMethod as PaymentMethod,
      cardNumber: form.cardNumber || undefined,
      cardExpiry: form.cardExpiry || undefined,
      cardCvv: form.cardCvv || undefined,
      specialInstructions: form.specialInstructions.trim() || undefined,
    })
    saveInvoice(invoice)
    clearCart()
    navigate(`/invoice/${invoice.orderId}`)
  }

  function focusField(field: keyof FormState) {
    document.getElementById(`checkout-${field}`)?.focus()
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
        <p className="mt-2 text-stone-600">
          Your cart is empty.{' '}
          <Link to="/" className="text-amber-800 hover:underline">
            Browse the menu
          </Link>{' '}
          to add dishes before checking out.
        </p>
      </div>
    )
  }

  if (!pickupDate) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
        <p className="mt-2 text-stone-600">
          Please{' '}
          <Link to="/" className="text-amber-800 hover:underline">
            choose a pickup date
          </Link>{' '}
          before checking out.
        </p>
      </div>
    )
  }

  const showCardFields = form.paymentMethod === 'credit-card' || form.paymentMethod === 'debit-card'

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
      <p className="mt-1 text-stone-600">Order subtotal: ${subtotal.toFixed(2)} (tax calculated at review).</p>

      {errors.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-4 rounded-md border border-red-700 bg-red-50 p-4 focus:outline-none"
        >
          <h2 className="font-semibold text-red-800">
            There {errors.length === 1 ? 'is 1 problem' : `are ${errors.length} problems`} with your order
          </h2>
          <ul className="mt-2 list-disc pl-5">
            {errors.map((e) => (
              <li key={e.field}>
                <a
                  href={`#checkout-${e.field}`}
                  className="text-red-800 underline"
                  onClick={(event) => {
                    event.preventDefault()
                    focusField(e.field)
                  }}
                >
                  {e.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <div>
          <span className="block text-sm font-medium text-stone-800">Pickup date</span>
          <p className="mt-1 text-stone-900">{formatFriendlyDate(pickupDate)}</p>
          <p className="text-xs text-stone-500">
            To change your pickup date,{' '}
            <Link to="/" className="text-amber-800 hover:underline">
              return to the menu
            </Link>
            .
          </p>
        </div>

        <div>
          <label htmlFor="checkout-pickupTime" className="block text-sm font-medium text-stone-800">
            Pickup time
          </label>
          <p className="mt-1 text-xs text-stone-500">Pickup available 10:00 AM–6:00 PM.</p>
          <select
            id="checkout-pickupTime"
            value={form.pickupTime}
            onChange={(e) => setField('pickupTime', e.target.value)}
            aria-describedby={errorFor('pickupTime') ? 'checkout-pickupTime-error' : undefined}
            aria-invalid={errorFor('pickupTime') ? true : undefined}
            className="mt-2 block w-full max-w-xs rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
          >
            <option value="">Select a time</option>
            {PICKUP_TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
          {errorFor('pickupTime') && (
            <p id="checkout-pickupTime-error" className="mt-1 text-sm font-medium text-red-700">
              Error: {errorFor('pickupTime')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="checkout-fullName" className="block text-sm font-medium text-stone-800">
            Full name
          </label>
          <input
            id="checkout-fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            aria-describedby={errorFor('fullName') ? 'checkout-fullName-error' : undefined}
            aria-invalid={errorFor('fullName') ? true : undefined}
            className="mt-2 block w-full max-w-md rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
          />
          {errorFor('fullName') && (
            <p id="checkout-fullName-error" className="mt-1 text-sm font-medium text-red-700">
              Error: {errorFor('fullName')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="checkout-phone" className="block text-sm font-medium text-stone-800">
            Phone number
          </label>
          <input
            id="checkout-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            aria-describedby={errorFor('phone') ? 'checkout-phone-error' : undefined}
            aria-invalid={errorFor('phone') ? true : undefined}
            className="mt-2 block w-full max-w-md rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
          />
          {errorFor('phone') && (
            <p id="checkout-phone-error" className="mt-1 text-sm font-medium text-red-700">
              Error: {errorFor('phone')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="checkout-email" className="block text-sm font-medium text-stone-800">
            Email
          </label>
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            aria-describedby={errorFor('email') ? 'checkout-email-error' : undefined}
            aria-invalid={errorFor('email') ? true : undefined}
            className="mt-2 block w-full max-w-md rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
          />
          {errorFor('email') && (
            <p id="checkout-email-error" className="mt-1 text-sm font-medium text-red-700">
              Error: {errorFor('email')}
            </p>
          )}
        </div>

        <fieldset className="rounded-md border border-stone-300 p-4">
          <legend className="px-1 text-sm font-medium text-stone-800">Payment method</legend>
          {errorFor('paymentMethod') && (
            <p id="checkout-paymentMethod-error" className="mb-2 text-sm font-medium text-red-700">
              Error: {errorFor('paymentMethod')}
            </p>
          )}
          <div className="flex flex-col gap-3">
            {(
              [
                { value: 'credit-card', label: 'Credit card' },
                { value: 'debit-card', label: 'Debit card' },
                { value: 'cash-on-pickup', label: 'Cash on pickup' },
              ] as const
            ).map((option) => (
              <label key={option.value} className="flex min-h-[24px] items-center gap-2">
                <input
                  id={option.value === 'credit-card' ? 'checkout-paymentMethod' : undefined}
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={form.paymentMethod === option.value}
                  onChange={() => setField('paymentMethod', option.value)}
                  aria-describedby={errorFor('paymentMethod') ? 'checkout-paymentMethod-error' : undefined}
                  className="h-5 w-5"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        {showCardFields && (
          <fieldset className="rounded-md border border-stone-300 p-4">
            <legend className="px-1 text-sm font-medium text-stone-800">Card details</legend>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="checkout-cardNumber" className="block text-sm font-medium text-stone-800">
                  Card number
                </label>
                <p className="mt-1 text-xs text-stone-500">13–19 digits, no spaces required.</p>
                <input
                  id="checkout-cardNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={form.cardNumber}
                  onChange={(e) => setField('cardNumber', e.target.value)}
                  aria-describedby={errorFor('cardNumber') ? 'checkout-cardNumber-error' : undefined}
                  aria-invalid={errorFor('cardNumber') ? true : undefined}
                  className="mt-2 block w-full max-w-xs rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
                />
                {errorFor('cardNumber') && (
                  <p id="checkout-cardNumber-error" className="mt-1 text-sm font-medium text-red-700">
                    Error: {errorFor('cardNumber')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-cardExpiry" className="block text-sm font-medium text-stone-800">
                  Expiry date
                </label>
                <p className="mt-1 text-xs text-stone-500">Format: MM/YY</p>
                <input
                  id="checkout-cardExpiry"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={form.cardExpiry}
                  onChange={(e) => setField('cardExpiry', e.target.value)}
                  aria-describedby={errorFor('cardExpiry') ? 'checkout-cardExpiry-error' : undefined}
                  aria-invalid={errorFor('cardExpiry') ? true : undefined}
                  className="mt-2 block w-full max-w-[8rem] rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
                />
                {errorFor('cardExpiry') && (
                  <p id="checkout-cardExpiry-error" className="mt-1 text-sm font-medium text-red-700">
                    Error: {errorFor('cardExpiry')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-cardCvv" className="block text-sm font-medium text-stone-800">
                  CVV (card verification value)
                </label>
                <p className="mt-1 text-xs text-stone-500">3–4 digits, found on the back of your card.</p>
                <input
                  id="checkout-cardCvv"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={form.cardCvv}
                  onChange={(e) => setField('cardCvv', e.target.value)}
                  aria-describedby={errorFor('cardCvv') ? 'checkout-cardCvv-error' : undefined}
                  aria-invalid={errorFor('cardCvv') ? true : undefined}
                  className="mt-2 block w-full max-w-[8rem] rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
                />
                {errorFor('cardCvv') && (
                  <p id="checkout-cardCvv-error" className="mt-1 text-sm font-medium text-red-700">
                    Error: {errorFor('cardCvv')}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
        )}

        <div>
          <label htmlFor="checkout-specialInstructions" className="block text-sm font-medium text-stone-800">
            Special instructions (optional)
          </label>
          <p className="mt-1 text-xs text-stone-500">Allergy notes, delivery notes, or anything else we should know.</p>
          <textarea
            id="checkout-specialInstructions"
            rows={4}
            value={form.specialInstructions}
            onChange={(e) => setField('specialInstructions', e.target.value)}
            className="mt-2 block w-full max-w-md rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="min-h-[44px] w-fit rounded-md bg-amber-800 px-6 py-3 text-base font-semibold text-white hover:bg-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
        >
          Place order
        </button>
      </form>
    </div>
  )
}
