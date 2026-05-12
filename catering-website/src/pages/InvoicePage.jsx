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

  function handlePrint() {
    window.print()
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Order not found.</p>
          <Link to="/menu" className="text-brand-700 font-medium hover:underline">← Browse Menu</Link>
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
        {/* Action bar (hidden when printing) */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link to="/menu" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">← Order More</Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save PDF
          </button>
        </div>

        {/* Success banner */}
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 mb-6 text-center print:hidden">
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="font-display text-2xl font-bold text-brand-800 mb-1">Order Confirmed!</h1>
          <p className="text-brand-700 text-sm">
            Thank you, {order.customer.name.split(' ')[0]}! We'll have everything ready for pickup.
          </p>
        </div>

        {/* Invoice document */}
        <div ref={printRef} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden print:shadow-none print:rounded-none print:border-0">
          {/* Invoice header */}
          <div className="bg-brand-800 text-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🍽️</span>
                  <span className="font-display text-lg font-bold">Mama's Table</span>
                </div>
                <p className="text-brand-300 text-xs">Homemade Catering · Springfield, IL</p>
                <p className="text-brand-300 text-xs">hello@mamastable.com · (555) 234-5678</p>
              </div>
              <div className="text-right">
                <p className="text-brand-300 text-xs uppercase tracking-wide">Invoice</p>
                <p className="font-bold text-xl">{order.orderNumber}</p>
                <p className="text-brand-300 text-xs mt-1">{placedDate}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bill To</p>
                <p className="font-semibold text-gray-900 text-sm">{order.customer.name}</p>
                <p className="text-gray-600 text-xs">{order.customer.email}</p>
                <p className="text-gray-600 text-xs">{order.customer.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pickup</p>
                <p className="font-semibold text-gray-900 text-sm">{formatDateString(order.pickupDate)}</p>
                <p className="text-gray-600 text-xs">{order.pickupTime}</p>
                <p className="text-gray-600 text-xs mt-1">123 Oak Street, Springfield, IL</p>
                <p className="text-gray-600 text-xs">Guests: {order.guests}</p>
              </div>
            </div>

            {/* Payment badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Payment:</span>
              <span className="bg-warm-100 text-warm-700 text-xs font-semibold px-3 py-1 rounded-full">
                {METHOD_LABELS[order.payment.method]}
                {order.payment.handle && ` · ${order.payment.handle}`}
              </span>
            </div>

            {/* Line items */}
            <div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left pb-2 font-semibold text-gray-700">Item</th>
                    <th className="text-center pb-2 font-semibold text-gray-700">Servings</th>
                    <th className="text-right pb-2 font-semibold text-gray-700">$/person</th>
                    <th className="text-right pb-2 font-semibold text-gray-700">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 text-gray-800 font-medium">
                        {item.name}
                        <span className="ml-1 text-xs text-gray-400 font-normal capitalize">({item.category})</span>
                      </td>
                      <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                      <td className="py-3 text-right text-gray-600">${item.pricePerPerson}</td>
                      <td className="py-3 text-right font-semibold text-gray-900">${item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-4 text-right font-bold text-gray-900 text-base">Total</td>
                    <td className="pt-4 text-right font-bold text-brand-700 text-lg">${order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Special instructions */}
            {order.instructions && (
              <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Special Instructions</p>
                <p className="text-sm text-gray-700">{order.instructions}</p>
              </div>
            )}

            {/* Footer note */}
            <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
              <p>Thank you for choosing Mama's Table! 🍽️</p>
              <p className="mt-1">Questions? Contact us at hello@mamastable.com or (555) 234-5678</p>
            </div>
          </div>
        </div>

        {/* Post-order CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
          <Link
            to="/menu"
            className="flex-1 text-center bg-brand-700 hover:bg-brand-800 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Order for Another Date
          </Link>
          <Link
            to="/contact"
            className="flex-1 text-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
