import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { MIN_PORTIONS } from "../data/menuData";

const CartContext = createContext(null);

const initialState = {
  items: [],
  selectedDate: null,
  isDrawerOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { foodItem, portions, date } = action.payload;
      const existing = state.items.find((i) => i.id === foodItem.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === foodItem.id ? { ...i, portions } : i
          ),
          selectedDate: date,
        };
      }
      return {
        ...state,
        items: [...state.items, { id: foodItem.id, foodItem, portions }],
        selectedDate: date,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
        selectedDate: state.items.length === 1 ? null : state.selectedDate,
      };
    case "UPDATE_PORTIONS":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, portions: action.payload.portions }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...initialState };
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    case "RESTORE":
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem("mk_cart");
      return saved ? JSON.parse(saved) : { ...init, isDrawerOpen: false };
    } catch {
      return init;
    }
  });

  useEffect(() => {
    const { isDrawerOpen, ...toSave } = state;
    localStorage.setItem("mk_cart", JSON.stringify(toSave));
  }, [state]);

  const addItem = useCallback((foodItem, portions, date) => {
    dispatch({ type: "ADD_ITEM", payload: { foodItem, portions, date } });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updatePortions = useCallback((id, portions) => {
    dispatch({ type: "UPDATE_PORTIONS", payload: { id, portions } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleDrawer = useCallback(() => dispatch({ type: "TOGGLE_DRAWER" }), []);
  const openDrawer = useCallback(() => dispatch({ type: "OPEN_DRAWER" }), []);
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), []);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.foodItem.price * i.portions,
    0
  );
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const itemCount = state.items.length;

  return (
    <CartContext.Provider
      value={{
        ...state,
        subtotal,
        tax,
        total,
        itemCount,
        addItem,
        removeItem,
        updatePortions,
        clearCart,
        toggleDrawer,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
