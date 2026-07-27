import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import FocusTrap from './FocusTrap'

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, tax, total, itemCount, removeItem, updateQuantity } = useCart()
  const navigate = useNavigate()
  const headingRef = useRef(null)

  // Move focus into drawer on open (WCAG 4.1.2)
  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])

  // Escape closes drawer (WCAG 2.4.1)
  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Prevent body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  function handleCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-40 flex justify-end"
      aria-hidden="false"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <FocusTrap>
        {/* Drawer panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className="relative z-50 bg-white w-full max-w-md h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-xl font-serif font-bold text-stone-800 outline-none"
            >
              Your Cart
              {/* Live cart count (WCAG 4.1.2) */}
              <span aria-live="polite" aria-atomic="true" className="ml-2 text-sm font-normal text-stone-500">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            </h2>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-stone-500 text-lg">Your cart is empty.</p>
                <p className="text-stone-400 text-sm mt-1">Browse the menu and add some items!</p>
              </div>
            ) : (
              <ul aria-label="Cart items" className="space-y-4">
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(item.id)}
                    onQuantityChange={(q) => updateQuantity(item.id, q)}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Order summary */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 px-5 py-4">
              <h3 className="font-semibold text-stone-700 mb-3">Order Summary</h3>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-600">Subtotal</dt>
                  <dd className="font-medium text-stone-800">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-600">
                    <abbr title="Harmonized Sales Tax">HST</abbr> (13%)
                  </dt>
                  <dd className="font-medium text-stone-800">${tax.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 mt-2">
                  <dt className="font-bold text-stone-800 text-base">Total</dt>
                  <dd className="font-bold text-brand-700 text-base">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl min-h-[48px] transition-colors text-base"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </FocusTrap>
    </div>
  )
}

function CartItem({ item, onRemove, onQuantityChange }) {
  const lineTotal = (item.price * item.quantity).toFixed(2)

  return (
    <li className="flex gap-3 border border-stone-200 rounded-xl p-3">
      <img
        src={item.image}
        alt={`A serving of ${item.name}`}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-stone-100"
        width="64"
        height="64"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-800 text-sm leading-snug">{item.name}</p>
        <p className="text-brand-700 text-sm font-medium">${item.price.toFixed(2)} each</p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity control */}
          <div
            className="flex items-center border border-stone-300 rounded-lg overflow-hidden"
            role="group"
            aria-label={`Quantity for ${item.name}`}
          >
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              aria-label={`− Decrease quantity of ${item.name}`}
              disabled={item.quantity <= 1}
              className="px-2.5 py-1 text-stone-600 font-bold hover:bg-stone-100 disabled:opacity-40 min-w-[32px] min-h-[32px] flex items-center justify-center"
            >
              <span aria-hidden="true">−</span>
            </button>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="w-8 text-center text-sm font-semibold text-stone-800 border-x border-stone-300 py-1"
            >
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              aria-label={`+ Increase quantity of ${item.name}`}
              className="px-2.5 py-1 text-stone-600 font-bold hover:bg-stone-100 min-w-[32px] min-h-[32px] flex items-center justify-center"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>

          <span className="text-sm font-bold text-stone-800">
            <span className="sr-only">Line total: </span>${lineTotal}
          </span>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={onRemove}
        aria-label={`Remove ${item.name} from cart`}
        className="self-start p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
        <span className="sr-only">Remove {item.name}</span>
      </button>
    </li>
  )
}
