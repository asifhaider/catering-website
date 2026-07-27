import Link from "next/link";
import type { FoodItem } from "@/lib/types";
import { formatCurrency } from "@/lib/dates";
import { MIN_PORTIONS, MAX_PORTIONS } from "@/lib/types";

interface FoodItemCardProps {
  item: FoodItem;
  cateringDate: string;
}

export default function FoodItemCard({ item, cateringDate }: FoodItemCardProps) {
  const priceLabel = `${formatCurrency(item.pricePerPortion)} per portion`;
  const portionLabel = `Order ${MIN_PORTIONS}–${MAX_PORTIONS} portions`;
  const accessibleName = `View details: ${item.name}, ${priceLabel}`;

  return (
    <li>
      <Link
        href={`/menu/${item.id}?date=${encodeURIComponent(cateringDate)}`}
        className="food-card"
        aria-label={accessibleName}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt=""
          className="food-card-image"
          loading="lazy"
        />
        <div className="food-card-body">
          <h4 className="food-card-name">{item.name}</h4>
          <div className="food-card-meta">
            <span className="food-card-price">{priceLabel}</span>
          </div>
          <p className="food-card-meta" style={{ margin: 0 }}>
            {portionLabel}
          </p>
        </div>
      </Link>
    </li>
  );
}
