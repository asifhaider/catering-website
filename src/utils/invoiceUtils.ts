import type { Invoice, CartState, CheckoutFormData, InvoiceLineItem } from '../types';
import { round2 } from './formatUtils';

const STORAGE_KEY = 'cateringInvoices';
const TAX_RATE = 0.13;

export function generateInvoice(formData: CheckoutFormData, cartState: CartState): Invoice {
  const portionSize = cartState.portionSize!;

  const lineItems: InvoiceLineItem[] = cartState.items.map((item) => ({
    foodItemId: item.foodItem.id,
    foodItemName: item.foodItem.name,
    category: item.foodItem.category,
    pricePerPerson: item.foodItem.pricePerPerson,
    quantity: item.quantity,
    portionSize,
    lineTotal: round2(item.foodItem.pricePerPerson * portionSize * item.quantity),
  }));

  const subtotal = round2(lineItems.reduce((sum, li) => sum + li.lineTotal, 0));
  const taxAmount = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + taxAmount);

  const id = `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  return {
    invoiceId: id,
    createdAt: new Date().toISOString(),
    cateringDate: cartState.cateringDate!,
    portionSize,
    lineItems,
    subtotal,
    taxRate: TAX_RATE,
    taxAmount,
    total,
    contact: formData.contact,
    pickup: formData.pickup,
    paymentMethod: formData.paymentMethod,
    status: 'confirmed',
  };
}

export function saveInvoice(invoice: Invoice): void {
  try {
    const existing = getAllInvoices();
    existing.push(invoice);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable; silently skip
  }
}

export function getInvoice(id: string): Invoice | null {
  const all = getAllInvoices();
  return all.find((inv) => inv.invoiceId === id) ?? null;
}

export function getAllInvoices(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Invoice[];
  } catch {
    return [];
  }
}
