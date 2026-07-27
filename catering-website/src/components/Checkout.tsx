import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { businessInfo } from '../data/business'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { CheckoutFormData, PaymentMethod } from '../types'
import {
  MAX_PORTION_SIZE,
  MIN_PORTION_SIZE,
  formatDate,
  parseISODate,
} from '../utils/dates'
import { calculateOrderTotals, generateOrderId, saveInvoice } from '../utils/invoices'

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'cash', label: 'Cash on pickup' },
  { value: 'card', label: 'Credit / Debit card (pay on pickup)' },
  { value: 'venmo', label: 'Venmo' },
]

export default function Checkout() {
  useDocumentTitle(`Checkout — ${businessInfo.name}`)
  const navigate = useNavigate()
  const { items, cateringDate, clearCart } = useCart()
  const { subtotal, tax, total } = calculateOrderTotals(items)

  const [form, setForm] = useState<CheckoutFormData>({
    customerName: '',
    email: '',
    phone: '',
    pickupDate: cateringDate,
    pickupTime: '',
    portionSize: MIN_PORTION_SIZE,
    paymentMethod: 'cash',
    paymentDetails: '',
    specialInstructions: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Checkout</h1>
        <p className="mt-4 text-warm-brown/80" role="status">
          Your cart is empty. Add items before checking out.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          View Menu
        </Link>
      </div>
    )
  }

  const updateField = <K extends keyof CheckoutFormData>(
    key: K,
    value: CheckoutFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

    if (!form.customerName.trim()) newErrors.customerName = 'Name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'A valid email address is required.'
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.'
    if (!form.pickupTime) newErrors.pickupTime = 'Please select a pickup time.'
    if (form.portionSize < MIN_PORTION_SIZE || form.portionSize > MAX_PORTION_SIZE) {
      newErrors.portionSize = `Portion size must be between ${MIN_PORTION_SIZE} and ${MAX_PORTION_SIZE} people.`
    }
    if (form.paymentMethod !== 'cash' && !form.paymentDetails.trim()) {
      newErrors.paymentDetails = 'Please provide payment details.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items,
      checkout: form,
      subtotal,
      tax,
      total,
    }

    saveInvoice(order)
    clearCart()
    navigate(`/invoice/${order.id}`, { state: { order } })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-warm-brown">Checkout</h1>
      <p className="mt-2 text-warm-brown/80">
        Complete your order details below. Payment is collected at pickup — no online charge.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="font-display text-lg font-semibold text-warm-brown px-1">
            Contact Information
          </legend>

          <div className="mt-4 space-y-4">
            <FormField
              id="customer-name"
              label="Full name"
              type="text"
              autoComplete="name"
              value={form.customerName}
              onChange={(v) => updateField('customerName', v)}
              error={errors.customerName}
              required
            />
            <FormField
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(v) => updateField('email', v)}
              error={errors.email}
              required
            />
            <FormField
              id="phone"
              label="Phone number"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(v) => updateField('phone', v)}
              error={errors.phone}
              required
            />
          </div>
        </fieldset>

        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="font-display text-lg font-semibold text-warm-brown px-1">
            Pickup Details
          </legend>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="pickup-date" className="block text-sm font-medium text-warm-brown">
                Pickup date
              </label>
              <input
                id="pickup-date"
                type="text"
                readOnly
                value={form.pickupDate ? formatDate(parseISODate(form.pickupDate)) : ''}
                aria-describedby="pickup-date-hint"
                aria-readonly="true"
                className="mt-1 block w-full rounded-lg border border-warm-brown/20 bg-warm-brown/5 px-3 py-2.5 text-warm-brown"
              />
              <p id="pickup-date-hint" className="mt-1 text-xs text-warm-brown/80">
                Based on your selected catering date from the menu.
              </p>
            </div>

            <FormField
              id="pickup-time"
              label="Pickup time"
              type="time"
              value={form.pickupTime}
              onChange={(v) => updateField('pickupTime', v)}
              error={errors.pickupTime}
              required
              hint="Available pickup hours: 10:00 AM – 6:00 PM"
            />

            <div>
              <label htmlFor="portion-size" className="block text-sm font-medium text-warm-brown">
                Number of people (portion size)
                <span aria-hidden="true" className="text-red-700"> *</span>
                <span className="sr-only"> (required)</span>
              </label>
              <input
                id="portion-size"
                type="number"
                min={MIN_PORTION_SIZE}
                max={MAX_PORTION_SIZE}
                value={form.portionSize}
                onChange={(e) =>
                  updateField('portionSize', parseInt(e.target.value, 10) || MIN_PORTION_SIZE)
                }
                aria-describedby={
                  errors.portionSize ? 'portion-hint portion-error' : 'portion-hint'
                }
                aria-invalid={errors.portionSize ? true : undefined}
                required
                className="mt-1 block w-full max-w-xs rounded-lg border border-warm-brown/20 px-3 py-2.5 text-warm-brown focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
              <p id="portion-hint" className="mt-1 text-xs text-warm-brown/80">
                Minimum {MIN_PORTION_SIZE} people, maximum {MAX_PORTION_SIZE} people.
              </p>
              {errors.portionSize && (
                <p id="portion-error" role="alert" className="mt-1 text-sm text-red-700">
                  {errors.portionSize}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="font-display text-lg font-semibold text-warm-brown px-1">
            Payment Method
          </legend>
          <p className="mt-2 text-sm text-warm-brown/80">
            Select how you&apos;ll pay at pickup. No online payment is processed.
          </p>

          <div className="mt-4 space-y-3">
            {PAYMENT_OPTIONS.map(({ value, label }) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-warm-brown/20 px-4 py-3 hover:bg-warm-brown/5"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={form.paymentMethod === value}
                  onChange={() => updateField('paymentMethod', value)}
                  className="h-5 w-5 accent-terracotta"
                />
                <span className="text-sm text-warm-brown">{label}</span>
              </label>
            ))}
          </div>

          {form.paymentMethod !== 'cash' && (
            <div className="mt-4">
              <FormField
                id="payment-details"
                label={
                  form.paymentMethod === 'venmo'
                    ? 'Venmo username'
                    : 'Last 4 digits of card (for reference)'
                }
                type="text"
                autoComplete="off"
                value={form.paymentDetails}
                onChange={(v) => updateField('paymentDetails', v)}
                error={errors.paymentDetails}
                required
              />
            </div>
          )}
        </fieldset>

        <fieldset className="rounded-xl bg-white p-6 shadow-sm">
          <legend className="font-display text-lg font-semibold text-warm-brown px-1">
            Special Instructions
          </legend>
          <div className="mt-4">
            <label htmlFor="special-instructions" className="block text-sm font-medium text-warm-brown">
              Notes or dietary requests (optional)
            </label>
            <textarea
              id="special-instructions"
              rows={4}
              value={form.specialInstructions}
              onChange={(e) => updateField('specialInstructions', e.target.value)}
              placeholder="Allergies, delivery notes, etc."
              className="mt-1 block w-full rounded-lg border border-warm-brown/20 px-3 py-2.5 text-warm-brown placeholder:text-warm-brown/50 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
            />
          </div>
        </fieldset>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-warm-brown">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {items.map(({ foodItem, quantity }) => (
              <div key={foodItem.id} className="flex justify-between">
                <dt>
                  {foodItem.name}{' '}
                  <span className="text-warm-brown/80">× {quantity}</span>
                </dt>
                <dd>${(foodItem.price * quantity).toFixed(2)}</dd>
              </div>
            ))}
            <div className="border-t border-warm-brown/10 pt-2">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax (8%)</dt>
                <dd>${tax.toFixed(2)}</dd>
              </div>
              <div className="mt-2 flex justify-between text-lg font-semibold">
                <dt>Total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </div>
          </dl>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-terracotta py-3 text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}

interface FormFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  autoComplete?: string
  hint?: string
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  required,
  autoComplete,
  hint,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-warm-brown">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-red-700"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        required={required}
        className="mt-1 block w-full rounded-lg border border-warm-brown/20 px-3 py-2.5 text-warm-brown focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-warm-brown/80">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
