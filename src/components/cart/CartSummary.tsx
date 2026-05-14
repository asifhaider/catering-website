import { useCart } from '../../context/CartContext';
import { formatCurrency, round2 } from '../../utils/formatUtils';

const TAX_RATE = 0.13;

interface CartSummaryProps {
  showTax?: boolean;
}

export default function CartSummary({ showTax = false }: CartSummaryProps) {
  const { subtotal, state } = useCart();
  const taxAmount = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + taxAmount);

  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-stone-600">
          Subtotal{state.portionSize ? ` (${state.portionSize} people)` : ''}
        </dt>
        <dd className="font-medium text-stone-900">{formatCurrency(subtotal)}</dd>
      </div>
      {showTax && (
        <div className="flex justify-between">
          <dt className="text-stone-600">HST (13%)</dt>
          <dd className="font-medium text-stone-900">{formatCurrency(taxAmount)}</dd>
        </div>
      )}
      <div className="flex justify-between pt-2 border-t border-stone-200">
        <dt className="font-bold text-stone-900 text-base">
          {showTax ? 'Total' : 'Subtotal (excl. tax)'}
        </dt>
        <dd className="font-bold text-stone-900 text-base">
          {formatCurrency(showTax ? total : subtotal)}
        </dd>
      </div>
      {!showTax && (
        <p className="text-xs text-stone-500">Tax (13% HST) added at checkout</p>
      )}
    </dl>
  );
}
