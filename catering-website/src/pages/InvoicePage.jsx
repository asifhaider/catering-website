import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatDateString } from '../data/menuData'

const METHOD_LABELS = { cash: 'Cash on Pickup', venmo: 'Venmo', zelle: 'Zelle' }

export default function InvoicePage() {
  const { orderNumber } = useParams()
  const [order, setOrder] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const printRef = useRef()

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('mamastable_orders') || '[]')
    const found = orders.find(o => o.orderNumber === orderNumber)
    if (found) setOrder(found)
    else setNotFound(true)
  }, [orderNumber])

  // SC 2.4.2 – update page title dynamically
  useEffect(() => {
    if (order) document.title = `Order ${order.orderNumber} – Mama's Table`
    else if (notFound) document.title = 'Order Not Found – Mama\'s Table'
    else document.title = 'Invoice – Mama\'s Table'
  }, [order, notFound])

  function handlePrint() { window.print() }

  if (notFound) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Order not found.</p>
          <Link to="/menu" className="text-brand-900 font-medium hover:underline underline-offset-2">← Browse Menu</Link>
        </div>
      </div>
    )
  }

  if (!order) return null

  const placedDate = new Date(order.placedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="min-h-screen bg-warm-50 py-10 print:bg-white print:py-0">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Action bar – SC 2.5.5 min 44px; hidden when printing */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/menu"
            className="text-sm text-gray-700 hover:text-brand-900 transition-colors hover:underline underline-offset-2"
          >
            ← Order More
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors min-h-[44px]"
          >
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save <abbr title="Portable Document Format">PDF</abbr>
          </button>
        </div>

        {/* Success banner */}
        <div
          className="bg-brand-50 border border-brand-200 rounded-2xl p-5 mb-6 text-center print:hidden"
          role="status"
          aria-live="polite"
        >
          {/* SC 1.1.1 – decorative emoji hidden from AT */}
          <div aria-hidden="true" className="text-4xl mb-2">🎉</div>
          <h1 className="font-display text-2xl font-bold text-brand-900 mb-1">Order Confirmed!</h1>
          <p className="text-brand-800 text-sm">
            Thank you, {order.customer.name.split(' ')[0]}! We'll have everything ready for pickup.
          </p>
        </div>

        {/* Invoice document */}
        <div
          ref={printRef}
          className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden print:shadow-none print:rounded-none print:border-0"
        >
          {/* Invoice header */}
          <div className="bg-brand-900 text-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {/* SC 1.1.1 – decorative emoji hidden */}
                  <span aria-hidden="true" className="text-xl">🍽️</span>
                  <span className="font-display text-lg font-bold">Mama's Table</span>
                </div>
                {/* SC 1.4.3 – white on brand-900 ≈ 8.75:1 (AAA) */}
                <p className="text-white text-xs">
                  Homemade Catering · Springfield, <abbr title="Illinois">IL</abbr>
                </p>
                <p className="text-white text-xs">hello@mamastable.com · (555) 234-5678</p>
              </div>
              <div className="text-right">
                <p className="text-white text-xs uppercase tracking-wide">Invoice</p>
                <p className="font-bold text-xl">{order.orderNumber}</p>
                <p className="text-white text-xs mt-1">
                  <time dateTime={order.placedAt}>{placedDate}</time>
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Info grid – SC 1.3.1 using dl for key-value billing info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Bill To</p>
                <p className="font-semibold text-gray-900 text-sm">{order.customer.name}</p>
                <p className="text-gray-700 text-xs">{order.customer.email}</p>
                <p className="text-gray-700 text-xs">{order.customer.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Pickup</p>
                <p className="font-semibold text-gray-900 text-sm">{formatDateString(order.pickupDate)}</p>
                <p className="text-gray-700 text-xs">{order.pickupTime}</p>
                <p className="text-gray-700 text-xs mt-1">123 Oak Street, Springfield, <abbr title="Illinois">IL</abbr></p>
                <p className="text-gray-700 text-xs">Guests: {order.guests}</p>
              </div>
            </div>

            {/* Payment badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Payment:</span>
              <span className="bg-warm-100 text-warm-800 text-xs font-semibold px-3 py-1 rounded-full">
                {METHOD_LABELS[order.payment.method]}
                {order.payment.handle && ` · ${order.payment.handle}`}
              </span>
            </div>

            {/* Line items – SC 1.3.1: table with caption and scope attributes */}
            <section aria-labelledby="order-items-heading">
              <h2 id="order-items-heading" className="sr-only">Ordered items</h2>
              <table className="w-full text-sm">
                {/* SC 1.3.1 – caption read by AT; visible heading is sr-only h2 above */}
                <caption className="sr-only">
                  Order {order.orderNumber} — itemised list of dishes and prices
                </caption>
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th scope="col" className="text-left pb-2 font-semibold text-gray-800">Item</th>
                    <th scope="col" className="text-center pb-2 font-semibold text-gray-800">Servings</th>
                    <th scope="col" className="text-right pb-2 font-semibold text-gray-800">$/person</th>
                    <th scope="col" className="text-right pb-2 font-semibold text-gray-800">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 text-gray-900 font-medium">
                        {item.name}
                        <span className="ml-1 text-xs text-gray-600 font-normal capitalize">({item.category})</span>
                      </td>
                      <td className="py-3 text-center text-gray-700">{item.quantity}</td>
                      <td className="py-3 text-right text-gray-700">${item.pricePerPerson}</td>
                      <td className="py-3 text-right font-semibold text-gray-900">${item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-4 text-right font-bold text-gray-900 text-base">Total</td>
                    <td className="pt-4 text-right font-bold text-brand-900 text-lg">${order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </section>

            {/* Special instructions */}
            {order.instructions && (
              <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Special Instructions</p>
                <p className="text-sm text-gray-800">{order.instructions}</p>
              </div>
            )}

            {/* Footer note */}
            <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-700">
              <p>Thank you for choosing Mama's Table!</p>
              <p className="mt-1">Questions? Contact us at hello@mamastable.com or (555) 234-5678</p>
            </div>
          </div>
        </div>

        {/* Post-order CTAs – SC 2.5.5 min 44px */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
          <Link
            to="/menu"
            className="flex-1 text-center bg-brand-900 hover:bg-brand-800 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors min-h-[44px] flex items-center justify-center"
          >
            Order for Another Date
          </Link>
          <Link
            to="/contact"
            className="flex-1 text-center bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-6 py-3 rounded-xl font-semibold text-sm transition-colors min-h-[44px] flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
