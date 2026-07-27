import {
  formatDate,
  getDayName,
  getMaxOrderDate,
  getMinOrderDate,
  getOrderDateError,
  parseISODate,
  toISODateString,
} from '../utils/dates'

interface DateSelectorProps {
  selectedDate: string
  onDateChange: (isoDate: string) => void
}

export default function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const minDate = toISODateString(getMinOrderDate())
  const maxDate = toISODateString(getMaxOrderDate())
  const error = getOrderDateError(selectedDate)
  const parsedDate = selectedDate ? parseISODate(selectedDate) : null

  return (
    <section aria-labelledby="date-selector-heading" className="rounded-xl bg-white p-6 shadow-sm">
      <h2 id="date-selector-heading" className="font-display text-2xl font-semibold text-warm-brown">
        Select Your Catering Date
      </h2>
      <p className="mt-2 text-sm text-warm-brown/80">
        Choose the date you&apos;d like to pick up your order. Each day features a unique menu.
        Orders must be placed at least 2 days and at most 2 weeks in advance.
      </p>

      <div className="mt-4">
        <label htmlFor="catering-date" className="block text-sm font-medium text-warm-brown">
          Catering date
        </label>
        <input
          id="catering-date"
          type="date"
          value={selectedDate}
          min={minDate}
          max={maxDate}
          onChange={(e) => onDateChange(e.target.value)}
          aria-describedby={
            error
              ? 'date-error date-hint'
              : parsedDate
                ? 'date-hint menu-preview'
                : 'date-hint'
          }
          aria-invalid={error ? true : undefined}
          className="mt-1 block w-full max-w-xs rounded-lg border border-warm-brown/20 px-3 py-2.5 text-warm-brown focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        />
      </div>

      <p id="date-hint" className="mt-2 text-xs text-warm-brown/75">
        Available dates: {formatDate(getMinOrderDate())} through {formatDate(getMaxOrderDate())}
      </p>

      {error && (
        <p id="date-error" role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {parsedDate && !error && (
        <div
          id="menu-preview"
          className="mt-4 rounded-lg bg-sage/15 px-4 py-3"
          aria-live="polite"
          aria-label="Menu for selected date"
        >
          <p className="text-sm font-medium text-sage-700" style={{ color: '#4a5d42' }}>
            {formatDate(parsedDate)} menu
          </p>
          <p className="mt-1 text-sm text-warm-brown/80">
            You&apos;ll see our special <strong>{getDayName(parsedDate)}</strong> menu with
            10 handcrafted items — 5 protein, 3 vegetarian, and 2 sides.
          </p>
        </div>
      )}
    </section>
  )
}
