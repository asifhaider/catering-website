import { useState } from 'react'
import type { FoodItem } from '../types'

interface AddToCartButtonProps {
  item: FoodItem
  onAddToCart: (item: FoodItem, quantity: number) => void
}

const MAX_QUANTITY = 99

export default function AddToCartButton({ item, onAddToCart }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const labelId = `qty-label-${item.id}`

  const handleAdd = () => {
    onAddToCart(item, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))

  const handleQuantityChange = (value: string) => {
    const parsed = parseInt(value, 10)
    if (Number.isNaN(parsed)) return
    setQuantity(Math.min(MAX_QUANTITY, Math.max(1, parsed)))
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span id={labelId} className="text-sm font-medium text-warm-brown">
            Quantity
          </span>
          <div
            role="group"
            aria-labelledby={labelId}
            className="flex items-center rounded-lg border border-warm-brown/20"
          >
            <button
              type="button"
              onClick={decrease}
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={quantity <= 1}
              className="flex h-11 w-11 items-center justify-center text-warm-brown hover:bg-warm-brown/5 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <span aria-hidden="true">−</span>
            </button>
            <input
              id={`qty-${item.id}`}
              type="number"
              min={1}
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              aria-labelledby={labelId}
              aria-describedby={`qty-item-${item.id}`}
              className="w-12 border-x border-warm-brown/20 py-2 text-center text-warm-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            />
            <span id={`qty-item-${item.id}`} className="sr-only">
              {item.name}
            </span>
            <button
              type="button"
              onClick={increase}
              aria-label={`Increase quantity of ${item.name}`}
              disabled={quantity >= MAX_QUANTITY}
              className="flex h-11 w-11 items-center justify-center text-warm-brown hover:bg-warm-brown/5 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-2 text-sm ${added ? '' : 'sr-only'}`}
        style={added ? { color: '#4a5d42' } : undefined}
      >
        {added ? `${quantity} × ${item.name} added to cart` : ''}
      </p>
    </div>
  )
}
