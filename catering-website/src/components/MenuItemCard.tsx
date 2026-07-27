import type { FoodItem } from '../types'

interface MenuItemCardProps {
  item: FoodItem
  onSelect: (item: FoodItem) => void
}

export default function MenuItemCard({ item, onSelect }: MenuItemCardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="flex w-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        aria-label={`View details for ${item.name}, $${item.price.toFixed(2)} per serving`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-1 flex-col p-4">
          <p className="font-display text-lg font-semibold text-warm-brown">{item.name}</p>
          <p className="mt-1 text-sm text-warm-brown">
            ${item.price.toFixed(2)} <span className="text-warm-brown/80">/ serving</span>
          </p>
          <p className="mt-2 text-xs text-warm-brown/80">
            Serves 1 per order unit · View details
          </p>
        </div>
      </button>
    </article>
  )
}
