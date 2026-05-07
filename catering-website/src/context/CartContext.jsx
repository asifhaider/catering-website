import { createContext, useContext, useReducer, useCallback } from 'react'
import { MIN_PORTIONS } from '../data/menu'

const CartContext = createContext(null)

const initialState = {
  selectedDate: null,      // JS Date object — the pickup date
  cartItems: [],            // [{ food: FoodItem, quantity: number }]
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE': {
      // Changing date clears the cart (different day = different menu)
      const sameDay =
        state.selectedDate &&
        state.selectedDate.toDateString() === action.date.toDateString()
      return {
        selectedDate: action.date,
        cartItems: sameDay ? state.cartItems : [],
      }
    }
    case 'ADD_ITEM': {
      const exists = state.cartItems.find((ci) => ci.food.id === action.food.id)
      if (exists) return state
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { food: action.food, quantity: MIN_PORTIONS },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((ci) => ci.food.id !== action.foodId),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((ci) =>
          ci.food.id === action.foodId
            ? { ...ci, quantity: action.quantity }
            : ci
        ),
      }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const setSelectedDate = useCallback((date) => {
    dispatch({ type: 'SET_DATE', date })
  }, [])

  const addToCart = useCallback((food) => {
    dispatch({ type: 'ADD_ITEM', food })
  }, [])

  const removeFromCart = useCallback((foodId) => {
    dispatch({ type: 'REMOVE_ITEM', foodId })
  }, [])

  const updateQuantity = useCallback((foodId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', foodId, quantity })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const cartItemCount = state.cartItems.length

  const cartTotal = state.cartItems.reduce(
    (sum, ci) => sum + ci.food.price * ci.quantity,
    0
  )

  const isInCart = useCallback(
    (foodId) => state.cartItems.some((ci) => ci.food.id === foodId),
    [state.cartItems]
  )

  return (
    <CartContext.Provider
      value={{
        selectedDate: state.selectedDate,
        cartItems: state.cartItems,
        cartItemCount,
        cartTotal,
        setSelectedDate,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
