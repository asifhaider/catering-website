export const MIN_DAYS_AHEAD = 2
export const MAX_DAYS_AHEAD = 14
export const MIN_PORTION_SIZE = 6
export const MAX_PORTION_SIZE = 30

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

export function getDayName(date: Date): string {
  return DAY_NAMES[date.getDay()]
}

export function getDayOfWeek(date: Date): number {
  return date.getDay()
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function toISODateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getMinOrderDate(from: Date = new Date()): Date {
  const min = new Date(from)
  min.setHours(0, 0, 0, 0)
  min.setDate(min.getDate() + MIN_DAYS_AHEAD)
  return min
}

export function getMaxOrderDate(from: Date = new Date()): Date {
  const max = new Date(from)
  max.setHours(0, 0, 0, 0)
  max.setDate(max.getDate() + MAX_DAYS_AHEAD)
  return max
}

export function isValidOrderDate(iso: string, from: Date = new Date()): boolean {
  const date = parseISODate(iso)
  const min = getMinOrderDate(from)
  const max = getMaxOrderDate(from)
  return date >= min && date <= max
}

export function getOrderDateError(iso: string, from: Date = new Date()): string | null {
  if (!iso) return 'Please select a catering date.'
  if (!isValidOrderDate(iso, from)) {
    return `Orders must be placed at least ${MIN_DAYS_AHEAD} days and at most ${MAX_DAYS_AHEAD} days before pickup.`
  }
  return null
}
