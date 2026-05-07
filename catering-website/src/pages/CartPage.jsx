import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { foodItems, formatDateString, MIN_PORTIONS, MAX_PORTIONS } from '../data/menuData'

function CartRow({ entry }) {
  const { dispatch } = useCart()
  const item = foodItems[entry.itemId]
  if (!item) return null

  const subtotal = item.pricePerPerson * entry.quantity

  return (
    /* SC 1.3.1 – list item (rendered inside <ul> in parent) */
    <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* SC 1.1.1 – item image is decorative (described by heading and text) */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-warm-100 flex-shrink-0" aria-hidden="true">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            {/* SC 2.4.6 – item name as heading provides navigable structure */}
            <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h3>
            {/* SC 1.4.3 – gray-600 on white ≈ 7:1 (passes AAA) */}
            <p className="text-xs text-gray-600 mt-0.5" aria-label={`$${item.pricePerPerson} per person`}>
              ${item.pricePerPerson}/person
            </p>
          </div>

          {/* SC 2.4.9 / 2.5.3 – button label names the item; SC 2.5.5 – min 44px target */}
          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', itemId: item.id })}
            className="text-gray-500 hover:text-red-600 transition-colors flex-shrink-0 p-2 rounded-lg hover:bg-red-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Remove ${item.name} from cart`}
          >
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between mt-3">
          {/* SC 1.3.1 – group with label for quantity controls */}
          <div className="flex items-center gap-1" role="group" aria-label={`Servings for ${item.name}`}>
            <span className="text-xs text-gray-600 mr-1" aria-hidden="true">Servings:</span>

            {/* SC 2.5.5 – w-9 h-9 = 36px; we add min-w/min-h for 44px */}
            <button
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', itemId: item.id, quantity: entry.quantity - 1 })}
              disabled={entry.quantity <= MIN_PORTIONS}
              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold min-w-[44px] min-h-[44px]"
              aria-label={`Decrease servings for ${item.name}, currently ${entry.quantity}`}
            >
              <span aria-hidden="true">−</span>
            </button>

            {/* SC 4.1.2 – current value announced via aria-live or explicit value */}
            <span
              className="w-12 text-center text-sm font-semibold text-gray-900"
              aria-live="polite"
              aria-atomic="true"
              aria-label={`${entry.quantity} servings`}
            >
              {entry.quantity}
            </span>

            <button
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', itemId: item.id, quantity: entry.quantity + 1 })}
              disabled={entry.quantity >= MAX_PORTIONS}
              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold min-w-[44px] min-h-[44px]"
              aria-label={`Increase servings for ${item.name}, currently ${entry.quantity}`}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>

          <span className="font-bold text-brand-900 text-sm" aria-label={`Subtotal $${subtotal}`}>
            ${subtotal}
          </span>
        </div>

        <p className="text-xs text-gray-600 mt-1">
          Min <abbr title="minimum">{MIN_PORTIONS}</abbr> · Max <abbr title="maximum">{MAX_PORTIONS}</abbr> people per dish
        </p>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { items, selectedDate } = state

  // SC 2.4.2 – page title updated for this route
  useEffect(() => {
    document.title = 'Your Cart – Mama\'s Table'
  }, [])

  const total = items.reduce((sum, entry) => {
    const item = foodItems[entry.itemId]
    return sum + (item ? item.pricePerPerson * entry.quantity : 0)
  }, 0)

  const isEmpty = items.length === 0

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* SC 2.4.8 – location conveyed by page heading and browser title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Your Cart</h1>
            {selectedDate && (
              <p className="text-gray-600 text-sm mt-1">
                Catering for {formatDateString(selectedDate)}
              </p>
            )}
          </div>
          {!isEmpty && (
            /* SC 2.5.5 – enlarged target; SC 2.4.6 – descriptive label */
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="text-xs text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 min-h-[44px]"
              aria-label="Clear all items from cart"
            >
              Clear all
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200">
            <div aria-hidden="true" className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 text-sm mb-6">Head over to the menu to add some dishes.</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-800 transition-colors min-h-[44px]"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* SC 1.3.1 – list semantics for cart items */}
            <ul className="space-y-3 list-none" aria-label="Cart items">
              {items.map(entry => (
                <li key={entry.itemId}>
                  <CartRow entry={entry} />
                </li>
              ))}
            </ul>

            {/* Tip box */}
            <div className="bg-warm-50 border border-warm-200 rounded-2xl p-4 text-sm text-warm-800" role="note">
              <span aria-hidden="true">💡</span>
              {' '}<strong>Tip:</strong> Adjust servings per dish to match your event size (6–30 people per item).
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              {/* SC 2.4.6 – heading labels the summary section */}
              <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Order Summary</h2>

              {/* SC 1.3.1 – description list semantics for key-value pairs */}
              <dl className="space-y-2 text-sm mb-4">
                {items.map(entry => {
                  const item = foodItems[entry.itemId]
                  if (!item) return null
                  return (
                    <div key={entry.itemId} className="flex justify-between text-gray-700">
                      <dt>{item.name} × {entry.quantity} <abbr title="people">ppl</abbr></dt>
                      <dd className="font-medium text-gray-900">${item.pricePerPerson * entry.quantity}</dd>
                    </div>
                  )
                })}
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                  <dt>Total</dt>
                  <dd className="text-brand-900">${total}</dd>
                </div>
              </dl>

              {/* SC 2.4.4 – link purpose clear; SC 2.5.5 – min 44px */}
              <Link
                to="/checkout"
                className="block w-full bg-brand-900 hover:bg-brand-800 text-white text-center py-3.5 rounded-xl font-semibold text-sm transition-colors min-h-[44px] flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/menu"
                className="block w-full text-center text-gray-700 hover:text-brand-900 text-sm mt-3 transition-colors hover:underline underline-offset-2 py-2"
              >
                ← Continue browsing menu
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
