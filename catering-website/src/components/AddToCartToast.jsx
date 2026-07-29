import { Check } from 'lucide-react';

export default function AddToCartToast({message}) {
  return <div className={`cart-toast ${message?'is-visible':''}`} role="status" aria-live="polite" aria-atomic="true">
    {message&&<><span className="toast-check" aria-hidden="true"><Check/></span><span><strong>Added to your table</strong><small>{message}</small></span></>}
  </div>;
}
