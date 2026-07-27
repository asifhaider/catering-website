import type { CartItem } from '../types/order'
import type { CheckoutDetails, Invoice } from '../types/order'

const TAX_RATE = 0.08
const STORAGE_KEY = 'homestyle-catering-orders'

export function computeTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100
}

export function createInvoice(items: CartItem[], checkout: CheckoutDetails): Invoice {
  const subtotal = items.reduce((sum, entry) => sum + entry.foodItem.pricePerPortion * entry.quantity, 0)
  const tax = computeTax(subtotal)
  const invoice: Invoice = {
    orderId: crypto.randomUUID(),
    placedAt: new Date().toISOString(),
    items,
    subtotal,
    tax,
    total: subtotal + tax,
    checkout,
  }
  return invoice
}

function readAllInvoices(): Invoice[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Invoice[]
  } catch {
    return []
  }
}

export function saveInvoice(invoice: Invoice): void {
  const all = readAllInvoices()
  all.push(invoice)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function getInvoiceById(orderId: string): Invoice | undefined {
  return readAllInvoices().find((invoice) => invoice.orderId === orderId)
}
