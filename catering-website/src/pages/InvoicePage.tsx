import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getInvoiceById } from '../utils/invoiceStorage'
import { usePageTitle } from '../utils/usePageTitle'
import { formatFriendlyDate, fromDateInputValue } from '../utils/date'

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  'credit-card': 'Credit card',
  'debit-card': 'Debit card',
  'cash-on-pickup': 'Cash on pickup',
}

function formatPickupTime(time: string): string {
  const [hourStr, minuteStr] = time.split(':')
  const hour = Number(hourStr)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${minuteStr} ${period}`
}

export default function InvoicePage() {
  const { orderId } = useParams<{ orderId: string }>()
  const invoice = orderId ? getInvoiceById(orderId) : undefined
  const headingRef = useRef<HTMLHeadingElement>(null)

  usePageTitle(invoice ? `Order Confirmed — #${invoice.orderId.slice(0, 8)}` : 'Order not found')

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  if (!invoice) {
    return (
      <div>
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-stone-900 focus:outline-none">
          We couldn't find that order
        </h1>
        <p className="mt-2 text-stone-600">
          <Link to="/" className="text-amber-800 hover:underline">
            Back to menu — start a new order
          </Link>
        </p>
      </div>
    )
  }

  const placedAt = new Date(invoice.placedAt)
  const paymentLabel = PAYMENT_METHOD_LABELS[invoice.checkout.paymentMethod] ?? invoice.checkout.paymentMethod
  const isCardPayment =
    invoice.checkout.paymentMethod === 'credit-card' || invoice.checkout.paymentMethod === 'debit-card'
  const cardLast4 = invoice.checkout.cardNumber ? invoice.checkout.cardNumber.replace(/\s/g, '').slice(-4) : null

  return (
    <div className="print:text-black">
      <p role="status" className="sr-only">
        Order confirmed. Order number {invoice.orderId}, placed {formatFriendlyDate(placedAt)}.
      </p>

      <div className="rounded-md border border-green-700 bg-green-50 p-4">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-green-900 focus:outline-none">
          <span aria-hidden="true">✓ </span>Order Confirmed
        </h1>
        <p className="mt-1 text-green-900">Thank you! Your catering order has been placed.</p>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Order details</h2>
        <dl className="mt-2 text-stone-800">
          <div className="flex gap-2">
            <dt className="font-medium">Order number:</dt>
            <dd>{invoice.orderId}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium">Placed on:</dt>
            <dd>{placedAt.toLocaleString()}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Pickup &amp; contact</h2>
        <dl className="mt-2 text-stone-800">
          <div className="flex gap-2">
            <dt className="font-medium">Pickup date:</dt>
            <dd>{formatFriendlyDate(fromDateInputValue(invoice.checkout.pickupDate))}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium">Pickup time:</dt>
            <dd>{formatPickupTime(invoice.checkout.pickupTime)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium">Name:</dt>
            <dd>{invoice.checkout.fullName}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium">Phone:</dt>
            <dd>{invoice.checkout.phone}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium">Email:</dt>
            <dd>{invoice.checkout.email}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Payment</h2>
        <p className="mt-2 text-stone-800">
          Payment method: {paymentLabel}
          {isCardPayment && cardLast4 ? ` ending in ${cardLast4}` : ''}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Items ordered</h2>
        <div className="mt-2 overflow-x-auto rounded-lg border border-stone-200">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Items in your order</caption>
            <thead>
              <tr className="border-b border-stone-200 bg-stone-100 text-stone-700">
                <th scope="col" className="p-3 font-medium">
                  Item
                </th>
                <th scope="col" className="p-3 font-medium">
                  Quantity
                </th>
                <th scope="col" className="p-3 font-medium">
                  Unit price
                </th>
                <th scope="col" className="p-3 font-medium">
                  Line subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((entry) => (
                <tr key={entry.foodItem.id} className="border-b border-stone-200 last:border-b-0">
                  <th scope="row" className="p-3 font-normal text-stone-900">
                    {entry.foodItem.name}
                  </th>
                  <td className="p-3 text-stone-700">{entry.quantity}</td>
                  <td className="p-3 text-stone-700">${entry.foodItem.pricePerPortion.toFixed(2)}</td>
                  <td className="p-3 font-medium text-stone-900">
                    ${(entry.foodItem.pricePerPortion * entry.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-stone-300">
                <th scope="row" colSpan={3} className="p-3 text-right font-medium">
                  Subtotal
                </th>
                <td className="p-3 font-medium">${invoice.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th scope="row" colSpan={3} className="p-3 text-right font-medium">
                  Tax
                </th>
                <td className="p-3 font-medium">${invoice.tax.toFixed(2)}</td>
              </tr>
              <tr>
                <th scope="row" colSpan={3} className="p-3 text-right text-base font-semibold">
                  Total
                </th>
                <td className="p-3 text-base font-semibold">${invoice.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {invoice.checkout.specialInstructions && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-stone-900">Special instructions</h2>
          <p className="mt-2 text-stone-800">{invoice.checkout.specialInstructions}</p>
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-4 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-[44px] rounded-md border border-stone-400 px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
        >
          Print this invoice
        </button>
        <Link
          to="/"
          className="min-h-[44px] rounded-md bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          Back to menu — start a new order
        </Link>
      </div>
    </div>
  )
}
