import { useId, useState } from 'react'
import type { CartItem } from '../types/order'
import { MAX_PORTIONS, MIN_PORTIONS } from '../types/menu'

interface CartRowProps {
  entry: CartItem
  onQuantityChange: (foodItemId: string, quantity: number) => void
  onRemove: (foodItemId: string, name: string) => void
  removeButtonRef: (el: HTMLButtonElement | null) => void
}

export default function CartRow({ entry, onQuantityChange, onRemove, removeButtonRef }: CartRowProps) {
  const { foodItem, quantity } = entry
  const [draft, setDraft] = useState(String(quantity))
  const [error, setError] = useState<string | null>(null)

  const qtyInputId = useId()
  const qtyHintId = useId()
  const qtyErrorId = useId()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value
    setDraft(raw)
    const parsed = Number(raw)
    if (raw.trim() === '' || Number.isNaN(parsed)) {
      setError('Enter a quantity, or use Remove to take this dish out.')
      return
    }
    if (parsed < MIN_PORTIONS) {
      setError(`Minimum is ${MIN_PORTIONS} portions — use Remove to take this dish out instead.`)
      return
    }
    if (parsed > MAX_PORTIONS) {
      setError(`Maximum is ${MAX_PORTIONS} portions.`)
      return
    }
    setError(null)
    onQuantityChange(foodItem.id, parsed)
  }

  const describedBy = [qtyHintId, error ? qtyErrorId : null].filter(Boolean).join(' ')
  const lineSubtotal = foodItem.pricePerPortion * quantity

  return (
    <tr className="border-b border-stone-200 last:border-b-0">
      <td data-label="Photo" className="p-3">
        <img src={foodItem.imageUrl} alt="" className="h-16 w-16 rounded object-cover" />
      </td>
      <th scope="row" data-label="Item" className="p-3 text-left font-medium text-stone-900">
        {foodItem.name}
      </th>
      <td data-label="Price per portion" className="p-3 text-stone-700">
        ${foodItem.pricePerPortion.toFixed(2)}
      </td>
      <td data-label="Quantity" className="p-3">
        <label htmlFor={qtyInputId} className="sr-only">
          Quantity for {foodItem.name}
        </label>
        <input
          id={qtyInputId}
          type="number"
          min={MIN_PORTIONS}
          max={MAX_PORTIONS}
          value={draft}
          onChange={handleChange}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className="w-20 rounded-md border border-stone-300 px-2 py-1.5 text-stone-900 focus:border-amber-600 focus:outline-none"
        />
        <p id={qtyHintId} className="mt-1 text-xs text-stone-500">
          {MIN_PORTIONS}–{MAX_PORTIONS} portions
        </p>
        {error && (
          <p id={qtyErrorId} role="alert" className="mt-1 text-xs font-medium text-red-700">
            {error}
          </p>
        )}
      </td>
      <td data-label="Subtotal" className="p-3 font-medium text-stone-900">
        ${lineSubtotal.toFixed(2)}
      </td>
      <td data-label="Actions" className="p-3">
        <button
          ref={removeButtonRef}
          type="button"
          onClick={() => onRemove(foodItem.id, foodItem.name)}
          aria-label={`Remove ${foodItem.name}`}
          className="min-h-[44px] rounded-md border border-red-700 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          Remove
        </button>
      </td>
    </tr>
  )
}
