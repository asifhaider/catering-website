import type { CartLine, CheckoutDetails, Invoice, InvoiceLineItem } from "../types";
import { getItemById } from "./menuData";

const STORAGE_KEY = "homestead-catering-invoices";
const TAX_RATE = 0.0825;

function loadInvoices(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistInvoices(invoices: Invoice[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

export function buildInvoice(lines: CartLine[], checkout: CheckoutDetails): Invoice {
  const lineItems: InvoiceLineItem[] = lines
    .map((line) => {
      const item = getItemById(line.itemId);
      if (!item) return null;
      return {
        itemId: item.id,
        name: item.name,
        category: item.category,
        quantity: line.quantity,
        pricePerPerson: item.pricePerPerson,
        lineTotal: item.pricePerPerson * line.quantity,
      };
    })
    .filter((line): line is InvoiceLineItem => line !== null);

  const subtotal = lineItems.reduce((sum, line) => sum + line.lineTotal, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const totalPortions = lineItems.reduce((sum, line) => sum + line.quantity, 0);

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    pickupDate: checkout.pickupDate,
    pickupTime: checkout.pickupTime,
    contact: checkout.contact,
    paymentMethod: checkout.payment.method,
    specialInstructions: checkout.specialInstructions,
    lineItems,
    totalPortions,
    subtotal,
    tax,
    total: Math.round((subtotal + tax) * 100) / 100,
  };
}

export function saveInvoice(invoice: Invoice): void {
  const invoices = loadInvoices();
  invoices.push(invoice);
  persistInvoices(invoices);
}

export function getInvoiceById(id: string): Invoice | undefined {
  return loadInvoices().find((invoice) => invoice.id === id);
}

export function getAllInvoices(): Invoice[] {
  return loadInvoices();
}
