import type { FoodItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatUtils';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface FoodDetailModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryLabel: Record<FoodItem['category'], string> = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  side: 'Side',
};

export default function FoodDetailModal({ item, isOpen, onClose }: FoodDetailModalProps) {
  const { addItem, isItemInCart, state } = useCart();

  if (!item) return null;

  const inCart = isItemInCart(item.id);
  const hasPortionSize = state.portionSize !== null;

  const handleAdd = () => {
    addItem(item);
    onClose();
  };

  const { nutritionFacts: n } = item;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name} size="lg">
      <div className="flex flex-col gap-6 p-6">
        {/* Image */}
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          className="w-full rounded-xl object-cover aspect-[16/7]"
        />

        {/* Price & category */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-2xl font-bold text-amber-700">
              {formatCurrency(item.pricePerPerson)}
            </span>
            <span className="text-stone-500 text-sm ml-1">per person</span>
          </div>
          <span className="text-sm font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            {categoryLabel[item.category]}
          </span>
        </div>

        {/* Description */}
        <section aria-label="Description">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-2">
            About this dish
          </h3>
          <p className="text-stone-700 leading-relaxed">{item.description}</p>
        </section>

        {/* Allergens */}
        {item.allergens.length > 0 && (
          <section aria-label="Allergens">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Allergens
            </h3>
            <ul className="flex flex-wrap gap-2">
              {item.allergens.map((a) => (
                <li
                  key={a}
                  className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full capitalize"
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Ingredients */}
        <section aria-label="Ingredients">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Ingredients
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed capitalize">
            {item.ingredients.join(', ')}.
          </p>
        </section>

        {/* Nutrition Facts */}
        <section aria-label="Nutrition facts per person">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-3">
            Nutrition Facts <span className="normal-case font-normal">(per person)</span>
          </h3>
          <table className="w-full text-sm border-collapse" aria-label={`Nutrition facts for ${item.name}, per person`}>
            <caption className="sr-only">
              Nutrition facts per person for {item.name}
            </caption>
            <tbody>
              {[
                { label: 'Calories', value: n.calories, unit: 'kcal' },
                { label: 'Protein', value: n.protein, unit: 'g' },
                { label: 'Carbohydrates', value: n.carbohydrates, unit: 'g' },
                { label: 'Fat', value: n.fat, unit: 'g' },
                { label: 'Fibre', value: n.fiber, unit: 'g' },
                { label: 'Sodium', value: n.sodium, unit: 'mg' },
              ].map(({ label, value, unit }, i) => (
                <tr
                  key={label}
                  className={i % 2 === 0 ? 'bg-amber-50' : 'bg-white'}
                >
                  <th scope="row" className="px-3 py-2 text-left font-medium text-stone-700">
                    {label}
                  </th>
                  <td className="px-3 py-2 text-right text-stone-900 font-semibold">
                    {value}
                    <span className="text-stone-500 font-normal ml-0.5 text-xs">{unit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add to cart */}
        <div className="border-t border-stone-100 pt-4">
          {inCart ? (
            <p className="text-center text-sm text-sage-600 font-medium">
              ✓ This item is already in your cart
            </p>
          ) : (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAdd}
              disabled={!hasPortionSize}
              aria-label={
                hasPortionSize
                  ? `Add ${item.name} to cart`
                  : 'Please select a portion size before adding items'
              }
            >
              {hasPortionSize ? `Add to Cart — ${formatCurrency(item.pricePerPerson)} / person` : 'Select Portion Size First'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
