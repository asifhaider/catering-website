import { Link } from 'react-router-dom'
import type { FoodItem } from '../types/menu'
import AddToCartControl from './AddToCartControl'

interface MenuItemCardProps {
  item: FoodItem
  onAdded: (item: FoodItem, quantity: number) => void
}

export default function MenuItemCard({ item, onAdded }: MenuItemCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      <img src={item.imageUrl} alt="" className="h-40 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h4 className="text-base font-semibold text-stone-900">
          <Link
            to={`/item/${item.id}`}
            className="hover:underline focus:outline-none focus-visible:underline"
          >
            {item.name}
          </Link>
        </h4>
        <p className="text-sm text-stone-600">${item.pricePerPortion.toFixed(2)} / portion</p>
        <Link
          to={`/item/${item.id}`}
          className="text-sm text-amber-800 hover:underline focus-visible:underline"
        >
          View details for {item.name}
        </Link>

        <div className="mt-auto pt-2">
          <AddToCartControl item={item} onAdded={onAdded} />
        </div>
      </div>
    </article>
  )
}
