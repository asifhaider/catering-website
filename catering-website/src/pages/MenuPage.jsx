import { useState, useEffect, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import FoodCard from '../components/FoodCard'
import {
  getMenuForDate,
  getMinOrderDate,
  getMaxOrderDate,
  formatDateISO,
  dayThemes,
  dayNames,
  CATEGORIES,
} from '../data/menu'

const CATEGORY_FILTERS = [
  { value: 'all', label: 'All Items' },
  { value: 'protein', label: 'Protein' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'sides', label: 'Sides' },
]

// Human-readable date formatting
function formatDisplayDate(date) {
  return date.toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function MenuPage() {
  const { selectedDate, setSelectedDate, cartItems } = useCart()
  const navigate = useNavigate()

  const minDate = getMinOrderDate()
  const maxDate = getMaxOrderDate()

  // Default: earliest valid date
  const [pickedDate, setPickedDate] = useState(() => {
    if (selectedDate) return selectedDate
    return minDate
  })

  const [filterCategory, setFilterCategory] = useState('all')
  const [dateWarning, setDateWarning] = useState('')
  const filterId = useId()

  useEffect(() => {
    document.title = 'Menu — Zara\'s Kitchen'
  }, [])

  const handleDateChange = (e) => {
    const rawValue = e.target.value // "YYYY-MM-DD"
    if (!rawValue) return
    const [y, m, d] = rawValue.split('-').map(Number)
    const newDate = new Date(y, m - 1, d)

    if (cartItems.length > 0) {
      const oldDay = pickedDate.getDay()
      const newDay = newDate.getDay()
      if (oldDay !== newDay) {
        setDateWarning(
          'Changing to a different day will clear your cart because each day has a different menu.'
        )
      } else {
        setDateWarning('')
      }
    } else {
      setDateWarning('')
    }

    setPickedDate(newDate)
    setSelectedDate(newDate)
  }

  // Sync with cart context date
  useEffect(() => {
    if (selectedDate) setPickedDate(selectedDate)
  }, [selectedDate])

  const menuItems = getMenuForDate(pickedDate)
  const dayOfWeek = pickedDate.getDay()
  const theme = dayThemes[dayOfWeek]
  const dayName = dayNames[dayOfWeek]

  const filteredItems =
    filterCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === filterCategory)

  // Group by category for "All" view
  const groupedItems = {
    protein: filteredItems.filter((i) => i.category === 'protein'),
    vegetarian: filteredItems.filter((i) => i.category === 'vegetarian'),
    sides: filteredItems.filter((i) => i.category === 'sides'),
  }

  const showGrouped = filterCategory === 'all'

  return (
    <>
      {/* SC 2.4.2 Page Titled */}
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Our Menu</h1>
          <p className="page-hero__subtitle">
            Choose your pickup date to see that day's fresh menu. Each day features a unique
            selection of homemade dishes.
          </p>
        </div>
      </div>

      <main id="main-content" className="page-main" tabIndex={-1}>
        <div className="container">

          {/* Date selection */}
          <section aria-labelledby="date-section-heading">
            <h2 id="date-section-heading" className="sr-only">Select pickup date</h2>

            <div className="menu-header">
              <div className="date-picker-section">
                <label
                  htmlFor="pickup-date"
                  className="date-picker-section__label"
                >
                  Pickup Date
                  {/* SC 3.3.2: Instruction on valid range */}
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  className="form-input"
                  value={formatDateISO(pickedDate)}
                  min={formatDateISO(minDate)}
                  max={formatDateISO(maxDate)}
                  onChange={handleDateChange}
                  aria-describedby="date-hint date-warning"
                  style={{ width: 'auto' }}
                />
                <span id="date-hint" className="form-hint" style={{ display: 'block', marginTop: '4px' }}>
                  Available: {formatDisplayDate(minDate)} to{' '}
                  {formatDisplayDate(maxDate)}.
                  Orders require at least 2 days notice.
                </span>
              </div>
            </div>

            {dateWarning && (
              <div
                id="date-warning"
                className="alert alert--warning"
                role="alert"
                aria-live="polite"
                style={{ marginBottom: 'var(--space-6)' }}
              >
                <span className="alert__icon" aria-hidden="true">⚠️</span>
                <span>{dateWarning}</span>
              </div>
            )}

            {!dateWarning && <span id="date-warning" className="sr-only" aria-live="polite" />}

            {/* Day info */}
            <div className="date-info-box" aria-live="polite" aria-atomic="true">
              <div className="date-info-box__day-theme">
                {dayName} — {theme}
              </div>
              <div className="date-info-box__day-name">
                {formatDisplayDate(pickedDate)}
              </div>
            </div>
          </section>

          {/* Category filter (SC 2.4.10 Section Headings, SC 1.3.1) */}
          <section aria-labelledby="menu-filter-heading">
            <h2 id="menu-filter-heading" className="sr-only">Filter menu by category</h2>

            <div className="category-filter" role="group" aria-labelledby="menu-filter-heading">
              <ul className="category-filter__list" role="list">
                {CATEGORY_FILTERS.map(({ value, label }) => (
                  <li key={value} role="listitem">
                    <input
                      type="radio"
                      id={`${filterId}-${value}`}
                      name={`${filterId}-category-filter`}
                      value={value}
                      checked={filterCategory === value}
                      onChange={() => setFilterCategory(value)}
                      className="category-filter__radio"
                      // SC 3.2.2: On Input — radio change only filters, no page navigation
                    />
                    <label
                      htmlFor={`${filterId}-${value}`}
                      className="category-filter__tab"
                    >
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Menu items */}
          <section aria-labelledby="menu-items-heading" aria-live="polite" aria-atomic="false">
            <h2 id="menu-items-heading" className="sr-only">
              {filterCategory === 'all'
                ? `All menu items for ${dayName}`
                : `${CATEGORIES[filterCategory]} items for ${dayName}`}
            </h2>

            {menuItems.length === 0 ? (
              <div className="alert alert--info" role="status">
                <span className="alert__icon" aria-hidden="true">ℹ️</span>
                <span>No menu available for the selected date. Please choose another date.</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="alert alert--info" role="status">
                <span className="alert__icon" aria-hidden="true">ℹ️</span>
                <span>No items match the selected filter.</span>
              </div>
            ) : showGrouped ? (
              /* Grouped sections by category */
              Object.entries(groupedItems).map(([cat, items]) =>
                items.length > 0 ? (
                  <section key={cat} className="food-section" aria-labelledby={`section-${cat}`}>
                    {/* SC 2.4.10 Section Headings */}
                    <h3 id={`section-${cat}`} className="food-section-heading">
                      {CATEGORIES[cat]}
                    </h3>
                    <ul
                      className="food-grid"
                      role="list"
                      aria-label={`${CATEGORIES[cat]} dishes`}
                    >
                      {items.map((item) => (
                        <li key={item.id} role="listitem">
                          <FoodCard item={item} />
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null
              )
            ) : (
              /* Filtered single category */
              <ul
                className="food-grid"
                role="list"
                aria-label={`${CATEGORIES[filterCategory]} dishes`}
              >
                {filteredItems.map((item) => (
                  <li key={item.id} role="listitem">
                    <FoodCard item={item} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Cart CTA if items in cart */}
          {cartItems.length > 0 && (
            <aside
              className="alert alert--success"
              role="complementary"
              aria-label="Cart summary"
              style={{ marginTop: 'var(--space-10)' }}
            >
              <span className="alert__icon" aria-hidden="true">🛒</span>
              <div>
                <strong>
                  {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart.
                </strong>{' '}
                <button
                  className="btn btn--sm btn--primary"
                  onClick={() => navigate('/cart')}
                  type="button"
                  style={{ marginLeft: 'var(--space-4)' }}
                >
                  View Cart
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>
    </>
  )
}
