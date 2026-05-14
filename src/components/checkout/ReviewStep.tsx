import type { CheckoutFormData, CheckoutStep } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatDate, formatTime } from '../../utils/formatUtils';
import CartSummary from '../cart/CartSummary';
import Button from '../ui/Button';

const paymentLabels: Record<string, string> = {
  cash: 'Cash on pickup',
  'e-transfer': 'Interac e-Transfer',
  check: 'Cheque',
};

interface ReviewStepProps {
  formData: CheckoutFormData;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: CheckoutStep) => void;
  isSubmitting: boolean;
}

function SectionHeader({ title, onEdit, step }: { title: string; onEdit: (s: CheckoutStep) => void; step: CheckoutStep }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-stone-800">{title}</h3>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="text-sm text-amber-700 hover:text-amber-900 font-medium underline underline-offset-2 min-h-[44px] flex items-center px-2"
        aria-label={`Edit ${title}`}
      >
        Edit
      </button>
    </div>
  );
}

export default function ReviewStep({ formData, onSubmit, onBack, onEdit, isSubmitting }: ReviewStepProps) {
  const { state } = useCart();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 font-display mb-1">Review Your Order</h2>
        <p className="text-stone-500 text-sm">
          Please check everything looks correct before placing your order.
        </p>
      </div>

      {/* Order items */}
      <section aria-label="Order items" className="bg-white rounded-xl border border-stone-200 p-4">
        <SectionHeader title="Order Items" onEdit={onEdit} step="pickup" />
        <ul className="divide-y divide-stone-100 text-sm">
          {state.items.map((item) => (
            <li key={item.foodItem.id} className="flex justify-between py-2">
              <span className="text-stone-700">
                {item.foodItem.name}
                {item.quantity > 1 && <span className="text-stone-500 ml-1">×{item.quantity}</span>}
              </span>
              <span className="font-medium text-stone-900">
                ${(item.foodItem.pricePerPerson * (state.portionSize ?? 0) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-stone-100">
          <CartSummary showTax={true} />
        </div>
      </section>

      {/* Pickup details */}
      <section aria-label="Pickup details" className="bg-white rounded-xl border border-stone-200 p-4">
        <SectionHeader title="Pickup Details" onEdit={onEdit} step="pickup" />
        <dl className="text-sm space-y-1">
          <div className="flex gap-4">
            <dt className="text-stone-500 w-28">Date</dt>
            <dd className="text-stone-900 font-medium">{formatDate(formData.pickup.pickupDate)}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-stone-500 w-28">Time</dt>
            <dd className="text-stone-900 font-medium">{formatTime(formData.pickup.pickupTime)}</dd>
          </div>
          {state.portionSize && (
            <div className="flex gap-4">
              <dt className="text-stone-500 w-28">Portions</dt>
              <dd className="text-stone-900 font-medium">{state.portionSize} people</dd>
            </div>
          )}
          {formData.pickup.specialInstructions && (
            <div className="flex gap-4">
              <dt className="text-stone-500 w-28">Notes</dt>
              <dd className="text-stone-700">{formData.pickup.specialInstructions}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Contact */}
      <section aria-label="Contact information" className="bg-white rounded-xl border border-stone-200 p-4">
        <SectionHeader title="Contact Information" onEdit={onEdit} step="contact" />
        <dl className="text-sm space-y-1">
          <div className="flex gap-4">
            <dt className="text-stone-500 w-28">Name</dt>
            <dd className="text-stone-900 font-medium">{formData.contact.firstName} {formData.contact.lastName}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-stone-500 w-28">Email</dt>
            <dd className="text-stone-900">{formData.contact.email}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-stone-500 w-28">Phone</dt>
            <dd className="text-stone-900">{formData.contact.phone}</dd>
          </div>
        </dl>
      </section>

      {/* Payment */}
      <section aria-label="Payment method" className="bg-white rounded-xl border border-stone-200 p-4">
        <SectionHeader title="Payment Method" onEdit={onEdit} step="payment" />
        <p className="text-sm text-stone-900 font-medium">{paymentLabels[formData.paymentMethod]}</p>
        <p className="text-xs text-stone-500 mt-1">Payment is collected at the time of pickup.</p>
      </section>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} className="flex-1" disabled={isSubmitting}>
          Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onSubmit} className="flex-1" isLoading={isSubmitting}>
          Place Order
        </Button>
      </div>
    </div>
  );
}
