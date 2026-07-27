import { MAX_DAYS_AHEAD, MIN_DAYS_AHEAD } from "./types";

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateInputValue(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getOrderWindow(today = new Date()): {
  earliest: Date;
  latest: Date;
  earliestValue: string;
  latestValue: string;
} {
  const base = startOfDay(today);
  const earliest = addDays(base, MIN_DAYS_AHEAD);
  const latest = addDays(base, MAX_DAYS_AHEAD);
  return {
    earliest,
    latest,
    earliestValue: toDateInputValue(earliest),
    latestValue: toDateInputValue(latest),
  };
}

export function isDateInOrderWindow(date: Date, today = new Date()): boolean {
  const { earliest, latest } = getOrderWindow(today);
  const value = startOfDay(date).getTime();
  return value >= earliest.getTime() && value <= latest.getTime();
}

export function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getDefaultPickupDateValue(today = new Date()): string {
  return toDateInputValue(getOrderWindow(today).earliest);
}
