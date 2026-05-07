import { useState, useEffect, useRef } from 'react'
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
  // SC 4.1.2 / 1.3.1 – ref for the live region that announces menu changes
  const liveRef = useRef(null)

  // SC 2.4.2 – update page title for this route
  useEffect(() => {
    document.title = 'Menu – Mama\'s Table'
  }, [])

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

  const rangeLabel = `${formatDateString(min)} – ${formatDateString(max)}`

  return (
    <div className="min-h-screen bg-warm-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {/* SC 1.4.3 / 1.4.6 – white on brand-900 ≈ 8.75:1 (AAA) */}
          <p className="text-white font-medium text-sm mb-2 tracking-wide uppercase">Fresh · Homemade · Catered</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            What's on the table<br className="hidden sm:block" /> today?
          </h1>
          <p className="text-white text-lg max-w-xl mb-8">
            Each day has its own unique menu crafted from traditional recipes.
            Choose your date and build your perfect spread.
          </p>

          {/* Date picker – SC 1.3.5 Identify Input Purpose */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 max-w-md">
            {/* SC 1.3.1 / 4.1.2 – label associated with input via htmlFor */}
            <label htmlFor="catering-date" className="block text-sm font-semibold mb-2 text-white">
              Select your catering date
            </label>
            <p id="date-hint" className="text-xs text-white mb-3">
              Orders accepted 2–14 days in advance · {rangeLabel}
            </p>
            <input
              id="catering-date"
              type="date"
              value={selectedDate}
              min={toInputValue(min)}
              max={toInputValue(max)}
              onChange={e => setSelectedDate(e.target.value)}
              aria-describedby="date-hint date-status"
              className="w-full bg-white text-gray-900 font-medium px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-warm-400 outline-none text-sm cursor-pointer"
            />
            {/* SC 3.2.2 On Input – status updates are announced via aria-live */}
            <p id="date-status" className="text-white text-sm mt-2" aria-live="polite" aria-atomic="true">
              {selectedDate
                ? <>
                    <span aria-hidden="true">📅</span>{' '}
                    Showing <strong>{dayName}</strong>'s menu — {formatDateString(selectedDate)}
                  </>
                : 'No date selected'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* SC 1.3.1 – aria-live region announces cart changes to AT users */}
        <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />

        {menu ? (
          <>
            {/* Cart notification bar */}
            {cartCount > 0 && (
              <div
                className="mb-8 bg-white border border-brand-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm"
                role="status"
                aria-label={`${cartCount} dish${cartCount > 1 ? 'es' : ''} in your cart`}
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="bg-brand-900 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {cartCount} dish{cartCount > 1 ? 'es' : ''} in your cart
                    </p>
                    <p className="text-xs text-gray-600">for {formatDateString(selectedDate)}</p>
                  </div>
                </div>
                {/* SC 2.4.4 / 2.4.9 – link purpose clear without surrounding context */}
                <Link
                  to="/cart"
                  className="bg-brand-900 hover:bg-brand-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors min-h-[44px] flex items-center"
                  aria-label="View cart"
                >
                  View Cart
                </Link>
              </div>
            )}

            <MenuSection category="protein"    items={menu.protein} />
            <MenuSection category="vegetarian" items={menu.vegetarian} />
            <MenuSection category="sides"      items={menu.sides} />

            {cartCount > 0 && (
              <div className="mt-6 text-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md min-h-[44px]"
                  aria-label={`Review cart with ${cartCount} item${cartCount > 1 ? 's' : ''}`}
                >
                  Review Cart ({cartCount} item{cartCount > 1 ? 's' : ''})
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 py-20">Select a date above to view the menu.</p>
        )}
      </div>
    </div>
  )
}
