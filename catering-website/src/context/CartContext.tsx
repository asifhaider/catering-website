import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '../types/order'
import type { FoodItem } from '../types/menu'

interface CartContextValue {
  items: CartItem[]
  addItem: (foodItem: FoodItem, quantity: number) => void
  updateQuantity: (foodItemId: string, quantity: number) => void
  removeItem: (foodItemId: string) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
  pickupDate: Date | null
  setPickupDate: (date: Date | null) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [pickupDate, setPickupDate] = useState<Date | null>(null)

  function addItem(foodItem: FoodItem, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.foodItem.id === foodItem.id)
      if (existing) {
        return prev.map((entry) =>
          entry.foodItem.id === foodItem.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        )
      }
      return [...prev, { foodItem, quantity }]
    })
  }

  function updateQuantity(foodItemId: string, quantity: number) {
    setItems((prev) => prev.map((entry) => (entry.foodItem.id === foodItemId ? { ...entry, quantity } : entry)))
  }

  function removeItem(foodItemId: string) {
    setItems((prev) => prev.filter((entry) => entry.foodItem.id !== foodItemId))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.foodItem.pricePerPortion * entry.quantity, 0),
    [items],
  )
  const itemCount = useMemo(() => items.reduce((sum, entry) => sum + entry.quantity, 0), [items])

  const value: CartContextValue = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    itemCount,
    pickupDate,
    setPickupDate,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
