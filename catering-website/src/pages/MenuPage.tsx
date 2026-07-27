import { useState } from 'react'
import AddToCartButton from '../components/AddToCartButton'
import DateSelector from '../components/DateSelector'
import FoodItemDetail from '../components/FoodItemDetail'
import MenuList from '../components/MenuList'
import { businessInfo } from '../data/business'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { FoodItem } from '../types'
import { getMinOrderDate, toISODateString } from '../utils/dates'

export default function MenuPage() {
  useDocumentTitle(`Menu — ${businessInfo.name}`)
  const [selectedDate, setSelectedDate] = useState(() =>
    toISODateString(getMinOrderDate()),
  )
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null)
  const { addItem, setCateringDate } = useCart()

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setCateringDate(date)
  }

  const handleAddToCart = (item: FoodItem, quantity: number) => {
    addItem(item, quantity)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-warm-brown">Our Menu</h1>
      <p className="mt-2 text-warm-brown/80">
        Browse our daily rotating menu and build your perfect catering order.
      </p>

      <div className="mt-6">
        <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>

      <MenuList
        selectedDate={selectedDate}
        onSelectItem={setSelectedItem}
      />

      <FoodItemDetail
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <AddToCartButton item={selectedItem} onAddToCart={handleAddToCart} />
        )}
      </FoodItemDetail>
    </div>
  )
}
