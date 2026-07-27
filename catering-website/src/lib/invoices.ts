import type { CartItem, CheckoutInfo, Invoice, InvoiceLineItem } from "./types";
import { TAX_RATE } from "./types";

const INVOICE_STORAGE_KEY = "hearth-plate-invoices-v1";

export function createInvoiceId(): string {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HP-${stamp}-${random}`;
}

export function buildInvoice(
  items: CartItem[],
  checkout: CheckoutInfo
): Invoice {
  const lineItems: InvoiceLineItem[] = items.map((item) => ({
    foodItemId: item.foodItemId,
    name: item.name,
    category: item.category,
    pricePerPortion: item.pricePerPortion,
    portions: item.portions,
    lineTotal: item.pricePerPortion * item.portions,
  }));

  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  return {
    id: createInvoiceId(),
    createdAt: new Date().toISOString(),
    pickupDate: checkout.pickupDate,
    pickupTime: checkout.pickupTime,
    customer: {
      fullName: checkout.fullName,
      email: checkout.email,
      phone: checkout.phone,
    },
    paymentMethod: checkout.paymentMethod,
    specialInstructions: checkout.specialInstructions,
    items: lineItems,
    subtotal,
    tax,
    total,
  };
}

export function saveInvoice(invoice: Invoice): void {
  if (typeof window === "undefined") return;
  const existing = loadInvoices();
  const next = [invoice, ...existing.filter((item) => item.id !== invoice.id)];
  localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(next));
  sessionStorage.setItem(`invoice:${invoice.id}`, JSON.stringify(invoice));
}

export function loadInvoices(): Invoice[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INVOICE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Invoice[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getInvoiceById(id: string): Invoice | null {
  if (typeof window === "undefined") return null;
  try {
    const sessionRaw = sessionStorage.getItem(`invoice:${id}`);
    if (sessionRaw) return JSON.parse(sessionRaw) as Invoice;
  } catch {
    // Fall through to local storage.
  }
  return loadInvoices().find((invoice) => invoice.id === id) ?? null;
}

export const paymentMethodLabels = {
  card: "Card",
  cash: "Cash on pickup",
  venmo: "Venmo",
} as const;
