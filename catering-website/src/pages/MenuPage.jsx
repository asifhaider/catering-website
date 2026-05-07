import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import MenuSection from '../components/MenuSection'
import { getMenuForDate, getValidDateRange, formatDateString, DAY_NAMES } from '../data/menuData'

function toInputValue(date) {
  return date.toISOString().split('T')[0]
}

export default function MenuPage() {
  const { state, dispatch } = useCart()
  const { min, max } = getValidDateRange()

  const [selectedDate, setSelectedDate] = useState(state.selectedDate || toInputValue(min))
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    if (selectedDate) {
      const m = getMenuForDate(selectedDate)
      setMenu(m)
      if (selectedDate !== state.selectedDate) {
        dispatch({ type: 'SET_DATE', date: selectedDate })
      }
    }
  }, [selectedDate]) // eslint-disable-line

  const dayName = selectedDate ? DAY_NAMES[new Date(selectedDate).getDay()] : ''
  const cartCount = state.items.length

  // Build a visible date range for the picker header
  const rangeLabel = `${formatDateString(min)} – ${formatDateString(max)}`

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <p className="text-warm-400 font-medium text-sm mb-2 tracking-wide uppercase">Fresh · Homemade · Catered</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            What's on the table<br className="hidden sm:block" /> today?
          </h1>
          <p className="text-brand-200 text-lg max-w-xl mb-8">
            Each day has its own unique menu crafted from traditional recipes.
            Choose your date and build your perfect spread.
          </p>

          {/* Date picker */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 max-w-md">
            <label htmlFor="catering-date" className="block text-sm font-semibold mb-2 text-brand-100">
              Select your catering date
            </label>
            <p id="catering-date-hint" className="text-xs text-brand-300 mb-3">
              Orders accepted 2–14 days in advance · {rangeLabel}
            </p>
            <input
              id="catering-date"
              type="date"
              value={selectedDate}
              min={toInputValue(min)}
              max={toInputValue(max)}
              onChange={e => setSelectedDate(e.target.value)}
              aria-describedby="catering-date-hint"
              className="w-full bg-white text-gray-900 font-medium px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-warm-400 outline-none text-sm cursor-pointer"
            />
            {selectedDate && (
              <p className="text-warm-300 text-sm mt-2">
                <span aria-hidden="true">📅</span> Showing <strong className="text-white">{dayName}</strong>'s menu — {formatDateString(selectedDate)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {menu ? (
          <>
            {/* Cart bar */}
            {cartCount > 0 && (
              <div role="status" aria-live="polite" aria-label={`${cartCount} dish${cartCount > 1 ? 'es' : ''} in your cart for ${formatDateString(selectedDate)}`} className="mb-8 bg-white border border-brand-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="bg-brand-700 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {cartCount} dish{cartCount > 1 ? 'es' : ''} in your cart
                    </p>
                    <p className="text-xs text-gray-500">for {formatDateString(selectedDate)}</p>
                  </div>
                </div>
                <Link
                  to="/cart"
                  className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  View Cart →
                </Link>
              </div>
            )}

            <MenuSection category="protein"    items={menu.protein} />
            <MenuSection category="vegetarian" items={menu.vegetarian} />
            <MenuSection category="sides"      items={menu.sides} />

            {/* Bottom CTA */}
            {cartCount > 0 && (
              <div className="mt-6 text-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md"
                >
                  Review Cart ({cartCount} items) →
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-20">Select a date above to view the menu.</p>
        )}
      </div>
    </div>
  )
}
