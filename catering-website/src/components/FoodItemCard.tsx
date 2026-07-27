import type { FoodItem } from "../types";
import { formatCurrency } from "../utils/format";
import QuantityStepper from "./QuantityStepper";
import AddToCartButton from "./AddToCartButton";

interface FoodItemCardProps {
  item: FoodItem;
  quantity: number;
  pickupDate: string | null;
  onQuantityChange: (quantity: number) => void;
  onViewDetails: (item: FoodItem) => void;
}

export default function FoodItemCard({ item, quantity, pickupDate, onQuantityChange, onViewDetails }: FoodItemCardProps) {
  return (
    <li className="bg-white border border-brand-200 rounded-lg overflow-hidden flex flex-col">
      <button
        type="button"
        onClick={() => onViewDetails(item)}
        className="text-left"
        aria-label={`View details for ${item.name}`}
      >
        <img src={item.imageUrl} alt={item.imageAlt} loading="lazy" className="w-full h-40 object-cover" />
      </button>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-brand-900 m-0">
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="text-left hover:text-brand-600 hover:underline"
          >
            {item.name}
          </button>
        </h3>
        <p className="text-sm text-brand-700 line-clamp-2">{item.shortDescription}</p>
        <p className="text-brand-900 font-medium">{formatCurrency(item.pricePerPerson)} / person</p>
        <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
          <QuantityStepper id={`qty-${item.id}`} label={item.name} value={quantity} onChange={onQuantityChange} />
          <AddToCartButton itemId={item.id} itemName={item.name} quantity={quantity} pickupDate={pickupDate} />
        </div>
      </div>
    </li>
  );
}
