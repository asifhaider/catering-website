import { useId, useState } from 'react'
import type { FoodItem } from '../types/menu'
import { MAX_PORTIONS, MIN_PORTIONS } from '../types/menu'
import { useCart } from '../context/CartContext'

interface AddToCartControlProps {
  item: FoodItem
  onAdded: (item: FoodItem, quantity: number) => void
}

export default function AddToCartControl({ item, onAdded }: AddToCartControlProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState<number>(MIN_PORTIONS)
  const [error, setError] = useState<string | null>(null)

  const qtyInputId = useId()
  const qtyHintId = useId()
  const qtyErrorId = useId()

  function handleAddToCart() {
    if (Number.isNaN(quantity) || quantity < MIN_PORTIONS || quantity > MAX_PORTIONS) {
      setError(`Enter a quantity between ${MIN_PORTIONS} and ${MAX_PORTIONS} portions.`)
      return
    }
    setError(null)
    addItem(item, quantity)
    onAdded(item, quantity)
  }

  const describedBy = [qtyHintId, error ? qtyErrorId : null].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={qtyInputId} className="text-sm font-medium text-stone-800">
        Quantity for {item.name} (portions)
      </label>
      <p id={qtyHintId} className="text-xs text-stone-500">
        Between {MIN_PORTIONS} and {MAX_PORTIONS} portions
      </p>
      <input
        id={qtyInputId}
        type="number"
        min={MIN_PORTIONS}
        max={MAX_PORTIONS}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className="w-24 rounded-md border border-stone-300 px-2 py-1.5 text-stone-900 focus:border-amber-600 focus:outline-none"
      />
      {error && (
        <p id={qtyErrorId} role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleAddToCart}
        aria-label={`Add ${item.name} to cart`}
        className="mt-1 min-h-[44px] w-fit rounded-md bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
      >
        Add to cart
      </button>
    </div>
  )
}
