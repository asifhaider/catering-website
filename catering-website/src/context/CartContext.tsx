"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type MenuItem, MIN_PORTIONS, MAX_PORTIONS } from "@/data/menuData";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  dateLabel: string;
}

interface CartContextType {
  items: CartItem[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  addItem: (item: MenuItem, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalPortions: number;
  portionError: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  const addItem = useCallback((menuItem: MenuItem, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const dateLabel = selectedDate
        ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "";
      return [...prev, { menuItem, quantity, dateLabel }];
    });
  }, [selectedDate]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.menuItem.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.menuItem.id === itemId ? { ...i, quantity } : i))
      );
    }
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const totalPortions = totalItems;

  let portionError: string | null = null;
  if (totalPortions > 0 && totalPortions < MIN_PORTIONS) {
    portionError = `Minimum order is ${MIN_PORTIONS} portions. You have ${totalPortions}.`;
  } else if (totalPortions > MAX_PORTIONS) {
    portionError = `Maximum order is ${MAX_PORTIONS} portions. You have ${totalPortions}.`;
  }

  return (
    <CartContext.Provider
      value={{
        items, selectedDate, setSelectedDate,
        addItem, updateQuantity, removeItem, clearCart,
        totalItems, totalPrice, totalPortions, portionError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
