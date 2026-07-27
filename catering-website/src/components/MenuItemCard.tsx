"use client";

import { useState } from "react";
import { type MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import FoodDetailModal from "./FoodDetailModal";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setQty(1);
  };

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
        <button
          onClick={() => setShowDetail(true)}
          className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer group"
          aria-label={`View details for ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full capitalize">
            {item.category}
          </span>
        </button>

        <div className="p-4 flex flex-col flex-1">
          <button
            onClick={() => setShowDetail(true)}
            className="text-left"
            aria-label={`View details for ${item.name}`}
          >
            <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
          </button>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{item.description}</p>
          <p className="text-lg font-bold text-amber-700 mt-3">${item.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ portion</span></p>

          <div className="flex items-center gap-3 mt-3">
            <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity for {item.name}</label>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Decrease quantity for ${item.name}`}
              >
                &minus;
              </button>
              <input
                id={`qty-${item.id}`}
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border-x border-gray-200 py-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label={`Quantity for ${item.name}`}
              />
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Increase quantity for ${item.name}`}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-amber-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-amber-700 transition-colors min-h-[44px]"
            >
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </article>

      {showDetail && (
        <FoodDetailModal item={item} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
