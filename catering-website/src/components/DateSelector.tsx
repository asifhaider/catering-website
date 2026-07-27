import { useId, useState } from 'react'
import { formatFriendlyDate, fromDateInputValue, getOrderableDateRange, toDateInputValue } from '../utils/date'

interface DateSelectorProps {
  value: Date | null
  onChange: (date: Date | null) => void
}

export default function DateSelector({ value, onChange }: DateSelectorProps) {
  const inputId = useId()
  const hintId = useId()
  const errorId = useId()
  const [error, setError] = useState<string | null>(null)

  const { min, max } = getOrderableDateRange()
  const minValue = toDateInputValue(min)
  const maxValue = toDateInputValue(max)
  const hintText = `Choose a pickup date between ${formatFriendlyDate(min)} and ${formatFriendlyDate(max)}. Orders need at least 2 days' notice and can be placed up to 2 weeks in advance.`

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value
    if (!raw) {
      setError(null)
      onChange(null)
      return
    }

    const parsed = fromDateInputValue(raw)
    if (parsed < min || parsed > max) {
      setError(`Pickup date must be between ${formatFriendlyDate(min)} and ${formatFriendlyDate(max)}.`)
      onChange(null)
      return
    }

    setError(null)
    onChange(parsed)
  }

  const describedBy = [hintId, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className="max-w-sm">
      <label htmlFor={inputId} className="block text-sm font-medium text-stone-800">
        Pickup date
      </label>
      <p id={hintId} className="mt-1 text-sm text-stone-600">
        {hintText}
      </p>
      <input
        id={inputId}
        type="date"
        className="mt-2 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-amber-600 focus:outline-none"
        min={minValue}
        max={maxValue}
        value={value ? toDateInputValue(value) : ''}
        onChange={handleChange}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
