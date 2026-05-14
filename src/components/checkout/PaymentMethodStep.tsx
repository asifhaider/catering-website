import type { PaymentMethod } from '../../types';
import Button from '../ui/Button';

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; description: string; icon: string }[] = [
  {
    id: 'cash',
    label: 'Cash',
    description: 'Pay with exact cash on pickup.',
    icon: '💵',
  },
  {
    id: 'e-transfer',
    label: 'e-Transfer',
    description: 'Interac e-Transfer sent before pickup.',
    icon: '📱',
  },
  {
    id: 'check',
    label: 'Cheque',
    description: 'Personal cheque made out to Nour\'s Kitchen.',
    icon: '📋',
  },
];

interface PaymentMethodStepProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentMethodStep({ value, onChange, onNext, onBack }: PaymentMethodStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 font-display mb-1">Payment Method</h2>
        <p className="text-stone-500 text-sm">
          No payment is collected online. Payment is completed at the time of pickup.
        </p>
      </div>

      <fieldset>
        <legend id="payment-method-heading" className="text-sm font-medium text-stone-800 mb-3">
          Choose your preferred payment method
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        </legend>

        <div className="flex flex-col gap-3" role="radiogroup" aria-labelledby="payment-method-heading">
          {PAYMENT_OPTIONS.map((option) => {
            const isSelected = value === option.id;
            return (
              <label
                key={option.id}
                className={[
                  'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  'min-h-[72px]',
                  isSelected
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/50',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={option.id}
                  checked={isSelected}
                  onChange={() => onChange(option.id)}
                  className="sr-only"
                />
                <span className="text-2xl" aria-hidden="true">{option.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900">{option.label}</p>
                  <p className="text-sm text-stone-500">{option.description}</p>
                </div>
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext} className="flex-1">
          Review Order
        </Button>
      </div>
    </div>
  );
}
