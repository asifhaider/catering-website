import { useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'

const CATEGORY_COLORS = {
  protein:    'bg-orange-100 text-orange-800',
  vegetarian: 'bg-green-100 text-green-800',
  sides:      'bg-blue-100 text-blue-800',
}

export default function FoodDetailModal({ item, onClose }) {
  const { state, dispatch } = useCart()
  const inCart = state.items.some(i => i.itemId === item.id)
  const modalRef = useRef(null)
  const titleId = `modal-title-${item.id}`

  // SC 4.1.2 – focus first focusable element when modal opens
  useEffect(() => {
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()
  }, [])

  // SC 2.1.1 / 4.1.2 – keyboard: Escape closes, Tab is trapped inside modal
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const focusable = Array.from(
        modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // SC 1.4.10 – prevent body scroll while modal open (Reflow)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const categoryLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1)

  return (
    /* SC 1.3.1 – backdrop click closes modal; keyboard users use Escape */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* SC 4.1.2 – role=dialog, aria-modal traps virtual cursor, aria-labelledby associates title */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        aria-hidden="false"
      >
        {/* Image */}
        {/* SC 1.1.1 – image is decorative in this context (described in detail below) */}
        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl bg-warm-50" aria-hidden="true">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          {/* SC 2.5.5 – close button ≥44×44px */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Close details for ${item.name}`}
            tabIndex={-1}
          >
            <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            {/* SC 2.4.6 / 4.1.2 – heading labelled with id for aria-labelledby */}
            <h2 id={titleId} className="font-display text-2xl font-bold text-gray-900">{item.name}</h2>
            {/* SC 2.5.5 – close button at top of content area for keyboard users */}
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-full p-2.5 hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Close details for ${item.name}`}
            >
              <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Price – SC 1.1.1 – aria-label makes "/person" explicit */}
          <p className="text-brand-900 font-bold text-lg mb-1" aria-label={`$${item.pricePerPerson} per person`}>
            ${item.pricePerPerson}<span aria-hidden="true" className="text-gray-600 font-normal text-sm">/person</span>
          </p>

          {/* SC 1.4.1 – category conveyed with text, not colour alone */}
          <span className={`inline-block mb-3 text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}>
            {categoryLabel}
          </span>

          {/* SC 1.4.3 – gray-700 on white ≈ 10:1 */}
          <p className="text-gray-700 leading-relaxed mb-5">{item.description}</p>

          {/* Ingredients – SC 2.4.10 Section Headings */}
          <section aria-labelledby="ingredients-heading">
            <h3 id="ingredients-heading" className="font-semibold text-gray-900 mb-2">Ingredients</h3>
            {/* SC 1.3.1 – list semantics convey "these are items in a set" */}
            <ul className="flex flex-wrap gap-2 list-none" aria-label="Ingredients list">
              {item.ingredients.map(ing => (
                <li key={ing} className="bg-warm-50 text-warm-800 text-xs px-2.5 py-1 rounded-full border border-warm-200">
                  {ing}
                </li>
              ))}
            </ul>
          </section>

          {/* Nutritional facts – SC 1.3.1 table with caption */}
          <section className="mt-5 mb-6" aria-labelledby="nutrition-heading">
            <h3 id="nutrition-heading" className="font-semibold text-gray-900 mb-3">
              Nutritional Facts{' '}
              <span className="font-normal text-xs text-gray-600">(per serving)</span>
            </h3>
            <div className="border border-gray-300 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                {/* SC 1.3.1 – caption provides table summary for AT */}
                <caption className="sr-only">Nutritional information per serving for {item.name}</caption>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th scope="col" className="text-left px-4 py-2 font-semibold text-gray-800">Nutrient</th>
                    <th scope="col" className="text-right px-4 py-2 font-semibold text-gray-800">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Calories',        `${item.nutrition.calories} kcal`],
                    ['Protein',         `${item.nutrition.protein}g`],
                    ['Carbohydrates',   `${item.nutrition.carbs}g`],
                    ['Total Fat',       `${item.nutrition.fat}g`],
                    ['Dietary Fiber',   `${item.nutrition.fiber}g`],
                    ['Sodium',          `${item.nutrition.sodium}mg`],
                  ].map(([label, value], i) => (
                    <tr key={label} className={`border-b border-gray-100 last:border-0 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                      <td className="px-4 py-2.5 text-gray-700">{label}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SC 2.5.5 – action button ≥44px tall */}
          <button
            onClick={() => {
              inCart
                ? dispatch({ type: 'REMOVE_ITEM', itemId: item.id })
                : dispatch({ type: 'ADD_ITEM', itemId: item.id, quantity: 10 })
            }}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors min-h-[44px] ${
              inCart
                ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-300'
                : 'bg-brand-900 text-white hover:bg-brand-800'
            }`}
            aria-label={inCart ? `Remove ${item.name} from cart` : `Add ${item.name} to cart`}
          >
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
