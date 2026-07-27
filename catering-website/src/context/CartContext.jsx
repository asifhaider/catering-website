import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const TAX_RATE = 0.13

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: action.quantity }],
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'SET_CATERING_DATE':
      return { ...state, cateringDate: action.date }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], cateringDate: null })

  const addItem = useCallback((item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', item, quantity })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const setCateringDate = useCallback((date) => {
    dispatch({ type: 'SET_CATERING_DATE', date })
  }, [])

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      cateringDate: state.cateringDate,
      subtotal,
      tax,
      total,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCateringDate,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
