"use client";

import { useEffect, useRef, useState } from "react";
import { type MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

export default function FoodDetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAdd = () => {
    addItem(item, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const n = item.nutrition;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/50"
      aria-label={`Details for ${item.name}`}
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
    >
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center shadow"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {item.category}
        </span>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <p className="text-2xl font-bold text-amber-700 mt-1">${item.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ portion</span></p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
          <ul className="flex flex-wrap gap-2">
            {item.ingredients.map((ing) => (
              <li key={ing} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{ing}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Nutrition Facts</h3>
          <table className="w-full text-sm border-collapse" aria-label="Nutrition facts">
            <caption className="sr-only">Nutrition facts per serving for {item.name}</caption>
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th scope="col" className="text-left py-1 font-bold">Nutrient</th>
                <th scope="col" className="text-right py-1 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Calories", `${n.calories}`],
                ["Total Fat", n.totalFat],
                ["Saturated Fat", n.saturatedFat],
                ["Cholesterol", n.cholesterol],
                ["Sodium", n.sodium],
                ["Total Carbohydrates", n.totalCarbs],
                ["Dietary Fiber", n.dietaryFiber],
                ["Sugars", n.sugars],
                ["Protein", n.protein],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-gray-200">
                  <td className="py-1.5 text-gray-700">{label}</td>
                  <td className="py-1.5 text-right font-medium text-gray-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <label htmlFor={`modal-qty-${item.id}`} className="sr-only">Quantity</label>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg min-w-[44px] min-h-[44px]" aria-label="Decrease quantity">&minus;</button>
            <input id={`modal-qty-${item.id}`} type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-14 text-center border-x border-gray-200 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" aria-label="Quantity" />
            <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg min-w-[44px] min-h-[44px]" aria-label="Increase quantity">+</button>
          </div>
          <button onClick={handleAdd} className="flex-1 bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors min-h-[44px]">
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
