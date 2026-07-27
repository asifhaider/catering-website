import { useState } from 'react'
import { Link } from 'react-router-dom'
import { businessInfo } from '../data/business'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate, parseISODate } from '../utils/dates'

export default function Cart() {
  useDocumentTitle(`Cart — ${businessInfo.name}`)
  const { items, cateringDate, updateQuantity, removeItem, itemCount } = useCart()
  const [statusMessage, setStatusMessage] = useState('')

  const subtotal = items.reduce(
    (sum, item) => sum + item.foodItem.price * item.quantity,
    0,
  )

  const announce = (message: string) => {
    setStatusMessage(message)
    setTimeout(() => setStatusMessage(''), 3000)
  }

  const handleDecrease = (foodItemId: string, name: string, quantity: number) => {
    if (quantity <= 1) {
      removeItem(foodItemId)
      announce(`${name} removed from cart`)
    } else {
      updateQuantity(foodItemId, quantity - 1)
    }
  }

  const handleRemove = (foodItemId: string, name: string) => {
    removeItem(foodItemId)
    announce(`${name} removed from cart`)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Your Cart</h1>
        <p className="mt-4 text-warm-brown/80" role="status">
          Your cart is empty. Browse our menu to add items for your catering order.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          View Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>

      <h1 className="font-display text-3xl font-bold text-warm-brown">Your Cart</h1>
      <p className="mt-2 text-warm-brown/80">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
        {cateringDate && (
          <> · Pickup on {formatDate(parseISODate(cateringDate))}</>
        )}
      </p>

      <ul className="mt-6 space-y-4" aria-label="Cart items">
        {items.map(({ foodItem, quantity }) => (
          <li
            key={foodItem.id}
            className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
          >
            <img
              src={foodItem.image}
              alt=""
              aria-hidden="true"
              className="h-20 w-20 shrink-0 rounded-lg object-cover"
            />
            <div className="flex flex-1 flex-col">
              <h2 className="font-display text-lg font-semibold text-warm-brown">
                {foodItem.name}
              </h2>
              <p className="text-sm text-warm-brown/80">
                ${foodItem.price.toFixed(2)} / serving
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div
                  role="group"
                  aria-label={`Quantity for ${foodItem.name}`}
                  className="flex items-center rounded-lg border border-warm-brown/20"
                >
                  <button
                    type="button"
                    onClick={() => handleDecrease(foodItem.id, foodItem.name, quantity)}
                    aria-label={
                      quantity <= 1
                        ? `Remove ${foodItem.name} from cart`
                        : `Decrease quantity of ${foodItem.name}`
                    }
                    className="flex h-11 w-11 items-center justify-center text-warm-brown hover:bg-warm-brown/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-warm-brown">
                    <span className="sr-only">Quantity: </span>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(foodItem.id, quantity + 1)}
                    aria-label={`Increase quantity of ${foodItem.name}`}
                    className="flex h-11 w-11 items-center justify-center text-warm-brown hover:bg-warm-brown/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>

                <p className="font-semibold text-warm-brown">
                  <span className="sr-only">Line total: </span>
                  ${(foodItem.price * quantity).toFixed(2)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(foodItem.id, foodItem.name)}
                className="mt-2 self-start rounded px-2 py-2 text-sm text-red-700 underline hover:text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              >
                Remove {foodItem.name}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <dl className="flex justify-between text-lg font-semibold text-warm-brown">
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </dl>
        <p className="mt-1 text-xs text-warm-brown/80">
          Tax calculated at checkout
        </p>

        <Link
          to="/checkout"
          className="mt-4 block w-full rounded-lg bg-terracotta py-3 text-center text-sm font-semibold text-white hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
