import type { FoodCategory, FoodItem } from "@/lib/types";
import {
  categoryLabels,
  categoryOrder,
} from "@/lib/menu-data";
import { formatDisplayDate, parseDateInputValue } from "@/lib/dates";
import FoodItemCard from "./FoodItemCard";

interface MenuListProps {
  items: FoodItem[];
  cateringDate: string;
}

function groupByCategory(items: FoodItem[]): Record<FoodCategory, FoodItem[]> {
  return {
    protein: items.filter((item) => item.category === "protein"),
    vegetarian: items.filter((item) => item.category === "vegetarian"),
    sides: items.filter((item) => item.category === "sides"),
  };
}

export default function MenuList({ items, cateringDate }: MenuListProps) {
  const grouped = groupByCategory(items);
  const date = parseDateInputValue(cateringDate);
  const dateLabel = date ? formatDisplayDate(date) : cateringDate;

  return (
    <section
      id="menu-list"
      className="menu-list"
      aria-labelledby="menu-list-heading"
    >
      <h2 id="menu-list-heading" className="section-heading">
        Menu for {dateLabel}
      </h2>
      <p className="section-lede">
        Browse by category. Select a dish to see description, ingredients, and
        nutrition facts. Portions can be ordered for {6}–{30} people.
      </p>

      <div aria-live="polite" className="visually-hidden">
        Menu updated for {dateLabel}. {items.length} dishes available.
      </div>

      {categoryOrder.map((category) => {
        const categoryItems = grouped[category];
        const headingId = `menu-category-${category}`;

        return (
          <section
            key={category}
            className="menu-category"
            aria-labelledby={headingId}
          >
            <h3 id={headingId} className="menu-category-heading">
              {categoryLabels[category]}
            </h3>

            {categoryItems.length === 0 ? (
              <p className="section-lede">
                No {categoryLabels[category].toLowerCase()} items for this date.
              </p>
            ) : (
              <ul className="menu-grid" role="list">
                {categoryItems.map((item) => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                    cateringDate={cateringDate}
                  />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </section>
  );
}
