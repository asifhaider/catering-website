import { CATEGORY_ORDER, getCategoryLabel, getItemsByCategory, getMenuForDate } from '../data/menus'
import type { FoodItem } from '../types'
import MenuItemCard from './MenuItemCard'

interface MenuListProps {
  selectedDate: string
  onSelectItem: (item: FoodItem) => void
}

export default function MenuList({ selectedDate, onSelectItem }: MenuListProps) {
  const menuItems = getMenuForDate(selectedDate)
  const categorized = getItemsByCategory(menuItems)

  if (menuItems.length === 0) {
    return (
      <p className="mt-6 text-warm-brown/80" role="status">
        No menu available for the selected date. Please choose a valid catering date in the date selector.
      </p>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="sr-only">Menu items for selected date</h2>
      {CATEGORY_ORDER.map((category) => {
        const items = categorized[category]
        if (items.length === 0) return null

        return (
          <section
            key={category}
            aria-labelledby={`category-${category}`}
            className="mb-10"
          >
            <h3
              id={`category-${category}`}
              className="mb-4 font-display text-xl font-semibold text-warm-brown"
            >
              {getCategoryLabel(category)}
              <span className="ml-2 text-sm font-normal text-warm-brown/70">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            </h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.id}>
                  <MenuItemCard item={item} onSelect={onSelectItem} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
