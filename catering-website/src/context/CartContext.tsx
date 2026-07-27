import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "../types";
import { getItemById } from "../data/menuData";

const STORAGE_KEY = "homestead-catering-cart";

interface StoredCart {
  pickupDate: string | null;
  lines: CartLine[];
}

function loadStoredCart(): StoredCart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { pickupDate: null, lines: [] };
    const parsed = JSON.parse(raw) as StoredCart;
    return { pickupDate: parsed.pickupDate ?? null, lines: Array.isArray(parsed.lines) ? parsed.lines : [] };
  } catch {
    return { pickupDate: null, lines: [] };
  }
}

export interface CartContextValue {
  pickupDate: string | null;
  lines: CartLine[];
  totalPortions: number;
  subtotal: number;
  /** Sets the active pickup date. If it differs from the current cart's date, the cart is cleared. */
  setPickupDate: (date: string) => void;
  addItem: (itemId: string, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getQuantity: (itemId: string) => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [pickupDate, setPickupDateState] = useState<string | null>(() => loadStoredCart().pickupDate);
  const [lines, setLines] = useState<CartLine[]>(() => loadStoredCart().lines);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ pickupDate, lines }));
  }, [pickupDate, lines]);

  const setPickupDate = (date: string) => {
    setPickupDateState((current) => {
      if (current !== date) {
        setLines([]);
      }
      return date;
    });
  };

  const addItem = (itemId: string, quantity: number) => {
    if (quantity <= 0) return;
    setLines((current) => {
      const existing = current.find((line) => line.itemId === itemId);
      if (existing) {
        return current.map((line) => (line.itemId === itemId ? { ...line, quantity: line.quantity + quantity } : line));
      }
      return [...current, { itemId, quantity }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) {
        return current.filter((line) => line.itemId !== itemId);
      }
      return current.map((line) => (line.itemId === itemId ? { ...line, quantity } : line));
    });
  };

  const removeItem = (itemId: string) => {
    setLines((current) => current.filter((line) => line.itemId !== itemId));
  };

  const clearCart = () => setLines([]);

  const getQuantity = (itemId: string) => lines.find((line) => line.itemId === itemId)?.quantity ?? 0;

  const totalPortions = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const item = getItemById(line.itemId);
        return sum + (item ? item.pricePerPerson * line.quantity : 0);
      }, 0),
    [lines],
  );

  const value: CartContextValue = {
    pickupDate,
    lines,
    totalPortions,
    subtotal,
    setPickupDate,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
