"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalPortions, portionError } = useCart();

  useEffect(() => {
    document.title = `Cart (${items.length} items) | Mama's Kitchen`;
  }, [items.length]);

  if (items.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Browse our menu and add some delicious items!</p>
        <Link href="/" className="bg-amber-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors min-h-[44px] inline-flex items-center">
          View Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      {portionError && (
        <div role="alert" className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {portionError}
        </div>
      )}

      <div className="space-y-4">
        {items.map((ci) => (
          <article key={ci.menuItem.id} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <img src={ci.menuItem.image} alt={ci.menuItem.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900">{ci.menuItem.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{ci.menuItem.category}</p>
              {ci.dateLabel && <p className="text-xs text-gray-400">{ci.dateLabel}</p>}
              <p className="text-amber-700 font-bold mt-1">${(ci.menuItem.price * ci.quantity).toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => removeItem(ci.menuItem.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Remove ${ci.menuItem.name} from cart`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button onClick={() => updateQuantity(ci.menuItem.id, ci.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg min-w-[36px] min-h-[36px]" aria-label={`Decrease quantity of ${ci.menuItem.name}`}>&minus;</button>
                <label htmlFor={`cart-qty-${ci.menuItem.id}`} className="sr-only">Quantity of {ci.menuItem.name}</label>
                <input
                  id={`cart-qty-${ci.menuItem.id}`}
                  type="number"
                  min={1}
                  value={ci.quantity}
                  onChange={(e) => updateQuantity(ci.menuItem.id, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-10 text-center text-sm border-x border-gray-200 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label={`Quantity of ${ci.menuItem.name}`}
                />
                <button onClick={() => updateQuantity(ci.menuItem.id, ci.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg min-w-[36px] min-h-[36px]" aria-label={`Increase quantity of ${ci.menuItem.name}`}>+</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Portions</span>
          <span className="font-medium">{totalPortions}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-amber-700">${totalPrice.toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className={`block w-full text-center font-semibold py-3 rounded-lg transition-colors min-h-[44px] ${
            portionError
              ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
          aria-disabled={!!portionError}
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}
