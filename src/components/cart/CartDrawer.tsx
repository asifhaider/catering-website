import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useCart } from '../../context/CartContext';
import { formatDate } from '../../utils/formatUtils';
import CartItemComponent from './CartItem';
import CartSummary from './CartSummary';
import Button from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, isOpen);
  const { state, itemCount } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={containerRef}
        role="dialog"
        aria-label={`Shopping cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
        aria-modal="true"
        className="relative w-full max-w-md bg-cream shadow-2xl flex flex-col h-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100">
          <h2 className="text-lg font-bold text-stone-900 font-display">Your Cart</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="flex items-center justify-center w-10 h-10 rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Catering date badge */}
        {state.cateringDate && (
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-100">
            <p className="text-xs text-amber-800">
              <span className="font-semibold">Catering date:</span>{' '}
              {formatDate(state.cateringDate)}
              {state.portionSize && ` · ${state.portionSize} people`}
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {state.items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-4 text-center py-12"
              aria-live="polite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="font-semibold text-stone-600">Your cart is empty</p>
                <p className="text-sm text-stone-500 mt-1">Browse the menu to add dishes.</p>
              </div>
              <Button variant="outline" size="md" onClick={onClose}>
                Continue Browsing
              </Button>
            </div>
          ) : (
            <ul aria-label="Cart items" className="divide-y divide-stone-100">
              {state.items.map((item) => (
                <CartItemComponent key={item.foodItem.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-amber-100 px-6 py-5 flex flex-col gap-4 bg-white">
            <CartSummary showTax={false} />
            <Link to="/checkout" onClick={onClose}>
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
