import { useId, useState } from 'react'
import type { DayMenu, FoodCategory, FoodItem } from '../types/menu'
import MenuItemCard from './MenuItemCard'

const CATEGORY_LABELS: Record<FoodCategory, string> = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  sides: 'Sides',
}

const CATEGORY_ORDER: FoodCategory[] = ['protein', 'vegetarian', 'sides']

interface MenuListProps {
  menu: DayMenu
}

export default function MenuList({ menu }: MenuListProps) {
  const [statusMessage, setStatusMessage] = useState('')

  function handleAdded(item: FoodItem, quantity: number) {
    setStatusMessage(`${item.name}, ${quantity} portions, added to cart.`)
  }

  return (
    <div>
      <p aria-live="polite" role="status" className="sr-only">
        {statusMessage}
      </p>
      {CATEGORY_ORDER.map((category) => {
        const items = menu.items.filter((item) => item.category === category)
        return (
          <MenuCategorySection key={category} category={category} items={items} onAdded={handleAdded} />
        )
      })}
    </div>
  )
}

function MenuCategorySection({
  category,
  items,
  onAdded,
}: {
  category: FoodCategory
  items: FoodItem[]
  onAdded: (item: FoodItem, quantity: number) => void
}) {
  const headingId = useId()
  return (
    <section aria-labelledby={headingId} className="mt-8">
      <h3 id={headingId} className="text-lg font-semibold text-stone-900">
        {CATEGORY_LABELS[category]} ({items.length} {items.length === 1 ? 'dish' : 'dishes'})
      </h3>
      <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <MenuItemCard item={item} onAdded={onAdded} />
          </li>
        ))}
      </ul>
    </section>
  )
}
