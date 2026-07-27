import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartRow from '../components/CartRow'
import { usePageTitle } from '../utils/usePageTitle'

export default function CartPage() {
  usePageTitle('Cart')
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const navigate = useNavigate()

  const [liveMessage, setLiveMessage] = useState('')
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const pendingFocusIdRef = useRef<string | 'empty-state' | null>(null)
  const emptyStateHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!pendingFocusIdRef.current) return
    const target = pendingFocusIdRef.current
    pendingFocusIdRef.current = null

    if (target === 'empty-state') {
      emptyStateHeadingRef.current?.focus()
      return
    }
    removeButtonRefs.current.get(target)?.focus()
  }, [items])

  function handleRemove(foodItemId: string, name: string) {
    const index = items.findIndex((entry) => entry.foodItem.id === foodItemId)
    const remaining = items.filter((entry) => entry.foodItem.id !== foodItemId)
    const removedLineTotal = items[index].foodItem.pricePerPortion * items[index].quantity
    const newSubtotal = subtotal - removedLineTotal

    if (remaining.length === 0) {
      pendingFocusIdRef.current = 'empty-state'
    } else {
      const nextIndex = Math.min(index, remaining.length - 1)
      pendingFocusIdRef.current = remaining[nextIndex].foodItem.id
    }

    removeButtonRefs.current.delete(foodItemId)
    removeItem(foodItemId)
    setLiveMessage(
      remaining.length === 0
        ? `${name} removed. Your cart is now empty.`
        : `${name} removed. Order subtotal now $${newSubtotal.toFixed(2)}.`,
    )
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 tabIndex={-1} ref={emptyStateHeadingRef} className="text-2xl font-semibold text-stone-900 focus:outline-none">
          Your cart is empty
        </h1>
        <p aria-live="polite" role="status" className="sr-only">
          {liveMessage}
        </p>
        <p className="mt-2 text-stone-600">
          You haven't added any dishes yet.{' '}
          <Link to="/" className="text-amber-800 hover:underline">
            Browse the menu
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Cart ({items.length} items)</h1>
      <p aria-live="polite" role="status" className="sr-only">
        {liveMessage}
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
        <table className="cart-table w-full border-collapse">
          <caption className="sr-only">Your cart</caption>
          <thead>
            <tr className="border-b border-stone-200 bg-stone-100 text-sm text-stone-700">
              <th scope="col" className="p-3 text-left font-medium">
                <span className="sr-only">Photo</span>
              </th>
              <th scope="col" className="p-3 text-left font-medium">
                Item
              </th>
              <th scope="col" className="p-3 text-left font-medium">
                Price per portion
              </th>
              <th scope="col" className="p-3 text-left font-medium">
                Quantity
              </th>
              <th scope="col" className="p-3 text-left font-medium">
                Subtotal
              </th>
              <th scope="col" className="p-3 text-left font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <CartRow
                key={entry.foodItem.id}
                entry={entry}
                onQuantityChange={updateQuantity}
                onRemove={handleRemove}
                removeButtonRef={(el) => {
                  if (el) removeButtonRefs.current.set(entry.foodItem.id, el)
                  else removeButtonRefs.current.delete(entry.foodItem.id)
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-end gap-4">
        <h2 className="text-lg font-semibold text-stone-900">Order subtotal: ${subtotal.toFixed(2)}</h2>
        <button
          type="button"
          onClick={() => navigate('/checkout')}
          className="min-h-[44px] rounded-md bg-amber-800 px-6 py-3 text-base font-semibold text-white hover:bg-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}
