import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { foodItems, formatDateString, MIN_PORTIONS, MAX_PORTIONS } from '../data/menuData'

function CartRow({ entry }) {
  const { dispatch } = useCart()
  const item = foodItems[entry.itemId]
  if (!item) return null

  const subtotal = item.pricePerPerson * entry.quantity

  return (
    <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-warm-100 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">${item.pricePerPerson}/person</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'REMOVE_ITEM', itemId: item.id })}
            className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-1 min-w-[24px] min-h-[24px]"
            aria-label={`Remove ${item.name} from cart`}
          >
            <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 mr-1" id={`servings-label-${item.id}`}>Servings:</span>
            <button
              type="button"
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', itemId: item.id, quantity: entry.quantity - 1 })}
              disabled={entry.quantity <= MIN_PORTIONS}
              aria-label={`Decrease servings for ${item.name}`}
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
            >
              <span aria-hidden="true">−</span>
            </button>
            <span
              className="w-10 text-center text-sm font-semibold text-gray-900"
              aria-label={`${entry.quantity} servings`}
              aria-live="polite"
              aria-atomic="true"
            >
              {entry.quantity}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', itemId: item.id, quantity: entry.quantity + 1 })}
              disabled={entry.quantity >= MAX_PORTIONS}
              aria-label={`Increase servings for ${item.name}`}
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
          <span className="font-bold text-brand-700 text-sm" aria-label={`Subtotal $${subtotal}`}>${subtotal}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Min {MIN_PORTIONS} · Max {MAX_PORTIONS} people per dish</p>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { items, selectedDate } = state

  const total = items.reduce((sum, entry) => {
    const item = foodItems[entry.itemId]
    return sum + (item ? item.pricePerPerson * entry.quantity : 0)
  }, 0)

  const isEmpty = items.length === 0

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Your Cart</h1>
            {selectedDate && (
              <p className="text-gray-500 text-sm mt-1">
                Catering for {formatDateString(selectedDate)}
              </p>
            )}
          </div>
          {!isEmpty && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Clear all items from cart"
            >
              Clear all
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <div className="text-6xl mb-4" aria-hidden="true">🛒</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Head over to the menu to add some dishes.</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-800 transition-colors"
            >
              Browse Menu →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(entry => (
              <CartRow key={entry.itemId} entry={entry} />
            ))}

            {/* Tip box */}
            <div className="bg-warm-50 border border-warm-200 rounded-2xl p-4 text-sm text-warm-700">
              <strong><span aria-hidden="true">💡</span> Tip:</strong> Adjust servings per dish to match your event size (6–30 people per item).
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="space-y-2 text-sm mb-4">
                {items.map(entry => {
                  const item = foodItems[entry.itemId]
                  if (!item) return null
                  return (
                    <div key={entry.itemId} className="flex justify-between text-gray-600">
                      <span>{item.name} × {entry.quantity} ppl</span>
                      <span>${item.pricePerPerson * entry.quantity}</span>
                    </div>
                  )
                })}
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span className="text-brand-700">${total}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-brand-700 hover:bg-brand-800 text-white text-center py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Proceed to Checkout →
              </Link>
              <Link
                to="/menu"
                className="block w-full text-center text-gray-500 hover:text-brand-700 text-sm mt-3 transition-colors"
              >
                ← Continue browsing
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
