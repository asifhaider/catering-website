import { useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'

export default function FoodDetailModal({ item, onClose }) {
  const { state, dispatch } = useCart()
  const inCart = state.items.some(i => i.itemId === item.id)
  const dialogRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Focus management: move focus into dialog on open, restore on close
  useEffect(() => {
    const prevFocused = document.activeElement
    dialogRef.current?.focus()
    return () => { prevFocused?.focus() }
  }, [])

  const CATEGORY_COLORS = {
    protein:    'bg-orange-100 text-orange-700',
    vegetarian: 'bg-green-100 text-green-700',
    sides:      'bg-blue-100 text-blue-700',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-item-title"
        tabIndex={-1}
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl bg-warm-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 id="modal-item-title" className="font-display text-2xl font-bold text-gray-900">{item.name}</h2>
            <span className="text-brand-700 font-bold text-lg whitespace-nowrap">
              ${item.pricePerPerson}<span className="text-gray-400 font-normal text-sm">/person</span>
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-5">{item.description}</p>

          {/* Ingredients */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-800 mb-2">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map(ing => (
                <span key={ing} className="bg-warm-50 text-warm-700 text-xs px-2.5 py-1 rounded-full border border-warm-200">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Nutritional facts */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Nutritional Facts <span className="font-normal text-xs text-gray-400">(per serving)</span></h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Nutrient</th>
                    <th className="text-right px-4 py-2 font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Calories', `${item.nutrition.calories} kcal`],
                    ['Protein',  `${item.nutrition.protein}g`],
                    ['Carbohydrates', `${item.nutrition.carbs}g`],
                    ['Total Fat', `${item.nutrition.fat}g`],
                    ['Dietary Fiber', `${item.nutrition.fiber}g`],
                    ['Sodium', `${item.nutrition.sodium}mg`],
                  ].map(([label, value], i) => (
                    <tr key={label} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                      <td className="px-4 py-2.5 text-gray-600">{label}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={() => {
              inCart
                ? dispatch({ type: 'REMOVE_ITEM', itemId: item.id })
                : dispatch({ type: 'ADD_ITEM', itemId: item.id, quantity: 10 })
            }}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
              inCart
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                : 'bg-brand-700 text-white hover:bg-brand-800'
            }`}
          >
            {inCart ? '✓ Remove from Cart' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
