interface QuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  itemName: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function QuantityInput({
  value,
  min = 1,
  max = 99,
  onChange,
  itemName,
  disabled = false,
  size = 'md',
}: QuantityInputProps) {
  const btnClass = size === 'sm'
    ? 'w-8 h-8 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-amber-50 hover:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
    : 'w-10 h-10 flex items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:bg-amber-50 hover:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors';
  const inputClass = size === 'sm'
    ? 'w-10 text-center text-sm border-0 bg-transparent text-stone-900 font-medium'
    : 'w-12 text-center text-sm border-0 bg-transparent text-stone-900 font-medium';

  return (
    <div
      role="group"
      aria-label={`Quantity for ${itemName}`}
      className="inline-flex items-center gap-1"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={`Decrease quantity of ${itemName}`}
        className={btnClass}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        aria-label={`Quantity of ${itemName}`}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v) && v >= min && v <= max) onChange(v);
        }}
        className={inputClass}
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label={`Increase quantity of ${itemName}`}
        className={btnClass}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
