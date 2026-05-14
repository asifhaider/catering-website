import type { Invoice } from '../../types';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatUtils';
import Button from '../ui/Button';

const paymentLabels: Record<string, string> = {
  cash: 'Cash on pickup',
  'e-transfer': 'Interac e-Transfer',
  check: 'Cheque',
};

interface InvoiceViewProps {
  invoice: Invoice;
}

export default function InvoiceView({ invoice }: InvoiceViewProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
        <div>
          <p className="font-display text-2xl font-bold text-terracotta-600">Nour's Kitchen</p>
          <address className="not-italic text-sm text-stone-500 mt-1">
            142 Maple Grove Ave, Mississauga, ON L5B 2C4<br />
            hello@nourskitchen.ca · +1 (905) 555-0142
          </address>
        </div>
        <div className="text-right">
          <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Invoice</p>
          <p className="font-mono text-sm text-stone-800 font-semibold mt-1">{invoice.invoiceId}</p>
          <p className="text-xs text-stone-500 mt-1">
            Issued: {new Date(invoice.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Bill to + Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <section aria-label="Billed to">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Billed To</p>
          <p className="font-semibold text-stone-900">
            {invoice.contact.firstName} {invoice.contact.lastName}
          </p>
          <address className="not-italic text-sm text-stone-600 mt-1">
            {invoice.contact.email}<br />
            {invoice.contact.phone}
          </address>
        </section>

        <section aria-label="Order details">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Order Details</p>
          <dl className="text-sm space-y-1">
            <div className="flex gap-2">
              <dt className="text-stone-500 w-24">Catering date</dt>
              <dd className="text-stone-900 font-medium">{formatDate(invoice.cateringDate)}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-stone-500 w-24">Pickup time</dt>
              <dd className="text-stone-900">{formatTime(invoice.pickup.pickupTime)}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-stone-500 w-24">Portions</dt>
              <dd className="text-stone-900">{invoice.portionSize} people</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-stone-500 w-24">Payment</dt>
              <dd className="text-stone-900">{paymentLabels[invoice.paymentMethod]}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-stone-500 w-24">Status</dt>
              <dd>
                <span className="inline-flex items-center bg-sage-100 text-sage-700 text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
                  {invoice.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Line items table */}
      <section aria-label="Order line items">
        <table className="invoice-table w-full text-sm border-collapse" aria-label="Order line items">
          <caption className="sr-only">
            Line items for order {invoice.invoiceId}
          </caption>
          <thead>
            <tr className="bg-stone-50">
              <th scope="col" className="px-3 py-3 text-left font-semibold text-stone-700 border-b border-stone-200">
                Item
              </th>
              <th scope="col" className="px-3 py-3 text-center font-semibold text-stone-700 border-b border-stone-200 whitespace-nowrap">
                Qty
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold text-stone-700 border-b border-stone-200 whitespace-nowrap">
                Price/Person
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold text-stone-700 border-b border-stone-200">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((li) => (
              <tr key={li.foodItemId} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-3 py-3 text-stone-900">
                  {li.foodItemName}
                  <span className="text-stone-400 text-xs ml-2 capitalize">({li.category})</span>
                </td>
                <td className="px-3 py-3 text-center text-stone-600">
                  {li.quantity} × {li.portionSize}
                </td>
                <td className="px-3 py-3 text-right text-stone-600">
                  {formatCurrency(li.pricePerPerson)}
                </td>
                <td className="px-3 py-3 text-right font-medium text-stone-900">
                  {formatCurrency(li.lineTotal)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="px-3 py-2 text-right text-stone-600 font-medium">Subtotal</td>
              <td className="px-3 py-2 text-right text-stone-900 font-medium">{formatCurrency(invoice.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="px-3 py-2 text-right text-stone-600 font-medium">
                HST ({(invoice.taxRate * 100).toFixed(0)}%)
              </td>
              <td className="px-3 py-2 text-right text-stone-900 font-medium">{formatCurrency(invoice.taxAmount)}</td>
            </tr>
            <tr className="bg-amber-50">
              <td colSpan={3} className="px-3 py-3 text-right font-bold text-stone-900 text-base">Total</td>
              <td className="px-3 py-3 text-right font-bold text-stone-900 text-base">{formatCurrency(invoice.total)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* Special instructions */}
      {invoice.pickup.specialInstructions && (
        <section aria-label="Special instructions" className="mt-6 bg-amber-50 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">Special Instructions</p>
          <p className="text-sm text-stone-700">{invoice.pickup.specialInstructions}</p>
        </section>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3 items-center justify-between no-print">
        <p className="text-sm text-stone-500 text-center sm:text-left">
          Thank you for choosing Nour's Kitchen! We look forward to serving you.
        </p>
        <Button
          variant="outline"
          size="md"
          onClick={() => window.print()}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          }
          aria-label="Print this invoice"
          className="no-print whitespace-nowrap"
        >
          Print Invoice
        </Button>
      </div>
    </div>
  );
}
