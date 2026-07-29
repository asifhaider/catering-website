import { ArrowLeft, Clock3, LockKeyhole } from 'lucide-react';

export default function Checkout({open, items, date, onBack, onPlaceOrder}) {
  if(!open) return null;
  const subtotal=items.reduce((sum,item)=>sum+item.price*item.qty,0), tax=Math.round(subtotal*.0875*100)/100;
  const submit=e=>{e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget)); onPlaceOrder({...data,subtotal,tax,total:subtotal+tax});};
  return <div className="checkout-page">
    <header className="checkout-header"><a className="brand" href="#top"><span className="brand-mark">H</span><span>Hearth &amp; Ladle<small>Secure checkout</small></span></a><button className="back-button" onClick={onBack}><ArrowLeft/> Back to cart</button></header>
    <form className="checkout-layout" onSubmit={submit}>
      <div className="checkout-form"><span className="eyebrow">Almost ready</span><h1>Let’s plan your pickup.</h1>
        <fieldset><legend>Contact information</legend><div className="form-grid"><label>Full name<input name="name" autoComplete="name" required/></label><label>Email address<input type="email" name="email" autoComplete="email" required/></label><label>Phone number<input type="tel" name="phone" autoComplete="tel" required/></label></div></fieldset>
        <fieldset><legend>Pickup details</legend><div className="pickup-card"><Clock3 aria-hidden="true"/><div><strong>{new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(new Date(`${date}T12:00:00`))}</strong><span>Hearth &amp; Ladle · 1847 Willow Street</span></div></div><label>Pickup time<select name="time" required defaultValue=""><option value="" disabled>Choose a time</option><option>11:00 AM</option><option>12:30 PM</option><option>2:00 PM</option><option>4:30 PM</option></select></label></fieldset>
        <fieldset><legend>Payment method</legend><p className="field-note">Demo only — no payment will be processed.</p><label className="radio-card"><input type="radio" name="payment" value="Pay at pickup" defaultChecked/><span><strong>Pay at pickup</strong><small>Card or cash when you arrive</small></span></label><label className="radio-card"><input type="radio" name="payment" value="Card on file demo"/><span><strong>Card (demo)</strong><small>Use placeholder information</small></span></label><div className="form-grid"><label>Card number<input name="card" inputMode="numeric" placeholder="4242 4242 4242 4242"/></label><label>Expiry<input name="expiry" placeholder="MM / YY"/></label><label>CVC<input name="cvc" inputMode="numeric" placeholder="123"/></label></div></fieldset>
        <fieldset><legend>Anything we should know?</legend><label>Special instructions<textarea name="instructions" rows="4" placeholder="Allergies, pickup notes, or preparation requests…"></textarea></label></fieldset>
      </div>
      <aside className="order-review" aria-labelledby="review-title"><h2 id="review-title">Order summary</h2><ul>{items.map(i=><li key={i.id}><span>{i.name}<small>{i.qty} portions</small></span><strong>${i.price*i.qty}</strong></li>)}</ul><div className="totals"><div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div><span>Estimated tax</span><span>${tax.toFixed(2)}</span></div><div className="grand-total"><strong>Total</strong><strong>${(subtotal+tax).toFixed(2)}</strong></div></div><button className="place-button" type="submit"><LockKeyhole/> Place order</button><p className="secure-note">This is a demo checkout. No payment is collected.</p></aside>
    </form>
  </div>;
}
