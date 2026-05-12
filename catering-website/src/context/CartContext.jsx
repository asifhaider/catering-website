import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],        // [{ itemId, quantity }]  quantity = 6..30
  selectedDate: '', // ISO date string e.g. '2026-05-10'
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, selectedDate: action.date, items: [] }

    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.itemId === action.itemId)
      if (exists) return state
      return { ...state, items: [...state.items, { itemId: action.itemId, quantity: action.quantity ?? 10 }] }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.itemId !== action.itemId) }

    case 'UPDATE_QUANTITY': {
      const q = Math.max(6, Math.min(30, action.quantity))
      return {
        ...state,
        items: state.items.map(i =>
          i.itemId === action.itemId ? { ...i, quantity: q } : i
        ),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('mamastable_cart')
      return saved ? JSON.parse(saved) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem('mamastable_cart', JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
