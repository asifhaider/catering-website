import type { FoodCategory, FoodItem } from "../types";
import FoodItemCard from "./FoodItemCard";

const CATEGORY_ORDER: FoodCategory[] = ["protein", "vegetarian", "side"];
const CATEGORY_LABELS: Record<FoodCategory, string> = {
  protein: "Protein",
  vegetarian: "Vegetarian",
  side: "Sides",
};

interface MenuListProps {
  items: FoodItem[];
  quantities: Record<string, number>;
  pickupDate: string | null;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onViewDetails: (item: FoodItem) => void;
}

export default function MenuList({ items, quantities, pickupDate, onQuantityChange, onViewDetails }: MenuListProps) {
  return (
    <div className="space-y-8">
      {CATEGORY_ORDER.map((category) => {
        const categoryItems = items.filter((item) => item.category === category);
        if (categoryItems.length === 0) return null;
        const headingId = `menu-category-${category}`;
        return (
          <section key={category} aria-labelledby={headingId}>
            <h2 id={headingId} className="text-xl font-bold text-brand-900 mb-3">
              {CATEGORY_LABELS[category]}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
              {categoryItems.map((item) => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  quantity={quantities[item.id] ?? 1}
                  pickupDate={pickupDate}
                  onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
                  onViewDetails={onViewDetails}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
