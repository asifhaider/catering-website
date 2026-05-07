import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import FoodDetailModal from './FoodDetailModal'

const CATEGORY_STYLES = {
  protein:    'bg-orange-100 text-orange-700',
  vegetarian: 'bg-green-100 text-green-700',
  sides:      'bg-blue-100 text-blue-700',
}

export default function FoodCard({ item }) {
  const { state, dispatch } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [imgError, setImgError] = useState(false)
  const triggerRef = useRef(null)

  const inCart = state.items.some(i => i.itemId === item.id)

  function handleAdd(e) {
    e.stopPropagation()
    dispatch({ type: 'ADD_ITEM', itemId: item.id, quantity: 10 })
  }

  function handleRemove(e) {
    e.stopPropagation()
    dispatch({ type: 'REMOVE_ITEM', itemId: item.id })
  }

  const categoryLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1)

  return (
    <>
      <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
        {/* Clickable image+info area opens the detail modal */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setShowModal(true)}
          className="group text-left w-full flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-inset rounded-t-2xl"
          aria-label={`View details for ${item.name}`}
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden bg-warm-50">
            {!imgError ? (
              <img
                src={item.image}
                alt={item.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl bg-warm-100" aria-hidden="true">
                🍛
              </div>
            )}
            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}>
              {categoryLabel}
            </span>
          </div>

          {/* Info */}
          <div className="p-4 pb-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-brand-700 transition-colors">
                {item.name}
              </h3>
              <span className="text-brand-700 font-bold text-sm whitespace-nowrap">
                ${item.pricePerPerson}<span className="text-gray-400 font-normal text-xs">/person</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
          </div>
        </button>

        {/* Cart CTA — separate from the modal trigger so they're not nested */}
        <div className="p-4 pt-3">
          <button
            type="button"
            onClick={inCart ? handleRemove : handleAdd}
            aria-label={inCart ? `Remove ${item.name} from cart` : `Add ${item.name} to cart`}
            className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${
              inCart
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                : 'bg-brand-700 text-white hover:bg-brand-800'
            }`}
          >
            {inCart ? '✓ Remove from Cart' : '+ Add to Cart'}
          </button>
        </div>
      </article>

      {showModal && (
        <FoodDetailModal
          item={item}
          onClose={() => setShowModal(false)}
          triggerRef={triggerRef}
        />
      )}
    </>
  )
}
