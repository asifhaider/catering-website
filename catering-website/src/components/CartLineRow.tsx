import type { FoodItem } from "../types";
import { formatCurrency } from "../utils/format";
import QuantityStepper from "./QuantityStepper";

interface CartLineRowProps {
  item: FoodItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartLineRow({ item, quantity, onQuantityChange, onRemove }: CartLineRowProps) {
  const lineTotal = item.pricePerPerson * quantity;

  return (
    <li className="flex flex-wrap items-center gap-4 py-4 border-b border-brand-200 last:border-b-0">
      <img src={item.imageUrl} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
      <div className="min-w-40 flex-1">
        <p className="font-semibold text-brand-900">{item.name}</p>
        <p className="text-sm text-brand-700">{formatCurrency(item.pricePerPerson)} / person</p>
      </div>
      <QuantityStepper id={`cart-qty-${item.id}`} label={item.name} value={quantity} min={1} onChange={onQuantityChange} />
      <p className="w-24 text-right font-semibold text-brand-900">
        <span className="sr-only">Line total: </span>
        {formatCurrency(lineTotal)}
      </p>
      <button
        type="button"
        onClick={onRemove}
        className="text-sm text-red-700 hover:text-red-900 hover:underline px-2 py-2.5 min-h-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
