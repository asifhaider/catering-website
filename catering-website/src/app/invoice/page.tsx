"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface InvoiceData {
  id: string;
  date: string;
  customer: { name: string; email: string; phone: string };
  pickup: { date: string; time: string };
  paymentMethod: string;
  specialInstructions: string;
  items: { name: string; category: string; price: number; quantity: number; subtotal: number }[];
  totalPortions: number;
  totalPrice: number;
}

export default function InvoicePage() {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("catering_last_invoice");
    if (data) {
      const parsed = JSON.parse(data);
      setInvoice(parsed);
      document.title = `Order ${parsed.id} Confirmed | Mama's Kitchen`;
    } else {
      document.title = "Invoice | Mama's Kitchen";
    }
  }, []);

  if (!invoice) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">No Invoice Found</h1>
        <p className="text-gray-500 mb-6">Place an order to generate an invoice.</p>
        <Link href="/" className="bg-amber-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-700 min-h-[44px] inline-flex items-center">View Menu</Link>
      </main>
    );
  }

  const pickupDate = invoice.pickup.date
    ? new Date(invoice.pickup.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "N/A";

  return (
    <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-500 mt-1">Your invoice has been generated.</p>
      </div>

      <article className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden" aria-label="Invoice">
        <div className="bg-amber-600 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Invoice</p>
            <p className="font-bold text-lg">{invoice.id}</p>
          </div>
          <div className="text-right text-sm">
            <p className="opacity-80">Date</p>
            <p className="font-medium">{new Date(invoice.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Customer Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div><dt className="text-gray-500">Name</dt><dd className="font-medium">{invoice.customer.name}</dd></div>
              <div><dt className="text-gray-500">Email</dt><dd className="font-medium">{invoice.customer.email}</dd></div>
              <div><dt className="text-gray-500">Phone</dt><dd className="font-medium">{invoice.customer.phone}</dd></div>
            </dl>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Pickup Details</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div><dt className="text-gray-500">Date</dt><dd className="font-medium">{pickupDate}</dd></div>
              <div><dt className="text-gray-500">Time</dt><dd className="font-medium">{invoice.pickup.time}</dd></div>
            </dl>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Payment</h2>
            <p className="text-sm capitalize">{invoice.paymentMethod === "cash" ? "Cash on Pickup" : "Card"}</p>
          </section>

          {invoice.specialInstructions && (
            <section>
              <h2 className="font-semibold text-gray-900 mb-2">Special Instructions</h2>
              <p className="text-sm text-gray-600">{invoice.specialInstructions}</p>
            </section>
          )}

          <section>
            <h2 className="font-semibold text-gray-900 mb-3">Order Items</h2>
            <table className="w-full text-sm" aria-label="Order items">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="text-left py-2 font-semibold">Item</th>
                  <th scope="col" className="text-center py-2 font-semibold">Qty</th>
                  <th scope="col" className="text-right py-2 font-semibold">Price</th>
                  <th scope="col" className="text-right py-2 font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                    </td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                    <td className="py-2 text-right font-medium">${item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td colSpan={2} className="py-3 font-bold">Total ({invoice.totalPortions} portions)</td>
                  <td colSpan={2} className="py-3 text-right text-lg font-bold text-amber-700">${invoice.totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
      </article>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={() => window.print()} className="bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors min-h-[44px]">
          Print Invoice
        </button>
        <Link href="/" className="bg-amber-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors min-h-[44px] text-center">
          Back to Menu
        </Link>
      </div>
    </main>
  );
}
