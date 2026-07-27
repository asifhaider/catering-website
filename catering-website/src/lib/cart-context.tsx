"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";
import { MAX_PORTIONS, MIN_PORTIONS } from "./types";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  cateringDate: string | null;
  addItem: (item: Omit<CartItem, "portions"> & { portions?: number }) => void;
  updatePortions: (foodItemId: string, portions: number) => void;
  removeItem: (foodItemId: string) => void;
  clearCart: () => void;
  setCateringDate: (date: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hearth-plate-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cateringDate, setCateringDateState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          items: CartItem[];
          cateringDate: string | null;
        };
        setItems(parsed.items ?? []);
        setCateringDateState(parsed.cateringDate ?? null);
      }
    } catch {
      // Ignore corrupted local storage.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items, cateringDate })
    );
  }, [items, cateringDate, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.pricePerPortion * item.portions,
      0
    );

    return {
      items,
      itemCount: items.length,
      subtotal,
      cateringDate,
      addItem: (incoming) => {
        const portions = Math.min(
          MAX_PORTIONS,
          Math.max(MIN_PORTIONS, incoming.portions ?? MIN_PORTIONS)
        );
        setItems((current) => {
          const existing = current.find(
            (item) => item.foodItemId === incoming.foodItemId
          );
          if (existing) {
            return current.map((item) =>
              item.foodItemId === incoming.foodItemId
                ? {
                    ...item,
                    portions: Math.min(
                      MAX_PORTIONS,
                      Math.max(MIN_PORTIONS, portions)
                    ),
                    cateringDate: incoming.cateringDate,
                  }
                : item
            );
          }
          return [
            ...current,
            {
              foodItemId: incoming.foodItemId,
              name: incoming.name,
              category: incoming.category,
              pricePerPortion: incoming.pricePerPortion,
              image: incoming.image,
              imageAlt: incoming.imageAlt,
              portions,
              cateringDate: incoming.cateringDate,
            },
          ];
        });
        setCateringDateState(incoming.cateringDate);
      },
      updatePortions: (foodItemId, portions) => {
        const next = Math.min(
          MAX_PORTIONS,
          Math.max(MIN_PORTIONS, Math.round(portions))
        );
        setItems((current) =>
          current.map((item) =>
            item.foodItemId === foodItemId ? { ...item, portions: next } : item
          )
        );
      },
      removeItem: (foodItemId) => {
        setItems((current) =>
          current.filter((item) => item.foodItemId !== foodItemId)
        );
      },
      clearCart: () => {
        setItems([]);
      },
      setCateringDate: (date) => {
        setCateringDateState(date);
        setItems((current) =>
          current.map((item) => ({ ...item, cateringDate: date }))
        );
      },
    };
  }, [items, cateringDate]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
