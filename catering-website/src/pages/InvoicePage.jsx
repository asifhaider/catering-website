import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function InvoicePage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  usePageTitle(orderId ? `Order Confirmation — ${orderId}` : 'Order Confirmation')

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem('nk-invoices') || '[]')
    const found = invoices.find(inv => inv.orderId === orderId)
    setOrder(found || null)
  }, [orderId])

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-stone-800 mb-3">Order not found</h1>
        <p className="text-stone-500 mb-6">We couldn&apos;t find order #{orderId}.</p>
        <button onClick={() => navigate('/')} className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl min-h-[48px]">
          Go to Menu
        </button>
      </div>
    )
  }

  const placedDate = new Date(order.placedAt)
  const cateringDate = order.cateringDate ? new Date(order.cateringDate) : null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 print-full">
      {/* Success banner */}
      <div className="no-print mb-8 bg-green-50 border border-green-300 rounded-xl p-5 flex items-start gap-3">
        <span aria-hidden="true" className="text-green-600 text-2xl">✓</span>
        <div>
          <h2 className="font-semibold text-green-800 text-lg">Order placed successfully!</h2>
          <p className="text-green-700 text-sm mt-0.5">
            A confirmation will be sent to <strong>{order.customer.email}</strong>. We&apos;ll be in touch shortly.
          </p>
        </div>
      </div>

      {/* Invoice document */}
      <article aria-labelledby="invoice-title" className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <header className="bg-stone-800 text-white px-6 py-6 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="font-serif text-2xl font-bold">🍲 Nana&apos;s Kitchen</p>
            <p className="text-stone-300 text-sm mt-1">Homemade Catering</p>
          </div>
          <div className="text-sm text-stone-300 sm:text-right">
            <p className="font-bold text-white text-base" id="invoice-title">
              Order Confirmation
            </p>
            <p>Order <strong className="text-amber-300">#{order.orderId}</strong></p>
            <p>
              Placed:{' '}
              <time dateTime={placedDate.toISOString()}>
                {placedDate.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </p>
          </div>
        </header>

        <div className="px-6 py-6 space-y-8">
          {/* Customer & Order info */}
          <section aria-labelledby="customer-heading">
            <h2 id="customer-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Customer Information
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-stone-500">Name</dt>
                <dd className="font-medium text-stone-800">{order.customer.firstName} {order.customer.lastName}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Email</dt>
                <dd className="font-medium text-stone-800">{order.customer.email}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Phone</dt>
                <dd className="font-medium text-stone-800">{order.customer.phone}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Portion size</dt>
                <dd className="font-medium text-stone-800">{order.portionSize} people</dd>
              </div>
              {cateringDate && (
                <div>
                  <dt className="text-stone-500">Catering date</dt>
                  <dd className="font-medium text-stone-800">
                    <time dateTime={cateringDate.toISOString().split('T')[0]}>
                      {cateringDate.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-stone-500">Payment method</dt>
                <dd className="font-medium text-stone-800 capitalize">{order.paymentMethod}</dd>
              </div>
            </dl>
          </section>

          {/* Itemized order table (WCAG 1.3.1) */}
          <section aria-labelledby="items-heading">
            <h2 id="items-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Order Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-stone-200 rounded-lg" aria-label="Ordered items">
                <thead>
                  <tr className="bg-stone-100 text-left">
                    <th scope="col" className="px-4 py-2.5 font-semibold text-stone-700">Item</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold text-stone-700 text-center">
                      <abbr title="Quantity">Qty</abbr>
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-semibold text-stone-700 text-right">Unit Price</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold text-stone-700 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={item.id} className={`border-t border-stone-200 ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}>
                      <th scope="row" className="px-4 py-2.5 font-normal text-stone-800 text-left">{item.name}</th>
                      <td className="px-4 py-2.5 text-center text-stone-700">{item.quantity}</td>
                      <td className="px-4 py-2.5 text-right text-stone-700">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-stone-800">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-stone-300">
                  <tr>
                    <th scope="row" colSpan={3} className="px-4 py-2 text-right font-medium text-stone-600">Subtotal</th>
                    <td className="px-4 py-2 text-right font-medium text-stone-800">${order.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan={3} className="px-4 py-2 text-right font-medium text-stone-600">
                      <abbr title="Harmonized Sales Tax">HST</abbr> (13%)
                    </th>
                    <td className="px-4 py-2 text-right font-medium text-stone-800">${order.tax.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-stone-100">
                    <th scope="row" colSpan={3} className="px-4 py-3 text-right font-bold text-stone-800 text-base">Total</th>
                    <td className="px-4 py-3 text-right font-bold text-brand-700 text-base">${order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          {/* Special instructions */}
          {order.specialInstructions && (
            <section aria-labelledby="instructions-heading">
              <h2 id="instructions-heading" className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Special Instructions
              </h2>
              <p className="text-stone-700 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                {order.specialInstructions}
              </p>
            </section>
          )}

          {/* Footer */}
          <footer className="border-t border-stone-200 pt-4 text-xs text-stone-400 text-center">
            <p>Thank you for choosing Nana&apos;s Kitchen. Please bring this confirmation to your pickup.</p>
            <p className="mt-1">Questions? Call us at <a href="tel:+14165550182" className="underline text-stone-500">+1 (416) 555-0182</a></p>
          </footer>
        </div>
      </article>

      {/* Action buttons */}
      <div className="no-print mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => window.print()}
          className="border-2 border-stone-300 text-stone-700 font-semibold px-6 py-3 rounded-xl min-h-[48px] hover:bg-stone-50 transition-colors"
          aria-label="Print or save this invoice as PDF"
        >
          🖨 Print / Save as PDF
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl min-h-[48px] transition-colors"
        >
          Order Again
        </button>
      </div>
    </div>
  )
}
