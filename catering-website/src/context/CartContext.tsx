import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, FoodItem } from '../types'

interface CartContextValue {
  items: CartItem[]
  cateringDate: string
  setCateringDate: (date: string) => void
  addItem: (foodItem: FoodItem, quantity: number) => void
  updateQuantity: (foodItemId: string, quantity: number) => void
  removeItem: (foodItemId: string) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cateringDate, setCateringDate] = useState('')

  const addItem = useCallback(
    (foodItem: FoodItem, quantity: number) => {
      if (quantity < 1) return
      setItems((prev) => {
        const existing = prev.find((i) => i.foodItem.id === foodItem.id)
        if (existing) {
          return prev.map((i) =>
            i.foodItem.id === foodItem.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        }
        return [...prev, { foodItem, quantity, cateringDate }]
      })
    },
    [cateringDate],
  )

  const updateQuantity = useCallback((foodItemId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.foodItem.id !== foodItemId))
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.foodItem.id === foodItemId ? { ...i, quantity } : i,
      ),
    )
  }, [])

  const removeItem = useCallback((foodItemId: string) => {
    setItems((prev) => prev.filter((i) => i.foodItem.id !== foodItemId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      cateringDate,
      setCateringDate,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount,
    }),
    [items, cateringDate, addItem, updateQuantity, removeItem, clearCart, itemCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
