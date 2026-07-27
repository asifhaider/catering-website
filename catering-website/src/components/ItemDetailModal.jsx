import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import FocusTrap from './FocusTrap'

export default function ItemDetailModal({ item, onClose }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedMsg, setAddedMsg] = useState('')
  const headingRef = useRef(null)

  // Move focus into modal on open (WCAG 4.1.2)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  // Close on Escape (WCAG 2.4.1)
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleAddToCart() {
    addItem(item, quantity)
    setAddedMsg(`${quantity} × ${item.name} added to cart`)
    setTimeout(() => { setAddedMsg(''); onClose() }, 800)
  }

  const n = item.nutrition

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      aria-hidden="false"
    >
      <FocusTrap>
        {/* Dialog (WCAG 4.1.2) */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        >
          {/* Close button — first focusable (WCAG 2.4.1) */}
          <button
            onClick={onClose}
            aria-label="Close item details"
            className="absolute top-3 right-3 z-10 p-2 rounded-full text-stone-500 hover:bg-stone-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            <span className="sr-only">Close</span>
          </button>

          {/* Image */}
          <div className="h-56 sm:h-72 bg-stone-100 overflow-hidden rounded-t-2xl flex-shrink-0">
            <img
              src={item.image}
              alt={`A serving of ${item.name}`}
              className="w-full h-full object-cover"
              width="672"
              height="288"
            />
          </div>

          <div className="p-5 sm:p-7 flex flex-col gap-6">
            {/* Title & price */}
            <div>
              <h2
                id="modal-title"
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl font-serif font-bold text-stone-800 outline-none leading-tight"
              >
                {item.name}
              </h2>
              <p className="text-brand-700 font-bold text-xl mt-1">
                ${item.price.toFixed(2)}
                <span className="sr-only"> per portion</span>
              </p>
            </div>

            {/* Description */}
            <section aria-labelledby="modal-desc-heading">
              <h3 id="modal-desc-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-1">Description</h3>
              <p className="text-stone-700 leading-relaxed">{item.description}</p>
            </section>

            {/* Ingredients */}
            <section aria-labelledby="modal-ingredients-heading">
              <h3 id="modal-ingredients-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">Ingredients</h3>
              <ul className="flex flex-wrap gap-1.5" aria-label="Ingredient list">
                {item.ingredients.map(ing => (
                  <li key={ing} className="bg-amber-50 border border-amber-200 text-stone-700 text-sm px-2.5 py-0.5 rounded-full">
                    {ing}
                  </li>
                ))}
              </ul>
            </section>

            {/* Nutritional facts table (WCAG 1.3.1) */}
            <section aria-labelledby="modal-nutrition-heading">
              <h3 id="modal-nutrition-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Nutritional Facts
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-2 border-stone-800 rounded" aria-label={`Nutritional facts for ${item.name}`}>
                  <caption className="text-left text-xs text-stone-500 mb-1 caption-bottom">
                    Serving size: {n.servingSize} · Values are approximate
                  </caption>
                  <thead>
                    <tr className="bg-stone-800 text-white">
                      <th scope="col" className="text-left px-3 py-2">Nutrient</th>
                      <th scope="col" className="text-right px-3 py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Calories', n.calories + ' kcal'],
                      ['Total Fat', n.totalFat],
                      ['  Saturated Fat', n.saturatedFat],
                      ['  Trans Fat', n.transFat],
                      ['Cholesterol', n.cholesterol],
                      ['Sodium', n.sodium],
                      ['Total Carbohydrates', n.totalCarbs],
                      ['  Dietary Fiber', n.fiber],
                      ['  Total Sugars', n.sugars],
                      ['Protein', n.protein],
                    ].map(([nutrient, value], i) => (
                      <tr key={nutrient} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <th scope="row" className="text-left px-3 py-1.5 font-normal text-stone-700">{nutrient}</th>
                        <td className="text-right px-3 py-1.5 text-stone-800 font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                <abbr title="percent Daily Value">%DV</abbr> not provided. All values are estimates.
              </p>
            </section>

            {/* Add to cart controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-stone-100">
              <div className="flex items-center border-2 border-stone-300 rounded-lg overflow-hidden" role="group" aria-label={`Quantity for ${item.name}`}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label={`− Decrease quantity of ${item.name}`}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-lg font-bold text-stone-600 hover:bg-stone-100 disabled:opacity-40 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <span aria-hidden="true">−</span>
                </button>
                <span
                  role="spinbutton"
                  aria-valuenow={quantity}
                  aria-valuemin={1}
                  aria-label={`Quantity for ${item.name}`}
                  className="w-12 text-center border-x-2 border-stone-300 py-2 text-stone-800 font-semibold"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label={`+ Increase quantity of ${item.name}`}
                  className="px-3 py-2 text-lg font-bold text-stone-600 hover:bg-stone-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg px-6 py-2.5 min-h-[44px] transition-colors"
                aria-label={`Add ${quantity} × ${item.name} to cart`}
              >
                Add to Cart — ${(item.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Live region for cart addition */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {addedMsg}
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}
