export const MIN_LEAD_DAYS = 2;
export const MAX_LEAD_DAYS = 14;
export const MIN_PORTIONS = 6;
export const MAX_PORTIONS = 30;

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function getEarliestPickupDate(today: Date = new Date()): Date {
  const date = startOfDay(today);
  date.setDate(date.getDate() + MIN_LEAD_DAYS);
  return date;
}

export function getLatestPickupDate(today: Date = new Date()): Date {
  const date = startOfDay(today);
  date.setDate(date.getDate() + MAX_LEAD_DAYS);
  return date;
}

export function isPickupDateInRange(date: Date, today: Date = new Date()): boolean {
  const target = startOfDay(date).getTime();
  return target >= getEarliestPickupDate(today).getTime() && target <= getLatestPickupDate(today).getTime();
}

/** Formats a Date as a local YYYY-MM-DD string (avoids UTC-shift bugs from toISOString). */
export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parses a YYYY-MM-DD string as a local date (avoids UTC-shift bugs from `new Date(str)`). */
export function fromDateInputValue(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
