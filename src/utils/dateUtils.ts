import type { DayOfWeek } from '../types';

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getValidCateringDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 2; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(toIsoDate(d));
  }
  return dates;
}

export function isValidCateringDate(isoDate: string): boolean {
  return getValidCateringDates().includes(isoDate);
}

export function getDayOfWeek(isoDate: string): DayOfWeek {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const names: DayOfWeek[] = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
  ];
  return names[date.getDay()];
}

export function getPickupTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h <= 14; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 14) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}
