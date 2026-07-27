"use client";

import { useState, useMemo } from "react";
import { getMenuForDate, getValidDateRange, formatDateForInput, getDayName } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import MenuItemCard from "@/components/MenuItemCard";

export default function MenuPage() {
  const { min, max } = useMemo(() => getValidDateRange(), []);
  const { selectedDate, setSelectedDate } = useCart();

  const [dateInput, setDateInput] = useState(selectedDate || formatDateForInput(min));

  const currentDate = dateInput || formatDateForInput(min);
  const parsedDate = new Date(currentDate + "T00:00:00");
  const menu = useMemo(() => getMenuForDate(parsedDate), [currentDate]);

  const handleDateChange = (val: string) => {
    setDateInput(val);
    setSelectedDate(val);
  };

  const proteins = menu.items.filter((i) => i.category === "protein");
  const vegetarian = menu.items.filter((i) => i.category === "vegetarian");
  const sides = menu.items.filter((i) => i.category === "side");

  const categories = [
    { label: "Protein", id: "protein", items: proteins },
    { label: "Vegetarian", id: "vegetarian", items: vegetarian },
    { label: "Sides", id: "sides", items: sides },
  ];

  return (
    <main className="flex-1">
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Catering Menu</h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Select your catering date to see the menu. Each day features a unique selection of homemade dishes prepared with fresh ingredients.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <label htmlFor="catering-date" className="font-medium text-gray-700 text-sm">
              Catering Date:
            </label>
            <input
              id="catering-date"
              type="date"
              value={currentDate}
              min={formatDateForInput(min)}
              max={formatDateForInput(max)}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[44px]"
              aria-describedby="date-hint"
            />
            <p id="date-hint" className="text-xs text-gray-500">
              Available: {min.toLocaleDateString()} &ndash; {max.toLocaleDateString()}
            </p>
          </div>

          <p className="mt-4 text-lg font-semibold text-amber-700" role="status" aria-live="polite" aria-atomic="true">
            Showing {getDayName(parsedDate)}&apos;s Menu
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {categories.map((cat) => (
          <section key={cat.id} aria-labelledby={`heading-${cat.id}`}>
            <h2 id={`heading-${cat.id}`} className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-amber-500 rounded-full" aria-hidden="true" />
              {cat.label}
              <span className="text-sm font-normal text-gray-400">({cat.items.length} items)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
