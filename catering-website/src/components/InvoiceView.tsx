import type { Invoice } from "../types";
import { formatCurrency, formatDateLong } from "../utils/format";

const CATEGORY_LABELS: Record<Invoice["lineItems"][number]["category"], string> = {
  protein: "Protein",
  vegetarian: "Vegetarian",
  side: "Side",
};

interface InvoiceViewProps {
  invoice: Invoice;
}

export default function InvoiceView({ invoice }: InvoiceViewProps) {
  const createdAtLabel = formatDateLong(new Date(invoice.createdAt));

  return (
    <div className="bg-white rounded-lg border border-brand-200 p-6 space-y-6 print:border-0 print:shadow-none">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-brand-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Homestead Catering Co.</h2>
          <p className="text-sm text-brand-700">Order invoice</p>
        </div>
        <div className="text-sm text-brand-800 text-right">
          <p>
            Invoice <span className="font-mono">#{invoice.id.slice(0, 8)}</span>
          </p>
          <p>Placed on {createdAtLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold text-brand-900 mb-1">Customer</h2>
          <p className="text-brand-800">{invoice.contact.fullName}</p>
          <p className="text-brand-800">{invoice.contact.phone}</p>
          <p className="text-brand-800">{invoice.contact.email}</p>
        </div>
        <div>
          <h2 className="font-semibold text-brand-900 mb-1">Pickup</h2>
          <p className="text-brand-800">{invoice.pickupDate}</p>
          <p className="text-brand-800">{invoice.pickupTime}</p>
          <h2 className="font-semibold text-brand-900 mt-3 mb-1">Payment method</h2>
          <p className="text-brand-800 capitalize">{invoice.paymentMethod}</p>
        </div>
      </div>

      {invoice.specialInstructions && (
        <div>
          <h2 className="font-semibold text-brand-900 mb-1">Special instructions</h2>
          <p className="text-brand-800">{invoice.specialInstructions}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">Order line items</caption>
          <thead>
            <tr className="border-b-2 border-brand-300 text-left text-brand-900">
              <th scope="col" className="py-2 pr-2">
                Item
              </th>
              <th scope="col" className="py-2 pr-2">
                Category
              </th>
              <th scope="col" className="py-2 pr-2 text-right">
                Qty
              </th>
              <th scope="col" className="py-2 pr-2 text-right">
                Price
              </th>
              <th scope="col" className="py-2 text-right">
                Line total
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((line) => (
              <tr key={line.itemId} className="border-b border-brand-200">
                <td className="py-2 pr-2 text-brand-900">{line.name}</td>
                <td className="py-2 pr-2 text-brand-700">{CATEGORY_LABELS[line.category]}</td>
                <td className="py-2 pr-2 text-right text-brand-900">{line.quantity}</td>
                <td className="py-2 pr-2 text-right text-brand-900">{formatCurrency(line.pricePerPerson)}</td>
                <td className="py-2 text-right text-brand-900">{formatCurrency(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <dl className="w-full max-w-xs space-y-1 m-0">
          <div className="flex justify-between text-brand-800">
            <dt>Total portions</dt>
            <dd className="m-0">{invoice.totalPortions}</dd>
          </div>
          <div className="flex justify-between text-brand-800">
            <dt>Subtotal</dt>
            <dd className="m-0">{formatCurrency(invoice.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-brand-800">
            <dt>Tax</dt>
            <dd className="m-0">{formatCurrency(invoice.tax)}</dd>
          </div>
          <div className="flex justify-between text-lg font-bold text-brand-900 border-t border-brand-300 pt-1">
            <dt>Total</dt>
            <dd className="m-0">{formatCurrency(invoice.total)}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="print:hidden px-4 py-2 rounded-md bg-brand-700 text-white font-medium hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Print invoice
      </button>
    </div>
  );
}
