import type { FoodItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatUtils';
import Button from '../ui/Button';
import QuantityInput from '../ui/QuantityInput';

const categoryLabel: Record<FoodItem['category'], string> = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  side: 'Side',
};

const categoryColor: Record<FoodItem['category'], string> = {
  protein: 'bg-amber-100 text-amber-800',
  vegetarian: 'bg-sage-100 text-sage-700',
  side: 'bg-stone-100 text-stone-700',
};

interface FoodCardProps {
  item: FoodItem;
  onOpenDetail: (item: FoodItem) => void;
}

export default function FoodCard({ item, onOpenDetail }: FoodCardProps) {
  const { isItemInCart, getItemQuantity, addItem, updateQuantity, state } = useCart();
  const inCart = isItemInCart(item.id);
  const qty = getItemQuantity(item.id);
  const hasPortionSize = state.portionSize !== null;

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
      aria-label={`${item.name}, ${categoryLabel[item.category]}, ${formatCurrency(item.pricePerPerson)} per person`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[item.category]}`}
        >
          {categoryLabel[item.category]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-semibold text-stone-900 text-base leading-tight">{item.name}</h3>
          <p className="text-amber-700 font-medium mt-1 text-sm">
            {formatCurrency(item.pricePerPerson)}{' '}
            <span className="text-stone-500 font-normal">/ person</span>
          </p>
        </div>

        {item.allergens.length > 0 && (
          <p className="text-xs text-stone-500">
            <span className="font-medium">Allergens:</span>{' '}
            {item.allergens.join(', ')}
          </p>
        )}

        <div className="flex gap-2 mt-auto flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenDetail(item)}
            aria-label={`View details for ${item.name}`}
            className="flex-1"
          >
            Details
          </Button>

          {inCart ? (
            <QuantityInput
              value={qty}
              min={0}
              max={20}
              onChange={(v) => updateQuantity(item.id, v)}
              itemName={item.name}
              size="sm"
            />
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => addItem(item)}
              disabled={!hasPortionSize}
              aria-label={
                hasPortionSize
                  ? `Add ${item.name} to cart`
                  : `Select portion size before adding ${item.name} to cart`
              }
              className="flex-1"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
