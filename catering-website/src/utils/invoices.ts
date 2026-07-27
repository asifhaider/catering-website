import type { Order } from '../types'

const INVOICES_KEY = 'harvest-table-invoices'

export function saveInvoice(order: Order): void {
  const existing = getStoredInvoices()
  existing.push(order)
  localStorage.setItem(INVOICES_KEY, JSON.stringify(existing))
}

export function getStoredInvoices(): Order[] {
  try {
    const raw = localStorage.getItem(INVOICES_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `HT-${timestamp}-${random}`
}

export function calculateOrderTotals(items: { foodItem: { price: number }; quantity: number }[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.foodItem.price * item.quantity,
    0,
  )
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100
  return { subtotal, tax, total }
}
