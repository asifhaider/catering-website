import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

export default function CartDrawer({open, items, onClose, onUpdate, onRemove, onCheckout}) {
  if(!open) return null;
  const subtotal=items.reduce((sum,item)=>sum+item.price*item.qty,0);
  return <div className="drawer-layer" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-head"><div><span className="eyebrow">Your order</span><h2 id="cart-title">The table so far</h2></div><button className="dialog-close" onClick={onClose} aria-label="Close cart"><X/></button></div>
      {items.length===0?<div className="empty-cart"><ShoppingBag aria-hidden="true"/><h3>Your table is empty</h3><p>Choose a few homemade favorites from the menu.</p><button className="secondary-button" onClick={onClose}>Browse the menu</button></div>:<>
        <ul className="cart-lines">{items.map(item=><li key={item.id}><div className="cart-thumb" style={{backgroundPosition:item.pos}} role="img" aria-label={item.name}></div><div className="cart-line-copy"><h3>{item.name}</h3><span>${item.price} per person</span><div className="cart-actions"><div className="stepper" role="group" aria-label={`${item.name} portions`}><button onClick={()=>onUpdate(item.id,item.qty-1)} disabled={item.qty===6} aria-label={`Decrease ${item.name} portions`}><Minus/></button><output aria-live="polite" aria-label={`${item.name} portions`}>{item.qty}</output><button onClick={()=>onUpdate(item.id,item.qty+1)} disabled={item.qty===30} aria-label={`Increase ${item.name} portions`}><Plus/></button></div><button className="remove-button" onClick={()=>onRemove(item.id)} aria-label={`Remove ${item.name}`}><Trash2/> Remove</button></div></div><strong>${item.price*item.qty}</strong></li>)}</ul>
        <div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal}</strong></div><p>Pickup only · taxes calculated at checkout</p><button className="primary-button" onClick={onCheckout}>Continue to checkout</button></div>
      </>}
    </aside>
  </div>;
}
