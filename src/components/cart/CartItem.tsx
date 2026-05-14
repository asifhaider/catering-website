import type { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatUtils';
import QuantityInput from '../ui/QuantityInput';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, state } = useCart();
  const { foodItem, quantity } = item;
  const portionSize = state.portionSize ?? 0;
  const lineTotal = foodItem.pricePerPerson * portionSize * quantity;

  return (
    <li className="flex gap-3 py-4 border-b border-stone-100 last:border-0">
      {/* Image */}
      <img
        src={foodItem.imageSrc}
        alt={foodItem.imageAlt}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />

      {/* Details */}
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-stone-900 text-sm leading-tight truncate">
            {foodItem.name}
          </p>
          <button
            type="button"
            onClick={() => removeItem(foodItem.id)}
            aria-label={`Remove ${foodItem.name} from cart`}
            className="flex-shrink-0 text-stone-400 hover:text-red-500 transition-colors p-1 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-xs text-stone-500">
          {formatCurrency(foodItem.pricePerPerson)} × {portionSize} people × {quantity}
        </p>

        <div className="flex items-center justify-between mt-1">
          <QuantityInput
            value={quantity}
            min={0}
            max={20}
            onChange={(v) => updateQuantity(foodItem.id, v)}
            itemName={foodItem.name}
            size="sm"
          />
          <p className="font-semibold text-stone-900 text-sm">
            {formatCurrency(lineTotal)}
          </p>
        </div>
      </div>
    </li>
  );
}
