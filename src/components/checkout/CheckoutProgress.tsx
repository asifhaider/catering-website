import type { CheckoutStep } from '../../types';

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'pickup', label: 'Pickup' },
  { id: 'contact', label: 'Contact' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center gap-2">
        {STEPS.map((step, i) => {
          const isCompleted = i < currentIndex;
          const isCurrent = step.id === currentStep;

          return (
            <li key={step.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 ${isCurrent ? '' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span
                  className={[
                    'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold',
                    isCompleted
                      ? 'bg-sage-600 text-white'
                      : isCurrent
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-200 text-stone-500',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    isCurrent ? 'text-amber-700' : isCompleted ? 'text-stone-600' : 'text-stone-400'
                  }`}
                >
                  {step.label}
                  {isCompleted && <span className="sr-only">, completed</span>}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 w-8 sm:w-12 ${isCompleted ? 'bg-sage-400' : 'bg-stone-200'}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
