import { useState, useEffect, useRef } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { useCart } from '../context/CartContext'
import {
  getMenuForDate,
  getEarliestOrderDate,
  getLatestOrderDate,
  isDateValid,
  formatDateForInput,
} from '../data/menuData'
import MenuGrid from '../components/MenuGrid'
import ItemDetailModal from '../components/ItemDetailModal'

export default function MenuPage() {
  usePageTitle('Menu')

  const { cateringDate, setCateringDate } = useCart()
  const earliest = getEarliestOrderDate()
  const latest = getLatestOrderDate()

  const [selectedDateStr, setSelectedDateStr] = useState(
    cateringDate ? formatDateForInput(cateringDate) : formatDateForInput(earliest)
  )
  const [selectedItem, setSelectedItem] = useState(null)
  const [liveMessage, setLiveMessage] = useState('')
  const dateInputRef = useRef(null)

  const selectedDate = new Date(selectedDateStr + 'T00:00:00')
  const menu = isDateValid(selectedDate) ? getMenuForDate(selectedDate) : null

  useEffect(() => {
    if (isDateValid(selectedDate)) {
      setCateringDate(selectedDate)
    }
  }, [selectedDateStr]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleDateChange(e) {
    const val = e.target.value
    setSelectedDateStr(val)
    const d = new Date(val + 'T00:00:00')
    if (isDateValid(d)) {
      const menu = getMenuForDate(d)
      setLiveMessage(`Menu loaded for ${d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}: ${menu.theme}`)
    } else {
      setLiveMessage('Selected date is outside the allowed ordering window.')
    }
  }

  const dateValid = isDateValid(selectedDate)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Live region for date change announcements (WCAG 4.1.2) */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-1">Browse Our Menu</h1>
        <p className="text-stone-600">Select your catering date to see that day&apos;s menu.</p>
      </div>

      {/* Date picker section */}
      <section aria-labelledby="date-picker-heading" className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <h2 id="date-picker-heading" className="text-lg font-semibold text-stone-800 mb-1">
          Select Your Pickup Date
        </h2>
        <p id="date-instructions" className="text-sm text-stone-600 mb-3">
          Orders must be placed at least <strong>2 days</strong> and at most{' '}
          <strong>2 weeks</strong> before your pickup. Available dates:{' '}
          <strong>
            {earliest.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}
          </strong>{' '}
          to{' '}
          <strong>
            {latest.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
          </strong>
          .
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <div className="flex-1 max-w-xs">
            <label htmlFor="catering-date" className="block text-sm font-medium text-stone-700 mb-1">
              Catering date <span aria-hidden="true" className="text-red-600">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              ref={dateInputRef}
              id="catering-date"
              type="date"
              required
              aria-required="true"
              aria-describedby="date-instructions date-error"
              value={selectedDateStr}
              min={formatDateForInput(earliest)}
              max={formatDateForInput(latest)}
              onChange={handleDateChange}
              autoComplete="off"
              className={`w-full border-2 rounded-lg px-3 py-2 text-stone-800 bg-white focus:outline-none focus:border-brand-500 transition-colors ${
                !dateValid && selectedDateStr
                  ? 'border-red-500'
                  : 'border-stone-300'
              }`}
            />
            {!dateValid && selectedDateStr && (
              <p id="date-error" role="alert" className="mt-1 text-sm text-red-700 flex items-center gap-1">
                <span aria-hidden="true">⚠</span>
                Please select a date between {earliest.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} and {latest.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Menu grid */}
      {dateValid && menu ? (
        <MenuGrid
          menu={menu}
          selectedDate={selectedDate}
          onItemSelect={setSelectedItem}
        />
      ) : (
        <div className="text-center py-16 text-stone-500">
          <p className="text-lg">Please select a valid date above to view the menu.</p>
        </div>
      )}

      {/* Item detail modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
