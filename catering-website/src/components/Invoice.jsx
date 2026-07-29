import { CheckCircle2, Download, MapPin } from 'lucide-react';

export default function Invoice({order, onDone}) {
  if(!order) return null;
  return <div className="invoice-page" role="dialog" aria-modal="true" aria-labelledby="invoice-title">
    <div className="success-banner"><CheckCircle2 aria-hidden="true"/><div><span className="eyebrow">Order confirmed</span><h1 id="invoice-title">We’ll see you at pickup.</h1><p>A copy of this invoice has been saved to this device.</p></div></div>
    <article className="invoice">
      <header><div className="brand"><span className="brand-mark">H</span><span>Hearth &amp; Ladle<small>Homemade catering</small></span></div><div><strong>Invoice {order.id}</strong><span>{new Date(order.createdAt).toLocaleDateString()}</span></div></header>
      <div className="invoice-info"><section><h2>Prepared for</h2><p>{order.name}<br/>{order.email}<br/>{order.phone}</p></section><section><h2>Pickup</h2><p>{order.pickupDate}<br/>{order.time}<br/>1847 Willow Street</p></section><MapPin aria-hidden="true"/></div>
      <table><caption className="sr-only">Ordered catering items</caption><thead><tr><th scope="col">Item</th><th scope="col">Portions</th><th scope="col">Price</th><th scope="col">Amount</th></tr></thead><tbody>{order.items.map(item=><tr key={item.id}><th scope="row">{item.name}</th><td>{item.qty}</td><td>${item.price}</td><td>${item.price*item.qty}</td></tr>)}</tbody></table>
      <div className="invoice-bottom"><div><h2>Notes</h2><p>{order.instructions||'No special instructions.'}</p><span>Payment: {order.payment}</span></div><div className="invoice-totals"><span>Subtotal <strong>${order.subtotal.toFixed(2)}</strong></span><span>Tax <strong>${order.tax.toFixed(2)}</strong></span><span>Total <strong>${order.total.toFixed(2)}</strong></span></div></div>
    </article>
    <div className="invoice-actions"><button className="secondary-button" onClick={()=>window.print()}><Download/> Print / save invoice</button><button className="primary-button" onClick={onDone}>Back to home</button></div>
  </div>;
}
