import { MAX_LEAD_DAYS, MIN_LEAD_DAYS } from '../types/menu'

function startOfDay(date: Date): Date {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

/** Earliest and latest catering dates a customer may currently select, inclusive. */
export function getOrderableDateRange(today: Date = new Date()): { min: Date; max: Date } {
  const base = startOfDay(today)
  return { min: addDays(base, MIN_LEAD_DAYS), max: addDays(base, MAX_LEAD_DAYS) }
}

export function isDateOrderable(date: Date, today: Date = new Date()): boolean {
  const { min, max } = getOrderableDateRange(today)
  const target = startOfDay(date)
  return target >= min && target <= max
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromDateInputValue(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatFriendlyDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
