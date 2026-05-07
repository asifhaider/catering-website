import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import FoodDetailModal from './FoodDetailModal'

const CATEGORY_STYLES = {
  protein:    'bg-orange-100 text-orange-800',
  vegetarian: 'bg-green-100 text-green-800',
  sides:      'bg-blue-100 text-blue-800',
}

export default function FoodCard({ item }) {
  const { state, dispatch } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [imgError, setImgError] = useState(false)
  // SC 4.1.2 – track trigger element so focus returns after modal closes (2.1.1)
  const triggerRef = useRef(null)

  const inCart = state.items.some(i => i.itemId === item.id)

  function handleAdd() {
    dispatch({ type: 'ADD_ITEM', itemId: item.id, quantity: 10 })
  }

  function handleRemove() {
    dispatch({ type: 'REMOVE_ITEM', itemId: item.id })
  }

  function openModal() { setShowModal(true) }
  function closeModal() {
    setShowModal(false)
    // SC 4.1.2 – return focus to the triggering element
    triggerRef.current?.focus()
  }

  const categoryLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1)

  return (
    <>
      {/* SC 1.3.1 – <article> is the correct semantic element for a self-contained product card */}
      <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">

        {/* Image area – SC 1.1.1: decorative, hidden from AT */}
        {/* SC 1.3.3 – clicking the image is a convenience; the keyboard path goes through the title button below */}
        <div
          className="relative h-44 overflow-hidden bg-warm-50 cursor-pointer"
          onClick={openModal}
          aria-hidden="true"
          tabIndex={-1}
        >
          {!imgError ? (
            <img
              src={item.image}
              alt=""
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-warm-100">
              <span aria-hidden="true">🍛</span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            {/* SC 4.1.2 / 2.4.6 – the item name is the primary focusable trigger for the modal */}
            <button
              ref={triggerRef}
              onClick={openModal}
              className="font-semibold text-gray-900 text-left leading-snug hover:text-brand-900 transition-colors"
              aria-label={`View details for ${item.name}`}
            >
              {item.name}
            </button>

            {/* SC 1.1.1 – price conveys information; "/person" is aria-labelled to avoid lone symbol */}
            <span className="text-brand-900 font-bold text-sm whitespace-nowrap" aria-label={`$${item.pricePerPerson} per person`}>
              ${item.pricePerPerson}<span aria-hidden="true" className="text-gray-600 font-normal text-xs">/person</span>
            </span>
          </div>

          {/* SC 1.4.1 – category conveyed with text, not colour alone (text is visible) */}
          <span className={`self-start mb-2 text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}>
            {categoryLabel}
          </span>

          {/* SC 1.4.3 – gray-600 on white ≈ 7:1 (passes AAA) */}
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">{item.description}</p>

          {/* SC 2.5.5 / 2.5.8 – min-h-[44px] meets Enhanced target size */}
          <button
            onClick={inCart ? handleRemove : handleAdd}
            className={`w-full py-2 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
              inCart
                ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-300'
                : 'bg-brand-900 text-white hover:bg-brand-800'
            }`}
            aria-label={inCart ? `Remove ${item.name} from cart` : `Add ${item.name} to cart`}
          >
            {/* SC 2.5.3 – visible label matches accessible name */}
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </article>

      {showModal && <FoodDetailModal item={item} onClose={closeModal} />}
    </>
  )
}
