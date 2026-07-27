import { useState, useId } from 'react'
import { useCart } from '../context/CartContext'

export default function MenuItemCard({ item, onSelect }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedMsg, setAddedMsg] = useState('')
  const qtyId = useId()

  function handleDecrement() {
    setQuantity(q => Math.max(1, q - 1))
  }

  function handleIncrement() {
    setQuantity(q => q + 1)
  }

  function handleAddToCart(e) {
    e.stopPropagation()
    addItem(item, quantity)
    setAddedMsg(`${quantity} × ${item.name} added to cart`)
    setTimeout(() => setAddedMsg(''), 3000)
  }

  return (
    <article
      className="bg-white rounded-xl border-2 border-stone-200 overflow-hidden flex flex-col hover:border-brand-300 hover:shadow-md transition-all"
      aria-label={item.name}
    >
      {/* Image — clickable to open detail */}
      <button
        onClick={onSelect}
        className="block w-full focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
        aria-label={`View details for ${item.name}`}
        tabIndex={0}
      >
        <div className="relative h-44 overflow-hidden bg-stone-100">
          <img
            src={item.image}
            alt={`A serving of ${item.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
            width="400"
            height="176"
          />
        </div>
      </button>

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name & price */}
        <div>
          <button
            onClick={onSelect}
            className="text-left font-semibold text-stone-800 text-base hover:text-brand-700 focus-visible:underline leading-snug"
            aria-label={`${item.name} — view details`}
          >
            {item.name}
          </button>
          <p className="text-brand-700 font-bold text-lg mt-0.5">
            ${item.price.toFixed(2)}
            <span className="sr-only"> per portion</span>
          </p>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-2">
          <label htmlFor={qtyId} className="text-sm text-stone-600 font-medium whitespace-nowrap">
            Qty:
          </label>
          <div className="flex items-center border-2 border-stone-300 rounded-lg overflow-hidden" role="group" aria-label={`Quantity for ${item.name}`}>
            <button
              onClick={handleDecrement}
              aria-label={`− Decrease quantity of ${item.name}`}
              disabled={quantity <= 1}
              className="px-3 py-1.5 text-lg font-bold text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <span aria-hidden="true">−</span>
            </button>
            <input
              id={qtyId}
              type="number"
              value={quantity}
              min={1}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              aria-label={`Quantity for ${item.name}`}
              className="w-12 text-center border-x-2 border-stone-300 py-1.5 text-stone-800 font-medium focus:outline-none focus:bg-amber-50"
            />
            <button
              onClick={handleIncrement}
              aria-label={`+ Increase quantity of ${item.name}`}
              className="px-3 py-1.5 text-lg font-bold text-stone-600 hover:bg-stone-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm rounded-lg px-4 py-2.5 min-h-[44px] transition-colors w-full"
          aria-label={`Add ${quantity} × ${item.name} to cart`}
        >
          Add to Cart
        </button>

        {/* Live announcement (WCAG 4.1.2) */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {addedMsg}
        </div>
      </div>
    </article>
  )
}
