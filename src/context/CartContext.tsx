import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';
import type { CartState, FoodItem } from '../types';
import { round2 } from '../utils/formatUtils';

type Action =
  | { type: 'SET_DATE'; date: string }
  | { type: 'SET_PORTION'; size: number }
  | { type: 'ADD_ITEM'; item: FoodItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  cateringDate: null,
  portionSize: null,
  items: [],
};

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'SET_DATE':
      return { ...initialState, cateringDate: action.date };
    case 'SET_PORTION':
      return { ...state, portionSize: action.size };
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.foodItem.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.foodItem.id === action.item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { foodItem: action.item, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.foodItem.id !== action.id) };
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.foodItem.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.foodItem.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  setCateringDate: (date: string) => void;
  setPortionSize: (size: number) => void;
  addItem: (item: FoodItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isItemInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = useMemo(() => {
    if (!state.portionSize) return 0;
    return round2(
      state.items.reduce(
        (sum, i) => sum + i.foodItem.pricePerPerson * state.portionSize! * i.quantity,
        0
      )
    );
  }, [state.items, state.portionSize]);

  const value: CartContextValue = {
    state,
    setCateringDate: (date) => dispatch({ type: 'SET_DATE', date }),
    setPortionSize: (size) => dispatch({ type: 'SET_PORTION', size }),
    addItem: (item) => dispatch({ type: 'ADD_ITEM', item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
    updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    itemCount,
    subtotal,
    isItemInCart: (id) => state.items.some((i) => i.foodItem.id === id),
    getItemQuantity: (id) => state.items.find((i) => i.foodItem.id === id)?.quantity ?? 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
